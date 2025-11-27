import { FakeData, User } from "tweeter-shared";
import { UserDao } from "../abstract/UserDao";

export class DynamoUserDao implements UserDao {
  register(firstName: string, lastName: string, alias: string, password: string, userImageBytes: string, imageFileExtension: string): User | null {
    return FakeData.instance.firstUser
  }
  login(alias: string, password: string): User | null {
    return FakeData.instance.firstUser
  }
  getUser(userAlias: string): User | null {
    return FakeData.instance.findUserByAlias(userAlias);
  }
  getBatchOfUsers(aliases: string[]): (User | undefined)[] {
    const users = aliases.map(alias => FakeData.instance.fakeUsers.find(user => user.alias == alias));
    return users
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