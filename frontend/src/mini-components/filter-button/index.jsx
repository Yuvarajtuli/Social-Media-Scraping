import React from 'react'
import PrimaryButton from '../primaryButton'
import FilterIcon from '../../icons/filter-icon'


/**
 * @param {React.CSSProperties} style
 * @param {React.SetStateAction<HTMLButtonElement>} onClick
 */
function FilterButton({ style, onClick }) {
    return (
        <PrimaryButton
            onClickHandler={onClick}
            style={
                {
                    width: '60px',
                    ...style
                }
            }>
            <FilterIcon />
        </PrimaryButton>
    )
}

export default FilterButton
