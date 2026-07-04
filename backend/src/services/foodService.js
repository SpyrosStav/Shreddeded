import * as foodRepository from "../repositories/foodRepository.js";

const toFoodPayload = (data) => ({
    name: data.name,
    calories: data.calories,
    protein: data.protein,
    carbs: data.carbs,
    fat: data.fat,
    fiber: data.fiber,
    userId: data.userId,
});

export const findById = async (id) => {
    return foodRepository.findById(id);
}

export const findByCriteria = async (criteria = {}, options = {}) => {
    foodRepository.findByCriteria(criteria, options);
};

export const create = async (data) => {
    const payload = toFoodPayload(data);

    return foodRepository.create(payload);
};

export const update = async (id, data) => {
    const food = await foodRepository.findById(id);

    if (!food) {
        return null;
    }

    const payload = toFoodPayload(data);

    return foodRepository.update(food, payload);
};

export const remove = async (id) => {
    const food = await foodRepository.findById(id);

    if (!food) {
        return false;
    }

    await foodRepository.remove(food);

    return true;
};
