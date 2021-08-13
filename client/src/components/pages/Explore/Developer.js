import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
});

function Developer({ name, imageURL }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img
                className="developer_image"
                alt={name}
                src={imageURL}
            />
            <h2
                style={{ marginTop: '20px' }}
                className=""
            >
                {name}
            </h2>
        </div>
    )
}

export default Developer
