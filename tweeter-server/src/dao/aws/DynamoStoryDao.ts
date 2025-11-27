import { FakeData, Status } from "tweeter-shared";
import { StoryDao } from "../abstract/StoryDao";

export class DynamoStoryDao implements StoryDao {
  getBatchOfStories(userAlias: string, pageSize: number, lastItem: Status | null): [Status[], boolean] {
    return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  }
  addStory(userAlias: string): void {
    
  }
}