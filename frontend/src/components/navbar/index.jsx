import React, { useContext } from 'react'
import Searchbar from '../../mini-components/searchbar';
import Logo from '../../icons/logo';
import PrimaryButton from '../../mini-components/primaryButton';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '../../mini-components/box';
import ExportIcon from '../../icons/export-icon';
import AnalyticsIcon from '../../icons/analytics-icon';
import SettingsIcon from '../../icons/settings-icon';
import FilterIcon from '../../icons/filter-icon';
import { DataContext, LoadingContext, SearchContext, SettingsContext, ThemeContext } from '../../pages/main';
import regenerateData from '../../utils/regenerateData';
import { postNewlyGeneratedData } from '../../utils/api-calls';


/**
 * @param {Boolean} showMobileNavbar
 */

function Navbar() {
    const Theme = useContext(ThemeContext);
    const Data = useContext(DataContext);
    const Loading = useContext(LoadingContext);
    const Search = useContext(SearchContext);
    const Settings = useContext(SettingsContext);
    const { activeExportType } = Settings;
    const { searchValue, setSearchValue } = Search
    const { changeData, viewableData, dataValue } = Data;
    const { percentageValue, setPercentage, setLoading } = Loading;
    const { themeValue, changeTheme } = Theme;

    const regenerateHandler = () => {
        setLoading(true);
        document.title = 'Fetching...'
        regenerateData().then((newData) => {
            console.log(newData);
            changeData(newData);
            setLoading(false);
            document.title = 'Dashboard'
        }).catch(() => {
            setLoading(false);
            document.title = 'Dashboard'
        })
    }

    const searchChangeHandler = (e) => {
        setSearchValue(e.target.value);
    }

    const clickHandler = (e) => {
        e.preventDefault();
        const fn = async () => {
            if (activeExportType === 'json') {
                if (searchValue.length) {
                    await postNewlyGeneratedData(viewableData, 'json')
                }
                else {
                    await postNewlyGeneratedData(dataValue, 'json')
                }

            }
            else {
                if (searchValue.length) {
                    await postNewlyGeneratedData(viewableData, 'csv')
                }
                else {
                    await postNewlyGeneratedData(dataValue, 'csv')
                }

            }

            setTimeout(() => {
                document.getElementById('exportDataId').click();
            }, 3000);
        }
        fn();
    }

    return (
        <div className={`w-[100%]  tablet:h-[130px] flex items-center mobile:py-[15px] tablet:px-[20px] mobile:h-[175px] justify-around tablet:flex-row mobile:flex-col shadow-v5 ${themeValue === 'dark' ? "bg-lightBlack" : "bg-white"}`}>
            <Logo />

            {/* <div></div> */}
            <Searchbar value={searchValue} onChange={searchChangeHandler} />
            <Box className='flex items-center gap-[30px] mobile:hidden tablet:flex'>
                <div onClick={clickHandler}>
                    <PrimaryButton
                    >
                        Export data
                    </PrimaryButton>
                </div>
                <a style={{ display: 'hidden' }} href={activeExportType === 'json' ? `http://localhost:5173/scratchMedia.json` : 'http://localhost:5173/scratchMediaa.xlsx'} download target='_blank' id='exportDataId' ></a>
                <PrimaryButton
                    onClickHandler={regenerateHandler}
                >Regenerate data</PrimaryButton>
            </Box>

            <Box className={`z-[1000] absolute bottom-[0] flex mobile:flex tablet:hidden justify-around items-center w-[100%] bg-white`}>
                <BottomNavigation>
                    <BottomNavigationAction label='Export'
                        icon={<ExportIcon />} />
                    <BottomNavigationAction label='Analytics'
                        icon={<AnalyticsIcon />} />
                    <BottomNavigationAction label='Filter'
                        icon={
                            <FilterIcon
                                forMobileNavbar />
                        } />
                    <BottomNavigationAction label='Settings'
                        icon={
                            <SettingsIcon
                            forMobileNavbar />
                        } />
                </BottomNavigation>
            </Box>
        </div>
    )
}

export default Navbar;
