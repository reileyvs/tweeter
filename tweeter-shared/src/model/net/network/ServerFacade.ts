
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {
  private stage = "/dev"
  private SERVER_URL = "https://bwy06znwj8.execute-api.us-east-2.amazonaws.com" + this.stage;

  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);


}