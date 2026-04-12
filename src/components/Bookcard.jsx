import React from 'react';
import Badge from './Badge';
import { BookOpen } from 'lucide-react';

const BookCard = ({ book, onBorrow }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 hover:shadow-lg transition-shadow">
      <div className="w-full h-48 bg-slate-100 rounded-xl mb-4 flex items-center justify-center text-slate-400">
        {book.image ? <img src={book.image} alt={book.title} className="object-cover h-full w-full rounded-xl" /> : <BookOpen size={48} />}
      </div>
      <Badge status={book.status} />
      <h3 className="font-bold text-slate-800 mt-2 text-lg truncate">{book.title}</h3>
      <p className="text-sm text-slate-500 mb-4">{book.author}</p>
      <button 
        onClick={() => onBorrow(book.id)}
        disabled={book.status !== 'Available'}
        className="w-full py-2 bg-slate-900 text-white rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
      >
        Emprunter
      </button>
    </div>
  );
};

export default BookCard;