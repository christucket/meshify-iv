import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Header from "../components/Header";
import { act } from "react-dom/test-utils";

beforeEach(() => {});

test("Header: renders basic header", async () => {
  act(() => {
    render(
      <Header
        hashtag="IoT"
        setHashtag={() => {}}
        setRetweetOption={() => {}}
        retweetOption="no-retweets"
      />
    );
  });

  await waitFor(() => {
    const titleText = screen.getByText(/Hashtag Word Cloud/i);
    expect(titleText).toBeInTheDocument();

    const hashtagText = screen.getByText(/Choose hashtag/i);
    expect(hashtagText).toBeInTheDocument();

    const retweetsSelect = screen.getByText(/Retweets:/i);
    expect(retweetsSelect).toBeInTheDocument();
  });
});

test("Header: changing hashtag calls setHashtag", async () => {
  let returnValue;
  const setHashtag = jest.fn((val) => {
    returnValue = val;
  });
  act(() => {
    render(
      <Header
        hashtag="IoT"
        setHashtag={setHashtag}
        setRetweetOption={() => {}}
        retweetOption="no-retweets"
      />
    );
  });

  const hashtagText = screen.getByText(/Choose hashtag/i);
  expect(hashtagText).toBeInTheDocument();

  const inputElement = hashtagText.nextElementSibling as HTMLInputElement;
  expect(inputElement).toBeInTheDocument();

  expect(setHashtag.mock.calls.length).toBe(0);

  fireEvent.change(inputElement, {
    target: { value: "internet" },
  });

  expect(setHashtag.mock.calls.length).toBe(1);
  expect(returnValue).toBe("internet");
});

test("Header: changing retweets select calls setRetweetOption", async () => {
  let returnValue;
  const retweetOption = jest.fn((val) => {
    returnValue = val;
  });
  act(() => {
    render(
      <Header
        hashtag="IoT"
        setHashtag={() => {}}
        setRetweetOption={retweetOption}
        retweetOption="no-retweets"
      />
    );
  });

  const retweetsText = screen.getByText(/Retweets:/i);
  expect(retweetsText).toBeInTheDocument();

  const selectElement = retweetsText.nextElementSibling as HTMLSelectElement;
  expect(selectElement).toBeInTheDocument();

  expect(retweetOption.mock.calls.length).toBe(0);

  fireEvent.change(selectElement, {
    target: { value: "only-retweets" },
  });

  expect(retweetOption.mock.calls.length).toBe(1);
  expect(returnValue).toBe("only-retweets");
});
