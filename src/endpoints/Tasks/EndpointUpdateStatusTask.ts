import express from "express"
import { TaskDatabase } from "../../data/TaskDatabase"

export class EndpointUpdateStatusTask {
  async updateStatusTask(request: express.Request, response: express.Response): Promise <void> {
    try {
      const {task_ids, status} = request.body

      if(!task_ids || !status || task_ids.length === 0) {
        response.status(422).json({message:`Por favor, verifique o correto preenchimento de todos os campos`})
      }

      const isArray = Array.isArray(task_ids)
      if(isArray === false){
        const tasks = await new TaskDatabase().findMultipleTasks([task_ids])
        if(tasks === false) {
          response.status(404).json({message:`Task não encontrada`})
        }
      }
      const result = await new TaskDatabase().putUpdateTaskStatus(task_ids, status)
      result === false?
        response.status(400).json({message:`Não foi possível alterar o status, por favor, verifique a documentação`})
        :
        response.json({message:`Status atualizado com sucesso`})

    } catch (e) {
      const error = e as Error
      console.log(error)
      response.json({message: error.message})
    }
  }
}