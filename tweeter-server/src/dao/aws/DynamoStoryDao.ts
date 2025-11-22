import { Status } from "tweeter-shared";
import { StoryDao } from "../abstract/StoryDao";

export class DynamoStoryDao implements StoryDao {
  getStories(userAlias: string, pageSize: number, lastItem: Status): Status[] {
    return []
  }
  addStory(userAlias: string): void {
    
  }
}