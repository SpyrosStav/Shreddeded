import Food from "../models/Food.js";

export const findById = async (id) => {
    return Food.findByPk(id);
};

export const findByCriteria = async (criteria = {}, options = {}) => {
    return Food.findAll({
        where: criteria,
        order: options.order || [["name", "ASC"]],
        limit: options.limit,
        offset: options.offset,
    });
};

export const exists = async (id) => !!await Food.findByPk(id, { attributes: ['id'] });

export const create = async (foodData) => {
    return Food.create(foodData);
};

export const update = async (food, foodData) => {
    return food.update(foodData);
};

export const remove = async (food) => {
    return food.destroy();
};