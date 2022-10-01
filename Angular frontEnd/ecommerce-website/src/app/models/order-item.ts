export class OrderItem {
    id: number
    name: string
    imageUrl: string
    unitPrice: number
    quantity: number;
    constructor(item: OrderItem) {
        this.id = item.id
        this.name = item.name
        this.imageUrl = item.imageUrl
        this.unitPrice = item.unitPrice
        this.quantity = 1;
    }
}
