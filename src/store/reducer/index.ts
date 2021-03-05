import {BUTTON_INPUT} from '../actions/ButtonInput';
import {UPDATE_TIME} from "../actions/UpdateTime";
import {CHANGE_HINT} from "../actions/ChangeHint";
import {START_GAME} from "../actions/StartGame";
import {CHANGE_DIFFICULTY} from "../actions/ChangeDifficulty";
import {CHANGE_COLOR} from "../actions/ChangeColor";
import {CHANGE_IS_SOLVED} from "../actions/ChangeIsSolved";
import {CHANGE_SHOW} from "../actions/ChangeEnableToShowModal";
import {START_TIMER} from "../actions/StartTimer";
import {FETCH_COMPLETED} from "../actions/FetchCompleted";
import {CHANGE_AUTO_SOLUTION} from "../actions/ChangeAutoSolution";
import {SET_SOUND_VOLUME} from "../actions/SetVolume";
import {SET_SOUND_PLAY} from "../actions/SetSoundPlay";

const buttonReducer = (state = {}, action) => {

        function change_difficulty() {
            return {...state, difficulty: action.value, autoSolution: false};
        }

        function start_game() {
            if (action.value)
                return {
                    ...state, started: action.value, time: 0, isSolved: false,
                    show: true, startTimer: false, autoSolution: false
                };
            else
                return {...state, started: action.value};
        }

        function input_value() {
            return {...state, soundPlay: true, buttonInput: action.value};
        }

        function auto_play() {
            console.log("-----------");
            console.log("auto_play: " + action.value);
            if (action.value)
                return {
                    ...state, time: 0,
                    isSolved: false, show: true, autoSolution: true, startTimer: false
                };
            else
                return {...state, autoSolution: action.value};
        }


    switch (action.type) {
            case BUTTON_INPUT :
                return input_value();
            case UPDATE_TIME:
                return {...state, time: action.value};
            case CHANGE_HINT:
                return {...state, hint: action.value};
            case START_GAME:
                return start_game();
            case CHANGE_DIFFICULTY:
                return change_difficulty();
            case CHANGE_COLOR:
                return {...state, isSecondColor: action.value};
            case CHANGE_IS_SOLVED:
                return {...state, isSolved: action.value};
            case CHANGE_SHOW:
                return {...state, show: action.value};
            case START_TIMER:
                return {...state, startTimer: action.value};
            case CHANGE_AUTO_SOLUTION:
                return auto_play();
            case SET_SOUND_VOLUME:
                return {...state, soundVolume: +action.value};
            case SET_SOUND_PLAY:
                return {...state, soundPlay: action.value};
            default :
                return state
        }

    }
;


const fetchReducer = (state = {}, action) => {
        switch (action.type) {
            case FETCH_COMPLETED :
                return {...state, list: action.value};
            default :
                return state
        }

    }
;
export {buttonReducer, fetchReducer};