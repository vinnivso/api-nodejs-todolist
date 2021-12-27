import express from "express"
import { TaskDatabase } from "../../data/TaskDatabase"
import { UserDatabase } from "../../data/UserDatabase"

export class EndpointDeleteResponsibleTask {
  async deleteResponsibleTask(request: express.Request, response: express.Response): Promise <void> {
    try {
      const { taskId, responsibleUserId } = request.params
      const taskFound = await new TaskDatabase().findTask(taskId, "todolist_challenge_responsibletaskrelation", true)
      if(taskFound === false) {
        response.status(404).json({message:`Tarefa não encontrada`})
      }

      const userFound = await new UserDatabase().getFindUser(responsibleUserId, "todolist_challenge_responsibletaskrelation", true)
      if(userFound === false) {
        response.status(404).json({message:`Usuário não encontrado`})
      }

      const result = await new TaskDatabase().deleteResponsibleTask(taskId, responsibleUserId)
      result === false?
        response.status(400).json({message:`Não foi possível alterar o status dessa tarefa`})
        :
        response.json({message:`Responsável pela task foi removido com sucesso`})

    } catch (e) {
      const error = e as Error
      console.log(error)
      response.json({message: error.message})
    }
  }
}