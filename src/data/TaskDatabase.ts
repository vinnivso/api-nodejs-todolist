import { InterfaceStatus } from "../entities/InterfaceStatus";
import { InterfaceTask } from "../entities/InterfaceTask";
import ManageDate from "../services/ManageDate";
import BaseDatabase from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";


export class TaskDatabase extends BaseDatabase {
  async postCreateTask(task: InterfaceTask): Promise <boolean>{
    try {
      await BaseDatabase
        .connection("todolist_challenge_task")
        .insert({
          id: task.id,
          title: task.title,
          description: task.description,
          limit_date: task.limit_date,
          creator_user_id: task.creator_user_id
        })
      return true

    } catch (error) {
      console.log(error)
      return false
    }
  }

  async postCreateResponsibleTask(taskId: string, responsibleUserId: string[]): Promise <boolean> {
    try {
      const input = responsibleUserId.map((element) => {
        return {
          task_id: taskId,
          responsible_user_id: element
        }
      })
      await BaseDatabase
        .connection("todolist_challenge_responsibletaskrelation")
        .insert(input)
      return true

    } catch (error) {
      console.log(error)
      return false
    }
  }

  async putUpdateTaskStatus(taskId: string[], status: InterfaceStatus): Promise <boolean> {
    try {
      return BaseDatabase
        .connection
        .transaction(transaction => {
          const queries: any = []
          taskId.forEach(task => {
            const query = BaseDatabase
              .connection("todolist_challenge_task")
              .where("id", task)
              .update({
                status: status
              })
              .transacting(transaction) // This makes every update be in the same transaction
            queries.push(query)
          })
          Promise.all(queries) // Once every query is written
          .then(transaction.commit) // We try to execute all of them
          .catch(transaction.rollback); // And rollback in case any of them goes wrong
        })

    } catch (error) {
      console.log(error)
      return false
    }
  }

  async deleteResponsibleTask(taskId: string, userId: string): Promise <boolean> {
    try {
      await BaseDatabase.connection("todolist_challenge_responsibletaskrelation")
        .delete()
        .where({
          task_id: taskId,
          responsible_user_id: userId
        })
      return true

    } catch (error) {
      console.log(error)
      return false
    }
  }

  async deleteTask(taskId: string): Promise <boolean> {
    try {
      await BaseDatabase
        .connection("todolist_challenge_task")
        .delete()
        .where({id: taskId})
      return true

    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getResponsibleTask(taskId: string): Promise <Object | boolean> {
    try {
      const result = await BaseDatabase
        .connection("todolist_challenge_responsibletaskrelation as responsible")
        .join("todolist_challenge_user as user", "user.id", "responsible.responsible_user_id")
        .select("user.id", "user.nickname")
        .where({ "responsible.task_id": taskId })

        const users = {
          users: result
        }
        return users

    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getTaskById(taskId:string): Promise <Object | boolean> {
    try {
      const result = await BaseDatabase
        .connection("todolist_challenge_task")
        .where({id: taskId})

      let task = result[0]
      const user = await new UserDatabase().getUserById(task.creator_user_id)
      const responsibleUsers = await this.getResponsibleTask(taskId)

      task = {
        id: task.id,
        title: task.title,
        description: task.description,
        limitDate: new ManageDate().date_fmt(task.limit_date),
        status: task.status,
        creatorUserId: user.id,
        creatorUserNickname: user.nickname,
        responsibleUsers: Object.values(responsibleUsers)[0]
      }
      return task

    } catch (error) {
      console.log(error)
      return false
    }
  }


  async getSearchTask(title: string, description: string, creatorUserId:string): Promise <any> {
    try {
        if((title && description && creatorUserId)) {
          const result = await BaseDatabase
            .connection("todolist_challenge_task")
            .where("title", "LIKE", `${title}`)
            .andWhere("description", "LIKE", `${description}`)
            .andWhere("creator_user_id", "LIKE", `${creatorUserId}`)
          return result
        }

    } catch (error) {
      console.log(error)
      return false
    }
  }
}