import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { DataAwarePlayerList } from "../data-aware-player-list";
import { ReactTestInstance } from "react-test-renderer";
import { FiltersProvider } from "@/contexts/filters-context";

const fetchMock = jest.fn();

window.fetch = fetchMock;

const mockAPI = (args: { players: unknown; positions: unknown }) => {
  fetchMock.mockImplementation((url: string) => {
    if (url.includes("positions")) {
      return Promise.resolve({ json: () => Promise.resolve(args.positions) });
    } else {
      return Promise.resolve({ json: () => Promise.resolve(args.players) });
    }
  });
};

describe("<DataAwarePlayerList />", () => {
  describe("non empty state", () => {
    beforeEach(() => {
      mockAPI({
        players: {
          result: [
            {
              age: 19,
              first_name: "John",
              last_name: "Doe",
              image_url: null,
              player_id: "1",
              position: "A",
            },
            {
              first_name: "John 2",
              last_name: "Doe 2",
              image_url: null,
              player_id: "2",
              position: "B",
            },
          ],
        },
        positions: ["A", "B"],
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should be testable", () => {
      expect(1).toBeTruthy();
    });

    it("should render list of players by default", async () => {
      render(<DataAwarePlayerList />);

      expect(screen.getByText("Search")).toBeDefined();

      await waitFor(() => {
        expect(screen.getAllByTestId("list-item")).toHaveLength(2);

        expect(screen.getByText("John Doe")).toBeDefined();
        expect(screen.getByText("19yo | A | N/D")).toBeDefined();

        expect(screen.getByText("John 2 Doe 2")).toBeDefined();
        expect(screen.getByText("N/D | B | N/D")).toBeDefined();
      });
    });
  });

  describe("integration with filters", () => {
    beforeEach(() => {
      mockAPI({
        players: {
          result: [
            {
              age: 19,
              first_name: "John",
              last_name: "Doe",
              image_url: null,
              player_id: "1",
              position: "A",
            },
            {
              first_name: "John 2",
              last_name: "Doe 2",
              image_url: null,
              player_id: "2",
              position: "B",
            },
          ],
        },
        positions: ["A", "B"],
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should allow to filter with position", async () => {
      let positionListItems: ReactTestInstance[] | undefined = undefined;

      render(<DataAwarePlayerList />, { wrapper: FiltersProvider });

      const positionPicker = screen.getByTestId("position-picker");

      fireEvent(positionPicker, "click");

      const positionList = screen.getByTestId("position-list");

      // Probably expect(positionList).toBeVisible(); would make more sense.
      // Didn't have the time to figure out how to enable that method here.
      expect(positionList).toBeDefined();

      await waitFor(() => {
        positionListItems = screen.getAllByTestId("position-list-item");
        expect(positionListItems).toHaveLength(2);
      });

      mockAPI({
        players: {
          result: [
            {
              first_name: "John 2",
              last_name: "Doe 2",
              image_url: null,
              player_id: "2",
              position: "B",
            },
          ],
        },
        positions: ["A", "B"],
      });

      fireEvent(positionListItems![1], "click");

      await waitFor(() => {
        expect(screen.getAllByTestId("list-item")).toHaveLength(1);

        expect(screen.getByText("John 2 Doe 2")).toBeDefined();
        expect(screen.getByText("N/D | B | N/D")).toBeDefined();

        expect(fetchMock).toHaveBeenLastCalledWith(
          "http://localhost:3000/players?limit=100&position=B"
        );
      });
    });
  });

  it.todo("navigation between screens");
  it.todo("failed fetching attempt");
  it.todo("loading indicator");
  it.todo("visual feedback for empty state");
  it.todo("more error paths");
});
