import React from 'react'
import BoxRow from '../../../mini-components/flexbox-row';

function SpecialText({ children }) {
    return <span className='text-[#4DB7FE] font-bold' style={{ letterSpacing: '0.1em' }}>
        {children}
    </span>
}

function MainPageFooter() {
    return (
        <BoxRow className=' w-[100%] bg-[#2E3F6E] h-[30px]  fixed bottom-[0px] justify-between items-center py-[40px] mt-[30px]'>
            <BoxRow className='gap-[15px]'>
                <span className='text-white ml-[30px]'>Copyrights 2023 @</span> <SpecialText>Yuvaraj Tuli</SpecialText> <span className='text-white'>,</span> <SpecialText>Sanchit Tewari</SpecialText>
            </BoxRow>
            <BoxRow className='gap-[15px] text-white mr-[25px]'>
                <a href='' >Presentation</a>
                <a href='' >Structure</a>
            </BoxRow>
        </BoxRow>
    )
}

export default MainPageFooter;