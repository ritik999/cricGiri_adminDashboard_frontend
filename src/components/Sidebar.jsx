import { Dropdown, HR, Tooltip } from "flowbite-react";
import { lazy, memo, useState } from "react";

const DropDown=lazy(()=>import('./DropDown'));

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const [active, setActive] = useState(0);
    const Menus = [
        {
            title: "Dashboard", src: "Chart_fill"
        },
        { title: "Accounts", src: "User", gap: true },
        { title: "Schedule ", src: "Calendar" },
        { title: "Search", src: "Search" },
        {
            title: "Analytics", src: "Chart", list: [
                'bar chart', 'pie chart', 'histogram'
            ]
        },
        { title: "Files ", src: "Folder", gap: true },
        { title: "Setting", src: "Setting" },
        { title: "Accounts", src: "User", gap: true },
        { title: "Schedule ", src: "Calendar" },
        { title: "Search", src: "Search" },
        // { title: "Analytics", src: "Chart" },
        // { title: "Files ", src: "Folder", gap: true },
        // { title: "Setting", src: "Setting" }
    ];

    return (
        <div
            className={` ${open ? "w-72" : "w-20 "
                } bg-[#15283c] h-screen p-0  pt-0 relative flex flex-col duration-300`}
        >
            <img
                src="./src/assets/control.png"
                loading="lazy"
                className={`absolute cursor-pointer  -right-3 top-7 w-7 border-black
           border-2 rounded-full  ${!open && "rotate-180"}`}
                onClick={() => setOpen(!open)}
                alt="image"
            />
            <div className={`flex px-5 gap-x-4 items-center w-full h-20 ${!open ? 'bg-[#db4d21fb]' : 'bg-[#214162]'}`}>
                <img
                    src="./src/assets/cricket.png"
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
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-gray-300/40 backdrop-blur-none text-white text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === active && "bg-white/30"
                                } `}
                            onClick={() => setActive(index)}
                        >

                            <div className={`flex gap-4 `}>
                                {
                                    !open ? (
                                        <>
                                            <Tooltip content={Menu.title} placement="right">
                                                <img src={`./src/assets/${Menu.src}.png`} loading="lazy" alt="image" />
                                                <span className={`${!open && "hidden"} origin-left duration-200 font-bold`} >
                                                    {Menu.title}
                                                </span>
                                            </Tooltip>
                                        </>
                                    ) : (
                                        <>
                                            <img src={`./src/assets/${Menu.src}.png`} loading="lazy" className="size-6" alt="image"/>
                                            {
                                                Menu?.list?.length > 0 ? (
                                                    <>
                                                        <div>
                                                            <DropDown title={Menu.title} items={Menu.list} />
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
                    ))}
                </ul>
            </div>
            <div className="bg-[#db4d21fb] w-full h-16 self-end flex items-center pl-5 gap-5 cursor-pointer">
                <img src='./src/assets/logout.png' loading="lazy" className="invert" alt="image"/>
                <h1 className={`font-bold text-lg text-white ${!open && "hidden"}`}>Logout</h1>
            </div>

        </div>

    );
};
export default memo(Sidebar);