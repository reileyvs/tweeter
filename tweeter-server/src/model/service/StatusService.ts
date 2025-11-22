import { AuthToken, Status, FakeData } from "tweeter-shared";
import { SessionDao } from "../../dao/abstract/SessionDao";
import { FeedDao } from "../../dao/abstract/FeedDao";
import { StoryDao } from "../../dao/abstract/StoryDao";
import { SessionDaoFactory } from "../../dao/factory/SessionDaoFactory";
import { FeedDaoFactory } from "../../dao/factory/FeedDaoFactory";
import { StoryDaoFactory } from "../../dao/factory/StoryDaoFactory";
import { FollowDaoFactory } from "../../dao/factory/FollowDaoFactory";
import { FollowDao } from "../../dao/abstract/FollowDao";

export class StatusService {
  sessionDao: SessionDao;
  feedDao: FeedDao;
  storyDao: StoryDao;
  followDao: FollowDao;

  constructor() {
    this.sessionDao = SessionDaoFactory.getSessionDao();
    this.feedDao = FeedDaoFactory.getFeedDao();
    this.storyDao = StoryDaoFactory.getStoryDao();
    this.followDao = FollowDaoFactory.getFollowDao();
  }

  async loadMoreFeedItems(
    authToken: string,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    //authenticate
    //getFeed()
    return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  }
  async loadMoreStoryItems(
    authToken: string,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    //authenticate
    //getStories()
    return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  }
  async postStatus(authToken: string, newStatus: Status): Promise<void> {
    //authenticate
    //StoryDao.addStory(newStatus.user.alias)
    //FollowDao.getFollowers(newStatus.user.alias)
    //FeedDao.addFeedItem(newStatus, followers[])
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server to post the status
  }

  private authenticate(token: string): boolean {
    if (this.sessionDao.isAuthenticated(token)) {
      return true;
    } else {
      throw new Error("Not authorized");
    }
  }
}
