const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    admin: { type: Schema.Types.ObjectId, ref: "User" },
    image: { type: String },
    email: { type: String },
    name: { type: String, required: true },
    description: {
        type: String,
        maxlength: 1000,
    },
    announcement: {
        type: String,
        maxlength: 1000,
    },
    city: { type: String },
    sport: [{ type: String }],
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    activitiesPics: [{ type: String }],
}, { timestamps: true });

const Groups = mongoose.model('Groups', groupSchema);

//const doc = await User.create({ Groups });

//doc.createdAt; // 2020-07-06T20:36:59.414Z
//doc.updatedAt; // 2020-07-06T20:36:59.414Z

//doc.createdAt instanceof Date;

module.exports = Groups;