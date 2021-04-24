const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    image: {
      type: String,
      default:
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    description: { type: String, minlength: 100, maxlength: 1000 },
    age: { type: Number },
    city: { type: String },
    sport: {
      type: String,
      enum: ['Escalar', 'Surf', 'Paddel Tennis', 'Correr', 'Ciclismo'],
    },
    role: {
      type: String,
      enum: ['User', 'Admin'],
      default: 'User',
    },
    review: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  },
  { timestamps: true } //a que hora y fecha se crean las cosas
);

const User = mongoose.model('User', userSchema);

// const doc = await User.create({ type: Schema.Types.ObjectId, ref: 'Review'});

// doc.createdAt; // 2020-07-06T20:36:59.414Z
// doc.updatedAt; // 2020-07-06T20:36:59.414Z

// doc.createdAt instanceof Date;

module.exports = User;
