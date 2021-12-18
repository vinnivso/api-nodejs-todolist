import * as uuid from "uuid"

export default class ManageIdentity {
  generateId():string {return uuid.v4()}
}