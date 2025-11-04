import { AuthToken, Status, User } from "tweeter-shared";
import {
  PostStatusPresenter,
  PostStatusView,
} from "../../src/presenter/PostStatusPresenter";
import { StatusService } from "../../src/model.service/StatusService";
import {
  anything,
  capture,
  instance,
  mock,
  spy,
  verify,
  when,
} from "@typestrong/ts-mockito";

describe("PostStatusPresenter", () => {
  let mockView: PostStatusView;
  let mockService: StatusService;
  let presenter: PostStatusPresenter;

  const authToken = new AuthToken("authToken", Date.now());
  const messageId = "hello world";
  const post = "My political enemies are my friends";
  const user = new User("Bob", "Freeman", "zok", "123");

  beforeEach(() => {
    mockView = mock<PostStatusView>();
    mockService = mock<StatusService>();
    const presenterSpy = spy(new PostStatusPresenter(instance(mockView)));
    presenter = instance(presenterSpy);

    when(presenterSpy.service).thenReturn(instance(mockService));
    when(mockView.displayInfoMessage(anything(), 2000)).thenReturn(messageId);
  });

  it("tells the view to display a logging out message", async () => {
    await presenter.submitPost(anything(), post, user, authToken);
    verify(mockView.displayInfoMessage("Posting status...", 2000)).once();
  });

  it("calls postStatus on the status service with the correct status string and auth token", async () => {
    await presenter.submitPost(anything(), post, user, authToken);
    let [auth, status] = capture(mockService.postStatus).last();
    expect(status.post).toBe(post);
    expect(status.user).toBe(user);
    expect(auth).toEqual(authToken);
    verify(mockService.postStatus(anything(), anything())).once();
  });

  it("tells the view to clear the info message that was displayed previously, clear the post, and display a status posted message when successful", async () => {
    await presenter.submitPost(anything(), post, user, authToken);
    verify(mockView.deleteMessage(messageId)).once();
    verify(mockView.displayInfoMessage("Posting status...", 2000)).once();
    verify(mockView.displayInfoMessage("Status posted!", 2000)).once();
    verify(mockView.setPost("")).once();

    verify(mockView.displayErrorMessage(anything())).never();
  });

  it("tells the view to clear the info message and display an error message but does not tell it to clear the post or display a status posted message when not successful", async () => {
    let error = new Error("Dagnabbit!")
    when(mockService.postStatus).thenThrow(error)
    await presenter.submitPost(anything(), post, user, authToken)
    let [methodCall] = capture(mockView.displayErrorMessage).last()
    verify(mockView.setPost("")).never()
    verify(mockView.displayInfoMessage("Status posted!", 2000)).never()

    verify(mockView.deleteMessage(anything())).once()
    verify(mockView.displayErrorMessage(methodCall)).once()
  });
});
