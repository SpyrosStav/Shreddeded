import Food from "../models/Food.js";
import * as foodService from "../services/foodService.js";

export const findById = async (req, res, next) => {
    try {
        const food = await foodService.findById(req.params.id);

        if (!food) {
            return res.status(404).json({ message: "Food not found" });
        }

        res.json(food);
    } catch (err) {
        next(err);
    }
};

export const findByCriteria = async (req, res, next) => {
    try {
        const criteria = removeEmptyValues({
            userId: req.query.userId,
            name: req.query.name,
        });

        const options = removeEmptyValues({
            limit: req.query.limit ? Number(req.query.limit) : undefined,
            offset: req.query.offset ? Number(req.query.offset) : undefined,
        });

        if (req.query.sortBy) {
            options.order = [[req.query.sortBy, req.query.sortDirection || "ASC"]];
        }

        const foods = await foodService.findByCriteria(criteria, options);

        res.json(foods);
    } catch (err) {
        next(err);
    }
};

export const add = async (req, res, next) => {
    try {
        const food = await foodService.create(req.body);

        res.status(201).json(food);
    } catch (err) {
        next(err);
    }
};

export const update = async (req, res, next) => {
    try {
        const food = await foodService.update(req.params.id, req.body);

        if (!food) {
            return res.status(404).json({ message: "Food not found" });
        }

        res.json(food);
    } catch (err) {
        next(err);
    }
};

export const remove = async (req, res, next) => {
    try {
        const deleted = await foodService.remove(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Food not found" });
        }

        res.status(204).send();
    } catch (err) {
        next(err);
    }
};


const removeEmptyValues = (object) => {
    Object.keys(object).forEach((key) => {
        if (object[key] === undefined || object[key] === "") {
            delete object[key];
        }
    });

    return object;
};