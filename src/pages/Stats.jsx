import React from 'react'
import { motion } from 'motion/react'
import LineChart from '../components/Charts/lineChart'
import { Button, Checkbox, Label, Select } from 'flowbite-react'
import { months } from '../../constant'

const Stats = () => {

    const boxContainerAnimation = {
        enter: {
            opacity: 1,
            transition: {
                duration: 0.5,
                delayChildren: 0.1,
                staggerChildren: 0.05,
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.4,
                delay: 1,
            }
        }
    }

    const boxAnimation = {
        enter: {
            y: 0,
            transition: {
                duration: 0.5
            }
        },
        exit: {
            y: -1000,
        }
    }

    return (
        <div>
            <motion.div variants={boxContainerAnimation} initial='exit' animate='enter' className='grid grid-cols-3 gap-4'>
                <motion.div variants={boxAnimation} className='bg-gray-200 p-3 flex flex-col items-center gap-4 rounded-md shadow-lg'>
                    <h1 className='font-bold text-2xl'>25</h1>
                    <img src='./src/assets/matches.png' className='h-12 w-12' />
                    <h1 className='text-center font-semibold'>Total Matches</h1>
                </motion.div>
                <motion.div variants={boxAnimation} className='bg-gray-200 p-3 flex flex-col items-center gap-4 rounded-md shadow-lg'>
                    <h1 className='font-bold text-2xl'>7</h1>
                    <img src='./src/assets/tournaments.png' className='h-12 w-12' />
                    <h1 className='text-center font-semibold'>Total Tournaments</h1>
                </motion.div>
                <motion.div variants={boxAnimation} className='bg-gray-200 p-3 flex flex-col items-center gap-4 rounded-md shadow-lg'>
                    <h1 className='font-bold text-2xl'>5</h1>
                    <img src='./src/assets/awards.png' className='h-12 w-12' />
                    <h1 className='text-center font-semibold'>Total Awards</h1>
                </motion.div>
            </motion.div>

            <div className='mt-16 flex gap-4'>
                <div className='flex-[3] border-2'>
                    <LineChart />
                </div>
                <div className='flex-1 bg-[#15283c] rounded-md p-4'>
                    <h1 className='text-white font-bold text-center'>Filter</h1>
                    <hr />

                    <div className='mt-6 space-y-5'>
                        <div className='flex gap-3'>
                            <div>
                                <Label className='text-white' htmlFor="SMonths" value="Start Month" />
                                <Select id="SMonths" required>
                                    {months.map((ele) => (
                                        <option>{ele}</option>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <Label className='text-white' htmlFor="EMonths" value="End Month" />
                                <Select id="EMonths" required>
                                    {months.map((ele) => (
                                        <option>{ele}</option>
                                    ))}
                                </Select>
                            </div>
                        </div>

                        <div>
                            <h1 className='text-white font-bold mb-4'>Select Chart Data</h1>
                            <div className="flex flex-col gap-4">
                                <div className='flex gap-6'>
                                    <Checkbox id="matches" defaultChecked />
                                    <Label htmlFor="matches" className="text-white">
                                        Matches
                                    </Label>
                                </div>
                                <div className='flex gap-6'>
                                    <Checkbox id="tournaments" />
                                    <Label htmlFor="tournaments" className="text-white">
                                        Tournaments
                                    </Label>
                                </div>
                                <div className='flex gap-6'>
                                    <Checkbox id="awards" />
                                    <Label htmlFor="awards" className="text-white">
                                        Awards
                                    </Label>
                                </div>
                            </div>
                        </div>
                        <button className='w-full bg-[#db4d21fb] text-white font-bold duration-300 hover:text-black p-2 rounded-md'>
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats