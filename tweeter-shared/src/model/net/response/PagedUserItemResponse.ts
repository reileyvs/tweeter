import type { UserDto } from "../../dto/UserDto.js";
import type { TweeterResponse } from "./TweeterResponse.js";


export interface PagedUserItemResponse extends TweeterResponse {
  readonly items: UserDto[] | null,
  readonly hasMore: boolean
}