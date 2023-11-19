import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { UserType, ResponseFuncs } from "../../../utils/types"
import User from "../../../models/User"
import bcrypt from 'bcrypt'
import allowCors from '../../../utils/allowCors';

interface ErrorType {
  error: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })

  // Potential Responses
  const handleCase: ResponseFuncs = {

    // RESPONSE POST REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse<UserType | ErrorType>) => {
      const email = req.body.email;
      const password = req.body.password;

      await connect() // connect to database
      const user = await User.findOne({ email }).catch(catcher)



      bcrypt.compare(password, user.password, function (err, result) {
        // result == true
        if (result == true) {

          user.password = undefined;

          res.json(user)
        } else {
          res.status(400).json({error : 'Information not correct'})
        }
      });


    },
  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

export default allowCors(handler);

export const config = {
  api: {
    externalResolver: true,
  },
}