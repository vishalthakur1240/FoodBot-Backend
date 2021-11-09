const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    orderID: String,
    foodType: String,
    foodSize: String,
    foodQty: Number,
    Maild: String
});

const foodModel = mongoose.model("Food", foodSchema);

module.exports = foodModel;