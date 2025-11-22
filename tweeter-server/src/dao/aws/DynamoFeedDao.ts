import { Status, User } from "tweeter-shared";
import { FeedDao } from "../abstract/FeedDao";

export class DynamoFeedDao implements FeedDao {
  getFeed(userAlias: string, pageSize: number, lastItem: Status): Status[] {
    return []
  }
  addFeedItem(post: Status, followers: User[]): void {
    
  }
}