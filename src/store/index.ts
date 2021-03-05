import {createStore, combineReducers} from 'redux';
import {buttonReducer, fetchReducer} from "./reducer";


const reducer = combineReducers({value: buttonReducer, results: fetchReducer});
const initialState = JSON.parse(localStorage.getItem('storeState')) || {
    value: {
        hint: true,
        started: false,
        difficulty: "EASY",
        isSecondColor: false,
        time: 0,
        isSolved: false,
        show: true,
        startTimer: false,
        autoSolution: false,
        soundValue: 100,
    },
    results: {
        list: [42134, 41234, 54353],
    }
};
const store = createStore(reducer, initialState);

export function saveState() {
    localStorage.setItem('storeState', JSON.stringify(store.getState()));
}

export default store;