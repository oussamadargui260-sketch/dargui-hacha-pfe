// src/mock/db.js
const BOOKS = [
  { id:1,  isbn:'978-0441013593', title:'Dune',                     author:'Frank Herbert',        category:'Science Fiction', published_date:'1965-08-01', quantity:4, available_quantity:4 },
  { id:2,  isbn:'978-0451524935', title:'1984',                     author:'George Orwell',        category:'Fiction',         published_date:'1949-06-08', quantity:3, available_quantity:0 },
  { id:3,  isbn:'978-0062316097', title:'Sapiens',                  author:'Yuval Noah Harari',    category:'Histoire',        published_date:'2011-01-01', quantity:2, available_quantity:2 },
  { id:4,  isbn:'978-0743273565', title:'Le Grand Gatsby',          author:'F. Scott Fitzgerald',  category:'Fiction',         published_date:'1925-04-10', quantity:3, available_quantity:1 },
  { id:5,  isbn:'978-0735224292', title:'Atomic Habits',            author:'James Clear',          category:'Développement',   published_date:'2018-10-16', quantity:5, available_quantity:5 },
  { id:6,  isbn:'978-0201633610', title:'The Pragmatic Programmer', author:'David Thomas',         category:'Technologie',     published_date:'1999-10-20', quantity:2, available_quantity:2 },
  { id:7,  isbn:'978-0060935467', title:'To Kill a Mockingbird',    author:'Harper Lee',           category:'Fiction',         published_date:'1960-07-11', quantity:4, available_quantity:3 },
  { id:8,  isbn:'978-0525559474', title:'The Midnight Library',     author:'Matt Haig',            category:'Fiction',         published_date:'2020-08-13', quantity:4, available_quantity:4 },
  { id:9,  isbn:'978-1250301697', title:'Educated',                 author:'Tara Westover',        category:'Biographie',      published_date:'2018-02-20', quantity:2, available_quantity:2 },
  { id:10, isbn:'978-0679720201', title:"L'Etranger",               author:'Albert Camus',         category:'Philosophie',     published_date:'1942-01-01', quantity:2, available_quantity:2 },
  { id:11, isbn:'978-0385490818', title:"The Handmaid's Tale",      author:'Margaret Atwood',      category:'Science Fiction', published_date:'1985-06-01', quantity:3, available_quantity:1 },
  { id:12, isbn:'978-0316769174', title:'The Catcher in the Rye',   author:'J.D. Salinger',        category:'Fiction',         published_date:'1951-07-16', quantity:3, available_quantity:2 },
];
const USERS = [
  { id:1, name:'Admin User',    email:'admin@library.com', password:'password', role:'admin', created_at:'2025-01-01' },
  { id:2, name:'James Doe',     email:'james@mail.com',    password:'password', role:'user',  created_at:'2026-03-05' },
  { id:3, name:'Alice Smith',   email:'alice@mail.com',    password:'password', role:'user',  created_at:'2026-02-18' },
  { id:4, name:'Nadia Benmira', email:'nadia@mail.com',    password:'password', role:'user',  created_at:'2026-05-19' },
  { id:5, name:'Mark K.',       email:'mark@mail.com',     password:'password', role:'user',  created_at:'2026-04-10' },
];
const LOANS = [
  { id:1, user_id:2, book_id:1, borrowed_at:'2026-05-10', due_date:'2026-05-24', returned_at:null,         status:'borrowed' },
  { id:2, user_id:3, book_id:2, borrowed_at:'2026-04-28', due_date:'2026-05-12', returned_at:'2026-05-11', status:'returned' },
  { id:3, user_id:5, book_id:4, borrowed_at:'2026-04-15', due_date:'2026-05-01', returned_at:null,         status:'overdue'  },
  { id:4, user_id:4, book_id:3, borrowed_at:'2026-05-14', due_date:'2026-05-28', returned_at:null,         status:'borrowed' },
  { id:5, user_id:2, book_id:6, borrowed_at:'2026-05-01', due_date:'2026-05-15', returned_at:'2026-05-14', status:'returned' },
];
function init() {
  if (!localStorage.getItem('lms_books'))  localStorage.setItem('lms_books',  JSON.stringify(BOOKS));
  if (!localStorage.getItem('lms_users'))  localStorage.setItem('lms_users',  JSON.stringify(USERS));
  if (!localStorage.getItem('lms_loans'))  localStorage.setItem('lms_loans',  JSON.stringify(LOANS));
  if (!localStorage.getItem('lms_nextId')) localStorage.setItem('lms_nextId', JSON.stringify({ book:13, user:6, loan:6 }));
}
export const getBooks  = () => { init(); return JSON.parse(localStorage.getItem('lms_books')); };
export const getUsers  = () => { init(); return JSON.parse(localStorage.getItem('lms_users')); };
export const getLoans  = () => { init(); return JSON.parse(localStorage.getItem('lms_loans')); };
export const saveBooks = d => localStorage.setItem('lms_books', JSON.stringify(d));
export const saveUsers = d => localStorage.setItem('lms_users', JSON.stringify(d));
export const saveLoans = d => localStorage.setItem('lms_loans', JSON.stringify(d));
export function nextId(entity) {
  const ids = JSON.parse(localStorage.getItem('lms_nextId') || '{}');
  const id  = ids[entity] ?? 1;
  ids[entity] = id + 1;
  localStorage.setItem('lms_nextId', JSON.stringify(ids));
  return id;
}
export function getLoansHydrated() {
  const l = getLoans(), u = getUsers(), b = getBooks();
  return l.map(x => ({ ...x, user: u.find(u => u.id === x.user_id) ?? null, book: b.find(b => b.id === x.book_id) ?? null }));
}
export function refreshLoanStatuses() {
  const today = new Date().toISOString().split('T')[0];
  saveLoans(getLoans().map(l => l.status === 'returned' ? l : { ...l, status: l.due_date < today ? 'overdue' : 'borrowed' }));
}
init(); refreshLoanStatuses();