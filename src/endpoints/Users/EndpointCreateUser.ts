import express from "express"
import BaseDatabase from "../../data/BaseDatabase"
import { CheckUserDatabase } from "../../data/CheckUserDatabase"
import { UserDatabase } from "../../data/UserDatabase"
import ManageIdentity from "../../services/ManageIdentity"

export class EndpointCreateUser {
  async createUser(request: express.Request, response: express.Response): Promise <void> {
    try {
      const {name, nickname, email} = request.body
      const id = new ManageIdentity().generateId()
      const [checkUserAvailability] = await new CheckUserDatabase().checkUserAvailability(nickname, email)

      if(typeof name !== "string" || name === "") {
        response.status(422).json({messange:`Por favor, verifique se o campo de NAME é do tipo STRING e não esteja NULL`})
      } else if(typeof nickname !== "string" || nickname === "") {
        response.status(422).json({messange:`Por favor, verifique se o campo de NICKNAME é do tipo STRING e não esteja NULL`})
      } else if(typeof email !== "string" || email === "") {
        response.status(422).json({messange:`Por favor, verifique se o campo de EMAIL é do tipo STRING e não esteja NULL`})
      } else if(checkUserAvailability) {
        response.status(406).json({message:`Oops, usuário já encontra-se cadastrado na plataforma`})
      } else {
        await new UserDatabase().postCreateUser(id, name, nickname, email)
        response.status(201).json({message: `Usuário criado com sucesso`})
      }

    } catch (e) {
      const error = e as Error
      console.log(error)
      response.json({message: error.message})
    }
  }
}