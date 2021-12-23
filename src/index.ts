import { app } from "./app"
import { EndpointCreateUser } from "./endpoints/Users/EndpointCreateUser"
import { EndpointDeleteUser } from "./endpoints/Users/EndpointDeleteUser"
import { EndpointGetUserById } from "./endpoints/Users/EndpointGetUserById"
import { EndpointGetUsers } from "./endpoints/Users/EndpointGetUsers"
import { EndpointUpdateUser } from "./endpoints/Users/EndpointUpdateUser"

//USER - ENDPOINTS
app.post("/user", new EndpointCreateUser().createUser)
app.put("/user/edit/:id", new EndpointUpdateUser().updateUser)
app.delete("/user/edit/:id", new EndpointDeleteUser().deleteUser)
app.get("/user", new EndpointGetUsers().getUser)
app.get("/user/:id", new EndpointGetUserById().getUserById)