import api from './api';

export const bookService = {
    list: (params) => api.get('/books', { params }),
    get: (id) => api.get(`/books/${id}`),
    create: (fd) => api.post('/books', fd),
    update: (id, fd) => api.put(`/books/${id}`, fd),
    delete: (id) => api.delete(`/books/${id}`),
};
