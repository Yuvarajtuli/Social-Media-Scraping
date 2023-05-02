import React, { createContext, useContext, useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import Post from '../../components/post'
import SettingsButton from '../../mini-components/settings-button'
import FilterButton from '../../mini-components/filter-button'
import BoxColumn from '../../mini-components/flexbox-column'
import Box from '../../mini-components/box'
import SettingsModal from '../../components/settingsWidget'
import CloseSettingsButton from '../../mini-components/close-settings-button'
import mockFinal from '../../assets/mockFinal.json';
import shuffleArray from '../../utils/shuffleArray'
import { Pagination, Skeleton } from '@mui/material'
import MainPageFooter from '../../components/post/footer'
import FilterModal from '../../components/filterWidget'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import filterBySearch from '../../utils/filterBySearch'
import WeatherBox from '../../mini-components/weather-box'
import BoxRow from '../../mini-components/flexbox-row'


export const ThemeContext = createContext();
export const DataContext = createContext();
export const LoadingContext = createContext();
export const FiltersContext = createContext();
export const SearchContext = createContext();
export const SettingsContext = createContext();


function PostWidgetIcons({ showSettings, setShowSettings, showFilters, setShowFilters, showSettingsHandler, closeEverything }) {
    if (!showSettings && !showFilters) {
        return <BoxColumn className={`fixed ${(showSettings || showFilters) ? "right-[360px]" : "right-[0px]"} top-[250px] gap-[40px] mobile:hidden tablet:flex`}>
            <SettingsButton onClick={showSettingsHandler} style={{ 'borderRadius': '10px 0px 0px 10px' }} />
            <FilterButton
                onClick={() => {
                    setShowFilters(true)
                    setShowSettings(false)
                }}
                style={{ 'borderRadius': '10px 0px 0px 10px' }}

            />
        </BoxColumn>
    }
    else if (showSettings && !showFilters) {
        return <BoxColumn className={`fixed ${(showSettings || showFilters) ? "right-[360px]" : "right-[0px]"} top-[250px] gap-[40px] mobile:hidden tablet:flex z-[1000]`}>
            <CloseSettingsButton className='' onClick={closeEverything} style={{ 'borderRadius': '10px 0px 0px 10px' }} />
            <FilterButton
                onClick={() => {
                    setShowFilters(true)
                    setShowSettings(false);
                }}
                style={{ 'borderRadius': '10px 0px 0px 10px' }}

            />
        </BoxColumn>
    }
    else if (!showSettings && showFilters) {
        return <BoxColumn className={`fixed ${(showSettings || showFilters) ? "right-[360px]" : "right-[0px]"} top-[250px] gap-[40px] mobile:hidden tablet:flex z-[1000]`}>
            <CloseSettingsButton onClick={closeEverything} style={{ 'borderRadius': '10px 0px 0px 10px' }} />
            <SettingsButton onClick={showSettingsHandler} style={{ 'borderRadius': '10px 0px 0px 10px' }} />
        </BoxColumn>
    }
}

function MainPage() {
    const [data, setData] = useState(mockFinal);
    const [filteredData, setFilteredData] = useState(() => shuffleArray(mockFinal));
    const [viewableData, setViewabaleData] = useState([]);
    const [theme, setTheme] = useState('light');
    const [showSettings, setShowSettings] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [percentageLoadingDone, setPercentageLoadingDone] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    const [quoraSelected, setQuoraSelected] = useState(true);
    const [youtubeSelected, setYoutubeSelected] = useState(true);
    const [redditSelected, setRedditSelected] = useState(true);
    const [twitterSelected, setTwitterSelected] = useState(true);
    const [sortSelectValue, setSortSelectValue] = useState('Highest Likes');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [typeSelected, setTypeSelected] = useState('both');
    const [dateFilter, setDateFilter] = useState('None');
    const [searchValue, setSearchValue] = useState('');
    const [pageCount, setPageCount] = useState(1);
    const [activeExportType, setActiveExportType] = useState('json');
    const [weather, setWeather] = useState('celcius');
    const [location, setLocation] = useState('Noida');
    const navigate = useNavigate();

    useEffect(() => {
        let storageName = localStorage.getItem('name');
        let storageEmail = localStorage.getItem('email');
        if (!storageName || !storageEmail) {
            navigate('/')

        }
        else {
            setName(storageName)
            setEmail(storageEmail)
        }
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = theme === 'dark' ? "#222222" : "#F8F8F8";
    }, [theme]);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://dark-sky.p.rapidapi.com/%7Blatitude%7D,%7Blongitude%7D',
            params: { units: 'auto', lang: 'en' },
            headers: {
                'X-RapidAPI-Key': '89a8c45c63msh7d82a06bd9adcb1p1ffb66jsn9a8f11b00ce0',
                'X-RapidAPI-Host': 'dark-sky.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }, []);


    const showSettingsHandler = () => {
        setShowSettings(true);
        setShowFilters(false)
    }

    const closeEverything = () => {
        setShowSettings(false);
        setShowFilters(false)
    }

    const paginationHandler = (e, value) => {
        setCurrentPage(value);
    }

    useEffect(() => {
        if (Math.floor((filteredData.length) / 10) === 1) {
            setViewabaleData(filteredData)
        }
        else {
            if (filteredData.length > 10) {
                const newData = filteredData.slice(currentPage * 10, (currentPage + 1) * 10);
                setPageCount(filteredData.length > 10 ? Math.floor((filteredData.length) / 10) : 1);
                setViewabaleData([...newData])
            }
            else {
                setPageCount(filteredData.length > 10 ? Math.floor((filteredData.length) / 10) : 1)
                setViewabaleData([...filteredData])
            }
        }

    }, [currentPage, filteredData]);

    useEffect(() => {
        if (!searchValue.length) {
            if (filteredData.length > 10) {
                const newData = filteredData.slice(currentPage * 10, (currentPage + 1) * 10);
                setViewabaleData([...newData])
                setPageCount(filteredData.length > 10 ? Math.floor((filteredData.length) / 10) : 1)
            }
            else {
                setPageCount(filteredData.length > 10 ? Math.floor((filteredData.length) / 10) : 1)
                setViewabaleData([...filteredData])
            }
        }
        else {
            const searchFilteredResults = filterBySearch(filteredData, searchValue)
            if (searchFilteredResults.length > 10) {
                const newData = searchFilteredResults.slice(currentPage * 10, (currentPage + 1) * 10);
                setViewabaleData([...newData])
            }
            else {
                setViewabaleData([...searchFilteredResults])
            }
            setPageCount(searchFilteredResults.length > 10 ? Math.floor((searchFilteredResults.length) / 10) : 1)
        }
    }, [searchValue])

    useEffect(() => {
        console.log(Array.from(document.querySelectorAll('li > button')).forEach((item) => {
            item.style.color = theme === 'dark' ? '#fff' : 'black'
        }))
    }, [theme])

    return (
        <ThemeContext.Provider value={{ themeValue: theme, changeTheme: setTheme }}>
            <DataContext.Provider value={{ entireData: data, dataValue: filteredData, changeData: setFilteredData, viewableData: viewableData }}>
                <LoadingContext.Provider value={{ percentageValue: percentageLoadingDone, setPercentage: setPercentageLoadingDone, setLoading: setIsLoading }}>
                    <FiltersContext.Provider value={{ quoraSelected: quoraSelected, setQuoraSelected: setQuoraSelected, twitterSelected: twitterSelected, setTwitterSelected: setTwitterSelected, youtubeSelected: youtubeSelected, setYoutubeSelected: setYoutubeSelected, redditSelected: redditSelected, setRedditSelected: setRedditSelected, sortSelectValue: sortSelectValue, setSortSelectValue: setSortSelectValue, typeSelected: typeSelected, setTypeSelected: setTypeSelected, dateFilter: dateFilter, setDateFilter: setDateFilter }}>
                        <SearchContext.Provider value={{ searchValue: searchValue, setSearchValue: setSearchValue }}>
                            <SettingsContext.Provider value={{ activeExportType: activeExportType, setActiveExportType: setActiveExportType, weather: weather, setWeather: setWeather, location: location, setLocation: setLocation }}>
                                <div className={`${theme === 'dark' ? "bg-lightDark" : "bg-grey"} w-[100vw] h-[100vh] relative fadeIn`}>
                                    <PostWidgetIcons showSettings={showSettings} setShowSettings={setShowSettings} showSettingsHandler={showSettingsHandler} closeEverything={closeEverything} showFilters={showFilters} setShowFilters={setShowFilters} />
                                    <Navbar />
                                    <div className='mt-[20px] '></div>
                                    <SettingsModal
                                        showSettings={showSettings}
                                        setShowSettings={setShowSettings}
                                        showFilters={showFilters}
                                        setShowFilters={setShowFilters}
                                    />
                                    <FilterModal
                                        showFilters={showFilters}
                                        setShowFilters={setShowFilters}
                                        showSettings={showSettings}
                                        setShowSettings={setShowSettings}
                                    />

                                    <Box className='w-[100%] flex items-center justify-center' style={{ overflowX: 'hidden' }} >
                                        <Box className='w-[80%]'>
                                            <BoxRow className='justify-between items-center'>
                                                <DashboardWelcomeText name={name} email={email} />
                                                <WeatherBox city={location} type={weather} />
                                            </BoxRow>
                                            <Box className='grid mobile:grid-cols-1 desktop:grid-cols-8 gap-[20px] w-[100%] h-[100%] p-[20px]'>
                                                {isLoading ?
                                                    <>
                                                        <div className='flex flex-col col-span-3 tablet:gap-[20px] mobile:gap-[20px]'>
                                                            <Skeleton variant='rounded' width={'400px'} height='300px' />
                                                            <Skeleton variant='rounded' width={'400px'} height='600px' />
                                                        </div>
                                                        <div className='flex flex-col col-span-2 tablet:gap-[20px] mobile:gap-[20px]'>
                                                            <Skeleton variant='rounded' width={'264px'} height='300px' />
                                                            <Skeleton variant='rounded' width={'264px'} height='300px' />
                                                            <Skeleton variant='rounded' width={'264px'} height='300px' />
                                                            <Skeleton variant='rounded' width={'264px'} height='300px' />
                                                        </div>
                                                        <div className='flex flex-col col-span-3 tablet:gap-[20px] mobile:gap-[20px]'>
                                                            <Skeleton variant='rounded' width={'400px'} height='300px' />
                                                            <Skeleton variant='rounded' width={'400px'} height='300px' />
                                                            <Skeleton variant='rounded' width={'400px'} height='300px' />
                                                            <Skeleton variant='rounded' width={'400px'} height='300px' />
                                                        </div>

                                                    </>
                                                    :
                                                    <>
                                                        <div className='flex flex-col col-span-3 tablet:gap-[20px] mobile:gap-[20px]'>
                                                            {viewableData.slice(0, Math.floor(viewableData.length / 3)).map((item, idx) => {
                                                                return <Post
                                                                    key={idx}
                                                                    details={item}
                                                                />
                                                            })}
                                                        </div>
                                                        <div className='flex flex-col gap-[20px] col-span-2'>
                                                            {viewableData.slice(Math.floor(viewableData.length / 3), Math.floor(viewableData.length / 3) * 2).map((item, idx) => {
                                                                return <Post
                                                                    key={idx}
                                                                    details={item}
                                                                />
                                                            })}
                                                        </div>
                                                        <div className='flex flex-col gap-[20px] col-span-3'>
                                                            {viewableData.slice(Math.floor(viewableData.length / 3) * 2, viewableData.length).map((item, idx) => {
                                                                return <Post
                                                                    key={idx}
                                                                    details={item}
                                                                />
                                                            })}
                                                        </div>
                                                    </>
                                                }
                                            </Box>
                                            {!viewableData.length && <div className='flex flex-col items-center justify-center my-[30px]'>
                                                <img width={'100px'} src='https://i.ibb.co/CWYMH04/no-results.png' alt='no-data' />
                                                <div className='text-[20px]' style={{ color: theme === 'dark' ? 'white' : '#444' }}>No records found!</div>
                                            </div>}
                                        </Box>
                                    </Box>

                                    <Box className='flex items-center justify-center pb-[120px] pt-[50px]'>
                                        <Pagination
                                            style={{
                                                "color": "white",
                                                "background": theme === 'dark' ? "#333" : "#fff",
                                                "borderRadius": "20px",
                                                "fontSize": "18px",
                                                "padding": "10px 20px 10px 20px",
                                                "boxShadow": "0px 0px 32px 2px rgba(0,0,0,0.1)",
                                            }}
                                            size='large'
                                            count={pageCount}
                                            page={currentPage}
                                            onChange={paginationHandler}
                                            color="primary"
                                            showFirstButton
                                            showLastButton
                                            sx={{
                                                "Button.MuiPaginationItem-rounded.Mui-selected": {
                                                    color: '#fff'
                                                }
                                            }}
                                        />
                                    </Box>
                                    <MainPageFooter />
                                </div>
                            </SettingsContext.Provider>
                        </SearchContext.Provider>
                    </FiltersContext.Provider>
                </LoadingContext.Provider>
            </DataContext.Provider>
        </ThemeContext.Provider>
    )
}

function DashboardWelcomeText({ name = 'Guest', email = 'guest@gmail.com' }) {
    const Theme = useContext(ThemeContext);
    const { themeValue } = Theme;
    return <div className='flex flex-col ml-[25px] mb-[30px]'>
        <div className={`text-[24px] text-[#444] font-bold ${themeValue === 'dark' ? 'text-white' : 'text-[#444]'}`}>
            Your Feeds
            <span className='text-blue text-[24px]' style={{ letterSpacing: '0.16em' }} > {name} </span>
        </div>
        <div className='text-[16px] text-[#999]' style={{ lineHeight: '22px' }}>
            {email}
        </div>
    </div>

}

export default MainPage
