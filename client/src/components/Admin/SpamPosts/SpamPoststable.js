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

export default function SpamPoststable({ spamPosts, setSpamPosts }) {
    const classes = useStyles();

    const handleDelete = (postId) => {
        Axios.delete(`/admin/deletepost/${postId}`)
            .then(({ data: { message } }) => {
                console.log('Spam Post Removed Successfully')
                toast.dark(message, AdminOptions)
                const PostNew = spamPosts.filter(post => post._id !== postId)
                setSpamPosts(PostNew)
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }

    const handleUnmarkSpamPost = (postId) => {
        Axios.patch(`/admin/revivepost/`, { postId })
            .then(({ data: { message } }) => {
                console.log('Category Removed Successfully')
                toast.dark(message, AdminOptions)
            })
            .catch(error => {
                console.log(error.response.data)
            })
        const PostNew = spamPosts.filter(post => post._id !== postId)
        setSpamPosts(PostNew)
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">PostID</StyledTableCell>
                        <StyledTableCell align="left">CreatedAt</StyledTableCell>
                        <StyledTableCell align="left">PostContent</StyledTableCell>
                        <StyledTableCell align="left">Accessibilty</StyledTableCell>
                        <StyledTableCell align="left">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {spamPosts && spamPosts.length > 0 ? spamPosts.map((post, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                                {post._id}
                            </StyledTableCell>
                            <StyledTableCell align="left">{moment(post.createdAt).format('LL')}</StyledTableCell>
                            <StyledTableCell align="left">{post.postContent.replace(/<br\s*\/?>/gi, ' ').substr(0, 80) + '...'}</StyledTableCell>
                            <StyledTableCell align="left">{post.accessibilty}</StyledTableCell>
                            <StyledTableCell align="left">
                                <Fab className="fab" size="small" onClick={() => handleDelete(post._id)} color="secondary" aria-label="delete" >
                                    <DeleteOutlineIcon />
                                </Fab>
                                <Fab onClick={() => handleUnmarkSpamPost(post._id)} className="fab" size="small" color="primary" aria-label="review" >
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
