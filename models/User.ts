import mongoose from 'mongoose'
 
 // OUR user SCHEMA
  const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  })

  // OUR user MODEL
export default mongoose.models.User || mongoose.model("User", UserSchema)