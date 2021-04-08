const Order = require("../models/Order");
const errorHandler = require("../untils/errorHandler");

/**
 * @query offset=2
 * @query limit=5
 *
 */
module.exports.getAll = async function (req, res) {
    const query = {
        user: req.user.id, // заказы для юзера который делает запрос
    };

    if (req.query.start) { // дата старта
        query.date = {
            $gte: req.query.start, // $gte больше или меньше какого-то значения
        };
    }

    if (req.body.end) {
        if (!query.date) {
            query.date = {};
        }
        query.date["$lte"] = req.query.end; // получить все у которых дата меньше или равна конца
    }

    if (req.query.order) {
        query.order = +req.query.order;
    }

    try {
        const orders = await Order.find(query)
            .sort({ date: -1 }) // сорт по полю date по убыванию
            .skip(+req.query.offset) // пагинация - по скроллу
            .limit(+req.query.limit);

        res.status(200).json(orders);
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.create = async function (req, res) {
    try {
        // получаем самый последний ордер
        const lastOrder = await Order.findOne({
            user: req.user.id,
        }).sort({
            date: -1,
        });

        const maxOrder = lastOrder ? lastOrder.order : 0;

        const order = await new Order({
            list: req.body.list,
            user: req.user.id,
            order: maxOrder + 1,
        }).save();

        res.status(201).json(order);
    } catch (error) {
        errorHandler(res, error);
    }
};
