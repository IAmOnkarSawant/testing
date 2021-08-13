import ReactLoading from 'react-loading'
import React from 'react'

const ProfileLoader = () => {
    return (
        <ReactLoading className="profile-loader" type="bars" color="black" height="70px" width="70px" />
    )
}

export default ProfileLoader;