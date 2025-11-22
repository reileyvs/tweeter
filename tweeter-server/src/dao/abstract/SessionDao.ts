import { AuthToken } from "tweeter-shared"

export interface SessionDao {
  isAuthenticated(token: string): boolean
  addSession(token: string, timestamp: number): AuthToken
  clearSession(token: string): void
}