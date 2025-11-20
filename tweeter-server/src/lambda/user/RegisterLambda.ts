import type { RegisterRequest, AuthResponse, UserDto } from "tweeter-shared";
import { UserService } from "../../model/service/UserService.js";
import { AuthTokenDto } from "tweeter-shared/dist/model/dto/AuthTokenDto.js";
export const handler = async (
  request: RegisterRequest
): Promise<AuthResponse> => {
  const encoder = new TextEncoder();
  const uInt = encoder.encode(request.userImageBytes);
  const userService = new UserService();
  const [user, auth] = await userService.register(
    request.firstName,
    request.lastName,
    request.alias,
    request.password,
    uInt,
    request.imageFileExtension
  );
  const userDto: UserDto = user.dto;
  const authDto: AuthTokenDto = auth.dto;
  return {
    success: true,
    message: null,
    user: userDto,
    authToken: authDto,
  };
};
