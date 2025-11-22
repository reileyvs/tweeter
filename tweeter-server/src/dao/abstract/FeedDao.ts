import { Status, User } from "tweeter-shared";

export interface FeedDao {
  getFeed(userAlias: string, pageSize: number, lastItem: Status): Status[]
  addFeedItem(post: Status, followers: User[]): void
}