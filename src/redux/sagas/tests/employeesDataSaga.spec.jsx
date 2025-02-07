import { allData } from "../../../utils/data";
import { call } from "redux-saga/effects";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import watchFetchEmployees, {
  fetchEmployees,
  fetchEmployeeData,
} from "../employeesDataSaga";
import {
  fetchEmployeesSuccess,
  fetchEmployeesFailure,
} from "../../actions/employeesDataAction";

describe("fetchEmployeeData", () => {
  const page = 1;
  const pageDataLimit = 2;

  it("fetches employees data without filter", async () => {
    const filterType = { type: "", isReverse: false, isFilterClicked: false };
    const response = await fetchEmployeeData(page, pageDataLimit, filterType);
    expect(response.data.employeesData).toEqual(allData.employees.slice(0, 2));
    expect(response.data.companyInfo).toEqual(allData.companyInfo);
    expect(response.totalRecords).toEqual(allData.employees.length);
  });
  it("fetches employees data with ascending filter", async () => {
    const filterType = {
      type: "firstName",
      isReverse: false,
      isFilterClicked: true,
    };
    const response = await fetchEmployeeData(page, pageDataLimit, filterType);
    const sortedData = allData.employees.sort((a, b) =>
      a.firstName > b.firstName ? 1 : -1
    );
    expect(response.data.employeesData).toEqual(sortedData.slice(0, 2));
    expect(response.data.companyInfo).toEqual(allData.companyInfo);
    expect(response.totalRecords).toEqual(allData.employees.length);
  });
  it("fetches employees data with descending filter", async () => {
    const filterType = {
      type: "firstName",
      isReverse: true,
      isFilterClicked: true,
    };
    const response = await fetchEmployeeData(page, pageDataLimit, filterType);
    const sortedData = allData.employees.sort((a, b) =>
      a.firstName < b.firstName ? 1 : -1
    );
    expect(response.data.employeesData).toEqual(sortedData.slice(0, 2));
    expect(response.data.companyInfo).toEqual(allData.companyInfo);
    expect(response.totalRecords).toEqual(allData.employees.length);
  });
  it("handles error", async () => {
    const filterType = {
      type: "invalidField",
      isReverse: false,
      isFilterClicked: true,
    };
    try {
      await fetchEmployeeData(page, pageDataLimit, filterType);
    } catch (error) {
      expect(error.message).toBe("Error fetching employees");
    }
  });
  it("fetches employees data with delay", async () => {
    const filterType = { type: "", isReverse: false, isFilterClicked: false };
    const start = Date.now();
    const response = await fetchEmployeeData(page, pageDataLimit, filterType);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(100);
    expect(response.data.employeesData).toEqual(allData.employees.slice(0, 2));
    expect(response.data.companyInfo).toEqual(allData.companyInfo);
    expect(response.totalRecords).toEqual(allData.employees.length);
  });
});

describe("employeesDataSaga", () => {
  const mockAction = {
    payload: {
      page: 1,
      pageDataLimit: 5,
      filterType: { type: "", isReverse: false, isFilterClicked: false },
    },
  };
  const mockResponse = {
    data: {
      employeesData: allData.employees.slice(0, 5),
      companyInfo: allData.companyInfo,
    },
    totalRecords: allData.employees.length,
  };
  it("fetches employees successfully", () => {
    return expectSaga(fetchEmployees, mockAction)
      .provide([
        [
          call(fetchEmployeeData, 1, 5, mockAction.payload.filterType),
          mockResponse,
        ],
      ])
      .put(
        fetchEmployeesSuccess(
          mockResponse.data,
          mockResponse.totalRecords,
          mockResponse.data.companyInfo
        )
      )
      .run();
  });
  it("handles errors", () => {
    const error = new Error("Error fetching employees");
    return expectSaga(fetchEmployees, mockAction)
      .provide([
        [
          call(fetchEmployeeData, 1, 5, mockAction.payload.filterType),
          Promise.reject(error),
        ],
      ])
      .put(fetchEmployeesFailure(error.message))
      .run();
  });
  it("watches for FETCH_EMPLOYEES_REQUEST action", () => {
    testSaga(watchFetchEmployees)
      .next()
      .takeLatest("FETCH_EMPLOYEES_REQUEST", fetchEmployees)
      .next()
      .isDone();
  });
});
