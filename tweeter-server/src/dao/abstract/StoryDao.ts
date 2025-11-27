import { Status } from "tweeter-shared";

export interface StoryDao {
  getBatchOfStories(userAlias: string, pageSize: number, lastItem: Status | null): [Status[], boolean]
  addStory(userAlias: string): void
}