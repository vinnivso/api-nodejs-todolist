import { app } from "./app"
import { EndpointAddTaskResponsible } from "./endpoints/Tasks/EndpointAddTaskResponsible"
import { EndpointCreateTask } from "./endpoints/Tasks/EndpointCreateTask"
import { EndpointDeleteResponsibleTask } from "./endpoints/Tasks/EndpointDeleteResponsibleTask"
import { EndpointDeleteTask } from "./endpoints/Tasks/EndpointDeleteTask"
import { EndpointGetDelayedTask } from "./endpoints/Tasks/EndpointGetDelayedTask"
import { EndpointGetTaskById } from "./endpoints/Tasks/EndpointGetTaskById"
import { EndpointGetTaskByStatus } from "./endpoints/Tasks/EndpointGetTaskByStatus"
import { EndpointGetTaskCreatedByUser } from "./endpoints/Tasks/EndpointGetTaskCreatedByUser"
import { EndpointGetTaskResponsible } from "./endpoints/Tasks/EndpointGetTaskResponsible"
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
app.get("/task", new EndpointGetTaskCreatedByUser().getTaskCreatedByUser);
app.get("/task/:id", new EndpointGetTaskById().getTaskById)
app.get("/task/:id/responsible", new EndpointGetTaskResponsible().getTaskResponsible)
app.get("/task/status", new EndpointGetTaskByStatus().getTaskByStatus)
app.get("/task/delayed", new EndpointGetDelayedTask().getDelayedTask)



//posts and puts
app.post("/task", new EndpointCreateTask().createTask)
app.post("/task/responsible", new EndpointAddTaskResponsible().addTaskResponsible)
app.put("/task/status/edit", new EndpointUpdateStatusTask().updateStatusTask)

//deletes
app.delete("/task/:taskId/responsible/:responsibleUserId", new EndpointDeleteResponsibleTask().deleteResponsibleTask)
app.delete("/task/:id", new EndpointDeleteTask().deleteTask)