import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const DropDown = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState('');
    const navigate = useNavigate();
    const path = useLocation().pathname;
    const newPath = path.split('/');
    

    const activePath = useMemo(() => {
        return newPath[newPath.length - 1].replace('-', ' ');
    }, [path]);


    const handleNavigation = (index, route, apiEndpoint) => {
        navigate(route, { state: apiEndpoint });
    };

    useEffect(()=>{
        setIsOpen(newPath[1] || 'master')
    },[path])

    return (
        <div className="relative w-full">
            <div onClick={() => setIsOpen(title.toLowerCase())} className='flex justify-between items-center'>
                <h1 className='font-bold'>{title}</h1>
                <img src={`/assets/down-arrow.png`} loading='lazy' className='size-4 invert self-start' alt='image' />
            </div>

            {isOpen==title.toLowerCase() && (
                <div className="mt-2 w-full ">
                    {children?.map((subTitle, index) => {
                        const route = `/${subTitle.mainPage}/${subTitle.title?.replace(" ", "-")}`; // Assuming you want to use the subTitle as part of the URL
                        return (
                            <>
                                <div
                                    key={index}
                                    onClick={() => handleNavigation(index, route, subTitle.apiEndpoint)}
                                    className={`py-2 px-6 mb-1 hover:bg-orange-400 rounded-lg ${subTitle.title == (activePath || 'Player Role') ? 'bg-orange-400 text-black' : ''}`}
                                >
                                    <h1>{subTitle.title}</h1>
                                </div>
                                {(children.length - 1 != index) && <div className="h-[1px] bg-gray-600" />}
                            </>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default DropDown;
