import Book from '../domain/Book'
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
