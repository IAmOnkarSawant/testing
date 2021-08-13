import React from 'react';
import '../../../css/Admin.css'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import AdminLayout from '../Admin-Layout';
import { useEffect } from 'react';
import Axios from 'axios';
import { useState } from 'react';
import UsersTable from './UsersTable';
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function UsersCollection(props) {
    const classes = useStyles();
    const [Users, setUsers] = useState([])

    useEffect(() => {
        Axios.get(`/register/getallusers/`)
            .then(({ data }) => {
                setUsers(data)
            })
    }, [])

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AdminLayout />
            <main className={classes.content}>
                <Toolbar />
                <UsersTable users={Users} setUsers={setUsers} />
            </main>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(UsersCollection);