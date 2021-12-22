import { InterfaceUser } from "../entities/InterfaceUser"
import BaseDatabase from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
  async postCreateUser(id: string, name: string, nickname:string, email: string): Promise <boolean> {
    try {
      await BaseDatabase
        .connection("todolist_challenge_user")
        .insert({
          id: id,
          name: name,
          nickname: nickname,
          email: email
        })
      return true

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

  async getUserById(id: string): Promise <Object | boolean> {
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

  async getSearchUser(nickname: string, email?:string): Promise <any> {
    try {
        if((nickname && email) || (nickname || email)) {
          const result = await BaseDatabase
            .connection("todolist_challenge_user")
            .orWhere("nickname", "LIKE", `%${nickname}%`)
            .orWhere("email", "LIKE", `%${email}%`)
          return result
        }

    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getFindUser(id: string, table: string = "todolist_challenge_user", column: boolean = false): Promise <InterfaceUser | boolean> {
    try {
      let result
      if(column === false) {
        result = await BaseDatabase
          .connection
          .select("*")
          .from(`${table}`)
          .where({id: id})
      } else {
        result = await BaseDatabase
          .connection
          .select("*")
          .from(`${table}`)
          .where({responsible_user_id: id})
      }
      return result[0]

    } catch (error) {
      console.log(error)
      return false
    }
  }
}