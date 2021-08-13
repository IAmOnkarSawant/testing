import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { loginUser } from '../../redux/actions/authActions'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        // marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3, 0, 3, 0)
    },
    avatar: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(3)
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(5),
    },
    submit: {
        margin: theme.spacing(4, 0, 0),
    },
}));

function SignIn(props) {
    const classes = useStyles();

    const [emailId, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const condition = !emailId || !password

    const handleSubmit = (e) => {
        e.preventDefault()
        // window.location.reload();
        const datamain = {
            emailId,
            password
        }
        console.log(datamain)
        setPassword('')
        props.loginUser(datamain, props.history)
    }

    if(localStorage.jwtToken){
        props.history.push('/categories/')
    }

    return (
        <Container className="login__container" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar} style={{ backgroundColor: 'transparent' }}>
                    <LockOutlinedIcon style={{ color: 'black', transform: 'scale(1.5)' }} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log In
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="emailId"
                                label="Email Address"
                                name="emailId"
                                autoComplete="emailId"
                                autoFocus
                                value={emailId}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={condition ? (classes.submit + ' btn_disable') : (classes.submit + ' lr__button')}
                        disabled={condition}
                    >
                        Log In
                    </Button>
                </form>
            </div>
        </Container >
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { loginUser })(withRouter(SignIn))