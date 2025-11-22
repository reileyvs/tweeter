import { User } from "tweeter-shared";
import { UserDao } from "../abstract/UserDao";

export class DynamoUserDao implements UserDao {
  register(firstName: string, lastName: string, alias: string, password: string, userImageBytes: string, imageFileExtension: string): User | null {
    return null
  }
  login(alias: string, password: string): User | null {
    return null
  }
  getUser(userAlias: string): User | null {
    return null
  }
  getBatchOfUsers(aliases: string[]): User[] {
    return []
  }
  getFolloweeCount(alias: string): number {
    return 3
  }
  getFollowerCount(alias: string): number {
    return 3
  }
  addFollower(alias: string): number {
    return 0
  }
  addFollowee(alias: string): number {
    return 0
  }
  removeFollowee(alias: string): number {
    return 0
  }
  removeFollower(alias: string): number {
    return 0
  }
}