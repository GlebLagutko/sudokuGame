import React, {useState} from 'react';

import {Button, Modal} from 'react-bootstrap';
import store, {saveState} from "../store";
import {format} from "../Timer";
import {useDispatch, useSelector} from 'react-redux'
import {CHANGE_SHOW} from "../store/actions/ChangeEnableToShowModal";
import {TextField} from "@material-ui/core";
import {gql, useMutation} from "@apollo/client";
import {clientQuery} from "../client";
import {UPDATE_TIME} from "../store/actions/UpdateTime";

//
const isSolved = state => state.value.isSolved;
const isShow = state => state.value.show;
const isAuto = state => state.value.autoSolution;

const ADD_GAME = gql`
    mutation AddGame($user:String!,$difficulty:String!,$time:Int!){
        addGame(user:$user,difficulty:$difficulty,time:$time){
            user
        }

    }
`;


export function EndGameModal() {

    const solved = useSelector(isSolved);
    const dispatch = useDispatch();
    const [inputValue, setInput] = useState('');

    const show = useSelector(isShow);
    const autosolution = useSelector(isAuto);


    const [addTodo] = useMutation(ADD_GAME);

    const handleClose = () => {
        addTodo({
            variables: {
                user: inputValue,
                // @ts-ignore
                difficulty: store.getState().value.difficulty,
                // @ts-ignore
                time: store.getState().value.time
            }
        }).then(() => {
            clientQuery();
            localStorage.setItem('time', JSON.stringify(0));
            dispatch({type: UPDATE_TIME, value: 0});
            dispatch({type: CHANGE_SHOW, value: false});
            saveState();
        });


    };

    // @ts-ignore
    const time: number = store.getState().value.time;

    return (
        <>
            <Modal show={show && solved && !autosolution} keyboard={false} cenetered>
                <Modal.Header>
                    <Modal.Title>You solved it !</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Your time : {format(Math.floor(time / 60)) + ":" + format(time % 60)}</p>
                    <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(event => {
                        setInput(event.target.value);
                    })}/>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose} disabled={!inputValue.trim()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}