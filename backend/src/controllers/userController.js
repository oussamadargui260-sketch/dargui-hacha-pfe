const sequelize = require('../config/database');
const User = sequelize.models.User;
const Borrow = sequelize.models.Borrow;

const getAllUsers = async (req, res) => {
  try {
    const { search, role } = req.query;
    const where = {};

    if (role) {
      // Normalize 'user' to 'member' for DB query if needed, 
      // but the controller maps member -> user for frontend.
      // Let's see what's in the DB.
      // Looking at line 28: raw.role === 'member' ? 'user' : raw.role
      // So if frontend sends 'user', we search for 'member'.
      where.role = role === 'user' ? 'member' : role;
    }

    if (search) {
      const Op = sequelize.Sequelize.Op;
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const users = await User.findAll({
      where,
      attributes: ['id', 'name', 'email', 'role', 'phone', 'status', 'createdAt'],
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Borrow,
          attributes: ['id', 'status'],
          required: false,
        },
      ],
    });

    // Add loans_count (active borrows) for each user
    const result = users.map(u => {
      const raw = u.toJSON();
      const borrows = raw.Borrows ?? [];
      return {
        ...raw,
        Borrows: undefined, // remove raw array
        loans_count: borrows.filter(b => b.status !== 'returned').length,
        // normalize role for frontend
        role: raw.role === 'member' ? 'user' : raw.role,
      };
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'role', 'phone', 'status', 'createdAt']
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, phone, status, role } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.update({ name, phone, status, role });
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if user has active borrows
    const activeBorrow = await Borrow.findOne({
      where: {
        userId: req.params.id,
        status: { [sequelize.Sequelize.Op.in]: ['borrowed', 'overdue'] },
      },
    });

    if (activeBorrow) {
      return res.status(400).json({ message: 'Utilisateur avec emprunts actifs.' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check email uniqueness
    if (email && email !== user.email) {
      const existing = await User.findOne({ where: { email } });
      if (existing) {
        return res.status(400).json({ errors: { email: 'Email déjà utilisé.' } });
      }
    }

    await user.update({ name, email });
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role === 'member' ? 'user' : user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const changePassword = async (req, res) => {
  try {
    const bcrypt = require('bcryptjs');
    const { current_password, password, password_confirmation } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(current_password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: { current_password: 'Mot de passe actuel incorrect.' } });
    }

    if (password !== password_confirmation) {
      return res.status(400).json({ errors: { password_confirmation: 'Les mots de passe ne correspondent pas.' } });
    }

    if ((password || '').length < 8) {
      return res.status(400).json({ errors: { password: 'Minimum 8 caractères.' } });
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.json({ message: 'Mot de passe modifié avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.status = user.status === 'active' ? 'blocked' : 'active';
    await user.save();

    res.json({
      message: `User ${user.status === 'active' ? 'activated' : 'blocked'} successfully`,
      status: user.status
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateProfile,
  changePassword,
  toggleUserStatus
};