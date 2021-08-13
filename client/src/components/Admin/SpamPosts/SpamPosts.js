import React from 'react';
import '../../../css/Admin.css'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import AdminLayout from '../Admin-Layout';
import { useEffect } from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { connect } from 'react-redux'
import SpamPoststable from './SpamPoststable';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function SpamPosts(props) {
    const classes = useStyles();
    const [spamPosts, setSpamPosts] = useState([])

    useEffect(() => {
        Axios.get(`/admin/spamposts/`)
            .then(({ data }) => {
                setSpamPosts(data.spamPosts)
                console.log(data)
            })
            .catch(error => {
                console.log(error.response.message)
            })
    }, [])

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AdminLayout />
            <main className={classes.content}>
                <Toolbar />
                <SpamPoststable spamPosts={spamPosts} setSpamPosts={setSpamPosts} />
            </main>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(SpamPosts);