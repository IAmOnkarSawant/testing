import React, { useState } from 'react'
import '../../css/Categories.css'
import '../../css/Posts.css'
import Layout from '../Layout'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import { follow, reportFollowedCategory, followedCategories, unFollowFollowedCategory } from '../../redux/actions/postsActions'
import { profileDetails } from '../../redux/actions/profileAction'
import { Button, CircularProgress, Container, IconButton, Grid, Typography, CardActions, Card, CardContent, makeStyles } from '@material-ui/core'
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import FlagIcon from '@material-ui/icons/Flag';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import { capitalizeFirstLetter } from '../../utils/utils'
import { Waypoint } from 'react-waypoint'
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';

const useStyles = makeStyles((theme) => ({
    extendedIcon: {
        marginRight: theme.spacing(0),
    },
    leave_button: {
        marginTop: 20
    },
    formControl: {
        marginTop: '20px',
        minWidth: 200,
    },

    card: {
        borderRadius: '20px',
        boxShadow: '0 2px 4px rgb(24 4 50 / 24%)',
        '&:hover': {
            boxShadow: '0 4px 6px rgb(24 4 50 / 24%)'
        },
    },
    cardIcons: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    cardData: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
    },
    FUbutton: {
        background: 'linear-gradient( to right, rgb(4, 167, 77) 0%, #04795d 0%, #1db853 )',
        border: 0,
        borderRadius: 20,
        color: 'white',
        margin: theme.spacing(1)
    }
}));

function Categories(props) {
    const [pageNumber, setpageNumber] = useState(1);

    const { followedCategories, profileDetails } = props
    useEffect(() => {
        followedCategories(pageNumber)

        // store.dispatch({ type: 'CLEAN_POSTS' })
    }, [followedCategories, profileDetails, pageNumber])

    const Unfollow = (id) => {
        console.log(id)
        props.unFollowFollowedCategory(id)
    }

    const handleReportCategory = (id) => {
        props.reportFollowedCategory(id, props.auth.user.userId)
    }

    const fetcher = () => {
        setpageNumber(page => page + 1);
    }

    const dispatch = useDispatch();
    useEffect(() => {

        profileDetails()

        return () => {
            dispatch({ type: 'CLEAR_FOLLOWED_CATEGORIES' })
        }
    }, [dispatch, profileDetails])
    const classes = useStyles()
    return (
        <>
            <Layout>
                <Container maxWidth="xl" className="posts__container">
                    {/* <div className="categories">
                        <div className="grid__container_for_categories">
                            {props.categories.map((category, index) =>
                                category.spamFlag === false &&
                                <div key={index} className="content" >
                                    <div className="overlay">
                                        <Link to={`/categories/${category.categoryName}/${category._id}/`}>
                                            <button className="Stylishbtn style">{capitalizeFirstLetter(category.categoryName)}</button>
                                        </Link>
                                        <div className="followers_length">
                                            <PeopleAltOutlinedIcon className="people_icon" />
                                            {category.followers.length}
                                        </div>
                                    </div>
                                    <div className="category_card_follow_unfollow_buttons">
                                        {
                                            category.followers.includes(props.auth.user.userId) ? (
                                                <Button className="follow_btn" fullWidth onClick={() => Unfollow(category._id)} style={{ marginTop: '10px' }} size="small" variant="contained" color="secondary" >
                                                    UnFollow
                                                </Button>
                                            ) : (
                                                <Button className="Unfollow_btn" fullWidth onClick={() => follow(category._id)} style={{ marginTop: '10px' }} size="small" variant="contained" color="primary" >
                                                    Follow
                                                </Button>
                                            )
                                        }
                                    </div>
                                    <div className="category_card_report_button">
                                        {
                                            category.reports.includes(props.auth.user.userId) ? (
                                                <IconButton style={{ color: '#0FAB4A' }} onClick={() => handleReportCategory(category._id)} size="medium" variant="contained" color="default" >
                                                    <FlagIcon />
                                                </IconButton>
                                            ) : (
                                                <IconButton style={{ color: '#0FAB4A' }} onClick={() => handleReportCategory(category._id)} size="medium" variant="contained" color="default" >
                                                    <FlagOutlinedIcon />
                                                </IconButton>
                                            )
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </div> */}
                    <Grid justify="flex-start" container spacing={3}>
                        {props.categories.map((category, index) => {
                            return (
                                category.spamFlag === false &&
                                <Grid key={index} item xs={12} sm={4} md={4} lg={3}>
                                    <Card className={classes.card} >
                                        <CardContent>
                                            <div className={classes.cardIcons}>
                                                <IconButton component={Link} to={`/categories/${category.categoryName}/${category._id}/`} >
                                                    <OpenInBrowserIcon style={{ color: '#19AD55' }} fontSize="medium" />
                                                </IconButton>
                                                {
                                                    category.reports.includes(props.auth.user.userId) ? (
                                                        <IconButton onClick={() => handleReportCategory(category._id)} size="medium" variant="contained" color="default" >
                                                            <FlagIcon />
                                                        </IconButton>
                                                    ) : (
                                                        <IconButton onClick={() => handleReportCategory(category._id)} size="medium" variant="contained" color="default" >
                                                            <FlagOutlinedIcon />
                                                        </IconButton>
                                                    )
                                                }
                                            </div>
                                            <div className={classes.cardInfo}>
                                                <Typography gutterBottom variant="h6" color="default">
                                                    {capitalizeFirstLetter(category.categoryName)}
                                                </Typography>
                                                <div className={classes.cardData}>
                                                    <PeopleAltOutlinedIcon color="action" />
                                                    <Typography style={{ paddingLeft: '6px' }} color="default" >
                                                        {category.followers.length}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardActions>
                                            {
                                                category.followers.includes(props.auth.user.userId) ? (
                                                    <Button disableElevation className={classes.FUbutton} fullWidth onClick={() => Unfollow(category._id)} size="medium" variant="contained" color="default"  >
                                                        UnFollow
                                                    </Button>
                                                ) : (
                                                    <Button disableElevation className={classes.FUbutton} fullWidth onClick={() => follow(category._id)} size="medium" variant="contained" color="default" >
                                                        Follow
                                                    </Button>
                                                )
                                            }
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>

                {props.hasMore === true && props.isLoading === false && <Waypoint onEnter={fetcher} />}

                <br />
                {/* progress */}
                {(props.hasMore === true && (

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress size={60} thickness={3} />
                    </div>

                ))}
                <br />
            </Layout>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.posts.followedCategories,
        auth: state.auth,
        details: state.profile.details,
        isLoading: state.posts.isLoading,
        hasMore: state.posts.hasMore,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        profileDetails: () => dispatch(profileDetails()),
        reportFollowedCategory: (categoryId, userId) => dispatch(reportFollowedCategory(categoryId, userId)),
        followedCategories: (pageNumber) => dispatch(followedCategories(pageNumber)),
        unFollowFollowedCategory: (categoryId) => dispatch(unFollowFollowedCategory(categoryId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
