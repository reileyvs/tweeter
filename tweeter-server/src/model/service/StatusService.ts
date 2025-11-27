import { Status, FakeData } from "tweeter-shared";
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
    this.authenticate(authToken)
    return this.feedDao.getBatchOfFeed(userAlias, pageSize, lastItem);
  }
  async loadMoreStoryItems(
    authToken: string,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    this.authenticate(authToken)
    return this.storyDao.getBatchOfStories(userAlias, pageSize, lastItem)
  }
  async postStatus(authToken: string, newStatus: Status): Promise<void> {
    this.authenticate(authToken)
    this.storyDao.addStory(newStatus.user.alias)
    //for loop for getting all followers
    const page = await this.followDao.getPageOfFollowers(newStatus.user.alias, 10, undefined)
    this.feedDao.addFeedItem(newStatus, page.values.map(follow => follow.followerHandle))
  }

  private authenticate(token: string): boolean {
    if (this.sessionDao.isAuthenticated(token)) {
      return true;
    } else {
      throw new Error("Not authorized");
    }
  }
}
