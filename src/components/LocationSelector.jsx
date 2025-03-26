import React, { useEffect } from 'react';
import { Country, State, City } from 'country-state-city';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAllCountriesMutation } from '../redux/slice/apiSlice';

const LocationSelector = () => {

    const [selectedCountry, setSelectedCountry] = useState('IN');
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [countries, { data, isError, error, isLoading, isSuccess }] = useAllCountriesMutation();
    const [allCountries, setAllCountries] = useState([]);
    console.log(data);


    // const allCountries = Country.getAllCountries(); // it's an Array

    useEffect(() => {
        countries()
    }, [])

    useEffect(() => {
        setAllCountries(data?.result)
    }, [isSuccess])

    const handleCountryChange = (e) => {
        const countryCode = e.target.value;
        setSelectedCountry(countryCode);
        setCities([]);
        const fetchedStates = State.getStatesOfCountry(countryCode);
        setStates(fetchedStates);
    };

    const handleStateChange = (e) => {
        const stateCode = e.target.value;
        const fetchedCities = City.getCitiesOfState(selectedCountry, stateCode);
        setCities(fetchedCities);
    };

    return (
        <div className=''>

            <div className='flex gap-2'>
                {/* Country Dropdown with animation */}
                <div className='w-44'>
                    <label className='pl-2' htmlFor='country'>Select Country</label>
                    <motion.select
                        className='block w-full outline-none mb-5 bg-[#15283c] border border-white rounded-lg p-2 text-white shadow-md'
                        id='country'
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* <option value="">Select Country</option> */}
                        {allCountries?.map((country) => (
                            <option key={country.id} value={country.name} className='text-white'>
                                {country.name}
                            </option>
                        ))}
                    </motion.select>
                </div>

                {
                    selectedCountry && (
                        <>
                            <motion.select
                                className='block w-full outline-none mb-5 bg-[#15283c] border border-white/20 rounded-lg p-2 text-white shadow-md'
                                onChange={handleStateChange}
                                disabled={!states.length}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <option value="">Select State</option>
                                {states.map((state) => (
                                    <option key={state.isoCode} value={state.isoCode} className='text-white'>
                                        {state.name}
                                    </option>
                                ))}
                            </motion.select>

                            <motion.select
                                className='block w-full outline-none mb-5 bg-[#15283c] border border-white/20 rounded-lg p-2 text-white shadow-md'
                                disabled={!cities.length}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option key={city.name} value={city.name} className='text-white'>
                                        {city.name}
                                    </option>
                                ))}
                            </motion.select>
                        </>
                    )
                }


            </div>
        </div>
    );
};

export default LocationSelector;
