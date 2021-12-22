import { app } from "./app"
import { EndpointCreateUser } from "./endpoints/Users/EndpointCreateUser"
import { EndpointDeleteUser } from "./endpoints/Users/EndpointDeleteUser"
import { EndpointUpdateUser } from "./endpoints/Users/EndpointUpdateUser"

//USER - ENDPOINTS
app.post("/users", new EndpointCreateUser().createUser)
app.put("/users/edit/:id", new EndpointUpdateUser().updateUser)
app.delete("/users/edit/:id", new EndpointDeleteUser().deleteUser)
