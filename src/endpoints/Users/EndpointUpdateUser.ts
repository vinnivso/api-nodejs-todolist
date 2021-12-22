import express from "express"
import { UserDatabase } from "../../data/UserDatabase"
import { InterfaceUser } from "../../entities/InterfaceUser"

export class EndpointUpdateUser {
  async updateUser(request: express.Request, response: express.Response): Promise <void> {
    try {
      const {id} = request.params
      const {name, nickname, email} = request.body
      const findUser = await new UserDatabase().getFindUser(id)

      if(typeof id !== "string" || id === "") {
        response.status(422).json({message:`Por favor, verifique se o campo de ID é do tipo STRING e não esteja NULL`})
      }

      if(!findUser) {
        response.status(404).json({message:`Usuário não encontrado. Por favor, verifique as informações preenchidas`})
      } else if((name && nickname && email) && (typeof name === "string" && typeof nickname === "string" && typeof email === "string")) {
        const newUser: InterfaceUser = {
          id,
          name,
          nickname,
          email
        }
        const user = await new UserDatabase().putUpdateUser(newUser)
        if(user === false) {
          response.status(404).json({message:`Não foi possível realizar a edição do Usuário`})
        }
        response.json({message:`Usuário atualizado com sucesso`})
      } else if((name && nickname) && (typeof name === "string" && typeof nickname === "string")) {
        const newUser: InterfaceUser = {
          id,
          name,
          nickname
        }
        const user = await new UserDatabase().putUpdateUser(newUser)
        if(user === false) {
          response.status(404).json({message:`Não foi possível realizar a edição do Usuário`})
        }
        response.json({message:`Usuário atualizado com sucesso`})
      } else if((name && email) && (typeof name === "string" && typeof email === "string")) {
        const newUser: InterfaceUser = {
          id,
          name,
          email
        }
        const user = await new UserDatabase().putUpdateUser(newUser)
        if(user === false) {
          response.status(404).json({message:`Não foi possível realizar a edição do Usuário`})
        }
        response.json({message:`Usuário atualizado com sucesso`})
      } else if((nickname && email) && (typeof nickname === "string" && typeof email === "string")) {
        const newUser: InterfaceUser = {
          id,
          nickname,
          email
        }
        const user = await new UserDatabase().putUpdateUser(newUser)
        if(user === false) {
          response.status(404).json({message:`Não foi possível realizar a edição do Usuário`})
        }
        response.json({message:`Usuário atualizado com sucesso`})
      } else if(name && typeof name === "string") {
        const newUser: InterfaceUser = {
          id,
          name,
        }
        const user = await new UserDatabase().putUpdateUser(newUser)
        if(user === false) {
          response.status(404).json({message:`Não foi possível realizar a edição do Usuário`})
        }
        response.json({message:`Usuário atualizado com sucesso`})
      } else if(nickname && typeof nickname === "string") {
        const newUser: InterfaceUser = {
          id,
          nickname
        }
        const user = await new UserDatabase().putUpdateUser(newUser)
        if(user === false) {
          response.status(404).json({message:`Não foi possível realizar a edição do Usuário`})
        }
        response.json({message:`Usuário atualizado com sucesso`})
      } else if(email && typeof email === "string") {
        const newUser: InterfaceUser = {
          id,
          email
        }
        const user = await new UserDatabase().putUpdateUser(newUser)
        if(user === false) {
          response.status(404).json({message:`Não foi possível realizar a edição do Usuário`})
        }
        response.json({message:`Usuário atualizado com sucesso`})
      } else {
        response.status(422).json({message:`Por favor, verifique se as informações inseridas são do tipo STRING`})
      }

    } catch (e) {
      const error = e as Error
      console.log(error)
      response.json({message: error.message})
    }
  }
}