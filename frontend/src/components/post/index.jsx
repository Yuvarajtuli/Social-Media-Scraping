import React, { useContext, useEffect, useState } from 'react';
import PostTypeIcon from '../../mini-components/post-type-icon';
import Box from '../../mini-components/box';
import BoxColumn from '../../mini-components/flexbox-column';
import BoxRow from '../../mini-components/flexbox-row';
import LikeIcon from '../../icons/like-icon';
import CommentIcon from '../../icons/comment-icon';
import ShareIcon from '../../icons/share-icon';
import { ThemeContext } from '../../pages/main';
import ViewsIcon from '../../icons/views-icon';
import CopyIcon from '../../icons/copy-icon';



function getRandomNumber() {
    const random = Math.random();
    if (random < 0.7) {
        return Math.floor(Math.random() * 2000) + 1;
    } else {
        return Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
    }
}

/**
 * @param {"facebook" | "twitter" | "linkedin"} type
 * @param {String} title
 * @param {String} postedBy
 * @param {String} mainText
 * @param {String} postDate
 * @param {String} postAttachment
 * @param {String} postHref
 * @param {String} question
 */


function Post({ details }) {
    const Theme = useContext(ThemeContext);
    const { themeValue, changeTheme } = Theme;
    if (details.type === 'twitter') {
        const { type, like, link, name, handle, replies, retweets, text, timestamp } = details;
        return <a href={link} target='_blank'>
            <BoxColumn style={{ 'height': 'auto' }} className={`w-[100%] h-[375px] items-center justify-center shadow-v5 rounded-[20px] py-[20px] ${themeValue === 'dark' ? 'bg-black' : 'bg-white'}`}>
                <BoxColumn className='w-[90%]'>
                    <BoxRow className='gap-[15px]'>
                        <PostTypeIcon type={type} />
                        <BoxColumn>
                            <PostAuthor black>{handle}</PostAuthor>
                            <PostDate>{timestamp}</PostDate>
                        </BoxColumn>
                    </BoxRow>
                    <div className={`${themeValue === 'dark' ? "text-white" : "text-[#555555]"} text-[10px] mt-[10px]  mb-[20px]`} style={{ lineHeight: '18px', letterSpacing: '0.5px' }}>
                        {text}
                    </div>
                    <PostFooter textToBeCopied={link} likes={like ? like : '0'} comments={replies ? replies : '0'} />
                </BoxColumn>
            </BoxColumn >
        </a>
    }
    else if (details.type === 'youtube') {
        const { type, postedBy, mainText, postDate, views, embedUrl } = details;
        return <BoxColumn className=' w-[100%] mobile:h-[500px] tablet:h-[475px] bigScreens:h-[600px] desktop:h-[500px] bg-white shadow-v5 rounded-[20px]'>
            <iframe className='rounded-[20px]' src={embedUrl} height='100%' width='100%' title={mainText}>

            </iframe>
        </BoxColumn >
    }
    else if (details.type === 'quora') {
        const { type, question, answer, name, views, timestamp, link } = details;
        return (
            <a href={link} target='_blank'>
                <BoxColumn style={{ 'height': 'auto' }} className={`w-[100%] h-[375px] items-center justify-center shadow-v5 rounded-[20px] py-[20px] ${themeValue === 'dark' ? 'bg-black' : 'bg-white'}`}>
                    <BoxColumn className='w-[90%]'>
                        <BoxRow className='gap-[15px]'>
                            <PostTypeIcon type={type} />
                            <BoxColumn>
                                <PostAuthor black>{name}</PostAuthor>
                                <PostDate>{timestamp + ' ago'} </PostDate>
                            </BoxColumn>
                        </BoxRow>
                        <div className={`${themeValue === 'dark' ? "text-white" : "text-[#555555]"} font-bold text-[12px] mt-[10px]`} style={{ lineHeight: '18px', letterSpacing: '0.5px' }}>
                            {question}
                        </div>
                        <PostContent text={answer} />
                        <PostFooter type='quora' likes={views} textToBeCopied={link} />
                    </BoxColumn>
                </BoxColumn >
            </a>
        )
    }
    else if (details.type === 'reddit') {
        const { type, question, author, accountHandle, group, link, timestamp, upvotes, comment } = details;
        return (
            <a href={link} target='_blank'>
                <BoxColumn className={`w-[100%] py-[20px] items-center justify-center shadow-v5 rounded-[20px] relative  ${themeValue === 'dark' ? 'bg-black' : 'bg-white'}`}>
                    <BoxColumn className='w-[90%] h-[90%]'>
                        <BoxRow className='gap-[15px]'>
                            <PostTypeIcon type={type} />
                            <BoxColumn>
                                <PostAuthor black>{group} <span className='text-[10px]'>({author})</span></PostAuthor>
                                <PostDate>{timestamp}</PostDate>
                            </BoxColumn>
                        </BoxRow>
                        <div className={`${themeValue === 'dark' ? "text-white" : "text-[#555555]"} font-bold text-[10px] mt-[20px] mb-[20px]`} style={{ lineHeight: '18px', letterSpacing: '0.5px' }}>
                            {question}
                        </div>
                        <PostFooter textToBeCopied={link} likes={upvotes} comments={comment} />
                    </BoxColumn>
                </BoxColumn >
            </a>
        )
    }
    return null;
}

/**
 * @param {String} children
 * @param {Boolean} black
 */


function PostContent({text}) {
    const [visibleText, setVisibleText] = useState(text);
    const [hasExpanded, setHasExpanded] = useState(false);
    const Theme = useContext(ThemeContext);
    const { themeValue } = Theme;
    let visible = text;
    let nonVisible;

    useEffect(() => {
        if (text.length > 400) {
            visible = text.slice(0, 400);
            nonVisible = text.slice(400, text.length);
            setVisibleText(visible);
        }
    }, []);

    return <div className={`${themeValue === 'dark' ? "text-white" : "text-[#555555]"} text-[10px] mt-[10px]  mb-[20px]`} style={{ lineHeight: '18px', letterSpacing: '0.5px' }}>
        {visibleText} <div className={`${hasExpanded && 'hidden'} text-blue`} onClick={(e) => {
            e.preventDefault();
            setVisibleText(text)
            setHasExpanded(true);
        }}>more</div>
    </div>


}
function PostAuthor({ children, black }) {
    const Theme = useContext(ThemeContext);
    const { themeValue } = Theme;
    return <div className={`text-[18px] ${themeValue === 'dark' ? "text-white" : "text-[#555555]"}  leading-[1.75rem] font-primary font-bold`}>
        {children}
    </div>
}

function PostDate({ children }) {
    const Theme = useContext(ThemeContext);
    const { themeValue } = Theme;
    return <div className={`${themeValue === 'dark' ? "text-white" : "text-[#555555]"} text-[14px] leading-[1rem] font-primary text-blue font-bold`}>
        {children}
    </div>
}


function PostAttachment({ postHref }) {
    return (
        <div className='w-[100%] relative'>
            <div className='absolute w-[100%]  h-[100%] left-0 top-0 z-[2]' style={{ 'background': 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(77, 183, 254, 0.13) 38.54%, #2E3F6E 100%)' }}></div>
            <img width='100%' className='rounded-tr-[20px] rounded-tl-[20px]' src={postHref} />
        </div>

    )
}

function PostFooter({ likes, comments, className, type, textToBeCopied }) {
    const Theme = useContext(ThemeContext);
    const { themeValue, changeTheme } = Theme;

    if (type === 'quora') {
        return <BoxRow className={`w-[100%]  border-t-[1px] pt-[20px] border-[#E6E6E6]  items-center justify-between ${className}`}>
            <BoxRow className='gap-[15px] flex items-center'>
                <BoxRow className='gap-[5px]'>
                    <ViewsIcon />
                    <div className={`${themeValue === 'dark' ? "text-white" : "text-[#444444]"} font-bold text-[12px] mt-[2px]`} style={{ lineHeight: '18px', letterSpacing: '0.5px', textTransform: 'capitalize' }}>{likes}</div>
                </BoxRow>
            </BoxRow>
            <div>
                <BoxRow className='gap-[5px] h-[100%]'
                >
                </BoxRow>
            </div>
        </BoxRow>
    }
    else {
        return <BoxRow className={`w-[100%]  border-t-[1px] pt-[20px] border-[#E6E6E6]  items-center justify-between ${className}`}>
            <BoxRow className='gap-[15px]'>
                <BoxRow className='gap-[5px]'>
                    <LikeIcon />
                    <div className={`${themeValue === 'dark' ? "text-white" : "text-[#444444]"} font-bold text-[12px]`} style={{ lineHeight: '18px', letterSpacing: '0.5px', textTransform: 'capitalize' }}>{likes}</div>
                </BoxRow>
                <BoxRow className='gap-[5px]'>
                    <CommentIcon />
                    <div className={`${themeValue === 'dark' ? "text-white" : "text-[#444444]"} font-bold text-[12px]`} style={{ lineHeight: '18px', letterSpacing: '0.5px', textTransform: 'capitalize' }}>{comments}</div>
                </BoxRow>
            </BoxRow>
            <BoxRow className='gap-[5px] h-[100%]'

            >
                {/* <CopyIcon textToBeCopied={textToBeCopied} /> */}
                {/* <div className={`${themeValue === 'dark' ? "text-white" : "text-[#444444]"} text-primary font-bold text-[12px]`} style={{ lineHeight: '18px', letterSpacing: '0.5px', textTransform: 'capitalize' }} role='button' aria-describedby='button'>Copy</div> */}
            </BoxRow>
        </BoxRow>
    }

}


export default Post;
