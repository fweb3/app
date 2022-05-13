import { render } from "@testing-library/react";
import { Trophy } from "./Trophy";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: "",
    };
  },
}));

const renderComponent = (props) => render(<Trophy {...props} />);

describe("<Trophy />", () => {
  it("renders without crashing", () => {
    renderComponent();
  });
});
