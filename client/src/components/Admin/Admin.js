import React from 'react';
import '../../css/Admin.css'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminLayout from './Admin-Layout';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    }
}));

export default function Admin() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AdminLayout />
        </div>
    );
}