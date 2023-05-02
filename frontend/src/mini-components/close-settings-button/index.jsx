import React from 'react'
import CloseIcon from '../../icons/close-icon'
import PrimaryButton from '../primaryButton'

/**
 * @param {React.SetStateAction<HTMLButtonElement>} onClick
 * @param {React.CSSProperties} style
 */

function CloseSettingsButton({ onClick, style }) {
    return (
        <PrimaryButton
            onClickHandler={onClick}
            style={
                { width: '60px', ...style }
            }>
            <CloseIcon />
        </PrimaryButton>
    )
}

export default CloseSettingsButton