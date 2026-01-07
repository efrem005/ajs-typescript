import Book from './domain/Book'
import Gadget from './domain/Gadget'
import Movie from './domain/Movie'
import MusicAlbum from './domain/MusicAlbum'
import Cart from './service/Cart'

const cart = new Cart()
console.log(cart.items)

cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225))
cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900))
cart.add(new Movie(
  1009,
  'Мстители',
  'The Avengers',
  2012,
  'США',
  'Они спасут мир ценой всего.',
  ['фантастика', 'боевик', 'приключения'],
  143,
  500,
))
