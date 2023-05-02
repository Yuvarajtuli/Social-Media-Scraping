import React from 'react'

/**
 * @param {Boolean} forMobileNavbar
 * @param {String} className
 */
function FilterIcon({ forMobileNavbar, className }) {
    if (forMobileNavbar) {
        return <svg width="40" style={{ scale: '1.5' }} height="40" viewBox="0 0 29 29" fill="black" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 7.55542V3.38886C2 2.62182 2.62182 2 3.38886 2H25.6107C26.3777 2 26.9994 2.62174 26.9996 3.38872L27 7.55542M2 7.55542L11.237 15.4729C11.5448 15.7368 11.722 16.1219 11.722 16.5273V25.2206C11.722 26.1241 12.5712 26.7872 13.4477 26.568L16.2254 25.8736C16.8437 25.719 17.2775 25.1635 17.2775 24.5261V16.5274C17.2775 16.1219 17.4545 15.7368 17.7624 15.4729L27 7.55542M2 7.55542H27" stroke="white" stroke-width="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    }
    else
        return (
            <svg width="22" height="22" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 7.55542V3.38886C2 2.62182 2.62182 2 3.38886 2H25.6107C26.3777 2 26.9994 2.62174 26.9996 3.38872L27 7.55542M2 7.55542L11.237 15.4729C11.5448 15.7368 11.722 16.1219 11.722 16.5273V25.2206C11.722 26.1241 12.5712 26.7872 13.4477 26.568L16.2254 25.8736C16.8437 25.719 17.2775 25.1635 17.2775 24.5261V16.5274C17.2775 16.1219 17.4545 15.7368 17.7624 15.4729L27 7.55542M2 7.55542H27" stroke="white" stroke-width="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

        )
}

export default FilterIcon
