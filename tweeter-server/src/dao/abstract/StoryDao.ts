import { Status } from "tweeter-shared";

export interface StoryDao {
  getStories(userAlias: string, pageSize: number, lastItem: Status): Status[]
  addStory(userAlias: string): void
}