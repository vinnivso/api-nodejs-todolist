import { app } from "./app"
import { EndpointCreateUser } from "./endpoints/Users/EndpointCreateUser"

app.post("/users", new EndpointCreateUser().createUser)