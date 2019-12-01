class CartItem {
    constructor({
        id = null,
        count = 0
    } = {}) {
        this.id = id;
        this.count = count;
    }
}

export default class Cart {
    static clearItems() {
        return localStorage.setItem('cart', '[]')
    }

    static getItem(itemId) {
        let items = Cart.getItems();

        let currentItem = items.find((item) => (
            item.id === itemId
        )) || null;

        return currentItem;
    }

    static editItem(itemId, count = null) {
        let items = Cart.getItems();

        let currentItem = items.find((item) => (
            item.id === itemId
        ));

        if (!currentItem) {
            currentItem = new CartItem({
                id: itemId
            });
        }

        currentItem.count = count;

        const newItems = [
            ...items.filter(item => item.id !== itemId),
            currentItem
        ];

        return localStorage.setItem('cart', JSON.stringify(newItems));
    }

    static addItem(itemId) {
        let items = Cart.getItems();
        let currentItem = items.find((item) => (
            item.id === itemId
        ));

        console.log(currentItem);

        if (!currentItem) {
            currentItem = new CartItem({
                id: itemId
            });
        }

        currentItem.count++;

        const newItems = [
            ...items.filter(item => item.id !== itemId),
            currentItem
        ];

        return localStorage.setItem('cart', JSON.stringify(newItems));
    }

    static removeItem(itemId) {
        let items = Cart.getItems();

        const currentItem = items.find((item) => (
            item.id === itemId
        ));

        if (!currentItem) {
            return;
        }

        currentItem.count--;

        let newItems = items;

        if (currentItem.count < 1) {
            newItems = items.filter(item => item.id !== itemId);
        } else {
            newItems = [
                ...items.filter(item => item.id !== itemId),
                currentItem
            ];
        }

        return localStorage.setItem('cart', JSON.stringify(newItems));
    }

    static getItems() {
        let items = localStorage.getItem('cart');

        if (!items) {
            localStorage.setItem('cart', '[]');

            items = localStorage.getItem('cart');
        }

        return JSON.parse(items);
    }
}