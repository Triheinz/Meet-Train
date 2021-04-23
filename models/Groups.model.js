const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    image: { type: String, default: '/public/images/climbing.jpeg' },
    name: { type: String, required: true },
    description: {
        type: String,
        minlength: 100,
        maxlength: 1000,
        required: true,
    },
    announcement: {
        type: String,
        minlength: 100,
        maxlength: 1000,
        required: true,
    },
    city: { type: String, required: true },
    sport: { type: ['String'], required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    activitiesPics: { type: [String] },
}, { timestamps: true });

const Group = mongoose.model('Group', groupSchema);

const doc = await User.create({ Group });

doc.createdAt; // 2020-07-06T20:36:59.414Z
doc.updatedAt; // 2020-07-06T20:36:59.414Z

doc.createdAt instanceof Date;

module.exports = Group;