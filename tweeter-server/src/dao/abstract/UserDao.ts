import { User } from "tweeter-shared";

export interface UserDao {
  register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: string,
    imageFileExtension: string
  ): User | null;
  login(alias: string, password: string): User | null;
  getUser(userAlias: string): User | null;
  getBatchOfUsers(aliases: string[]): User[] | null;
  getFolloweeCount(alias: string): number;
  getFollowerCount(alias: string): number;
  addFollower(alias: string): number;
  addFollowee(alias: string): number;
  removeFollower(alias: string): number;
  removeFollowee(alias: string): number;
}
