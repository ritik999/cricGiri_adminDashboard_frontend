import React, { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react';

const DropDown = ({title,items}) => {
    const [show, setShow] = useState(false);
    const [active,setActive]=useState(null);

    const menu = {
        closed: {
            scale: 0,
            transition: {
                duration: 0.4,
                delay: 1,
            },
        },
        open: {
            scale: 1,
            transition: {
                type: "spring",
                duration: 0.4,
                delayChildren: 0.2,
                staggerChildren: 0.05,
            },
        },
    }

    const item = {
        closed: { x: -16, opacity: 0, transition: { opacity: { duration: 0.2 } } },
        open: { x: 0, opacity: 1, transition: { opacity: { duration: 0.2 } } },
    }



    return (
        <div>
            <div className=''>
                <div onClick={() => setShow(!show)} className='flex justify-between items-center gap-24'>
                    <h1 className='font-bold text-white mb-2'>{title}</h1>
                    <img src={`./src/assets/${!show ? 'down-arrow' : 'up-arrow'}.png`} loading='lazy' className='size-4 invert self-start' alt='image' />
                </div>

                {show && (
                    <>
                        <AnimatePresence mode='wait'>
                            <motion.div variants={menu} initial='closed' animate={show ? "open" : "closed"} exit='closed' className='flex flex-col gap-1'>
                                {
                                    items.map((ele,index) => (
                                        <motion.h1 onClick={()=>setActive(index)} variants={item} className={`text-white font-medium ${active==index && 'bg-orange-400'} hover:bg-orange-400/70 backdrop-blur-none duration-200 px-4 py-2 rounded-md`}>{ele}</motion.h1>
                                    ))
                                }
                            </motion.div>
                        </AnimatePresence>
                    </>
                )}
            </div>
        </div>
    )
}

export default DropDown