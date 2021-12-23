import express from "express"
import { UserDatabase } from "../../data/UserDatabase"

export class EndpointGetUserById {
  async getUserById(request: express.Request, response: express.Response) {
    try {
      const {id} = request.params
      let result

      if (id && typeof id === "string") {
        result = await new UserDatabase().getUserById(id)
        if (result === false) {
          response.status(404).json({message: `Usuário não encontrado. Por favor, verifique as informações preenchidas`})
        } else {
          response.send(result)
        }
      }
    } catch (e) {
      const error = e as Error
      console.log(error)
      response.json({ message: error.message })
    }
  }
}
