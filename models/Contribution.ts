import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
 
 // OUR Contribution SCHEMA
  const ContributionSchema = new mongoose.Schema({
    text: String,
    userId: ObjectId,
    projectId: ObjectId,
    amount: Number,
    investment: Boolean
  })

  // OUR Contribution MODEL
export default mongoose.models.Contribution || mongoose.model("Contribution", ContributionSchema)