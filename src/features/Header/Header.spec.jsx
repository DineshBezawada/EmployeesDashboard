import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import createSagaMiddleware from "redux-saga";
import Header from "./index";
import { fetchEmployeesRequest } from "../../redux/actions/employeesDataAction";
const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);
describe("Header Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      employee: {
        companyData: {
          companyName: "Test Company",
          companyMotto: "Test Motto",
          companyEst: "2022-01-01T00:00:00Z",
        },
      },
    });

    store.dispatch = jest.fn();
  });
  test("renders company name", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText("Test Company")).toBeInTheDocument();
  });
  test("renders company motto", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText("Test Motto")).toBeInTheDocument();
  });

  test("renders company establishment date", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText("Since 2022-01-01")).toBeInTheDocument();
  });
  test("dispatches fetchEmployeesRequest on mount", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(fetchEmployeesRequest());
  });
});
