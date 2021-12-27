import { app } from "./app"
import { EndpointAddTaskResponsible } from "./endpoints/Tasks/EndpointAddTaskResponsible"
import { EndpointCreateTask } from "./endpoints/Tasks/EndpointCreateTask"
import { EndpointDeleteResponsibleTask } from "./endpoints/Tasks/EndpointDeleteResponsibleTask"
import { EndpointDeleteTask } from "./endpoints/Tasks/EndpointDeleteTask"
import { EndpointGetTaskById } from "./endpoints/Tasks/EndpointGetTaskById"
import { EndpointUpdateStatusTask } from "./endpoints/Tasks/EndpointUpdateStatusTask"
import { EndpointCreateUser } from "./endpoints/Users/EndpointCreateUser"
import { EndpointDeleteUser } from "./endpoints/Users/EndpointDeleteUser"
import { EndpointGetUserById } from "./endpoints/Users/EndpointGetUserById"
import { EndpointGetUsers } from "./endpoints/Users/EndpointGetUsers"
import { EndpointUpdateUser } from "./endpoints/Users/EndpointUpdateUser"

//USER - ENDPOINTS
//gets
app.get("/user", new EndpointGetUsers().getUser)
app.get("/user/:id", new EndpointGetUserById().getUserById)

//posts and puts
app.post("/user", new EndpointCreateUser().createUser)
app.put("/user/edit/:id", new EndpointUpdateUser().updateUser)

//deletes
app.delete("/user/edit/:id", new EndpointDeleteUser().deleteUser)

//-------------------------------------------------------------------------------

//TASK - ENDPOINTS
//gets
app.get("/task/:id", new EndpointGetTaskById().getTaskById)


//posts and puts
app.post("/task", new EndpointCreateTask().createTask)
app.post("/task/responsible", new EndpointAddTaskResponsible().addTaskResponsible)
app.put("/task/status/edit", new EndpointUpdateStatusTask().updateStatusTask)

//deletes
app.delete("/task/:taskId/responsible/:responsibleUserId", new EndpointDeleteResponsibleTask().deleteResponsibleTask)
app.delete("/task/:id", new EndpointDeleteTask().deleteTask)