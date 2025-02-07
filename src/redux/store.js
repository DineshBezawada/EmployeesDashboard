import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import watchTableData from './sagas/employeesDataSaga';
import rootReducer from './reducers/rootReducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchTableData);

export default store;