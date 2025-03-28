import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Spinner, Table } from 'flowbite-react';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../utils/fetchFunction';
import Pagination from '../components/Pagination';

const Tournament = () => {
    // const [locationId, setLocationId] = useState(234);
    // const [isValid, setIsValid] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowPerPage] = useState(10);

    // const handleInputChange = (e) => {
    //     const value = e.target.value;
    //     const numValue = Number(value);

    //     if (isNaN(numValue) || value.trim() === "") {

    //         setIsValid(false);
    //         setLocationId('');
    //         return;
    //     } else {
    //         setIsValid(true);
    //         setLocationId(numValue);
    //     }
    // };

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['tournaments'],
        queryFn: () => fetchData('/admin/tournaments/local-tournaments-by-location', 'POST', { user_location_id: 234 }),
        staleTime: Infinity,  // Cache data indefinitely (adjust as needed)
        keepPreviousData: true,  // Keep previous data while new data is being fetched
    });

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const totalPages = Math.ceil((data?.length || 0) / rowsPerPage);

    const handlePageChange = useCallback((pageNum) => {
        setCurrentPage(pageNum);
    }, []);

    const currentRows = useMemo(() => {        
        return data?.slice(indexOfFirstRow, indexOfLastRow)
    }, [data, currentPage, location.pathname, rowsPerPage])

    useEffect(() => {
        setRowPerPage(10);
    }, [location.pathname])

    if (isError) {
        console.log(error.message);
    }

    return (
        <div>
            {/* <div className="flex gap-4 mb-10">
                <input
                    onChange={handleInputChange}
                    value={locationId}
                    className="focus:ring-0 rounded-md"
                    type="text"
                    placeholder="Enter location ID"
                />
                <button
                    disabled={!isValid}
                    onClick={refetch}
                    className={`bg-sidebar-foot/70 p-2 rounded-lg font-bold text-white ${!isValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-sidebar-foot/90 hover:text-black'}`}
                >
                    Search
                </button>
            </div> */}

<div className='flex justify-between items-center'>
              <div>
                <p className='text-xs text-gray-500 mb-1'>Data per page</p>
                <select
                  onChange={(e) => setRowPerPage(e.target.value)}
                  value={rowsPerPage}
                  id="states"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-48 p-2.5 mb-5"
                >
                  {isLoading ? (
                    <option>Loading...</option>
                  ) : (
                    <>
                      <option value={10}>10</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </>
                  )}
                </select>
              </div>
              <div>
                <img
                  className='mr-2 cursor-pointer hover:rotate-[360deg] transition-transform duration-500 ease-in-out'
                  src={`/assets/sync.png`}
                  alt="Sync"
                  onClick={refetch}
                />
              </div>
            </div>

            {/* <p className='text-xs text-gray-500 mb-1'>Data per page</p>
            <select
                onChange={(e) => setRowPerPage(e.target.value)}
                value={rowsPerPage}
                id="states"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-48 p-2.5 mb-5"
            >
                {isLoading ? (
                    <option>Loading...</option>
                ) : (
                    <>
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </>
                )}
            </select> */}

            <div>
                {isLoading ? (
                    <div className="text-center">
                        <Spinner />
                    </div>
                ) : isError ? (
                    <h1 className="text-center text-red-500 font-bold">Error fetching data</h1>
                ) : data?.length === 0 ? (
                    <h1 className="text-center font-bold">No Data available to Show</h1>
                ) : (
                    <>
                        <div>
                            <div className="overflow-x-scroll no-scrollbar">
                                <Table className="overflow-x-scroll max-h-50 no-scrollbar border-4" striped>
                                    <Table.Head className="text-white sticky top-0 z-20 bg-[#15283c]">
                                        {data[0] &&
                                            Object.keys(data[0])
                                                .filter((key) => [
                                                    'Id', 'Title', 'StartDate', 'EndDate', 'CategoryName', 'BallTypeName', 'PitchTypeName', 'MatchTypeName',
                                                    'CityName', 'StadiumName', 'OrganiserName', 'OrganiserPhone', 'currentStatusName', 'noOfMatchs',
                                                ].includes(key))
                                                .map((key, index) => (
                                                    <Table.HeadCell key={index} className="bg-[#15283c]">
                                                        {key}
                                                    </Table.HeadCell>
                                                ))}
                                    </Table.Head>
                                    <Table.Body className="divide-y">
                                        {currentRows.map((row, index) => (
                                            <Table.Row key={row.id || row.Id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                    {index + 1}
                                                </Table.Cell>
                                                {Object.entries(row)
                                                    .filter(([key]) =>
                                                        ['Title', 'StartDate', 'EndDate', 'CategoryName', 'BallTypeName', 'PitchTypeName', 'MatchTypeName', 'CityName', 'StadiumName', 'OrganiserName', 'OrganiserPhone', 'currentStatusName', 'noOfMatchs']
                                                            .includes(key)
                                                    )
                                                    .map(([key, value]) => (
                                                        <Table.Cell key={key}>
                                                            <input
                                                                type="text"
                                                                value={value}
                                                                className="px-2 py-1 rounded select-none bg-transparent border-none"
                                                                disabled
                                                            />
                                                        </Table.Cell>
                                                    ))}
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </div>
                            <div className="sticky bottom-0 mt-5 bg-white py-2 w-full">
                                <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Tournament;
