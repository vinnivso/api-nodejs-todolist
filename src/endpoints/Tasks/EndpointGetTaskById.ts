import express from "express"
import { TaskDatabase } from "../../data/TaskDatabase"

export class EndpointGetTaskById {
  async getTaskById(request: express.Request, response: express.Response): Promise <void> {
    try {
      const {id} = request.params
      const task = await new TaskDatabase().getTaskById(id)
      task === false?
        response.status(404).json({message:`Task não encontrada`})
        :
        response.send(task)
        
    } catch (e) {
      const error = e as Error
      console.log(error)
      response.json({message: error.message})
    }
  }
}