import React from 'react'

/**
 * @param {String} width
 * @param {String} height
 */

function SearchIcon({
    width = '18',
    height = '18'
}) {
    return (
        <svg width={width}
            height={height}
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M18.5 18.5L24 24" stroke="#4DB7FE" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 11.4286C2 16.6358 6.22131 20.8571 11.4286 20.8571C14.0367 20.8571 16.3976 19.7982 18.1045 18.0867C19.8055 16.3812 20.8571 14.0277 20.8571 11.4286C20.8571 6.22131 16.6358 2 11.4286 2C6.22131 2 2 6.22131 2 11.4286Z" stroke="#4DB7FE" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    )
}

export default SearchIcon
