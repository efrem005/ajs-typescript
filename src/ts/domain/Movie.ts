import Buyable from './Buyable'

export default class Movie implements Buyable {
	constructor(
		readonly id: number,
		readonly name: string,          // Название на русском, например «Мстители»
		readonly originalName: string,  // Оригинальное название, например «The Avengers»
		readonly year: number,          // Год выхода
		readonly country: string,       // Страна
		readonly tagline: string,       // Слоган
		readonly genre: string[],       // Жанры
		readonly duration: number,      // Продолжительность в минутах
		readonly price: number,         // Цена
	) { }
}