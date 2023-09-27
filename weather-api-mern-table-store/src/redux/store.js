import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { weatherReducer } from "./weatherApi/reducers/weatherReducer";
import { addEmployeeReducer, deleteEmployeeReducer, editEmployeeReducer, getEmployeeProfileReducer, getEmployeeTableReducer } from "./mernTable/reducers/employeeTableReducer";


const reducer = combineReducers({
    getCityWeatherDetails: weatherReducer,
    getEmployee: getEmployeeTableReducer,
    employeeProfile: getEmployeeProfileReducer,
    addEmployeeData: addEmployeeReducer,
    editEmployeeData: editEmployeeReducer,
    deleteEmployeeData: deleteEmployeeReducer,
});

const middlware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middlware))
);

export default store;