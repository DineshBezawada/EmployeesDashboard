import employeeReducer from "../employeesDataReducer";

const initialState = {
  data: [],
  totalRecords: 0,
  currentPage: 1,
  pageDataLimit: 5,
  loading: false,
  error: null,
};

describe("employeeReducer", () => {
  test("should return the initial state", () => {
    expect(employeeReducer(undefined, {})).toEqual(initialState);
  });
  test("should handle FETCH_EMPLOYEES_REQUEST", () => {
    const action = { type: "FETCH_EMPLOYEES_REQUEST" };
    const expectedState = {
      ...initialState,
      loading: true,
    };
    expect(employeeReducer(initialState, action)).toEqual(expectedState);
  });
  test("should handle FETCH_EMPLOYEES_SUCCESS", () => {
    const action = {
      type: "FETCH_EMPLOYEES_SUCCESS",
      payload: {
        data: {
          employeesData: [{ id: 1, name: "John Doe" }],
          companyInfo: {
            companyName: "Test Company",
            companyMotto: "Test Motto",
            companyEst: "2022-01-01T00:00:00Z",
          },
        },
        totalRecords: 1,
      },
    };
    const expectedState = {
      ...initialState,
      loading: false,
      data: [{ id: 1, name: "John Doe" }],
      totalRecords: 1,
      companyData: {
        companyName: "Test Company",
        companyMotto: "Test Motto",
        companyEst: "2022-01-01T00:00:00Z",
      },
    };
    expect(employeeReducer(initialState, action)).toEqual(expectedState);
  });
  test("should handle FETCH_EMPLOYEES_FAILURE", () => {
    const action = {
      type: "FETCH_EMPLOYEES_FAILURE",
      payload: "Error fetching employees",
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: "Error fetching employees",
    };
    expect(employeeReducer(initialState, action)).toEqual(expectedState);
  });
  test("should handle SET_CURRENT_PAGE", () => {
    const action = {
      type: "SET_CURRENT_PAGE",
      payload: 2,
    };
    const expectedState = {
      ...initialState,
      currentPage: 2,
    };
    expect(employeeReducer(initialState, action)).toEqual(expectedState);
  });
});
