import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import WeatherIcon from '../../icons/weather-icon';
import { ThemeContext } from '../../pages/main';

/**
 * 
 * @param {String} city
 * @param {'c' | 'f'} type
 * @returns 
 */

function WeatherBox({ city = 'Noida', type = 'celcius' }) {
    const [temp, setTemp] = useState('');
    const Theme = useContext(ThemeContext);
    const { themeValue } = Theme;

    useEffect(() => {
        const fn = async () => {
            try {
                const { data } = await axios.get(`http://api.weatherapi.com/v1/current.json?key=b4edd81d1ff6449d8a385131230504&q=${city}&aqi=no`)
                type === 'celcius' ? setTemp(data.current.temp_c) : setTemp(data.current.temp_f);
                console.log(data.current.temp_c, data.current.temp_f)
            } catch (error) {
                console.log('error aya bc');
            }
        }
        fn();
    }, [city, type]);

    return (
        <div className={`${themeValue === 'dark' ? 'bg-[#444]' : 'bg-white'} p-[10px] w-[290px] h-[105px] shadow-v8 rounded-[20px] flex gap-[15px]`}>
            <WeatherIcon />
            <div className='flex flex-col gap-[0px]'>
                <div className='text-[16px] text-[#999]' style={{ letterSpacing: '0.04em', lineHeight: '22px' }}>{city}</div>
                <div className={`text-[32px] font-[600] ${themeValue==='dark'?"text-white":"text-[#555]"}`} style={{ lineHeight: '44px', letterSpacing: '0.04em' }} >{temp} {type === 'celcius' ? 'C' : 'F'}</div>
                <div className='text-blue font-[600] text-[16px]' style={{ fontWeight: 'bold', letterSpacing: '0.04em' }}>weatherapi.com</div>
            </div>
        </div>
    )
}

export default WeatherBox