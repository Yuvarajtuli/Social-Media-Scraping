import React from 'react'
import PrimaryButton from '../primaryButton'
import SettingsIcon from '../../icons/settings-icon'

/**
 * @param {React.SetStateAction<HTMLButtonElement>} onClick
 * @param {React.CSSProperties} style
 */
function SettingsButton({ onClick, style }) {
    return (
        <PrimaryButton
            onClickHandler={onClick}
            style={
                { width: '60px', ...style }
            }>
            <SettingsIcon />
        </PrimaryButton >
    )
}

export default SettingsButton
