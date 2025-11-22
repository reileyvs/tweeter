import { User } from "tweeter-shared";

export interface FollowDao {
  getBatchOfFollowees(userAlias: string, batchSize: number, lastUser: User | null): [string[], boolean]
  getBatchOfFollowers(userAlias: string, batchSize: number, lastUser: User | null): [string[], boolean]
  getAllFollowees(userAlias: string): string[]
  getAllFollowers(userAlias: string): string[]
  follow(userAlias: string): void
  unfollow(userAlias: string): void
}