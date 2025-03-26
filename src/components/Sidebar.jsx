import { HR, Tooltip } from "flowbite-react";
import { lazy, memo, useEffect, useState } from "react";
import DropDown from "./DropDown";
import { MasterSubMenuDatas } from "../constants/SideBarData";

// const DropDown=lazy(()=>import('./DropDown'));

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const path=location.pathname;
    const newPath=path.split('/');
    const [active, setActive] = useState('');


    useEffect(()=>{
        setActive(newPath[1] || 'master')
    },[path])

    return (
        <div
            className={` ${open ? "w-72" : "w-24"
                } bg-[#15283c] h-screen p-0  pt-0 relative flex flex-col duration-300`}
        >
            <img
                src="/assets/control.png"
                loading="lazy"
                className={`absolute cursor-pointer  -right-3 top-7 w-7 border-black
           border-2 rounded-full  ${!open && "rotate-180"}`}
                onClick={() => setOpen(!open)}
                alt="image"
            />
            <div className={`flex px-5 gap-x-4 items-center w-full h-20 ${!open ? 'bg-[#db4d21fb]' : 'bg-[#214162]'}`}>
                <img
                    src="/assets/cricket.png"
                    loading="lazy"
                    className={`cursor-pointer w-10 h-10 duration-500 ${open && "rotate-[360deg]"
                        }`}
                    alt="image"
                />
                <h1
                    className={`text-white origin-left text-xl font-bold duration-200 ${!open && "scale-0"
                        }`}
                >
                    CricGiri
                </h1>
            </div>
            <HR className="my-0" />
            <div className="flex-1 overflow-y-auto no-scrollbar py-4">
                <ul className="p-5">
                    {MasterSubMenuDatas.map((Menu, index) => (
                        <>
                            <li
                                key={index}
                                className={`flex  rounded-md p-2 cursor-pointer hover:bg-gray-300/20 backdrop-blur-none text-white text-sm gap-x-4 mb-2 
              ${Menu.gap ? "mt-9" : "mt-2"} ${Menu.title.toLowerCase() === active && "bg-white/30"
                                    } ${!open && 'justify-center'} `}
                                onClick={() => setActive(Menu.title.toLowerCase())}
                            >

                                <div className={`flex gap-4 w-full`}>
                                    {
                                        !open ? (
                                            <>
                                                <Tooltip content={Menu.title} placement="right">
                                                    <img onClick={() => setOpen(true)} src={`/assets/${Menu.src}.png`} loading="lazy" alt="image" />
                                                    <span className={`${!open && "hidden"} origin-left duration-200 font-bold`} >
                                                        {Menu.title}
                                                    </span>
                                                </Tooltip>
                                            </>
                                        ) : (
                                            <>
                                                <img src={`/assets/${Menu.src}.png`} loading="lazy" className="size-6" alt="image" />
                                                <div className="w-[1px]  bg-gray-600"></div>
                                                {
                                                    Menu?.list?.length > 0 ? (
                                                        <>
                                                            <div className="w-full">
                                                                <DropDown title={Menu.title}>
                                                                    {Menu.list}
                                                                </DropDown>

                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className={`${!open && "hidden"} origin-left duration-200 font-bold`} >
                                                                {Menu.title}
                                                            </span>
                                                        </>
                                                    )
                                                }

                                            </>
                                        )
                                    }
                                </div>


                            </li>
                            {(MasterSubMenuDatas.length-1 != index) && <div className="h-[1px] bg-gray-600" />}
                        </>
                    ))}
                </ul>
            </div>
            <div className="bg-[#db4d21fb] w-full h-16 self-end flex items-center pl-5 gap-5 cursor-pointer">
                <img src='/assets/logout.png' loading="lazy" className="invert" alt="image" />
                <h1 className={`font-bold text-lg text-white ${!open && "hidden"}`}>Logout</h1>
            </div>

        </div>

    );
};
export default memo(Sidebar);