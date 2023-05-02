import React, { useContext } from 'react'
import SearchIcon from '../../icons/search-icon';
import { ThemeContext } from '../../pages/main';


/**
 * @param {String} value
 * @param {React.SetStateAction} onChange
 */


function Searchbar({ value, onChange }) {
    const Theme = useContext(ThemeContext);
    const { themeValue } = Theme;
    return (
        <div className={`
        searchbar
        flex 
        items-center 
        gap-[15px] 
        rounded-[5px] 
        bg-white 
        shadow-v1 
        px-[10px] 
        mobile:w-[90%] 
        mobile:h-[60px] 
        bigMobile:w-[400px]
        tablet:w-[300px] 
        desktop:w-[400px] 
        bigScreens:w-[750px]
        font-primary
        ${themeValue === 'dark' ? 'bg-[#555555]' : 'bg-white'}
        `}
        style={{background:themeValue==='dark'?'#555555':'white'}}
        >
            <SearchIcon />
            <input type='text' className={`w-[100%] h-[100%] ${themeValue === 'dark' ? 'bg-[#555555] text-white' : 'bg-white text-black'}`}
                value={value}
                onChange={onChange}
                placeholder={"Search on post content"}
            />
        </div>
    )
}

export default Searchbar;
