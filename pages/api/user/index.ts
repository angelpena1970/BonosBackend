import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { UserType, ResponseFuncs } from "../../../utils/types"
import  User from "../../../models/User"
import bcrypt from 'bcrypt'
const saltRounds = 10;
import allowCors from '../../../utils/allowCors';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })

  // Potential Responses
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse<UserType[] | void>) => {
      await connect() // connect to database
      res.json(await User.find({}).select('_id email').catch(catcher))
    },
    // RESPONSE POST REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse<UserType>) => {
      const email = req.body.email;
      const password = req.body.password;

      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            // Store hash in your password DB.

            await connect() // connect to database
            const createdUser = await User.create({email, password: hash}).catch(catcher)
            console.log(createdUser)
            createdUser.password = undefined;

            console.log(createdUser)
            res.json(createdUser)
        });
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