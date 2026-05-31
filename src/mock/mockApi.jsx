// src/mock/mockApi.js
import {
  getBooks,
  getUsers,
  getLoans,
  getLoansHydrated,
  saveBooks,
  saveUsers,
  saveLoans,
  nextId,
  refreshLoanStatuses,
} from './db';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

function paginate(arr, page = 1, perPage = 12) {
  const total = arr.length;
  const last_page = Math.max(1, Math.ceil(total / perPage));
  const current_page = Math.min(Number(page), last_page);

  return {
    data: arr.slice((current_page - 1) * perPage, current_page * perPage),
    total,
    last_page,
    current_page,
  };
}

// AUTH
export const mockAuth = {
  async login(email, password) {
    await delay(400);

    const user = getUsers().find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      throw {
        response: {
          data: {
            message: 'Email ou mot de passe incorrect.',
          },
        },
      };
    }

    const { password: _, ...safe } = user;

    return {
      token: btoa(`${user.id}:${Date.now()}`),
      user: safe,
    };
  },

  async register({ name, email, password, password_confirmation }) {
    await delay(400);

    const errs = {};

    if (!name?.trim()) errs.name = 'Le nom est requis.';
    if (!email?.trim()) errs.email = "L'email est requis.";
    if ((password || '').length < 8) errs.password = 'Minimum 8 caractères.';
    if (password !== password_confirmation) {
      errs.password_confirmation = 'Les mots de passe ne correspondent pas.';
    }

    if (Object.keys(errs).length) {
      throw {
        response: {
          data: {
            errors: errs,
          },
        },
      };
    }

    if (getUsers().find(u => u.email === email)) {
      throw {
        response: {
          data: {
            errors: {
              email: 'Email déjà utilisé.',
            },
          },
        },
      };
    }

    const user = {
      id: nextId('user'),
      name,
      email,
      password,
      role: 'user',
      created_at: new Date().toISOString().split('T')[0],
    };

    saveUsers([...getUsers(), user]);

    const { password: _, ...safe } = user;

    return {
      token: btoa(`${user.id}:${Date.now()}`),
      user: safe,
    };
  },

  async getUser(token) {
    await delay(100);

    const id = parseInt(atob(token).split(':')[0]);
    const user = getUsers().find(u => u.id === id);

    if (!user) throw new Error('Not found');

    const { password: _, ...safe } = user;

    return safe;
  },

  async logout() {
    await delay(100);
  },
};

// BOOKS
export const mockBooks = {
  async list({ page = 1, per_page = 12, search = '', category = '' } = {}) {
    await delay(250);

    let books = getBooks();

    if (search) {
      books = books.filter(
        b =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.author.toLowerCase().includes(search.toLowerCase()) ||
          b.isbn.includes(search)
      );
    }

    if (category) {
      books = books.filter(b => b.category === category);
    }

    return paginate(books, page, per_page);
  },

  async get(id) {
    await delay(200);

    const book = getBooks().find(b => b.id === parseInt(id));

    if (!book) {
      throw {
        response: {
          data: {
            message: 'Livre introuvable.',
          },
        },
      };
    }

    return book;
  },

  async create(fd) {
    await delay(400);

    const g = k => (fd.get ? fd.get(k) : fd[k]);

    const errs = {};

    if (!g('isbn')) errs.isbn = "L'ISBN est requis.";
    if (!g('title')) errs.title = 'Le titre est requis.';
    if (!g('author')) errs.author = "L'auteur est requis.";

    if (Object.keys(errs).length) {
      throw {
        response: {
          data: {
            errors: errs,
          },
        },
      };
    }

    if (getBooks().find(b => b.isbn === g('isbn'))) {
      throw {
        response: {
          data: {
            errors: {
              isbn: 'ISBN déjà existant.',
            },
          },
        },
      };
    }

    const qty = parseInt(g('quantity')) || 1;

    const book = {
      id: nextId('book'),

      isbn: g('isbn'),
      title: g('title'),
      author: g('author'),
      category: g('category') || '',
      published_date: g('published_date') || '',

      publisher: g('publisher') || '',
      language: g('language') || '',
      pages: parseInt(g('pages')) || 0,
      rating: parseFloat(g('rating')) || 0,
      cover_image: g('cover_image') || '',

      description: g('description') || '',

      quantity: qty,
      available_quantity: qty,
    };

    saveBooks([...getBooks(), book]);

    return book;
  },

  async update(id, fd) {
    await delay(400);

    const books = getBooks();
    const idx = books.findIndex(b => b.id === parseInt(id));

    if (idx === -1) {
      throw {
        response: {
          data: {
            message: 'Introuvable.',
          },
        },
      };
    }

    const g = k => (fd.get ? fd.get(k) : fd[k]) ?? books[idx][k];

    books[idx] = {
      ...books[idx],

      title: g('title'),
      author: g('author'),
      category: g('category'),
      published_date: g('published_date'),

      publisher: g('publisher') || '',
      language: g('language') || '',
      pages: parseInt(g('pages')) || 0,
      rating: parseFloat(g('rating')) || 0,
      cover_image: g('cover_image') || '',

      description: g('description'),
      quantity: parseInt(g('quantity')) || 1,
    };

    saveBooks(books);

    return books[idx];
  },

  async delete(id) {
    await delay(300);

    if (
      getLoans().some(
        l => l.book_id === parseInt(id) && l.status !== 'returned'
      )
    ) {
      throw {
        response: {
          data: {
            message: 'Impossible : emprunts actifs.',
          },
        },
      };
    }

    saveBooks(getBooks().filter(b => b.id !== parseInt(id)));

    return {
      message: 'Supprimé.',
    };
  },
};

// LOANS
export const mockLoans = {
  async list({ page = 1, per_page = 15, status = '', user_id = '' } = {}) {
    await delay(250);
    refreshLoanStatuses();

    let loans = getLoansHydrated();

    if (status) loans = loans.filter(l => l.status === status);
    if (user_id) loans = loans.filter(l => l.user_id === parseInt(user_id));

    return paginate(loans, page, per_page);
  },

  async myLoans(userId) {
    await delay(200);
    refreshLoanStatuses();

    return getLoansHydrated().filter(l => l.user_id === parseInt(userId));
  },

  async borrow(bookId, userId) {
    await delay(400);

    const books = getBooks();
    const bIdx = books.findIndex(b => b.id === parseInt(bookId));

    if (bIdx === -1 || books[bIdx].available_quantity < 1) {
      throw {
        response: {
          data: {
            message: "Ce livre n'est pas disponible.",
          },
        },
      };
    }

    if (
      getLoans().find(
        l =>
          l.user_id === parseInt(userId) &&
          l.book_id === parseInt(bookId) &&
          l.status !== 'returned'
      )
    ) {
      throw {
        response: {
          data: {
            message: 'Vous avez déjà emprunté ce livre.',
          },
        },
      };
    }

    const due = new Date();
    due.setDate(due.getDate() + 14);

    const loan = {
      id: nextId('loan'),
      user_id: parseInt(userId),
      book_id: parseInt(bookId),
      borrowed_at: new Date().toISOString().split('T')[0],
      due_date: due.toISOString().split('T')[0],
      returned_at: null,
      status: 'borrowed',
    };

    saveLoans([...getLoans(), loan]);

    books[bIdx].available_quantity -= 1;
    saveBooks(books);

    return loan;
  },

  async return(loanId) {
    await delay(350);

    const loans = getLoans();
    const idx = loans.findIndex(l => l.id === parseInt(loanId));

    if (idx === -1) {
      throw {
        response: {
          data: {
            message: 'Emprunt introuvable.',
          },
        },
      };
    }

    if (loans[idx].status === 'returned') {
      throw {
        response: {
          data: {
            message: 'Déjà rendu.',
          },
        },
      };
    }

    loans[idx] = {
      ...loans[idx],
      returned_at: new Date().toISOString().split('T')[0],
      status: 'returned',
    };

    saveLoans(loans);

    const books = getBooks();
    const bIdx = books.findIndex(b => b.id === loans[idx].book_id);

    if (bIdx !== -1) {
      books[bIdx].available_quantity += 1;
      saveBooks(books);
    }

    return loans[idx];
  },
};

// USERS
export const mockUsers = {
  async list({ page = 1, per_page = 15, search = '' } = {}) {
    await delay(250);

    const loans = getLoans();

    let users = getUsers().map(u => {
      const { password: _, ...safe } = u;

      return {
        ...safe,
        loans_count: loans.filter(
          l => l.user_id === u.id && l.status !== 'returned'
        ).length,
      };
    });

    if (search) {
      users = users.filter(
        u =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    return paginate(users, page, per_page);
  },

  async create({ name, email, password, role = 'user' }) {
    await delay(400);

    const errs = {};

    if (!name?.trim()) errs.name = 'Le nom est requis.';
    if (!email?.trim()) errs.email = "L'email est requis.";
    if ((password || '').length < 8) errs.password = 'Minimum 8 caractères.';

    if (Object.keys(errs).length) {
      throw {
        response: {
          data: {
            errors: errs,
          },
        },
      };
    }

    if (getUsers().find(u => u.email === email)) {
      throw {
        response: {
          data: {
            errors: {
              email: 'Email déjà utilisé.',
            },
          },
        },
      };
    }

    const user = {
      id: nextId('user'),
      name,
      email,
      password,
      role,
      created_at: new Date().toISOString().split('T')[0],
    };

    saveUsers([...getUsers(), user]);

    const { password: _, ...safe } = user;

    return safe;
  },

  async delete(id) {
    await delay(300);

    if (
      getLoans().some(
        l => l.user_id === parseInt(id) && l.status !== 'returned'
      )
    ) {
      throw {
        response: {
          data: {
            message: 'Utilisateur avec emprunts actifs.',
          },
        },
      };
    }

    saveUsers(getUsers().filter(u => u.id !== parseInt(id)));

    return {
      message: 'Supprimé.',
    };
  },

  async updateProfile(userId, { name, email }) {
    await delay(350);

    const users = getUsers();
    const idx = users.findIndex(u => u.id === parseInt(userId));

    if (idx === -1) {
      throw {
        response: {
          data: {
            message: 'Introuvable.',
          },
        },
      };
    }

    if (
      users.find(
        u => u.email === email && u.id !== parseInt(userId)
      )
    ) {
      throw {
        response: {
          data: {
            errors: {
              email: 'Email déjà utilisé.',
            },
          },
        },
      };
    }

    users[idx] = {
      ...users[idx],
      name,
      email,
    };

    saveUsers(users);

    const { password: _, ...safe } = users[idx];

    return safe;
  },

  async changePassword(userId, { current_password, password, password_confirmation }) {
    await delay(350);

    const users = getUsers();
    const idx = users.findIndex(u => u.id === parseInt(userId));

    if (idx === -1) {
      throw {
        response: {
          data: {
            message: 'Introuvable.',
          },
        },
      };
    }

    if (users[idx].password !== current_password) {
      throw {
        response: {
          data: {
            errors: {
              current_password: 'Mot de passe actuel incorrect.',
            },
          },
        },
      };
    }

    if (password !== password_confirmation) {
      throw {
        response: {
          data: {
            errors: {
              password_confirmation: 'Ne correspondent pas.',
            },
          },
        },
      };
    }

    if ((password || '').length < 8) {
      throw {
        response: {
          data: {
            errors: {
              password: 'Minimum 8 caractères.',
            },
          },
        },
      };
    }

    users[idx] = {
      ...users[idx],
      password,
    };

    saveUsers(users);

    return {
      message: 'Mot de passe modifié.',
    };
  },
};

// DASHBOARD
export const mockDashboard = {
  async stats() {
    await delay(200);
    refreshLoanStatuses();

    const loans = getLoans();

    return {
      total_books: getBooks().length,
      total_users: getUsers().filter(u => u.role !== 'admin').length,
      active_loans: loans.filter(l => l.status === 'borrowed').length,
      overdue_loans: loans.filter(l => l.status === 'overdue').length,
    };
  },
};