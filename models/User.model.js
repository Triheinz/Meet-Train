const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  image: { type: String, default: '/public/images/man.png' },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  description: { type: String, minlength: 100, maxlength: 200 },
  age: { type: Number },
  city: { type: String },
  sport: { type: ['String'] },
  role: {
    type: String,
    enum: ['User', 'Admin'],
    default: 'User',
  },
  level: { enum: ['Beginner', 'Intermedio', 'Avanzado'] },
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
});

const User = mongoose.model('User',userSchema);

module.exports = User;
