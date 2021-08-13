import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/NotFoundPage.css'

function NotFoundPage({ message }) {
    return (
        <div className="error__page">
            <div id="error-page">
                <div class="content__error">
                    <h2 class="header" data-text="404">404</h2>
                    <h4 data-text="Opps! Page not found">
                        {message}
                    </h4>
                    <p>
                        Sorry, the page you're looking for doesn't exist. If you think something is broken, report a problem.
                    </p>
                    <div class="btns">
                        <Link className='a' to="/categories/" >return home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage
