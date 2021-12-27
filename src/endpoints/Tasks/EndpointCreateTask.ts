import express from "express"
import ManageIdentity from "../../services/ManageIdentity"
import ManageDate from "../../services/ManageDate"
import { InterfaceTask } from "../../entities/InterfaceTask"
import { TaskDatabase } from "../../data/TaskDatabase"


export class EndpointCreateTask {
  async createTask(request: express.Request, response: express.Response): Promise <void> {
    try {
      const {title, description, limitDate, creatorUserId} = request.body
      const [checkTaskAvailability] = await new TaskDatabase().getSearchTask(title, description, creatorUserId)
      let result

      if(!title || !description || !limitDate || !creatorUserId) {
        response.status(422).json({message:`Por favor, verifique o correto preenchimento de todos os campos`})
      } else if(typeof title !== "string" || title === "") {
        response.status(422).json({message:`Por favor, verifique se o campo de TITLE é do tipo STRING e não esteja NULL`})
      } else if(typeof description !== "string" || description === "") {
        response.status(422).json({message:`Por favor, verifique se o campo de DESCRIPTION é do tipo STRING e não esteja NULL`})
      } else if(typeof limitDate !== "string" || limitDate === "") {
        response.status(422).json({message:`Por favor, verifique se o campo de LIMITDATE é do tipo STRING e não esteja NULL`})
      } else if(typeof creatorUserId !== "string" || creatorUserId === "") {
        response.status(422).json({message:`Por favor, verifique se o campo de CREATORUSERID é do tipo STRING e não esteja NULL`})
      } else if(checkTaskAvailability) {
        response.status(406).json({message:`Oops, task já encontra-se cadastrado na plataforma`})
      } else {
        const id = new ManageIdentity().generateId()
        const date = await new ManageDate().date_fmt_back(limitDate)
        const newTask: InterfaceTask = {
          id: id,
          title: title,
          description: description,
          limit_date: date,
          creator_user_id: creatorUserId
        }
        result = await new TaskDatabase().postCreateTask(newTask)
        result === false? response.status(404).json({message:`Usuário não encontrado`}) : response.status(201).json({message:`Tarefa criada com sucesso`})
      }

    } catch (e) {
      const error = e as Error
      console.log(error)
      response.json({message: error.message})
    }
  }
}