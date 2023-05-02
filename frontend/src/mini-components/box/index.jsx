import React from 'react'

/**
 * @param {React.ReactNode} children
 * @param {String} className
 * @param {React.CSSProperties} style
 */
function Box({ children, className, style }) {
    return (
        <div className={className}
            style={style}
        >
            {children}
        </div>
    )
}

export default Box