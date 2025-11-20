import { PagedItemRequest, RegisterRequest, UserDto } from "tweeter-shared";
import { ServerFacade } from "../../src/network/ServerFacade";
import 'isomorphic-fetch';

describe("ServerFacade integration tests", () => {
  let serverFacade: ServerFacade;
  beforeAll(() => {
    serverFacade = new ServerFacade();
  });

  it("registers a user", async () => {
    const request: RegisterRequest = {
      token: "",
      firstName: "Test",
      lastName: "User",
      alias: "@testuser",
      password: "password",
      userImageBytes: "abcd",
      imageFileExtension: "png"
    }
    const [user, authToken] = await serverFacade.register(request);
    expect(user).not.toBeNull();
    expect(authToken).not.toBeNull();
    expect(user.firstName).toBe("Allen");
    expect(user.lastName).toBe("Anderson");
    expect(user.alias).toBe("@allen");
  });

  it("gets first follower", async () => {
    const request: PagedItemRequest<UserDto> = {
      token: "validToken",
      userAlias: "@allen",
      pageSize: 1,
      lastItem: null
    }
    const [users, hasMore] = await serverFacade.getMoreFollows(request, "/follower/list", "followers")
    expect(users.length).toBe(1);
    expect(hasMore).toBe(true);
    expect(users[0].firstName).toBe("Amy");
    expect(users[0].lastName).toBe("Ames");
    expect(users[0].alias).toBe("@amy");
  });
  it("gets the next follower", async () => {
    const lastUser: UserDto = {
      firstName: "Amy",
      lastName: "Ames",
      alias: "@amy",
      imageUrl: ""
    }
    const request: PagedItemRequest<UserDto> = {
      token: "valid",
      userAlias: "@allen",
      pageSize: 1,
      lastItem: lastUser
    }
    const [users, hasMore] = await serverFacade.getMoreFollows(request, "/follower/list", "followers")
    expect(users.length).toBe(1);
    expect(hasMore).toBe(true);
    expect(users[0].firstName).toBe("Bob");
    expect(users[0].lastName).toBe("Bobson");
    expect(users[0].alias).toBe("@bob");
  })
  it("gets follower count", async () => {
    const request = {
      token: "valid",
      userAlias: "@allen"
    }
    const count = await serverFacade.getFollowCount(request, "follower");
    expect(count).toBeGreaterThan(0);
  })
});
