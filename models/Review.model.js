const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    receptor: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comentador: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    description: { type: String, minlength: 100, maxlength: 1000, required: true },
    rate: { type: Number, minlength: 1, maxlength: 5 },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

const doc = await User.create({ Review });

doc.createdAt; // 2020-07-06T20:36:59.414Z
doc.updatedAt; // 2020-07-06T20:36:59.414Z

doc.createdAt instanceof Date;

module.exports = Review;