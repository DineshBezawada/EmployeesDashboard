import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import createSagaMiddleware from "redux-saga";
import EmployeeDashboard from "./EmployeeDashboard";
import watchFetchEmployees from "../../redux/sagas/employeesDataSaga";

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);

const initialState = {
  employee: {
    data: [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        avatar: "https://example.com/avatar1.jpg",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Doe",
        avatar: "https://example.com/avatar2.jpg",
      },
    ],
    totalRecords: 2,
    currentPage: 1,
    pageDataLimit: 5,
    loading: false,
    error: null,
  },
};
describe("EmployeeDashboard Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    sagaMiddleware.run(watchFetchEmployees);
    store.dispatch = jest.fn();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <EmployeeDashboard />
      </Provider>
    );
 
  test("renders table with employee data", () => {
    renderComponent();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });
  test("opens modal with employee details on ID click", async () => {
    renderComponent();
    fireEvent.click(screen.getAllByText("1")[0]);
    await waitFor(() => expect(screen.getByText("John")).toBeInTheDocument());
    expect(screen.getByText("John")).toBeInTheDocument();
  });
  test("closes modal on close button click", async () => {
    renderComponent();
    fireEvent.click(screen.getAllByText("1")[0]);
    await waitFor(() => expect(screen.getByText("John")).toBeInTheDocument());
    fireEvent.click(screen.getByText("X"));
    await waitFor(() =>
      expect(screen.queryByText("John Jane")).not.toBeInTheDocument()
    );
  });
});
