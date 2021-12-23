import express from "express"
import { UserDatabase } from "../../data/UserDatabase"

export class EndpointGetUsers {
  async getUser(request:express.Request, response:express.Response): Promise <void> {
    try {
      const {nickname, email} = request.query
      let result
      
      if((nickname || email) && (typeof nickname === "string" || typeof email === "string")) {
        result = await new UserDatabase().getSearchUser(nickname as string, email as string)
        if(result.length === 0) {
          response.status(404).json({message:`Usuário não encontrado. Por favor, verifique as informações preenchidas`})
        }
        if(result === false) {
          response.status(404).json({message:`Usuário não encontrado. Por favor, verifique as informações preenchidas`})
        } else {
          response.send(result)
        }
      } else {
        result = await new UserDatabase().getAllUsers()
        response.send(result)
      }

    } catch (e) {
      const error = e as Error
      console.log(error)
      response.json({message: error.message})
    }
  }
}