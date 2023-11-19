import mongoose from 'mongoose'
const Schema = mongoose.Schema
 
 // OUR Project SCHEMA
  const ProjectSchema = new mongoose.Schema({
    name: String,
    category: Number,
    shortDesc: String,
    longDesc: String,
    picture: String,
    goal: Number,
    progress: Number
  })

  // OUR project MODEL
export default mongoose.models.Project || mongoose.model("Project", ProjectSchema)