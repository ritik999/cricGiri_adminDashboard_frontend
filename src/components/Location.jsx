import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../utils/fetchFunction';

const Location = () => {
    const [country, setCountry] = useState(null);
    const [state, setState] = useState(null);
    const [city, setCity] = useState(null);

    const { data: countriesList, isLoading: isCountriesLoading } = useQuery({
        queryKey: ['countries'],
        queryFn: () => fetchData('/admin/master/country', 'POST'),
        staleTime: 300000, // 5 minutes in milliseconds
    });

    const { data: stateList, isLoading: isStatesLoading } = useQuery({
        queryKey: ['states', country],
        queryFn: () => fetchData('/admin/master/states', 'POST', { country_id: country }),
        enabled: !!country, // only run this query if country is selected
        staleTime: 300000, // 5 minutes in milliseconds
    });

    const { data: cityList, isLoading: isCitiesLoading } = useQuery({
        queryKey: ['cities', state],
        queryFn: () => fetchData('/admin/master/citys', 'POST', { state_id: state }),
        enabled: !!state,
        staleTime: 300000,
    });

    console.log(countriesList);
    

    return (
        <>
        <div>
            <div className="flex gap-3">
                <form className="max-w-lg">
                    <select
                        onChange={(e) => setCountry(e.target.value)}
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        <option value="">Choose a country</option>
                        {isCountriesLoading ? (
                            <option>Loading...</option>
                        ) : (
                            countriesList?.map((ele) => (
                                <option key={ele.id} value={ele.id}>
                                    {ele.name}
                                </option>
                            ))
                        )}
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
                            {isStatesLoading ? (
                                <option>Loading...</option>
                            ) : (
                                stateList?.map((ele) => (
                                    <option key={ele.id} value={ele.id}>
                                        {ele.name}
                                    </option>
                                ))
                            )}
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
                            {isCitiesLoading ? (
                                <option>Loading...</option>
                            ) : (
                                cityList?.map((ele) => (
                                    <option key={ele.id} value={ele.id}>
                                        {ele.name}
                                    </option>
                                ))
                            )}
                        </select>
                    </form>
                )}
            </div>
        </div>
        </>
    );
};

export default Location;
