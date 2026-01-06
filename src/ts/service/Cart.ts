import Buyable from '../domain/Buyable'

type CartEntry = {
  item: Buyable
  count: number
  countable: boolean
}

function isCountable(item: Buyable): boolean {
  return (item as { countable?: boolean }).countable === true
}

export default class Cart {
  private _entries: Map<number, CartEntry> = new Map()

  add(item: Buyable): void {
    const countable = isCountable(item)
    const existing = this._entries.get(item.id)

    if (!existing) {
      this._entries.set(item.id, { item, count: 1, countable })
      return
    }

    if (!countable) {
      return
    }

    existing.count += 1
  }

  get items(): Buyable[] {
    const result: Buyable[] = []
    this._entries.forEach(({ item, count }) => {
      for (let i = 0; i < count; i += 1) {
        result.push(item)
      }
    })
    return result
  }

  totalPrice(): number {
    let total = 0
    this._entries.forEach(({ item, count }) => {
      total += item.price * count
    })
    return total
  }

  totalPriceWithDiscount(discount: number): number {
    const total = this.totalPrice()
    return total * (1 - discount / 100)
  }

  removeById(id: number): void {
    this._entries.delete(id)
  }

  decreaseCount(id: number): void {
    const entry = this._entries.get(id)
    if (!entry) {
      return
    }

    if (!entry.countable || entry.count <= 1) {
      this._entries.delete(id)
      return
    }

    entry.count -= 1
  }
}