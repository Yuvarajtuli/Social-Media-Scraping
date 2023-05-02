import React from 'react'

/**
 * @param {String} className
 * @param {React.ReactNode} children
 * @param {React.CSSProperties} style
 */


function BoxColumn({ className, children, style }) {
    return (
        <div className={`flex flex-col ${className}`} style={style}>
            {children}
        </div>
    )
}

export default BoxColumn