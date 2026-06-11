import api from './api';

export const userService = {
    list: (params) => api.get('/users', { params }),
    create: (d) => api.post('/users', d),
    delete: (id) => api.delete(`/users/${id}`),
    updateProfile: (d) => api.put('/users/profile', d),
    changePassword: (d) => api.put('/users/password', d),
};
