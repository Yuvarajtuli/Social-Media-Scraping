import React, { useContext } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box } from '@mui/material';
import { ThemeContext } from '../../pages/main';


function DateFilter({ value, onChange }) {
    const Theme = useContext(ThemeContext);
    const { themeValue } = Theme;
    return (
        <FormControl>
            <Box className='font-bold text-[#444] text-[20px] my-[10px] flex gap-[5px]'>
                <div className={`${themeValue === 'dark' ? 'text-white' : 'text-[#444]'}`}>Select</div> <span className='text-[#4DB7FE]'>date</span>
            </Box>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={value}
                onChange={onChange}

            >
                <FormControlLabel defaultChecked sx={{ color: themeValue === 'dark' ? 'white' : 'black' }} value="None" control={<Radio />} label="None" />
                <FormControlLabel sx={{ color: themeValue === 'dark' ? 'white' : 'black' }} value="Past week" control={<Radio />} label="Past week" />
                <FormControlLabel sx={{ color: themeValue === 'dark' ? 'white' : 'black' }} value="Past month" control={<Radio />} label="Past month or months" />
                <FormControlLabel sx={{ color: themeValue === 'dark' ? 'white' : 'black' }} value="Past year" control={<Radio />} label="Past years" />
            </RadioGroup>
        </FormControl>
    )
}

export default DateFilter