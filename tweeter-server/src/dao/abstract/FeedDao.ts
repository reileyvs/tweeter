import { Status, User } from "tweeter-shared";

export interface FeedDao {
  getBatchOfFeed(userAlias: string, pageSize: number, lastItem: Status | null): [Status[], boolean]
  addFeedItem(post: Status, followers: string[]): void
}