import BaseDatabase from "./BaseDatabase"

export class CheckUserDatabase {
  async checkUserAvailability(nickname: string, email: string) {
    const result = await BaseDatabase
    .connection("todolist_challenge_user")
    .where({nickname})
    .orWhere({email})
  return result
  }
}