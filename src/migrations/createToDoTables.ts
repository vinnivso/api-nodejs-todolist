import BaseDatabase from "../data/BaseDatabase"

async function createToDoListUserTable():Promise<boolean> {
  try {
    await BaseDatabase.connection.raw(`
      CREATE TABLE IF NOT EXISTS todolist_challenge_user (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NULL,
        nickname VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL
      );
    `)
    console.log(`Tabela criada com sucesso`)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

async function createToDoListTaskTable():Promise<boolean> {
  try {
    await BaseDatabase.connection.raw(`
      CREATE TABLE IF NOT EXISTS todolist_challenge_task (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        status VARCHAR(255) NOT NULL DEFAULT "to_do",
        limit_date DATE NOT NULL,
        creator_user_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (creator_user_id) REFERENCES todolist_challenge_user(id)
      );
    `)
    console.log(`Tabela criada com sucesso`)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

async function createToDoListResponsibleTaskRelationTable():Promise<boolean> {
  try {
    await BaseDatabase.connection.raw(`
      CREATE TABLE IF NOT EXISTS todolist_challenge_responsibletaskrelation (
        task_id VARCHAR(255),
        responsible_user_id VARCHAR(255),
        FOREIGN KEY (task_id) REFERENCES todolist_challenge_task(id) ON DELETE CASCADE,
        FOREIGN KEY (responsible_user_id) REFERENCES todolist_challenge_user(id) ON DELETE CASCADE
      );
    `)
    console.log(`Tabela criada com sucesso`)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}


createToDoListUserTable()
  .then(createToDoListTaskTable)
  .then(createToDoListResponsibleTaskRelationTable)
  .finally(() => BaseDatabase.connection.destroy())
