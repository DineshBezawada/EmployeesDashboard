import { combineReducers } from 'redux';
import employeeReducer from './employeesDataReducer';

const rootReducer = combineReducers({
  employee: employeeReducer,
});

export default rootReducer;