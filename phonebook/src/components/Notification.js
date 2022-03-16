import React from 'react'

// eslint-disable-next-line react/prop-types
function Notification({ message, type }) {
    if (message === null) {
        return null
    }
    return (
        <div className={type}>
            {message}
        </div>
    )
}

export default Notification
