import React from 'react'
import FacebookIcon from '../../icons/facebook-icon';
import TwitterIcon from '../../icons/twitter-icon';
import QuoraIcon from '../../icons/quora-icon';
import RedditIcon from '../../icons/reddit-icon';

/**
 * @param {'twitter' |'quora' | 'reddit'} type
 */
function PostTypeIcon({ type }) {
    switch (type) {
        case 'twitter':
            return <div className='w-[60px] h-[60px] rounded-full shadow-v4 bg-white flex items-center justify-center'>
                <TwitterIcon width='22' height='22' />
            </div>
        case 'quora':
            return <div className='w-[60px] h-[60px] rounded-full shadow-v4 bg-white flex items-center justify-center'>
                <QuoraIcon />
            </div>
        case 'reddit':
            return <div className='w-[60px] h-[60px] rounded-full shadow-v4 bg-white flex items-center justify-center'>
                <RedditIcon />
            </div>
        default:
            return null;

    }

}

export default PostTypeIcon