import Food from "./Food.js";
import User from "./User.js";

User.hasMany(Food, {
    foreignKey: "userId",
    as: "foods",
});

Food.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});