import React, { useState } from 'react';
import '../../../css/Admin.css'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import AdminLayout from '../Admin-Layout';
import { useEffect } from 'react';
import Axios from 'axios';
import SpamCategoriesTable from './SpamCategoriesTable';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function SpamCategories() {
    const classes = useStyles();
    const [spamCategories, setSpamCategories] = useState([])

    useEffect(() => {
        Axios.get(`/admin/spamcategories/`)
            .then(({ data }) => {
                setSpamCategories(data.spamcategories)
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
                <SpamCategoriesTable spamCategories={spamCategories} setSpamCategories={setSpamCategories} />
            </main>
        </div>
    );
}