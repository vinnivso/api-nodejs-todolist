import express from "express"
import { TaskDatabase } from "../../data/TaskDatabase"

export class EndpointGetTaskCreatedByUser {
  async getTaskCreatedByUser(request: express.Request, response:express.Response) {
    try {
      const {id} = request.query

      if(id && typeof id === "string") {
        const tasks = await new TaskDatabase().getTaskCreatedByUser(id)
        response.send(tasks)
      } else {
        response.status(404).json({message:`Usuário não encontrado`})
      }

    } catch (e) {
      const error = e as Error
      console.log(error)
      response.json({message: error.message})
    }
  }
}