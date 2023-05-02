import { Switch, TextField } from '@mui/material';
import React, { useContext, useState } from 'react'
import { SettingsContext, ThemeContext } from '../../pages/main';


/**
 * @param {React.State} showSettings
 * @param {React.SetStateAction} setShowSettings
 */

function SettingsModal({ showSettings, setShowSettings, showFilters, setShowFilters }) {
    const Theme = useContext(ThemeContext);
    const { themeValue, changeTheme } = Theme;
    const [themeChecked, setThemeChecked] = useState(false);


    const Settings = useContext(SettingsContext);
    const { setActiveExportType, activeExportType, location, weather, setWeather, setLocation } = Settings;

    const toggleThemeHandler = () => {
        if (themeValue === 'dark') {
            changeTheme('light');
            setThemeChecked(false);
        }
        else {
            changeTheme('dark');
            setThemeChecked(true);
        }
    }

    const locationHandler = (e) => {
        setLocation(e.target.value);
    }

    const weatherHandler = () => {
        if (weather === 'celcius') setWeather('farhenite')
        else setWeather('celcius');
    }

    const exportTypeHandler = () => {
        if (activeExportType === 'json') setActiveExportType('csv')
        else setActiveExportType('json');
    }

    if (!showSettings) {
        return <></>
    }
    return (
        <div
            style={{
                transition: '0.2s ease-all',
                background: themeValue === 'dark' ? '#444' : 'white'
            }}
            className={`${showSettings ? "w-[350px]" : "w-[0px]"} slideInRight p-[20px] bg-white rounded-tl-[20px] rounded-bl-[20px] top-[200px] fixed right-[0px] z-[1000] shadow-v6 ${themeValue === 'dark' ? "bg-[#333]" : "bg-white"}`}>
            <div className='text-[30px] text-blue font-bold border-b-[1px] border-[#E6E6E6]'>Settings</div>
            <div className=''>
                <div className={`${themeValue === 'dark' ? 'text-white' : 'text-black'} text-[24px] font-bold text-[#444444] gap-[40px]  my-[15px] flex-col justify-center items-center`}>
                    Weather
                    <div className='flex mt-[10px] gap-[35px]'>
                        <div role='button' aria-describedby='button' onClick={weatherHandler} className={`px-[30px] py-[10px] shadow-v7 flex items-center justify-center rounded-[5px] border-[1px]  ${weather === 'celcius' ? "text-blue text-[15px] border-blue" : themeValue !== 'dark' ? "text-black text-[15px] border-[#e6e6e6]" : "text-white text-[15px] border-[#e6e6e6]"}`}>Celcius</div>
                        <div role='button' aria-describedby='button' onClick={weatherHandler} className={`px-[30px] py-[10px]  shadow-v7 flex items-center justify-center  rounded-[5px] border-[1px]  ${weather === 'farhenite' ? "text-blue text-[15px] border-blue" : themeValue !== 'dark' ? "text-black text-[15px] border-[#e6e6e6]" : "text-white text-[15px] border-[#e6e6e6]"}`}>Farhenite</div>
                    </div>
                </div>
                <div className={`${themeValue === 'dark' ? 'text-white' : 'text-black'} text-[24px] font-bold text-[#444444] flex flex-col gap-[10px] my-[15px]`}>
                    Location
                    <div>
                        <input
                            className={` searchbar
                            ${themeValue === 'dark' ? 'bg-[#444]' : 'bg-white'}
                            tracking-[1px]
                            w-[100%]
                            text-[13px]
                            text-[#999]
                            flex 
                            items-center 
                            gap-[15px] 
                            rounded-[5px]
                            shadow-v7 
                            px-[20px] 
                            py-[10px]
                            border-[#e6e6e6]
                            border-[1px]
                            `}
                            value={location}
                            type='text'
                            onChange={(e) => setLocation(e.target.value)} />
                    </div>
                </div>
                <div className={`${themeValue === 'dark' ? 'text-white' : 'text-black'} text-[24px] font-bold text-[#444444] gap-[40px] my-[15px]`}>
                    Export type
                    <div className='flex mt-[10px] gap-[35px] text-[15px]'>
                        <div role='button'
                            aria-describedby='button'
                            onClick={exportTypeHandler}
                            className={`py-[10px] px-[30px] rounded-[5px] border-[1px] shadow-v7  ${activeExportType === 'json' ? "text-blue border-blue" : themeValue !== 'dark' ? "text-black border-[#e6e6e6]" : "text-white"}`}>
                            JSON
                        </div>
                        <div
                            role='button'
                            aria-describedby='button'
                            onClick={exportTypeHandler}
                            className={`py-[10px] px-[30px] rounded-[5px] border-[1px] shadow-v7  ${activeExportType === 'csv' ? "text-blue border-blue" : themeValue !== 'dark' ? "text-black border-[#e6e6e6]" : "text-white"}`}>

                            CSV</div>
                    </div>
                </div>
                <div className='flex items-center gap-[10px]'>
                    <div>
                        <svg width="19" height="19" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.167 15.833a.833.833 0 0 1 .833.834v.833a.833.833 0 0 1-1.667 0v-.833a.833.833 0 0 1 .834-.834ZM3.75 13.75a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 0 1-1.18-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm10.833 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.179 1.178l-1.25-1.25a.833.833 0 0 1 .59-1.422ZM9.167 5a4.167 4.167 0 1 1 0 8.334 4.167 4.167 0 0 1 0-8.334Zm-7.5 3.333a.833.833 0 0 1 0 1.667H.833a.833.833 0 1 1 0-1.667h.834Zm15.833 0a.833.833 0 0 1 0 1.667h-.833a.833.833 0 0 1 0-1.667h.833Zm-1.667-6.666a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 1 1-1.179-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm-13.333 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.18 1.178L1.91 3.09a.833.833 0 0 1 .59-1.422ZM9.167 0A.833.833 0 0 1 10 .833v.834a.833.833 0 1 1-1.667 0V.833A.833.833 0 0 1 9.167 0Z"
                                fill="#828FA3" />
                        </svg>
                    </div>
                    <Switch onChange={toggleThemeHandler} checked={themeChecked} />
                    <div>
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.474.682c.434-.11.718.406.481.78A6.067 6.067 0 0 0 6.01 4.72c0 3.418 2.827 6.187 6.314 6.187.89.002 1.77-.182 2.584-.54.408-.18.894.165.724.57-1.16 2.775-3.944 4.73-7.194 4.73-4.292 0-7.771-3.41-7.771-7.615 0-3.541 2.466-6.518 5.807-7.37Zm8.433.07c.442-.294.969.232.674.674l-.525.787a1.943 1.943 0 0 0 0 2.157l.525.788c.295.441-.232.968-.674.673l-.787-.525a1.943 1.943 0 0 0-2.157 0l-.786.525c-.442.295-.97-.232-.675-.673l.525-.788a1.943 1.943 0 0 0 0-2.157l-.525-.787c-.295-.442.232-.968.674-.673l.787.525a1.943 1.943 0 0 0 2.157 0Z"
                                fill="#828FA3" />
                        </svg>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SettingsModal;