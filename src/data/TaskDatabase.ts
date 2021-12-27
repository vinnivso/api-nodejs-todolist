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

  async getTaskByStatus(status: string): Promise <any> {
    try {
      const result = await BaseDatabase
        .connection("todolist_challenge_task as task")
        .join("todolist_challenge_user as user", "user.id", "task.creator_user_id")
        .select(
          "task.id as task_id",
          "task.title",
          "task.description",
          "task.limit_date",
          "task.status",
          "user.id as user_id",
          "user.nickname"
        )
        .where({ "task.status": status })

      const resultModified = result.map((element) => {
        return {
          taskId: element.task_id,
          title: element.title,
          description: element.description,
          limitDate: new ManageDate().date_fmt(element.limit_date),
          status: element.status,
          creatorUserId: element.user_id,
          creatorUserNickname: element.nickname
        }
      })

      const tasks = {
        tasks: resultModified
      }
      return tasks

    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getDelayedTask(): Promise <Object | boolean> {
    try {
      const result = await BaseDatabase
        .connection.raw(`
          SELECT  task.id as task_id,
          task.title,
          task.description,
          task.limit_date,
          task.status,
          user.id as user_id,
          user.nickname
          FROM todolist_challenge_task as task
          JOIN todolist_challenge_user as user
          ON user.id = task.creator_user_id
          WHERE task.limit_date < CURDATE()
          AND task.status <> "done"
        `)

        const resultModified = result[0].map((element:any) => {
          return {
            taskId: element.task_id,
            title: element.title,
            description: element.description,
            limitDate: new ManageDate().date_fmt(element.limit_date),
            status: element.status,
            creatorUserId: element.user_id,
            creatorUserNickname: element.nickname
          }
        })

        const tasks = {
          tasks: resultModified
        }
        return tasks
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async findTask(id: string, table: string = "todolist_challenge_task", column: boolean = false): Promise <InterfaceTask | boolean> {
    try {
      let result
      column === false?
        result = await BaseDatabase
          .connection
          .select("*")
          .from(`${table}`)
          .where({id: id})
        :
        result = await BaseDatabase
          .connection
          .select("*")
          .from(`${table}`)
          .where({task_id: id})

      return result [0]

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