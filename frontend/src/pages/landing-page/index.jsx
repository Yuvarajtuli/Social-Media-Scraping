import React, { useEffect, useState } from 'react';
import video from '../../assets/video.mp4';
import Logo from '../../icons/logo';
import ScratchMediaText from '../../icons/scratch-media';
import ScratchMediaTextSmall from '../../icons/small-scratch-media';
import PrimaryButton from '../../mini-components/primaryButton';
import { useNavigate } from 'react-router-dom'



function LandingPage() {
    const [showButton, setShowButtons] = useState(false);
    const [showInputFields, setShowInputFields] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let storageName = localStorage.getItem('name');
        let storageEmail = localStorage.getItem('email');
        console.log(storageName,storageEmail)
        if (storageName && storageEmail) {
            navigate('/dashboard')
            document.title = 'Dashboard'
        }
    }, []);

    // useEffect(() => [
    //     document.title = 'Scratch Media'
    // ], []);

    useEffect(() => {
        let id2;
        const id = setTimeout(() => {
            setShowButtons(true);
            id2 = setTimeout(() => {
                setShowInputFields(true);
            }, 1000);
        }, 3000);
        // return () => {
        //     clearTimeout(id);
        //     clearTimeout(id2);
        // }
    }, []);

    return (
        <div className='w-[100%] h-[100%] flex items-center justify-center fixed fadeIn '
        >
            <div className={`absolute top-[0px] left-[0px] w-[100%] h-[100%] z-[0]`}
                style={{ background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(77, 183, 254, 0.22) 5%, #325A95 150%)' }}>
                <div className='w-[100%] h-[100%] flex items-center justify-center'>
                    <LandingPageContent showButtons={showButton} showInputFields={showInputFields} />
                </div>
            </div>
            <video width="100%" autoPlay muted loop className='z-[-1]'>
                <source src={video} type="video/mp4" />
            </video>
        </div>
    )
}

function LandingPageInputField({ type, value, onChange, placeholder }) {
    return <input type={type} value={value} onChange={onChange}
        placeholder={placeholder}
        required
        className='rounded-[5px] p-[20px] w-[750px] text-[#fff] z-[2100] shadow-v5 border-[1px] border-[#999] landingPageInput'
        style={{ backdropFilter: 'blur(5px)', background: 'rgba(255,255,255,0.1)' }}
    />
}


function LandingPageContent({ showButtons, showInputFields }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    return <div>
        <div
            className={`flex items-center justify-center flex-col gap-[15px] ${showButtons && 'fadeOut'}`}>
            <ScratchMediaText />

        </div>
        {showInputFields &&
            <div className={`flex items-center justify-center flex-col gap-[25px] ${showButtons && 'fadeInUp'}`}>
                <div>
                    <ScratchMediaTextSmall />
                </div>
                <div className='flex flex-col gap-[30px] items-center justify-center'>
                    <LandingPageInputField placeholder='Enter your name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    <LandingPageInputField type='email' value={email} placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
                    <div role='button' aria-describedby='button'
                        onClick={() => {
                            if (name.length && email.length) {
                                localStorage.setItem('name', name);
                                localStorage.setItem('email', email);
                                navigate('/dashboard')
                            }
                            else {
                                window.alert('Please fill the name and email fields')
                            }
                        }}
                        className={`px-[30px] py-[15px] rounded-[3px] flex items-center justify-center bg-blue text-white font-bold text-[16px]leading-[27px] tablet:shadow-v2 mobile:shadow-v3`}>
                        Get started </div>
                </div>
            </div>
        }
    </div>
}

export default LandingPage;