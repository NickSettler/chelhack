import './main.scss';
import { API, Good } from './scripts/API.js';

(async() => {
    const goods = await API.getGoods();

    console.log(goods);
})();