const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    category: {
        ref: 'categories',
        type: mongoose.SchemaTypes.ObjectId,
    },
    user: {
        ref: 'users',
        type: mongoose.SchemaTypes.ObjectId,
    }

});

module.exports = mongoose.model("positions", positionSchema);
