import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Fab } from '@material-ui/core';
import Axios from 'axios';
import { toast } from "react-toastify";
import { AdminOptions } from '../../../utils/utils';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ReplayIcon from '@material-ui/icons/Replay';
import moment from 'moment'

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

export default function SpamCategoriesTable({ spamCategories, setSpamCategories }) {
    const classes = useStyles();

    const handleDelete = (categoryId) => {
        Axios.delete(`/admin/deletecategory/${categoryId}`)
            .then(({ data: { message } }) => {
                const categoryNew = spamCategories.filter(category => category._id !== categoryId)
                setSpamCategories(categoryNew)
                console.log('Spam Category Removed Successfully')
                toast.dark(message, AdminOptions)
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }

    const handleUnmarkSpamPost = (categoryId) => {
        Axios.patch(`/admin/revivecategory/`, { categoryId })
            .then(({ data: { message } }) => {
                console.log('Category Removed Successfully')
                toast.dark(message, AdminOptions)
            })
            .catch(error => {
                console.log(error.response.data)
            })
        const categoryNew = spamCategories.filter(category => category._id !== categoryId)
        setSpamCategories(categoryNew)
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">CategoryID</StyledTableCell>
                        <StyledTableCell align="left">CreatedAt</StyledTableCell>
                        <StyledTableCell align="left">CategoryName</StyledTableCell>
                        <StyledTableCell align="left">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {spamCategories && spamCategories.length > 0 ? spamCategories.map((category, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                                {category._id}
                            </StyledTableCell>
                            <StyledTableCell align="left">{moment(category.createdAt).format('LL')}</StyledTableCell>
                            <StyledTableCell align="left">{category.categoryName}</StyledTableCell>
                            <StyledTableCell align="left">
                                <Fab className="fab" size="small" onClick={() => handleDelete(category._id)} color="secondary" aria-label="delete" >
                                    <DeleteOutlineIcon />
                                </Fab>
                                <Fab onClick={() => handleUnmarkSpamPost(category._id)} className="fab" size="small" color="primary" aria-label="review" >
                                    <ReplayIcon />
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
