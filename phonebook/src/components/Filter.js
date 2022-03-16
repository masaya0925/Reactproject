import React from 'react'

// eslint-disable-next-line react/prop-types
function Filter({ newFilter, handleFilterChange }) {
    return (
        <form>
            <div>
        filter showm with:
                {' '}
                <input
                    value={newFilter}
                    onChange={handleFilterChange}
                />
            </div>
        </form>
    )
}

export default Filter
