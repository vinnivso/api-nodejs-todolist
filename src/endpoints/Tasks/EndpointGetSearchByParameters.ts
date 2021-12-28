import express from "express"
import { TaskDatabase } from "../../data/TaskDatabase";

export class EndpointGetSearchByParameters {
  async getSearchByParameters(request:express.Request, response: express.Response): Promise <void> {
try {
  const search = request.query.search as string;

  if (!search || typeof search !== "string") {
    response.status(422).json({message:`Campo inválido`})
  }

  const tasks = await new TaskDatabase().getSearchTaskParameter(search)
  response.status(200).send(tasks);

} catch (e) {
  const error = e as Error
  console.log(error)
  response.json({message: error.message})
}
  }
}