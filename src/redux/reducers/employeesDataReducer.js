const initialState = {
    data: [],
    totalRecords: 0,
    currentPage: 1,
    pageDataLimit: 5,
    loading: false,
    error: null,
  };
  const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_EMPLOYEES_REQUEST':
        return {
          ...state,
          loading: true,
        };
  case 'FETCH_EMPLOYEES_SUCCESS':
        return {
          ...state,
          loading: false,
          data: action.payload.data.employeesData,
          totalRecords: action.payload.totalRecords,
          companyData: action.payload.data.companyInfo,
        };
  case 'FETCH_EMPLOYEES_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case 'SET_CURRENT_PAGE':
        return {
          ...state,
          currentPage: action.payload ,
        };
  default:
        return state;
    }
  };
  
  export default employeeReducer;