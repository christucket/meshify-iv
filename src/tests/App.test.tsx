import { render, screen, waitFor } from "@testing-library/react";
import App from "../components/App";
import axios from "axios";
import { act } from "react-dom/test-utils";

jest.mock("axios");

// mock out external libraries
jest.mock("react-wordcloud", () => {
  return {
    __esModule: true,
    default: () => {
      return <div>Mock Wordcloud</div>;
    },
  };
});

jest.mock("react-tweet-embed", () => {
  return {
    __esModule: true,
    default: () => {
      return <div>Mock tweet</div>;
    },
  };
});

beforeEach(() => {
  (axios.get as jest.Mock).mockResolvedValue({
    data: {
      data: [
        { id: "23", text: "text 23 test data apple IoT" },
        { id: "12", text: "text 12 test IoT" },
        { id: "34", text: "text 34 test data words IoT apple" },
        { id: "45", text: "text 34 test data words IoT apple extra words more words" },
      ],
      meta: {},
    },
  });
});

test("App: renders header text", async () => {
  act(() => {
    render(<App />);
  });

  await waitFor(() => {
    const text = screen.getByText(/Hashtag Word Cloud/i);
    expect(text).toBeInTheDocument();
  });
});

test("App: renders the word cloud", async () => {
  act(() => {
    render(<App />);
  });

  await waitFor(() => {
    const text = screen.getByText(/Mock Wordcloud/i);
    expect(text).toBeInTheDocument();
  });
});

test("App: renders the sidepanel", async () => {
  act(() => {
    render(<App />);
  });

  await waitFor(() => {
    const text = screen.getAllByText(/Mock tweet/i);
    expect(text.length).toEqual(4);
  });
});

test("App: renders the sidepanel - no tweets", async () => {
  (axios.get as jest.Mock).mockResolvedValue({
    data: {
      data: [],
      meta: {},
    },
  });
  act(() => {
    render(<App />);
  });

  await waitFor(() => { 
    const errorText = screen.getByText(/The hashtag you selected has no data or an error occured/i);
    expect(errorText).toBeInTheDocument();
  });
});

test("App: renders the sidepanel - after click on cloud", async () => {
  // this is just a fake test at this point
  // i'd love to test the wordcloud callback 
  // but for some reason jest doesn't import the component correctly, so i mocked the whole thing
  // mocked components won't be able to update the state as far as i know

  act(() => {
    render(<App />);
  });

  await waitFor(() => { 
    const text = screen.getAllByText(/Mock tweet/i);
    expect(text.length).toEqual(4);
  });

  // act(() => {
  //   fireEvent.click()
  // })

  // await waitFor(() => { 
  //   const text = screen.getAllByText(/Mock tweet/i);
  //   expect(text.length).toEqual(2);
  // });
});
