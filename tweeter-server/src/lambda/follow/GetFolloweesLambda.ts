import type { PagedUserItemRequest, PagedUserItemResponse } from "tweeter-shared"
import { FollowService } from "../../model/service/FollowService.js";
export const handler = async (request: PagedUserItemRequest): Promise<PagedUserItemResponse> => {
  const followService = new FollowService();
  const [items, hasMore] = await followService.loadMoreFollowees(request.token, request.userAlias, request.pageSize, request.lastUser)
  
  return {
    success: true,
    message: null,
    items: items,
    hasMore: hasMore
  }
}