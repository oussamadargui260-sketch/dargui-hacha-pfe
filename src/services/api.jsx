// src/services/api.js
import { mockBooks, mockLoans, mockUsers, mockDashboard } from '../mock/mockApi';

const uid = () => parseInt(localStorage.getItem('lms_user_id') || '0');

export const bookService = {
  list:   p        => mockBooks.list(p).then(d => ({ data: d })),
  get:    id       => mockBooks.get(id).then(d => ({ data: d })),
  create: fd       => mockBooks.create(fd).then(d => ({ data: d })),
  update: (id, fd) => mockBooks.update(id, fd).then(d => ({ data: d })),
  delete: id       => mockBooks.delete(id).then(d => ({ data: d })),
};
export const loanService = {
  list:    p      => mockLoans.list(p).then(d => ({ data: d })),
  myLoans: ()     => mockLoans.myLoans(uid()).then(d => ({ data: d })),
  borrow:  bookId => mockLoans.borrow(bookId, uid()).then(d => ({ data: d })),
  return:  id     => mockLoans.return(id).then(d => ({ data: d })),
};
export const userService = {
  list:           p => mockUsers.list(p).then(d => ({ data: d })),
  create:         d => mockUsers.create(d).then(d => ({ data: d })),
  delete:         id => mockUsers.delete(id).then(d => ({ data: d })),
  updateProfile:  d => mockUsers.updateProfile(uid(), d).then(d => ({ data: d })),
  changePassword: d => mockUsers.changePassword(uid(), d).then(d => ({ data: d })),
};
export const dashboardService = {
  stats: () => mockDashboard.stats().then(d => ({ data: d })),
};