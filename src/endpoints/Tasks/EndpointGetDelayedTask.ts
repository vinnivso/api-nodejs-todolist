import express from "express"
import { TaskDatabase } from "../../data/TaskDatabase"

export class EndpointGetDelayedTask {
  async getDelayedTask(request: express.Request, response: express.Response): Promise <void> {
    try {
      const tasks = await new TaskDatabase().getDelayedTask()
      response.send(tasks)
    } catch (e) {
      const error = e as Error
      console.log(error)
      response.json({message: error.message})
    }
  }
}