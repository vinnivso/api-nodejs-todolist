import express from "express";
import { TaskDatabase } from "../../data/TaskDatabase";

export class EndpointDeleteTask {
  async deleteTask(request: express.Request, response: express.Response): Promise <void> {
    try {
      const {id} = request.params
      const result = await new TaskDatabase().deleteTask(id)
      result === false?
        response.status(400).json({message:`Não foi possível deletar task`})
        :
        response.json({message:`Task deletada com sucesso`})
        
    } catch (e) {
      const error = e as Error
      console.log(error)
      response.json({message: error.message})
    }
  }
}