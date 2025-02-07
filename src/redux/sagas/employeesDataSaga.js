import { all, call, put, takeLatest } from "redux-saga/effects";
import { allData } from "../../utils/data";
import {
  fetchEmployeesSuccess,
  fetchEmployeesFailure,
} from "../actions/employeesDataAction";
export const fetchEmployeeData = async (
  page,
  pageDataLimit,
  filterType,
  searchQuery
) => {
  try {
    const startIndex = (page - 1) * pageDataLimit;
    const endIndex = startIndex + pageDataLimit;
    
    let sortedData = allData?.employees?.toSorted((a, b) => {
      if (filterType.isReverse) {
        if (a[filterType.type] < b[filterType.type]) {
          return 1;
        }
        if (a[filterType.type] > b[filterType.type]) {
          return -1;
        }
        return 0;
      } else {
        if (a[filterType.type] > b[filterType.type]) {
          return 1;
        }
        if (a[filterType.type] < b[filterType.type]) {
          return -1;
        }
        return 0;
      }
    });
    const APiData = {
      data: {
        employeesData:
          filterType?.type?.length > 0
            ? sortedData.slice(startIndex, endIndex)
            : allData?.employees.slice(startIndex, endIndex),
        companyInfo: allData?.companyInfo,
      },
      totalRecords:
        //  500,
        allData?.employees?.length,
    };
    const repsonse = await APiData;
    if (filterType?.type?.length <= 0) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return repsonse;
    } else {
      return repsonse;
    }
  } catch (err) {
    throw new Error("Error fetching employees");
  }
};
export function* fetchEmployees(action) {
  const { page, pageDataLimit, filterType } = action.payload;

  try {
    const response = yield call(
      fetchEmployeeData,
      page,
      pageDataLimit,
      filterType
    );
    yield put(
      fetchEmployeesSuccess(
        response.data,
        response.totalRecords,
        response.companyInfo
      )
    );
  } catch (error) {
    yield put(fetchEmployeesFailure(error.message));
  }
}
function* watchFetchEmployees() {
  yield takeLatest("FETCH_EMPLOYEES_REQUEST", fetchEmployees);
}

export default watchFetchEmployees;
