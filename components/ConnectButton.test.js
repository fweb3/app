import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { useConnection } from "../providers/ConnectionProvider";
import { ConnectButton } from "./ConnectButton";

const renderComponent = (props) => render(<ConnectButton {...props} />);

const mockConnectionState = {
  isConnected: false,
  isConnecting: false,
  account: null,
  connect: jest.fn(),
};

jest.mock("../providers/ConnectionProvider");

beforeEach(() => {
  useConnection.mockReturnValue(mockConnectionState);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("<ConnectButton />", () => {
  it("renders connect button when no account, errors, and tried eager connect", () => {
    renderComponent();
    expect(screen.getByText("Connect your wallet")).toBeTruthy();
  });
  it("calls activate when button clicked", async () => {
    renderComponent();

    const buttonElement = screen.getByText("Connect your wallet");

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockConnectionState.connect).toHaveBeenCalled();
    });
  });
});
