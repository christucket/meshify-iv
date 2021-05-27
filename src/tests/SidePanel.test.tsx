import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SidePanel from "../components/SidePanel";
import { act } from "react-dom/test-utils";

// mock out external libraries
jest.mock("react-tweet-embed", () => {
  return {
    __esModule: true,
    default: () => {
      return <div>Mock tweet</div>;
    },
  };
});

beforeEach(() => {});

test("SidePanel: renders basic tweets", async () => {
  act(() => {
    render(<SidePanel showTweets={["1", "2"]} />);
  });

  await waitFor(() => {
    const text = screen.getAllByText(/Mock tweet/i);
    expect(text.length).toEqual(2);
  });
});

test("SidePanel: renders basic tweets with no show more button", async () => {
  act(() => {
    render(<SidePanel showTweets={["1", "2"]} />);
  });

  await waitFor(() => {
    const showMoreText = screen.queryByText(/Show more/i);
    expect(showMoreText).toBeNull();
  });
});

test("SidePanel: renders lots of tweets", async () => {
  act(() => {
    render(<SidePanel showTweets={["1", "2", "3", "4", "5", "6", "7"]} />);
  });

  await waitFor(() => {
    const text = screen.getAllByText(/Mock tweet/i);
    expect(text.length).toEqual(5);
  });
});

test("SidePanel: renders lots of tweets with show more button", async () => {
  act(() => {
    render(<SidePanel showTweets={["1", "2", "3", "4", "5", "6", "7"]} />);
  });

  await waitFor(() => {
    const text = screen.getByText(/Show more/i);
    expect(text).toBeInTheDocument();
  });
});

test("SidePanel: click show more button, show more goes away", async () => {
  act(() => {
    render(<SidePanel showTweets={["1", "2", "3", "4", "5", "6", "7"]} />);
  });

  await waitFor(() => {
    const text = screen.getByText(/Show more/i);
    expect(text).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(/Show more/i));

  await waitFor(() => {
    const text = screen.getAllByText(/Mock tweet/i);
    expect(text.length).toEqual(7);

    const showMoreText = screen.queryByText(/Show more/i);
    expect(showMoreText).toBeNull();
  });
});

test("SidePanel: rerender resets page size to 5", async () => {
  let rerender: (
    ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>
  ) => void;
  act(() => {
    const fns = render(
      <SidePanel showTweets={["1", "2", "3", "4", "5", "6", "7"]} />
    );
    rerender = fns.rerender;
  });

  fireEvent.click(screen.getByText(/Show more/i));

  await waitFor(() => {
    const text = screen.getAllByText(/Mock tweet/i);
    expect(text.length).toEqual(7);
  });

  act(() => {
    rerender(
      <SidePanel showTweets={["8", "9", "10", "11", "12", "13", "14"]} />
    );
  });

  await waitFor(() => {
    const text = screen.getAllByText(/Mock tweet/i);
    expect(text.length).toEqual(5);

    const showMoreText = screen.getByText(/Show more/i);
    expect(showMoreText).toBeInTheDocument();
  });
});

test("SidePanel: no tweets show", async () => {
  act(() => {
    render(<SidePanel showTweets={[]} />);
  });

  await waitFor(() => {
    const text = screen.queryByText(/Mock tweet/i);
    expect(text).toBeNull();
    const showMoreText = screen.queryByText(/Show more/i);
    expect(showMoreText).toBeNull();
  });
});
