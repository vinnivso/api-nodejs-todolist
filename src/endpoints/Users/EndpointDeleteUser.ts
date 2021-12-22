import express from "express"
import { UserDatabase } from "../../data/UserDatabase"

export class EndpointDeleteUser {
  async deleteUser(request: express.Request, response: express.Response): Promise <void> {
    try {
      const {id} = request.params
      const findUser = await new UserDatabase().getFindUser(id)

      if(typeof id !== "string" || id === "") {
        response.status(422).json({message:`Por favor, verifique se o campo de ID é do tipo STRING e não esteja NULL`})
      }

      if(!findUser) {
        response.status(404).json({message:`Usuário não encontrado. Por favor, verifique as informações preenchidas`})
      } else {
        await new UserDatabase().deleteUser(id)
        response.json({message:`Usuário deletado com sucesso`})
      }
      
    } catch (e) {
      const error = e as Error
      console.log(error)
      response.json({message: error.message})
    }
  }
}