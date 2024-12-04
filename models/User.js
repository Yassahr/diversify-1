const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true
  },
  googleId: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
  playlist: { type: String },
  isGoogleAuth: {
    type: Boolean,
    default: false
  }
})

// Password hash middleware.

UserSchema.pre('save', async function save(next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }

  try {
    const salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(user.password, salt)
    next()
  } catch (error) {
    return next(error)
  }
})

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)
//user schema should include
//Playlist object containing Playlist an array of name, array of objects that are the media types
// depending on what I want to display on the dash, more info can be available in the array of ob for media

//   }
// }
