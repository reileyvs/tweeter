import { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS } from "react";
import { AuthToken, FakeData, User, type UserDto } from "tweeter-shared";
import { UserDao } from "../../dao/abstract/UserDao";
import { SessionDao } from "../../dao/abstract/SessionDao";
import { FollowDao } from "../../dao/abstract/FollowDao";
import { UserDaoFactory } from "../../dao/factory/UserDaoFactory";
import { SessionDaoFactory } from "../../dao/factory/SessionDaoFactory";
import { FollowDaoFactory } from "../../dao/factory/FollowDaoFactory";

export class FollowService {
  userDao: UserDao;
  sessionDao: SessionDao;
  followDao: FollowDao;
  constructor() {
    //call factory functions
    this.userDao = UserDaoFactory.getUserDao();
    this.sessionDao = SessionDaoFactory.getSessionDao();
    this.followDao = FollowDaoFactory.getFollowDao();
  }

  async loadMoreFollowees(
    token: string,
    userAlias: string,
    pageSize: number,
    lastUser: UserDto | null
  ): Promise<[UserDto[], boolean]> {
    this.authenticate(token)
    const [items, hasMore] = this.followDao.getBatchOfFollowees(userAlias, pageSize, User.fromDto(lastUser))
    const users = this.userDao.getBatchOfUsers(items)
    const dtos = users ? users.map((user: User) => user.dto) : [];
    return [dtos, hasMore];
  }
  async loadMoreFollowers(
    token: string,
    userAlias: string,
    pageSize: number,
    lastUser: UserDto | null
  ): Promise<[UserDto[], boolean]> {
    this.authenticate(token)
    const [items, hasMore] = this.followDao.getBatchOfFollowers(userAlias, pageSize, User.fromDto(lastUser))
    const users = this.userDao.getBatchOfUsers(items)
    const dtos = users ? users.map((user: User) => user.dto) : [];
    return [dtos, hasMore];
  }
  async getFollowerCount(token: string, userAlias: string): Promise<number> {
    this.authenticate(token)
    return this.followDao.getAllFollowers(userAlias).length
  }
  async getFolloweeCount(token: string, userAlias: string): Promise<number> {
    this.authenticate(token)
    return this.followDao.getAllFollowees(userAlias).length
  }
  async getIsFollowerStatus(
    token: string,
    userAlias: string,
    selectedUserAlias: string
  ): Promise<boolean> {
    this.authenticate(token)
    const followers = this.followDao.getAllFollowers(userAlias)
    const follower = followers.find(alias => alias === selectedUserAlias)
    return !!follower
  }
  async follow(
    token: string,
    userToFollow: string
  ): Promise<[followerCount: number, followeeCount: number]> {
    
    this.authenticate(token)
    this.followDao.follow(userToFollow)

    const followerCount = await this.getFollowerCount(token, userToFollow);
    const followeeCount = await this.getFolloweeCount(token, userToFollow);

    return [followerCount, followeeCount];
  }
  async unfollow(
    token: string,
    userToUnfollow: string
  ): Promise<[followerCount: number, followeeCount: number]> {

    this.authenticate(token)
    this.followDao.follow(userToUnfollow)

    const followerCount = await this.getFollowerCount(token, userToUnfollow);
    const followeeCount = await this.getFolloweeCount(token, userToUnfollow);

    return [followerCount, followeeCount];
  }

  private authenticate(token: string): boolean {
    if (this.sessionDao.isAuthenticated(token)) {
      return true;
    } else {
      throw new Error("Not authorized");
    }
  }
}
