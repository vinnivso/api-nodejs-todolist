import { InterfaceStatus } from "../entities/InterfaceStatus";
import { InterfaceTask } from "../entities/InterfaceTask";
import BaseDatabase from "./BaseDatabase";

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
      const input = responsibleUserId.map(element => {
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
}