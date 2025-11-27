import { FakeData, Status, User } from "tweeter-shared";
import { FeedDao } from "../abstract/FeedDao";

export class DynamoFeedDao implements FeedDao {
  getBatchOfFeed(userAlias: string, pageSize: number, lastItem: Status | null): [Status[], boolean] {
    return FakeData.instance.getPageOfStatuses(lastItem, pageSize)
  }
  addFeedItem(post: Status, followers: string[]): void {
    
  }
}