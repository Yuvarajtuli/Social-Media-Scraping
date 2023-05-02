import React, { useContext, useState } from 'react'
import { DataContext, FiltersContext, ThemeContext } from '../../pages/main';
import QuoraIcon from '../../icons/quora-icon';
import YoutubeIcon from '../../icons/youtube-icon';
import RedditIcon from '../../icons/reddit-icon';
import BoxRow from '../../mini-components/flexbox-row';
import TwitterIcon from '../../icons/twitter-icon';
import Box from '../../mini-components/box';
import Select from '../../mini-components/select';
import SelectItem from '../../mini-components/select-item';
import BoxColumn from '../../mini-components/flexbox-column';
import filterAndSortData from '../../utils/filterAndSortData';
import DateFilter from '../../mini-components/date-filter';

const selectItems = [
    'Highest Likes',
    'Highest comments',
    'Date (Ascending order)',
    'Date (Descending order)'
]

/**
 * @param {React.State} showFilter
 * @param {React.SetStateAction} setShowFilter
 */

function FilterModal({ showFilters, setShowFilters, showSettings, setShowSettings }) {
    const Theme = useContext(ThemeContext);
    const Filters = useContext(FiltersContext);
    const Data = useContext(DataContext);
    const { entireData, changeData } = Data;
    const { quoraSelected, setQuoraSelected, twitterSelected, setTwitterSelected, youtubeSelected, setYoutubeSelected, redditSelected, setRedditSelected, sortSelectValue, setSortSelectValue, typeSelected, setTypeSelected, dateFilter, setDateFilter } = Filters
    const { themeValue, changeTheme } = Theme


    const toggler = (type) => {
        switch (type) {
            case 'quora':
                if (quoraSelected) setQuoraSelected(false)
                else setQuoraSelected(true);
                break;
            case 'youtube':
                if (youtubeSelected) setYoutubeSelected(false)
                else setYoutubeSelected(true);
                break;
            case 'reddit':
                if (redditSelected) setRedditSelected(false)
                else setRedditSelected(true);
                break;
            case 'twitter':
                if (twitterSelected) setTwitterSelected(false)
                else setTwitterSelected(true);
                break;
        }
    }
    const clickHandler = () => {
        const allowedTypes = [];
        if (quoraSelected) allowedTypes.push('quora');
        if (youtubeSelected) allowedTypes.push('youtube');
        if (twitterSelected) allowedTypes.push('twitter');
        if (redditSelected) allowedTypes.push('reddit');
        const result = filterAndSortData(allowedTypes, sortSelectValue, entireData, typeSelected, dateFilter)
        changeData([...result]);
    }
    return (
        <div
            style={{
                transition: 'slideInRight',
                display: !showFilters && 'none',
                background: themeValue === 'dark' ? '#555' : 'white'
            }}
            className={`${showFilters ? "w-[350px]" : "w-[0px]"} slideInRight p-[20px] bg-white rounded-tl-[20px] rounded-bl-[20px] top-[200px] fixed right-[0px] z-[1000] shadow-v6 ${themeValue === 'dark' ? "bg-[#333]" : "bg-white"}`}>
            <Box className='text-[30px] font-bold text-blue border-b-[1px] border-[#E9E9E9]'>
                Filters
            </Box>
            <Box className={`font-bold text-[#444] text-[20px] my-[10px] flex gap-[5px]`}>
                <div className={`${themeValue === 'dark' ? 'text-white' : 'text-[#444]'}`}>Select</div> <span className='text-[#4DB7FE]'>type</span>
            </Box>
            <BoxRow className='gap-[35px]'>
                <div role='button' aria-describedby='button' onClick={() => {
                    if (typeSelected === 'both') setTypeSelected('mca')
                    else if (typeSelected === 'mca') setTypeSelected('both')
                }} className={`px-[50px] py-[10px] shadow-v7 flex items-center justify-center gap-[5px] rounded-[5px] border-[1px]  ${typeSelected === 'bca' || typeSelected === 'both' ? "text-blue text-[15px] border-blue" : themeValue === 'dark' ? "text-[#444]" : "text-black text-[15px] border-[#e6e6e6]"}`}>
                    BCA
                </div>
                <div role='button' aria-describedby='button' onClick={() => {
                    if (typeSelected === 'bca') setTypeSelected('both')
                    else if (typeSelected === 'both') setTypeSelected('bca')
                }} className={`px-[50px] py-[10px] shadow-v7 flex items-center justify-center gap-[5px] rounded-[5px] border-[1px]  ${typeSelected === 'mca' || typeSelected === 'both' ? "text-blue text-[15px] border-blue" : themeValue === 'dark' ? "text-[#444]" : "text-black text-[15px] border-[#e6e6e6]"}`}>
                    MCA
                </div>
            </BoxRow>
            <Box className='font-bold text-[#444] text-[20px] my-[10px] flex gap-[6px]'>
                <div className={`${themeValue === 'dark' ? 'text-white' : 'text-[#444]'}`}>Select</div> <span className='text-[#4DB7FE]'>social media</span>
            </Box>
            <BoxRow className='gap-[25px]' style={{ flexWrap: 'wrap' }}>
                <div role='button' aria-describedby='button' onClick={() => toggler('quora')} className={`px-[30px] py-[10px] shadow-v7 flex items-center justify-center gap-[5px] rounded-[5px] border-[1px] ${quoraSelected ? "text-blue border-blue" : themeValue === 'dark' ? "text-[#444]" : "text-[#444]"}`}>
                    <QuoraIcon onClick={() => toggler('quora')} width='18px' height='18px' fill={`${quoraSelected ? "#4DB7FE" : "#444"}`} /> Quora
                </div>
                <div role='button' aria-describedby='button' onClick={() => toggler('youtube')} className={`px-[30px] py-[10px] gap-[5px] shadow-v7 flex items-center justify-center rounded-[5px] border-[1px]  ${youtubeSelected ? "text-blue border-blue" : themeValue === 'dark' ? "text-[#444]" : "text-[#444]"}`}>
                    <YoutubeIcon onClick={() => toggler('youtube')} width='18px' height='18px' fill={youtubeSelected ? "#4DB7FE" : "#444"} /> Youtube
                </div>
                <div role='button' aria-describedby='button' onClick={() => toggler('reddit')} className={`px-[30px] py-[10px] gap-[5px] shadow-v7 flex items-center justify-center rounded-[5px] border-[1px] ${redditSelected ? "text-blue border-blue" : themeValue === 'dark' ? "text-[#444] " : "text-[#444]"}`}>
                    <RedditIcon onClick={() => toggler('reddit')} width='18px' height='18px' fill={redditSelected ? "#4DB7FE" : "#444"} /> Reddit
                </div>
                <div role='button' aria-describedby='button' onClick={() => toggler('twitter')} className={`px-[30px] py-[10px] gap-[5px] shadow-v7 flex items-center justify-center rounded-[5px] border-[1px]  ${twitterSelected ? "text-blue border-blue" : themeValue === 'dark' ? "text-[#444]" : "text-[#444]"}`}>
                    <TwitterIcon onClick={() => toggler('twitter')} width='18px' height='18px' fill={twitterSelected ? "#4DB7FE" : "#444"} /> Twitter
                </div>
            </BoxRow>
            <Box className={`${(redditSelected && !twitterSelected && !youtubeSelected && !quoraSelected) ? 'flex' : 'hidden'} font-bold text-[#444] text-[20px] my-[20px] `}>
                <span className='text-[#4DB7FE]'>Sort by</span>
                <Select value={sortSelectValue} onChange={(e) => setSortSelectValue(e.target.value)} >
                    {selectItems.map((item, idx) => {
                        return <SelectItem value={item} key={idx} />
                    })}
                </Select>
            </Box>
            <Box>
                <DateFilter
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                />
            </Box>
            <div className='w-[100%] flex items-center justify-center pt-[30px]'>
                <div role='button' aria-describedby='button' className='w-[80%] flex items-center justify-center text-white bg-blue p-[10px] rounded-[3px] my-[10px] shadow-v2 '
                    onClick={() => {
                        setShowFilters(false)
                        clickHandler();
                    }}
                >
                    Apply
                </div>
            </div>
        </div >
    )
}

export default FilterModal;