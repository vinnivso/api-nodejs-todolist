import express from "express"
import { TaskDatabase } from "../../data/TaskDatabase"

export class EndpointAddTaskResponsible {
  async addTaskResponsible(request: express.Request, response: express.Response): Promise <void> {
    try {
      const {task_id, responsible_user_id} = request.body
      let result

      if(!task_id || !responsible_user_id || responsible_user_id.length === 0) {
        response.status(422).json({message:`Por favor, verifique o correto preenchimento de todos os campos`})
      }

      const isArray = Array.isArray(responsible_user_id)
      isArray === false?
        result = await new TaskDatabase().postCreateResponsibleTask(task_id, [responsible_user_id])
        :
        result = await new TaskDatabase().postCreateResponsibleTask(task_id, responsible_user_id)
      result === false?
        response.status(404).json({message:`Usuário não encontrado`})
        :
        response.status(201).json({message:`Responsável pela tarefa adicionado com sucesso`})

    } catch (e) {
      const error = e as Error;
      console.log(error)
      response.json({message: error.message})
    }
  }
}