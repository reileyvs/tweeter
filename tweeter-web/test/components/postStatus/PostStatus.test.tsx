import PostStatus from "../../../src/components/postStatus/PostStatus";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { anything, instance, mock, verify } from "@typestrong/ts-mockito";
import { AuthToken, User } from "tweeter-shared";
import { PostStatusPresenter } from "../../../src/presenter/PostStatusPresenter";
import { useUserInfoHook } from "../../../src/components/userInfo/UserInfoHooks";

jest.mock("../../../src/components/userInfo/UserInfoHooks", () => ({
  ...jest.requireActual("../../../src/components/userInfo/UserInfoHooks"),
  __esModule: true,
  useUserInfoHook: jest.fn(),
}));

describe("PostStatus component", () => {
  const statusFieldText = "Hi";
  const currentUser = new User("Bob", "Dylan", "Bobby", "123");
  const authToken = new AuthToken("Approved", Date.now());

  beforeAll(() => {
    (useUserInfoHook as jest.Mock).mockReturnValue({
      currentUser: currentUser,
      authToken: authToken,
    });
  });

  it("starts with Post Status and Clear buttons disabled", () => {
    const { postStatusButton, clearStatusButton } = renderPostStatusElement();
    expect(postStatusButton).toBeDisabled();
    expect(clearStatusButton).toBeDisabled();
  });

  it("enables both buttons when the text field has text", async () => {
    const { postStatusButton, clearStatusButton, textField, user } =
      renderPostStatusElement();

    await user.type(textField, statusFieldText);
    expect(postStatusButton).toBeEnabled();
    expect(clearStatusButton).toBeEnabled();
  });

  it("disables buttons when text field is cleared", async () => {
    const { postStatusButton, clearStatusButton, textField, user } =
      renderPostStatusElement();

    await user.type(textField, statusFieldText);
    expect(postStatusButton).toBeEnabled();
    expect(clearStatusButton).toBeEnabled();

    await user.clear(textField);
    expect(postStatusButton).toBeDisabled();
    expect(clearStatusButton).toBeDisabled();
  });

  it("calls the postStatus method with correct parameters when the Post Status button is pressed", async () => {
    const mockPresenter = mock<PostStatusPresenter>();
    const { postStatusButton, textField, user } = renderPostStatusElement(
      instance(mockPresenter)
    );

    await user.type(textField, statusFieldText);
    await user.click(postStatusButton);
    verify(
      mockPresenter.submitPost(
        anything(),
        statusFieldText,
        currentUser,
        authToken
      )
    );
  });
});

function renderPost(presenter?: PostStatusPresenter) {
  return render(<PostStatus presenter={presenter} />);
}

function renderPostStatusElement(presenter?: PostStatusPresenter) {
  //Change usage to hook
  const user = userEvent.setup();
  renderPost(presenter);
  const postStatusButton = screen.getByLabelText("postStatusButton");
  const clearStatusButton = screen.getByLabelText("clearStatusButton");
  const textField = screen.getByLabelText("postStatusTextArea");

  return { postStatusButton, clearStatusButton, textField, user };
}
