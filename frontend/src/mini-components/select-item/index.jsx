import React from 'react'

/**
 * 
 * @param {String} value
 * @param {String} children
 * @param {String} disabled
 * @returns 
 */
function SelectItem({ value, children, disabled }) {
    return (
        <option
            disabled={disabled}
            value={value}>
            {children ? children : value}
        </option>
    )
}

export default SelectItem