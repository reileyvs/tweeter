import { AuthToken, FakeData, User, type UserDto } from "tweeter-shared";

export class FollowService {
  async loadMoreFollowees(
    token: string,
    userAlias: string,
    pageSize: number,
    lastUser: UserDto | null
  ): Promise<[UserDto[], boolean]> {

    const [items, hasMore] = FakeData.instance.getPageOfUsers(User.fromDto(lastUser), pageSize, userAlias);
    const dtos = items.map((user: User) => user.dto)
    return [dtos, hasMore]
  };
  async loadMoreFollowers(
    token: string,
    userAlias: string,
    pageSize: number,
    lastUser: UserDto | null
  ): Promise<[UserDto[], boolean]> {

    const [items, hasMore] = FakeData.instance.getPageOfUsers(User.fromDto(lastUser), pageSize, userAlias);
    const dtos = items.map((user: User) => user.dto)
    return [dtos, hasMore]
  };
  async getFollowerCount(
    token: string,
    userAlias: string
  ): Promise<number> {
    return FakeData.instance.getFollowerCount(userAlias);
  };
  async getIsFollowerStatus(
    token: string,
    userAlias: string,
    selectedUserAlias: string
  ): Promise<boolean> {
    return FakeData.instance.isFollower();
  };
  async getFolloweeCount(
    token: string,
    userAlias: string
  ): Promise<number> {
    return FakeData.instance.getFolloweeCount(userAlias);
  };
  async follow(
    token: string,
    userToFollow: string
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the follow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server

    const followerCount = await this.getFollowerCount(token, userToFollow);
    const followeeCount = await this.getFolloweeCount(token, userToFollow);

    return [followerCount, followeeCount];
  };
  async unfollow(
    token: string,
    userToUnfollow: string
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the unfollow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server

    const followerCount = await this.getFollowerCount(token, userToUnfollow);
    const followeeCount = await this.getFolloweeCount(token, userToUnfollow);

    return [followerCount, followeeCount];
  };
}