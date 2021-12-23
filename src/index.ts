import { app } from "./app"
import { EndpointCreateUser } from "./endpoints/Users/EndpointCreateUser"
import { EndpointDeleteUser } from "./endpoints/Users/EndpointDeleteUser"
import { EndpointGetUserById } from "./endpoints/Users/EndpointGetUserById"
import { EndpointGetUsers } from "./endpoints/Users/EndpointGetUsers"
import { EndpointUpdateUser } from "./endpoints/Users/EndpointUpdateUser"

//USER - ENDPOINTS
app.post("/users", new EndpointCreateUser().createUser)
app.put("/users/edit/:id", new EndpointUpdateUser().updateUser)
app.delete("/users/edit/:id", new EndpointDeleteUser().deleteUser)
app.get("/users", new EndpointGetUsers().getUser)
app.get("/users/:id", new EndpointGetUserById().getUserById)