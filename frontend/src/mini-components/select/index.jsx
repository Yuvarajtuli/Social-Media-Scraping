import React, { useContext } from 'react'
import { ThemeContext } from '../../pages/main';

/**
 * @function Select
 * @param {React.Component} children For rendering options
 * @param  {String} value The currently selected option
 * @param {React.SetStateAction<HTMLSelectElement>} onChange Called on onChange handler 
 * @param {Boolean} disabled 
 */


function Select({ children, value, onChange, disabled }) {
    const Theme = useContext(ThemeContext);
    const { themeValue } = Theme;

    return (
        <div className='w-[100%]'>
            <select
                value={value}
                style={{ background: themeValue !== 'dark' ? "#fff" : '#000' }}
                onChange={onChange}
                className='border-[1px]  border-[#E6E6E6] py-[10px] text-[14px] w-[100%] mt-[5px]'

            >
                {children}
            </select>
        </div>
    )
}

export default Select;