import rootReducer from '../rootReducer';

describe('rootReducer', () => {
  test('should return the initial state', () => {
    const initialState = {
      employee: {
        data: [],
        totalRecords: 0,
        currentPage: 1,
        pageDataLimit: 5,
        loading: false,
        error: null,
      },
    };
    expect(rootReducer(undefined, {})).toEqual(initialState);
  });
test('should handle FETCH_EMPLOYEES_REQUEST action', () => {
    const action = {
      type: 'FETCH_EMPLOYEES_REQUEST',
    };
    const expectedState = {
      employee: {
        data: [],
        totalRecords: 0,
        currentPage: 1,
        pageDataLimit: 5,
        loading: true,
        error: null,
      },
    };
    expect(rootReducer(undefined, action)).toEqual(expectedState);
  });
test('should handle FETCH_EMPLOYEES_SUCCESS action', () => {
    const action = {
      type: 'FETCH_EMPLOYEES_SUCCESS',
      payload: {
        data: {
          employeesData: [{ id: 1, name: 'John Doe' }],
companyInfo: { companyName: 'Test Company', companyMotto: 'Test Motto', companyEst: '2022-01-01T00:00:00Z' },
        },
        totalRecords: 1,
      },
    };
const initialState = {
      employee: {
        data: [],
        totalRecords: 0,
        currentPage: 1,
        pageDataLimit: 5,
        loading: false,
        error: null,
      },
    };
const expectedState = {
      employee: {
        ...initialState.employee,
        loading: false,
        data: [{ id: 1, name: 'John Doe' }],
        totalRecords: 1,
companyData: { companyName: 'Test Company', companyMotto: 'Test Motto', companyEst: '2022-01-01T00:00:00Z' },
      },
    };
    expect(rootReducer(initialState, action)).toEqual(expectedState);
  });

test('should handle SET_CURRENT_PAGE action', () => {
    const action = {
      type: 'SET_CURRENT_PAGE',
      payload: 2,
    };
    const initialState = {
      employee: {
        data: [],
        totalRecords: 0,
        currentPage: 1,
        pageDataLimit: 5,
        loading: false,
        error: null,
      },
    };
const expectedState = {
      employee: {
        ...initialState.employee,
        currentPage: 2,
      },
    };
    expect(rootReducer(initialState, action)).toEqual(expectedState);
  });
});