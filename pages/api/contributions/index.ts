import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ContributionType, ProjectType, ResponseFuncs } from "../../../utils/types"
import Contribution from "../../../models/Contribution"
import Project from "../../../models/Project"
import allowCors from '../../../utils/allowCors';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })

  // Potential Responses
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse<ContributionType[] | void>) => {
      await connect() // connect to database
      res.json(await Contribution.find({}).catch(catcher))
    },
    // RESPONSE Contribution REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse<{newContribution: ContributionType, updatedProject: ProjectType}>) => {
      await connect() // connect to database
      const projectId = req.body.projectId;
      const newContribution = await Contribution.create(req.body).catch(catcher);
      const oldProject:ProjectType = await Project.findById(projectId).catch(catcher)
      
      oldProject.progress += req.body.amount;

      const updatedProject:ProjectType = await Project.findByIdAndUpdate(projectId, oldProject, { new: true }).catch(catcher)
       res.json({updatedProject, newContribution})
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