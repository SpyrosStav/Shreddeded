import Food from "./modules/food/Food.js";
import User from "./modules/user/User.js";

User.hasMany(Food, {
    foreignKey: "userId",
    as: "foods",
});

Food.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});