const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    image: { type: String, default: '/public/images/man.png' },
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String},
    description: {type: String, minlength: 100, maxlength:200},
    age: {type:Number},
    city: {type: String},
    sport: {type:["String"]},
    role: {
      type: String,
      enum: ["User", "Admin", "Editor"],
      default: "User"
  },
    level: {enum:["Beginner", "Intermedio", "Avanzado"]},
    CreateGroup: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

const User = mongoose.model('User',userSchema);

module.exports = User;
