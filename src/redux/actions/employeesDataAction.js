export const fetchEmployeesRequest = (page, pageDataLimit,filterType) => ({
    type: 'FETCH_EMPLOYEES_REQUEST',
    payload: { page, pageDataLimit, filterType },
  });
  
  export const fetchEmployeesSuccess = (data, totalRecords) => ({
    type: 'FETCH_EMPLOYEES_SUCCESS',
    payload: { data, totalRecords },
  });
  export const fetchEmployeesFailure = (error) => ({
    type: 'FETCH_EMPLOYEES_FAILURE',
    payload: error,
  });
  
  
  export const updateCurrentPage = (page) => ({
    type: 'SET_CURRENT_PAGE',
    payload: page,
  });