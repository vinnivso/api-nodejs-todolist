import express from "express"
import { TaskDatabase } from "../../data/TaskDatabase"

export class EndpointGetTaskByStatus {
  async getTaskByStatus(request: express.Request, response: express.Response): Promise <void> {
    try {
      const status = request.query.status as string
      if(!status && typeof status !== "string") {
        response.status(422).json({message:`Campo válido`})
      }
      const task = await new TaskDatabase().getTaskByStatus(status)
      response.send(task)
      
    } catch (e) {
      const error = e as Error
      console.log(error)
      response.json({message: error.message})
    }
  }
}