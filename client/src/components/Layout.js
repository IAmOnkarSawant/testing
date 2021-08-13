import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

function Layout({ children }) {
    const [scrollable, setScrollable] = useState(false)
    
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const handleScroll = () => {
        if (window.scrollY >= 250) {
            setScrollable(true)
        } else {
            setScrollable(false)
        }
    }

    return (
        <div className="layout__container">
            <Navbar scrollClass={scrollable} />
            {children}
        </div>
    )
}

export default Layout
