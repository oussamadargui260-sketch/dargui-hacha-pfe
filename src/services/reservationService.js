import api from './api';

export const reservationService = {
    myReservations: () => api.get('/reservations/my'),
    reserve: (bookId) => api.post('/reservations', { bookId }),
};
