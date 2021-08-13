import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

function EntryContainer(props) {
    const [isClicked, setIsClicked] = useState(false)
    if (isClicked) {
        return (
            <Redirect push to="/categories/" />
        )
    }
    return (
        <div>
            <p className="Explore_title">
                Welcome To SourceZilla
            </p>
            <p style={{maxWidth : '500px',color : 'grey',fontSize : '18px'}}>A resource sharing platform for keen learner's around the globe.</p>
            <Button onClick={() => setIsClicked(true)} className="explore_btn">
                Explore
            </Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(EntryContainer)
