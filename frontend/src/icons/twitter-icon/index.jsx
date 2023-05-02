import React from 'react'

/**
 * @param {'#4DB7FE' | 'black'} fill 
 * @param {React.SetStateAction<HTMLButtonElement>} onClick
 */


function TwitterIcon({ fill = '#4DB7FE', width = '40', height = '40', onClick }) {
    return (
        <svg width={width} role='button' aria-describedby='button'  onClick={onClick} height={height} viewBox="0 0 45 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.5 2.70582C42.5 2.70582 38.8311 4.87329 36.7909 5.48764C35.6958 4.22857 34.2405 3.33617 32.6218 2.93113C31.0031 2.52611 29.2991 2.62798 27.7402 3.223C26.1813 3.81802 24.8425 4.87746 23.9055 6.25802C22.9682 7.6386 22.4776 9.27369 22.5 10.9422V12.7604C19.3047 12.8432 16.1387 12.1346 13.2837 10.6975C10.4286 9.26049 7.97331 7.13969 6.13636 4.524C6.13636 4.524 -1.13636 20.8877 15.2273 28.1604C11.4828 30.7021 7.02211 31.9766 2.5 31.7968C18.8636 40.8877 38.8636 31.7968 38.8636 10.8876C38.862 10.3812 38.8133 9.87598 38.7182 9.37855C40.5738 7.54853 42.5 2.70582 42.5 2.70582Z" stroke={fill} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}

export default TwitterIcon