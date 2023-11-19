
import mongoose from 'mongoose'
import { ObjectId } from 'mongoose'


// Interface to defining our object of response functions
export interface ResponseFuncs {
  GET?: Function
  POST?: Function
  PUT?: Function
  DELETE?: Function
}

// Interface to define our project model on the frontend
export interface ProjectType {
  _id?: ObjectId
  name: string
  category: number
  shortDesc: string
  longDesc: string
  picture: string
  goal: number
  progress: number
}
// Interface to define our contribution model on the frontend
export interface ContributionType {
  _id?: ObjectId
  userId: ObjectId
  projectId: ObjectId
  amount: number
  investment: boolean
}
// Interface to define our user model on the frontend
export interface UserType {
  _id?: ObjectId
  email: string
  password: string
}
