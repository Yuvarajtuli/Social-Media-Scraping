import React from 'react'

/**
 * @param {String} className
 * @param {React.ReactNode} children
 * @param {React.CSSProperties} style
 */

function BoxRow({ className, children,style }) {
    return (
        <div className={`flex flex-row ${className}`} style={style}>
            {children}
        </div>
    )
}

export default BoxRow;