import type { FollowResponse, ItemRequest } from "tweeter-shared"
import { FollowService } from "../../model/service/FollowService.js";
export const handler = async (request: ItemRequest): Promise<FollowResponse> => {
  const followService = new FollowService();
  const [followeeCount, followerCount] = await followService.unfollow(request.token, request.userAlias)
  
  return {
    success: true,
    message: null,
    followeeCount: followeeCount,
    followerCount: followerCount
  }
}