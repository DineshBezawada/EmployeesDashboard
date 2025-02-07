import {
  fetchEmployeesRequest,
  fetchEmployeesSuccess,
  fetchEmployeesFailure,
  updateCurrentPage,
} from "../employeesDataAction";
describe("Employees Data Actions", () => {
  test("fetchEmployeesRequest creates FETCH_EMPLOYEES_REQUEST action", () => {
    const page = 1;
    const pageDataLimit = 10;
    const expectedAction = {
      type: "FETCH_EMPLOYEES_REQUEST",
      payload: { page, pageDataLimit },
    };
    expect(fetchEmployeesRequest(page, pageDataLimit)).toEqual(expectedAction);
  });
  test("fetchEmployeesSuccess creates FETCH_EMPLOYEES_SUCCESS action", () => {
    const data = [{ id: 1, name: "John Doe" }];
    const totalRecords = 1;
    const expectedAction = {
      type: "FETCH_EMPLOYEES_SUCCESS",
      payload: { data, totalRecords },
    };
    expect(fetchEmployeesSuccess(data, totalRecords)).toEqual(expectedAction);
  });
  test("fetchEmployeesFailure creates FETCH_EMPLOYEES_FAILURE action", () => {
    const error = "Error fetching employees";
    const expectedAction = {
      type: "FETCH_EMPLOYEES_FAILURE",
      payload: error,
    };
    expect(fetchEmployeesFailure(error)).toEqual(expectedAction);
  });
  test("setCurrentPage creates SET_CURRENT_PAGE action", () => {
    const page = 2;
    const expectedAction = {
      type: "SET_CURRENT_PAGE",
      payload: page,
    };
    expect(updateCurrentPage(page)).toEqual(expectedAction);
  });
});
