import React from 'react'
import '../../css/Explore.css'
import Navbar from './Explore/Navbar'
import { Container, Grid } from '@material-ui/core'
import EntryContainer from './Explore/EntryContainer'
import databse from './Explore/undraw_co-working_825n (1).svg'
import Card from './Explore/Card'
import Developer from './Explore/Developer'
import { Element } from 'react-scroll'
import { Fetaures, ProfileImages, Why } from './Explore/Data'

function Explore() {
    return (
        <>
            <Element name="Home" className="home">
                <Navbar />
                <Container fixed>
                    <Grid
                        container
                        spacing={0}
                        alignItems="center"
                        justify="center"
                        style={{ height: 'calc(100vh - 0px)' }}
                    >
                        <Grid item lg={6} md={6}  >
                            <EntryContainer />
                        </Grid>
                        <Grid item lg={6} md={6} >
                            <img className="illustration_image" height="570px" src={databse} alt="" />
                        </Grid>
                    </Grid>
                </Container>
            </Element>
            <Element name="AboutUs" className="aboutus">
                <Container fixed
                    alignItems="flex-start"
                    justify="center"
                    style={{ minHeight: 'calc(100vh - 0px)' }}
                >
                    <p className="aboutUs">Answering The Question Why?</p>
                    <hr style={{
                        border: "0",
                        height: "4px",
                        backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0),  #05A54B, rgba(0, 0, 0, 0))",
                    }} />
                    <Grid
                        container
                        spacing={0}
                    >
                        <Grid item lg={12} >
                            <p className="why_content" dangerouslySetInnerHTML={{ __html: Why }} style={{ paddingTop: '55px' }} />
                        </Grid>
                    </Grid>
                </Container>
            </Element>
            <Element name="Features" className="features">
                <Container maxWidth="lg"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: 'calc(100vh - 0px)' }}
                >
                    <p className="Features">Features</p>
                    <hr style={{
                        border: "0",
                        height: "4px",
                        backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0),  #05A54B, rgba(0, 0, 0, 0))",
                    }} />
                    <Grid
                        container
                        spacing={5}
                        style={{ paddingTop: '50px' }}
                    >
                        {
                            Fetaures.map(({ feature, info, image }) => {
                                return (
                                    <Grid key={feature} item lg={4} md={4} sm={6} >
                                        <Card feature={feature} info={info} image={image} />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Container>
            </Element>
            <Element name="Developers" className="developers">
                <Container maxWidth="lg"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: 'calc(100vh - 0px)' }}
                >
                    <p className="Developers">Our Team</p>
                    <hr style={{
                        border: "0",
                        height: "4px",
                        backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0),  #05A54B, rgba(0, 0, 0, 0))",
                    }} />
                    <Grid
                        container
                        spacing={2}
                        style={{ paddingTop: '100px' }}
                    >
                        {
                            ProfileImages.map(({ name, imageURL }) => {
                                return (
                                    <Grid key={name} item lg={3} md={3} sm={6} xs={12} >
                                        <Developer name={name} imageURL={imageURL} />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Container>
            </Element>
        </>
    )
}

export default Explore
