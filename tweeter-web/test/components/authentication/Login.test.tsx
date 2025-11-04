import { MemoryRouter } from "react-router-dom";
import Login from "../../../src/components/authentication/login/Login";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { instance, mock, verify } from "@typestrong/ts-mockito";
import { LoginPresenter } from "../../../src/presenter/LoginPresenter";
library.add(fab);

describe("Login component", () => {
  it("starts with the sign-in button disabled", () => {
    const { signInButton } = renderLoginAndGetElement("/");
    expect(signInButton).toBeDisabled();
  });

  it("enables sign-in button if both alias and password fields have text", async () => {
    const { signInButton, aliasField, passwordField, user } =
      renderLoginAndGetElement("/");

    await user.type(aliasField, "a");
    await user.type(passwordField, "p");

    expect(signInButton).toBeEnabled();
  });

  it("disables sign-in button when alias or password field is cleared", async () => {
    const { signInButton, aliasField, passwordField, user } = renderLoginAndGetElement("/");

    await user.type(aliasField, "a");
    await user.type(passwordField, "p");

    await user.clear(aliasField);
    expect(signInButton).toBeDisabled();
  
    await user.type(aliasField, "a");
    expect(signInButton).toBeEnabled();
    await user.clear(passwordField);

    expect(signInButton).toBeDisabled();
  })

  it("calls presenter's login method with correct parameters when sign-in pressed", async () => {
    const mockPresenter = mock<LoginPresenter>();
    const presenterInstance = instance(mockPresenter)
    const originalUrl = "/"
    const { signInButton, aliasField, passwordField, user } = renderLoginAndGetElement(originalUrl, presenterInstance);
    const alias = "a"
    const password = "b"

    await user.type(aliasField, alias);
    await user.type(passwordField, password);

    await user.click(signInButton);

    verify(mockPresenter.doLogin(false, alias, password, originalUrl)).once()
  })
});

function renderLogin(originalUrl?: string, presenter?: LoginPresenter) {
  return render(
    <MemoryRouter>
      {!!presenter ? (<Login originalUrl={originalUrl} presenter={presenter} />) : (<Login originalUrl={originalUrl} />)}
    </MemoryRouter>
  );
}

function renderLoginAndGetElement(originalUrl: string, presenter?: LoginPresenter) {
  const user = userEvent.setup();
  renderLogin(originalUrl, presenter);

  const signInButton = screen.getByRole("button", { name: /Sign in/i });
  const aliasField = screen.getByLabelText("alias");
  const passwordField = screen.getByLabelText("password");

  return { user, signInButton, aliasField, passwordField };
}
