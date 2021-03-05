import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useSelector} from 'react-redux'
import {format} from "../Timer";


const resultsState = state => state.results.list;

export default function TableOfResults() {

    const rows = useSelector(resultsState);

    return (
        <TableContainer component={Paper} id="result-table">
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Difficulty</TableCell>
                        <TableCell align="right">Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.user}>
                            <TableCell component="th" scope="row">
                                {row.user}
                            </TableCell>
                            <TableCell align="right">{row.difficulty}</TableCell>
                            <TableCell
                                align="right">{format(Math.floor(row.time / 60))}:{format(row.time % 60)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}