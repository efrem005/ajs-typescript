import Book from '../domain/Book'
import Gadget from '../domain/Gadget'
import Movie from '../domain/Movie'
import MusicAlbum from '../domain/MusicAlbum'
import Cart from '../service/Cart'

test('новая корзина пуста', () => {
  const cart = new Cart()

  expect(cart.items.length).toBe(0)
})

test('корзина возвращает копию содержимого', () => {
  const cart = new Cart()
  const item = { id: 1, name: 'Тест', price: 100 }

  cart.add(item)
  const itemsSnapshot = cart.items

  expect(itemsSnapshot).toEqual([item])

  itemsSnapshot.push({ id: 2, name: 'Другой', price: 200 })

  expect(cart.items.length).toBe(1)
})

test('корзина считает сумму без скидки', () => {
  const cart = new Cart()

  cart.add(new Book(1, 'Книга', 'Автор', 500, 300))
  cart.add(new MusicAlbum(2, 'Альбом', 'Группа', 1500))

  expect(cart.totalPrice()).toBe(2000)
})

test('корзина считает сумму со скидкой', () => {
  const cart = new Cart()

  cart.add(new Book(1, 'Книга', 'Автор', 2000, 300))
  cart.add(new MusicAlbum(2, 'Альбом', 'Группа', 1000))

  expect(cart.totalPriceWithDiscount(25)).toBe(2250)
})

test('корзина удаляет товар по id', () => {
  const cart = new Cart()

  cart.add(new Book(1, 'Книга', 'Автор', 2000, 300))
  cart.add(new MusicAlbum(2, 'Альбом', 'Группа', 1000))
  cart.add(new MusicAlbum(3, 'Ещё альбом', 'Группа', 500))

  cart.removeById(2)

  expect(cart.items.map((item) => item.id)).toEqual([1, 3])
  expect(cart.totalPrice()).toBe(2500)
})

test('уникальные товары нельзя добавить дважды', () => {
  const cart = new Cart()
  const avengers = new Movie(
    100,
    'Мстители',
    'The Avengers',
    2012,
    'США',
    'Они спасут мир ценой всего.',
    ['фантастика'],
    143,
    500,
  )

  cart.add(avengers)
  cart.add(avengers)

  expect(cart.items.length).toBe(1)
  expect(cart.totalPrice()).toBe(500)
})

test('товары с количеством накапливаются', () => {
  const cart = new Cart()
  const phone = new Gadget(10, 'Смартфон', 30000, 'смартфоны')

  cart.add(phone)
  cart.add(phone)
  cart.add(phone)

  expect(cart.items.length).toBe(3)
  expect(cart.totalPrice()).toBe(90000)
})

test('уменьшение количества работает и удаляет при последней штуке', () => {
  const cart = new Cart()
  const phone = new Gadget(10, 'Смартфон', 30000, 'смартфоны')

  cart.add(phone)
  cart.add(phone)
  cart.add(phone)

  cart.decreaseCount(10)
  expect(cart.items.length).toBe(2)
  expect(cart.totalPrice()).toBe(60000)

  cart.decreaseCount(10)
  cart.decreaseCount(10)

  expect(cart.items.length).toBe(0)
  expect(cart.totalPrice()).toBe(0)
})

test('уменьшение количества игнорирует отсутствующий id', () => {
  const cart = new Cart()
  const phone = new Gadget(10, 'Смартфон', 30000, 'смартфоны')

  cart.add(phone)
  cart.decreaseCount(999)

  expect(cart.items.length).toBe(1)
  expect(cart.totalPrice()).toBe(30000)
})

test('гаджет получает категорию по умолчанию', () => {
  const gadget = new Gadget(5, 'Ноутбук', 50000)

  expect(gadget.category).toBe('gadget')
})
