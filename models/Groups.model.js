const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    image: { type: String, default: '/public/images/man.png' },
    name: { type: String, required: true },
    description: { type: String, minlength: 100, maxlength: 200 },
    city: { type: String },
    sport: { type: ['String'] },
    role: {
        type: String,
        enum: ['User', 'Admin', 'Editor'],
        default: 'User',
    },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const User = mongoose.model('User', UserSchema);

module.exports = Group;