import React, { useEffect, useState } from 'react';
import { fetchData } from '../utils/fetchFunction';

const Location = () => {
    const [countriesList, setCountriesList] = useState([]);
    const [stateList, setStatesList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [country, setCountry] = useState(null);
    const [state, setState] = useState(null);
    const [city, setCity] = useState(null);

    useEffect(() => {
        fetchData('/admin/master/country', 'POST', setCountriesList);
    }, []);

    useEffect(() => {
        if (country) {
            fetchData('/admin/master/states', 'POST', setStatesList, { country_id: country });
        }
    }, [country]);

    useEffect(() => {
        if (state) {
            fetchData('/admin/master/citys', 'POST', setCityList, { state_id: state });
        }
    }, [state]);

    return (
        <div>
            <div className="flex gap-3">
                <form className="max-w-lg">
                    <select
                        onChange={(e) => setCountry(e.target.value)}
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        <option value="">Choose a country</option>
                        {countriesList.map((ele) => (
                            <option key={ele.id} value={ele.id}>
                                {ele.name}
                            </option>
                        ))}
                    </select>
                </form>

                {country && (
                    <form className="max-w-lg">
                        <select
                            onChange={(e) => setState(e.target.value)}
                            id="states"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            <option value="">Choose a state</option>
                            {stateList.map((ele) => (
                                <option key={ele.id} value={ele.id}>
                                    {ele.name}
                                </option>
                            ))}
                        </select>
                    </form>
                )}

                {state && (
                    <form className="max-w-lg">
                        <select
                            onChange={(e) => setCity(e.target.value)}
                            id="cities"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            <option value="">Choose a city</option>
                            {cityList.map((ele) => (
                                <option key={ele.id} value={ele.id}>
                                    {ele.name}
                                </option>
                            ))}
                        </select>
                    </form>
                )}

                {/* {locationSearch.city && (
                    <div className="flex-1 border-2 rounded-md flex items-center px-2">
                        <input
                            className="w-full outline-none border-none bg-transparent focus:outline-none focus:ring-0"
                            type="text"
                            placeholder="Search city"
                        />
                        <img src="/assets/down-arrow.png" className="w-4 h-4" />
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default Location;
