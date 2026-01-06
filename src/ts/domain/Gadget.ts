import Buyable from './Buyable'

export default class Gadget implements Buyable {
	readonly countable = true
	readonly id: number
	readonly name: string
	readonly price: number
	readonly category: string

	constructor(
		id: number,
		name: string,
		price: number,
		category: string = 'gadget',
	) {
		this.id = id
		this.name = name
		this.price = price
		this.category = category
	}
}



