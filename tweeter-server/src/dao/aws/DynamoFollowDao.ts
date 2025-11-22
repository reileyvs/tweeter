import { FakeData, User } from "tweeter-shared";
import { FollowDao } from "../abstract/FollowDao";

export class DynamoFollowDao implements FollowDao {
  getBatchOfFollowees(userAlias: string, batchSize: number, lastUser: User | null): [string[], boolean] {
    const [items, hasMore] = FakeData.instance.getPageOfUsers(
      lastUser,
      batchSize,
      userAlias
    );
    const aliases = items.map(item => item.alias)
    return [aliases, hasMore]
  }
  getBatchOfFollowers(userAlias: string, batchSize: number, lastUser: User | null): [string[], boolean] {
    const [items, hasMore] = FakeData.instance.getPageOfUsers(
      lastUser,
      batchSize,
      userAlias
    );
    const aliases = items.map(item => item.alias)
    return [aliases, hasMore]
  }
  getAllFollowees(userAlias: string): string[] {
    const [items, hasMore] = FakeData.instance.getPageOfUsers(
      null,
      100,
      userAlias
    );
    const aliases = items.map(item => item.alias)
    return aliases
  }
  getAllFollowers(userAlias: string): string[] {
    const [items, hasMore] = FakeData.instance.getPageOfUsers(
      null,
      100,
      userAlias
    );
    const aliases = items.map(item => item.alias)
    return aliases
  }
  follow(userAlias: string): void {
  }
  unfollow(userAlias: string): void {
  }
}