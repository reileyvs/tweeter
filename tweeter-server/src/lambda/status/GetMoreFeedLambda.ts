import { Status, type PagedItemRequest, type PagedItemResponse, type StatusDto } from "tweeter-shared"
import { StatusService } from "../../model/service/StatusService.js";
export const handler = async (request: PagedItemRequest<StatusDto>): Promise<PagedItemResponse<StatusDto>> => {
  const statusService = new StatusService();
  const status = Status.fromDto(request.lastItem);
  const [items, hasMore] = await statusService.loadMoreFeedItems(request.token, request.userAlias, request.pageSize, status)
  const dtoItems = items.map(item => item.dto);
  return {
    success: true,
    message: null,
    items: dtoItems,
    hasMore: hasMore
  }
}