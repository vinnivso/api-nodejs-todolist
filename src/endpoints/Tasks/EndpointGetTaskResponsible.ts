import express from "express"
import { TaskDatabase } from "../../data/TaskDatabase"

export class EndpointGetTaskResponsible {
  async getTaskResponsible(request: express.Request, response: express.Response): Promise <void> {
    try {
      const {id} = request.params
      if(!id || typeof id !== "string") {
        response.status(422).json({message:`Campo inválido`})
      }

      const users = await new TaskDatabase().getResponsibleTask(id)
      if(Object.values(users)[0].length === 0) {
        response.status(404).json({message:`Tarefa não encontrada`})
      }
      response.send(users)

      
    } catch (e) {
      const error = e as Error
      console.log(error)
      response.json({message: error.message})
    }
  }
}