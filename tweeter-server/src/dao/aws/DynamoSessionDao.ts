import { AuthToken } from "tweeter-shared";
import { SessionDao } from "../abstract/SessionDao";

export class DynamoSessionDao implements SessionDao {
  isAuthenticated(token: string): boolean {
    return true
  }
  addSession(token: string, timestamp: number): AuthToken {
    return new AuthToken("", 0)
  }
  clearSession(token: string): void {
    
  }
}