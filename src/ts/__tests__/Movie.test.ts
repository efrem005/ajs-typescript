import Movie from '../domain/Movie'
import Cart from '../service/Cart'

test('фильм хранит все переданные свойства', () => {
  const avengers = new Movie(
    1009,
    'Мстители',
    'The Avengers',
    2012,
    'США',
    'Они спасут мир ценой всего.',
    ['фантастика', 'боевик', 'приключения'],
    143,
    500,
  )

  expect(avengers.id).toBe(1009)
  expect(avengers.name).toBe('Мстители')
  expect(avengers.originalName).toBe('The Avengers')
  expect(avengers.year).toBe(2012)
  expect(avengers.country).toBe('США')
  expect(avengers.tagline).toBe('Они спасут мир ценой всего.')
  expect(avengers.genre).toEqual(['фантастика', 'боевик', 'приключения'])
  expect(avengers.duration).toBe(143)
  expect(avengers.price).toBe(500)
})

test('корзина принимает экземпляры фильма', () => {
  const cart = new Cart()
  const avengers = new Movie(
    1009,
    'Мстители',
    'The Avengers',
    2012,
    'США',
    'Они спасут мир ценой всего.',
    ['фантастика', 'боевик', 'приключения'],
    143,
    500,
  )

  cart.add(avengers)

  expect(cart.items.length).toBe(1)
  expect(cart.items[0]).toBe(avengers)
  expect(cart.items[0]).toBeInstanceOf(Movie)
});


