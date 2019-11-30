export class Good {
    constructor({
        id = null,
        title = '',
        availability = true,
        price = 0,
        finalPrice = 0,
        category = '',
        availableInDays = 0,
        brand = '',
        brandId = 0,
        quantity = 0,
        imageUrl = '',
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

export default class API {
    static async request(url, params = {}) {
        if (params.form) {
            // eslint-disable-next-line no-undef
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
        // eslint-disable-next-line no-undef
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

    static getGoodsRaw() {
        return API.request(
            'http://chelhack.deletestaging.com/goods',
            {
                // json: true,
                mode: 'cors',
                method: 'GET',
                credentials: "same-origin",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Origin": "http://chelhack.deletestaging.com/"
                }
            }
        );
    }

    static equal(array1, array2) {
        if (array1.length !== array2.length) {
            return false;
        }
        
        for (let i in array1) {
            if (!array2[i]) {
                return false;
            }
            
            if (array1[i].id !== array2[i].id) {
                return false
            }
        }
        
        return true;
    }

    static async lazyLoadGoods() {
        let goodsRaw = await API.request(
            'http://10.100.67.127:8989/userapi/getGoods',
            {
                json: true
            }
        );

        if (goodsRaw.status === 'Error') {
            return;
        }

        const goods = goodsRaw.data.map((good) => new Good(good));

        let localGoods = localStorage.getItem('goods');

        localGoods = JSON.parse(localGoods);

        const isEqual = API.equal(goods, localGoods);

        if (!isEqual) {
            localStorage.setItem('goods', JSON.stringify(goods));
        }
    }

    static async getGoods(filter = 'all') {
        if (filter !== 'all') {
            const allGoods = await API.getGoods();

            if (allGoods.status === 'Error') {
                return allGoods;
            }
            
            const findFilter = {
                'smartphones': 'Smartphones',
                'laptops': 'Laptops',
            }[filter]
    
            return {
                status: "Success",
                goods: allGoods.goods.filter((good) => (
                    good.category === findFilter
                ))
            };
        } else { 
            const localGoods = localStorage.getItem('goods');

            if (!localGoods) {
                let goodsRaw = await API.request(
                    'http://10.100.67.127:8989/userapi/getGoods',
                    {
                        json: true
                    }
                );
                
                if (goodsRaw.status === 'Error') {
                    return goodsRaw;
                }

                const goods = goodsRaw.data.map((good) => new Good(good));

                localStorage.setItem('goods', JSON.stringify(goods));
                
                return await API.getGoods();
            } else {
                API.lazyLoadGoods();
            }

            return {
                status: 'Success',
                goods: JSON.parse(localGoods)
            };
        }
    }

    static async getGoodsWithFilters() {
    }
}