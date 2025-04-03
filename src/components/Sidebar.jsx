import { HR, Tooltip } from "flowbite-react";
import { lazy, memo, useEffect, useState } from "react";
import DropDown from "./DropDown";
import { MasterSubMenuDatas } from "../constants/SideBarData";
import { useNavigate } from "react-router";
import { logout } from "../redux/slice/userSlice";
import { useDispatch } from "react-redux";

// const DropDown=lazy(()=>import('./DropDown'));

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const path = location.pathname;
  const newPath = path.split("/");
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(newPath[1] || "master");
  }, [path]);

  return (
    <div
      className={` ${
        open ? "w-72" : "w-24"
      } bg-sidebar-body h-screen p-0  pt-0 relative flex flex-col duration-300 border-r-1 border-black shadow-lg`}
    >
      <img
        src="/assets/control.png"
        loading="lazy"
        className={`absolute cursor-pointer  -right-3 top-7 w-7 border-black
           border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
        alt="image"
      />
      <div
        className={`flex px-5 gap-x-4 items-center w-full h-20 rounded-br-2xl ${
          !open ? "bg-sidebar-head-small" : "bg-sidebar-head"
        }`}
      >
        <img
          src="/assets/cricket.png"
          loading="lazy"
          className={`cursor-pointer w-10 h-10 duration-500 ${
            open && "rotate-[360deg]"
          }`}
          alt="image"
        />
        <h1
          className={`text-white origin-left text-xl font-bold duration-200 ${
            !open && "scale-0"
          }`}
        >
          CricGiri
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar py-4">
        <ul className="p-5">
          {MasterSubMenuDatas.map((Menu, index) => (
            <>
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer  backdrop-blur-none text-white text-sm gap-x-2 mb-2 ${
                  !open ? "hover:bg-yellow-300/50" : "hover:bg-slate-300/50"
                }
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  Menu.title.toLowerCase() === active && "bg-white/30"
                } ${!open && "justify-center"} `}
                onClick={() => setActive(Menu.title.toLowerCase())}
              >
                <div className={`flex gap-2 w-full text-gray-800`}>
                  {!open ? (
                    <>
                      <Tooltip
                        content={Menu.title}
                        placement="right"
                        className="items-center "
                      >
                        <img
                          onClick={() => setOpen(true)}
                          src={`/assets/${Menu.src}.png`}
                          className="size-9"
                          loading="lazy"
                          alt="image"
                        />
                        <span
                          className={`${
                            !open && "hidden"
                          } origin-left duration-200 font-bold`}
                        >
                          {Menu.title}
                        </span>
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      {/* <div className="flex"> */}
                      <img
                        src={`/assets/${Menu.src}.png`}
                        loading="lazy"
                        className="size-6"
                        alt="image"
                      />
                      <div className="w-[1px] bg-gray-600 ml-1 max-h-6"></div>
                      {/* </div> */}
                      {Menu?.list?.length > 0 ? (
                        <>
                          <div className="w-full ease-in-out ">
                            <DropDown title={Menu.title}>{Menu.list}</DropDown>
                          </div>
                        </>
                      ) : (
                        <>
                          <span
                            className={`${
                              !open && "hidden"
                            } origin-left duration-200 font-bold`}
                          >
                            {Menu.title}
                          </span>
                        </>
                      )}
                    </>
                  )}
                </div>
              </li>
              {MasterSubMenuDatas.length - 1 != index && (
                <div className="h-[1px] bg-gray-600" />
              )}
            </>
          ))}
        </ul>
      </div>
      <div
        className={`bg-sidebar-foot w-full h-11 rounded-tr-2xl self-end flex items-center gap-3 cursor-pointer ${
          open ? "pl-5 justify-normal" : "justify-center"
        }`}
        onClick={() => {
          localStorage.removeItem("isAuth");
          dispatch(logout());
          navigate("/login");
        }}
      >
        <img
          src="/assets/logout.png"
          loading="lazy"
          className="invert"
          alt="image"
        />
        <h1 className={`font-bold text-lg text-white ${!open && "hidden"}`}>
          Logout
        </h1>
      </div>
    </div>
  );
};
export default memo(Sidebar);
