import React from 'react'

/**
 * @param {React.CSSProperties} style
 * @param {String} children
 * @param {React.SetStateAction<HTMLButtonElement>} onClick
 * @param {Boolean} forLandingPage
 */


function PrimaryButton({ style, children, onClickHandler, forLandingPage }) {
    return (
        <div role='button' aria-describedby='button' style={{...style,transition:'0.2s'}}
            onClick={onClickHandler}
            className={`
            hover:bg-blueHover
            ${forLandingPage ? 'w-[375px] h-[84px]' : " bigScreens:w-[150px] tablet:w-[120px]   mobile:w-[100px]"}
            h-[50px] 
            rounded-[3px] 
            flex 
            items-center 
            justify-center bg-blue 
            text-white 
            font-bold
            text-[16px]
            leading-[27px]
            tablet:shadow-v2 
            mobile:shadow-v3
     
            `}>
            {children} </div>
    )
}

export default PrimaryButton;