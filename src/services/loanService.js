import api from './api';

export const loanService = {
    list: (params) => api.get('/borrows', { params }), // Depending on backend
    myLoans: () => api.get('/borrows/my'),
    borrow: (bookId) => api.post('/borrows', { bookId }),
    return: (id) => api.put(`/borrows/return`, { borrowId: id }),
};
