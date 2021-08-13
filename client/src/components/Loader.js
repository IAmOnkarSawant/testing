import ReactLoading from 'react-loading'
import React from 'react'
import Layout from './Layout'

const Loader = () => {
    return (
        <Layout>
            <ReactLoading className="loader_react" type="bars" color="black" height="100px" width="100px" />
        </Layout>
    )
}

export default Loader;