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
