import { InterfaceUser } from "../entities/InterfaceUser"
import BaseDatabase from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
  async postCreateUser(id: string, name: string, nickname: string, email: string): Promise <any> {
    try {
      await BaseDatabase
        .connection("todolist_challenge_user")
        .insert({
          id: id,
          name: name,
          nickname: nickname,
          email: email
        })
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async putUpdateUser(user: InterfaceUser): Promise <boolean> {
    try {
      await BaseDatabase
        .connection("todolist_challenge_user")
        .update({
          name: user.name,
          nickname: user.nickname,
          email: user.email
        })
        .where({id: user.id})
      return true

    } catch (error) {
      console.log(error)
      return false
    }
  }

  async deleteUser(userId: string): Promise <boolean> {
    try {
      await BaseDatabase
        .connection("todolist_challenge_user")
        .delete()
        .where({id: userId})
      return true
      
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getAllUsers(): Promise <Object | boolean> {
    try {
      const result = await BaseDatabase
        .connection("todolist_challenge_user")
      const resultMap = result.map(element => {
        return {
          id: element.id,
          nickname:element.nickname
        }
      })

      const users = {
        users: resultMap
      }
      return users

    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getUser(id: string): Promise <Object | boolean> {
    try {
      const result = await BaseDatabase
        .connection("todolist_challenge_user")
        .where({id})
      return result

    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getSearchUser(search: string): Promise <Object | boolean> {
    try {
      const result = await BaseDatabase
        .connection("todolist_challenge_user")
        .where("name", "LIKE", `%${search}%`)
        .orWhere("nickname", "LIKE", `%${search}%`)
        .orWhere("email", "LIKE", `%${search}%`)
      const resultMap = result.map(element => {
        return {
          id: element.id,
          nickname: element.nickname
        }
      })

      const users = {
        users: resultMap
      }
      return users

    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getResponsibleUser(id: string, column: boolean = false): Promise <InterfaceUser | boolean> {
    try {
      let result
      if(column === false) {
        result = await BaseDatabase
          .connection("todolist_challenge_user")
          .where({id: id})
      } else {
        result = await BaseDatabase
          .connection("todolist_challenge_user")
          .where({responsible_user_id: id})
      }
      return result[0]

    } catch (error) {
      console.log(error)
      return false
    }
  }
}