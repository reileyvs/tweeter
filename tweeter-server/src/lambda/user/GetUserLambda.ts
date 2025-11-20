import type { UserDto, ItemRequest, UserResponse } from "tweeter-shared"
import { UserService } from "../../model/service/UserService.js";
export const handler = async (request: ItemRequest): Promise<UserResponse> => {
  const userService = new UserService();
  const user = await userService.getUser(request.token, request.userAlias)
  const userDto: UserDto | null = user ? user.dto : null
  
  return {
    success: true,
    message: null,
    user: userDto,
  }
}