import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Fab } from '@material-ui/core';
import Axios from 'axios';
import { toast } from "react-toastify";
import { AdminOptions } from '../../../utils/utils';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function UsersTable({ users, setUsers }) {
    const classes = useStyles();

    const handleDelete = (id) => {
        Axios.delete(`/register/deleteuser/${id}`)
            .then(({ data: { msg } }) => {
                const usersNew = users.filter(user => user._id !== id)
                setUsers(usersNew)
                console.log('User Removed Successfully')
                toast.dark('👦' + msg, AdminOptions)
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>UserID</StyledTableCell>
                        <StyledTableCell align="left">UserName</StyledTableCell>
                        <StyledTableCell align="left">EmailId</StyledTableCell>
                        <StyledTableCell align="left">Role</StyledTableCell>
                        <StyledTableCell align="left">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users && users.length > 0 ? users.map((user, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                                {user._id}
                            </StyledTableCell>
                            <StyledTableCell align="left">{user.userName}</StyledTableCell>
                            <StyledTableCell align="left">{user.emailId}</StyledTableCell>
                            <StyledTableCell align="left"> <strong>{user.role}</strong> </StyledTableCell>
                            <StyledTableCell align="left">
                                <Fab className="fab" size="small" onClick={() => handleDelete(user._id)} color="secondary" aria-label="delete" >
                                    <DeleteOutlineIcon />
                                </Fab>
                            </StyledTableCell>
                        </StyledTableRow>
                    )) : (
                            <div className="loader">
                                <h4 style={{ textAlign: 'center' }} >No data found</h4>
                            </div>
                        )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
