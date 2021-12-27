import express from "express"
import { UserDatabase } from "../../data/UserDatabase"
import { InterfaceUser } from "../../entities/InterfaceUser"
import ManageIdentity from "../../services/ManageIdentity"

export class EndpointCreateUser {
  async createUser(request: express.Request, response: express.Response): Promise <void> {
    try {
      const {name, nickname, email} = request.body
      const [checkUserAvailability] = await new UserDatabase().getSearchUser(nickname, email)
      let result

      if(typeof name !== "string" || name === "") {
        response.status(422).json({message:`Por favor, verifique se o campo de NAME é do tipo STRING e não esteja NULL`})
      } else if(typeof nickname !== "string" || nickname === "") {
        response.status(422).json({message:`Por favor, verifique se o campo de NICKNAME é do tipo STRING e não esteja NULL`})
      } else if(typeof email !== "string" || email === "") {
        response.status(422).json({message:`Por favor, verifique se o campo de EMAIL é do tipo STRING e não esteja NULL`})
      } else if(checkUserAvailability) {
        response.status(406).json({message:`Oops, usuário já encontra-se cadastrado na plataforma`})
      } else {
        const id = new ManageIdentity().generateId()
        const newUser: InterfaceUser = {
          id: id,
          name: name,
          nickname: nickname,
          email: email
        }
        result = await new UserDatabase().postCreateUser(newUser)
        result === false? response.status(404).json({message:`Hm, algo deu errado, por favor, verifique a documentação`}) : response.status(201).json({message:`Usuário criado com sucesso`})
      }

    } catch (e) {
      const error = e as Error
      console.log(error)
      response.json({message: error.message})
    }
  }
}