const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  image: { type: String, default: '/public/images/climbing.jpeg' },
  name: { type: String, required: true },
  description: { type: String, minlength: 100, maxlength: 200, required: true },
  announcement: {
    type: String,
    minlength: 100,
    maxlength: 200,
    required: true,
  },
  city: { type: String, required: true },
  sport: { type: ['String'], required: true },
  role: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
