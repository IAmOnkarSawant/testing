import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { registerUser } from '../../redux/actions/authActions'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(2, 0, 0),
    },
}));

function SignUp(props) {
    const classes = useStyles();

    const [userName, setUserName] = useState('')
    const [emailId, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const condition = !emailId || !password || !userName

    const handleSubmit = (e) => {
        e.preventDefault()
        const datamain = {
            userName,
            emailId,
            password
        }
        console.log(datamain)
        setPassword('')
        props.registerUser(datamain, props.history)
    }

    if(localStorage.jwtToken){
        props.history.push('/categories/')
    }

    return (
        <Container className="register__container">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar} style={{backgroundColor : 'transparent'}}>
                    <LockOutlinedIcon style={{color : 'black',transform : 'scale(1.5)'}}/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="userName"
                                name="userName"
                                variant="outlined"
                                required
                                fullWidth
                                id="userName"
                                label="User Name"
                                autoFocus
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="emailId"
                                label="Email Address"
                                name="emailId"
                                autoComplete="emailId"
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
                        Sign Up
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default connect(null, { registerUser })(withRouter(SignUp))