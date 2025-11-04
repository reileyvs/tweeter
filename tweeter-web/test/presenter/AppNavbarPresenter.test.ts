import { AuthToken } from "tweeter-shared";
import { AppNavbarPresenter, AppNavbarView } from "../../src/presenter/AppNavbarPresenter";
import { anything, capture, instance, mock, spy, verify, when } from "@typestrong/ts-mockito";
import { UserService } from "../../src/model.service/UserService";

describe("AppNavbarPresenter", () => {
  let mockView: AppNavbarView;
  let mockService: UserService;
  let presenter: AppNavbarPresenter;

  const authToken = new AuthToken("authToken", Date.now());
  const messageId = "hello world"

  beforeEach(() => {
    mockView = mock<AppNavbarView>();
    mockService = mock<UserService>();
    const presenterSpy = spy(new AppNavbarPresenter(instance(mockView)))
    presenter = instance(presenterSpy)

    when(presenterSpy.service).thenReturn(instance(mockService))

    when(mockView.displayInfoMessage(anything(), 0)).thenReturn(messageId)
  })
  it("tells the view to display a logging out message", async () => {
    await presenter.logout(authToken);
    verify(mockView.displayInfoMessage("Logging Out...", 0)).once();
  })

  it("calls logout on the user service with the correct auth token", async () => {
    await presenter.logout(authToken);
    verify(mockService.logout(authToken)).once()

    let [capturedAuthToken] = capture(mockService.logout).last()
    expect(capturedAuthToken).toEqual(authToken);
  })

  it("tells the view to clear info message, clear user info, and navigate to login page when successful", async () => {
    await presenter.logout(authToken)
    verify(mockView.deleteMessage(messageId)).once()
    verify(mockView.clearUserInfo()).once()
    verify(mockView.navigate(anything())).once()

    verify(mockView.displayErrorMessage(anything())).never()
  })

  it("tells view to display error message, and does not clear message, clear info, nor navigate when not successful", async () => {
    let error = new Error("An error occurred!!")
    when(mockService.logout(anything())).thenThrow(error)
    await presenter.logout(authToken)
    let [methodCall] = capture(mockView.displayErrorMessage).last()
    verify(mockView.deleteMessage(anything())).never()
    verify(mockView.navigate(anything())).never()
    verify(mockView.clearUserInfo()).never()
    verify(mockView.displayErrorMessage(methodCall)).once()
  })
})