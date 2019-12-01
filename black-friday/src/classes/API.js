import Cart from './Cart';

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
        if (!array1 || !array2) {
            return false;
        }

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
                json: true,
                method: 'POST'
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

    static async searchGoods(query = null) {
        if (query === null) {
            return {
                status: 'Error',
                message: 'Строка поиска не указана'
            }
        }

        const goods = await API.getGoods('all');

        if (goods.status === 'Error') {
            return goods;
        }

        query = query.replace(/[^\w\s]/ig, '');

        const regexpQuery = new RegExp(query, 'ig');

        return {
            status: 'Success',
            goods: goods.goods.filter((good) => (
                regexpQuery.test(good.title)
            ))
        }
    }
    
    static async getGoodById(itemId = null) {
        if (!itemId) {
            return null;
        }

        const allGoods = await API.getGoods('all');

        if (allGoods.status === 'Error') {
            return allGoods;
        }

        return allGoods.goods.find((good) => (
            good.id === itemId
        )) || null;
    }

    static mixinArrays(array1, array2) {
        return array1.filter(value => array2.includes(value));
    }

    static async getGoodByRAM(min, max) {
        const goodsRaw = await API.getGoods();

        if (goodsRaw.status === 'Error') {
            return goodsRaw;
        }

        return goodsRaw.goods.filter((good) => {
            const { value } = good.parameters.find(param => param.title === 'RAM');

            return (
                value <= max
                && value >= min
            );
        });
    }

    static async getGoodByMem(min, max) {
        const goodsRaw = await API.getGoods();

        if (goodsRaw.status === 'Error') {
            return goodsRaw;
        }

        return goodsRaw.goods.filter((good) => {
            const { value } = good.parameters.find(param => ['Built-in memory', 'SSD'].includes(param.title));

            return (
                value <= max
                && value >= min
            );
        });
    }

    static async getGoodsByFilters(filters = {}) {
        const goodsRaw = await API.getGoods();

        if (goodsRaw.status === 'Error') {
            return goodsRaw;
        }

        return goodsRaw.goods.filter((good) => {
            const { value: ram } = good.parameters.find(param => param.title === 'RAM');
            const { value: mem } = good.parameters.find(param => ['Built-in memory', 'SSD'].includes(param.title));

            return (
                (filters['RAM'] ? (
                    ram <= filters['RAM'].max
                    && ram >= filters['RAM'].min
                ) : true)
                && (filters['Mem'] ? (
                    mem <= filters['Mem'].max
                    && mem >= filters['Mem'].min
                ) : true)
            )
        });
    }

    static getItemById(itemId = null) {
        const cart = Cart.getItems();

        if (!itemId || !cart || !cart.length) {
            return null;
        }

        return cart.find((item) => (
            item.id === itemId
        )) || null;
    }

    static async getGoods(filter = 'all', fromHome = false) {
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
                        json: true,
                        method: 'POST'
                    }
                );
                
                if (goodsRaw.status === 'Error') {
                    return goodsRaw;
                }

                const goods = goodsRaw.data.map((good) => new Good(good));

                localStorage.setItem('goods', JSON.stringify(goods));
                
                return await API.getGoods();
            } else {
                if (fromHome) {
                    API.lazyLoadGoods();
                }
            }

            return {
                status: 'Success',
                goods: JSON.parse(localGoods)
            };
        }
    }
}