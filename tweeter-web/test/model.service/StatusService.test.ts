import { AuthToken } from "tweeter-shared";
import { StatusService } from "../../src/model.service/StatusService";
import "isomorphic-fetch";

describe("StatusService Tests", () => {
  let service: StatusService;
  beforeAll(() => {
    service = new StatusService();
  });

  it("gets stories", async () => {
    const authToken = new AuthToken("arstast", 5);
    const [stories, boolean] = await service.loadMoreStoryItems(
      authToken,
      "@allen",
      4,
      null
    );
    expect(stories).not.toBe(null);
    expect(stories[0].segments[0].text).toBe(
      "Post 0 0"
    );
    expect(stories[0].user.alias).toBe("@allen");
  });
});
