import { AuthToken, PostStatusRequest, Status, type AuthTokenDto, type TweeterResponse } from "tweeter-shared"
import { StatusService } from "../../model/service/StatusService";
export const handler = async (request: PostStatusRequest): Promise<TweeterResponse> => {
  const statusService = new StatusService();
  if (request === null) {
    throw new Error("Invalid logout request");
  }
  if (request.statusDto == null) {
    throw new Error("Invalid post status request");
  }
  await statusService.postStatus(request.token, Status.fromDto(request.statusDto)!);
  return {
    success: true,
    message: null,
  }
}