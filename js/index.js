class Good {
    constructor({
        id = null,
        title = '',
        availability = true,
        price = 0,
        finalPrice = 0,
        category = '',
        availableInDays = 0,
        brand = "Oukitel",
        brandId = 148322664,
        quantity = 28,
        imageUrl = "/images/149505401.jpg",
        parameters = []
    } = {}) {
        this.id = id;
        this.title = title;
        this.availability = availability;
        this.price = price;
        this.finalPrice = finalPrice;
        this.category = category;
        this.availableInDays = availableInDays;
        this.brand = brand;
        this.brandId = brandId;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
        this.parameters = parameters;
    }
}

const goods = [];

class API {
    static async request(url, params = {}) {
        if (params.form) {
            const form = new FormData();

            for (const key in params.form) {
                form.append(key, params.form[key]);
            }

            params.body = form;
        }

        if (params.query) {
            const urlParams = new URLSearchParams(params.query);

            url += `?${urlParams}`;
        }

        let result = null;
        const fetched = await fetch(url, params);

        if (!params.buffer && !params.json) {
            result = await fetched.text();
        }

        if (params.buffer) {
            result = await fetched.buffer();
        }

        if (params.json) {
            result = await fetched.json();
        }

        return result;
    }

    static getGoods() {

    }
}