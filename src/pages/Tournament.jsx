import React, { useState, useEffect, useCallback } from 'react';
import { Spinner, Table } from 'flowbite-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchData } from '../utils/fetchFunction';
import Pagination from '../components/Pagination';

const Tournament = () => {
    const [locationId, setLocationId] = useState(null);
    const [isValid, setIsValid] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentRows, setCurrentRow] = useState([]);
    const [responseData, setResponseData] = useState([]);
    const rowsPerPage = 10;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;

    const handleInputChange = (e) => {
        const value = e.target.value;
        const numValue = Number(value);

        if (isNaN(numValue) || value.trim() === "") {
            setIsValid(false);
            return;
        } else {
            setIsValid(true);
            setLocationId(numValue);
        }
    };

    const searchData = useMutation({
        mutationFn: () => fetchData('/admin/tournaments/local-tournaments-by-location', 'POST', { user_location_id: locationId }),
        onSuccess: (data) => {
            setResponseData(data);
        },
        onError: (error) => {
            console.error("Error fetching data: ", error);
        }
    });

    const handlePageChange = useCallback((pageNum) => {
        setCurrentPage(pageNum);
    }, []);

    useEffect(() => {
        if (responseData.length > 0) {
            setCurrentRow(responseData.slice(indexOfFirstRow, indexOfLastRow));
        }
    }, [currentPage, responseData]);

    const totalPages = Math.ceil(responseData.length / rowsPerPage);

    return (
        <div>
            <div className='flex gap-4 mb-10'>
                <input
                    onChange={handleInputChange}
                    className='focus:ring-0 rounded-md'
                    type='text'
                    placeholder='Enter location ID'
                />
                <button
                    disabled={!isValid}
                    onClick={() => searchData.mutate()}
                    className={`bg-sidebar-foot/70 p-2 rounded-lg font-bold text-white ${!isValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-sidebar-foot/90 hover:text-black'}`}
                >
                    Search
                </button>
            </div>

            <div>
                {searchData.isLoading ? (
                    <div className="text-center">
                        <Spinner />
                    </div>
                ) : searchData.isError ? (
                    <h1 className='text-center text-red-500 font-bold'>Error fetching data</h1>
                ) : responseData.length === 0 ? (
                    <h1 className='text-center font-bold'>No Data available to Show</h1>
                ) : (
                    <>
                        <div>
                            <div className='overflow-x-scroll no-scrollbar'>
                                <Table className='overflow-x-scroll max-h-50 no-scrollbar border-4' striped>
                                    <Table.Head className='text-white sticky top-0 z-20 bg-[#15283c]'>
                                        {responseData.length > 0 && Object.keys(responseData[0]).filter(key => ['Id', 'Title', 'StartDate', 'EndDate', 'CategoryName', 'BallTypeName', 'PitchTypeName', 'MatchTypeName', 'CityName', 'StadiumName', 'OrganiserName', 'OrganiserPhone', 'currentStatusName', 'noOfMatchs'].includes(key)).map((key, index) => (
                                            <Table.HeadCell key={index} className='bg-[#15283c]'>
                                                {key}
                                            </Table.HeadCell>
                                        ))}
                                    </Table.Head>
                                    <Table.Body className="divide-y">
                                        {currentRows?.map((row, index) => (
                                            <Table.Row key={row.id || row.Id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                {(row.id || row.Id) && (
                                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        {index + 1}
                                                    </Table.Cell>
                                                )}
                                                {
                                                    Object.entries(row)
                                                        .filter(([key]) => ['Title', 'StartDate', 'EndDate', 'CategoryName', 'BallTypeName', 'PitchTypeName', 'MatchTypeName', 'CityName', 'StadiumName', 'OrganiserName', 'OrganiserPhone', 'currentStatusName', 'noOfMatchs'].includes(key))
                                                        .map(([key, value]) => {
                                                            return (
                                                                <Table.Cell key={key}>
                                                                    <input
                                                                        type="text"
                                                                        value={value}
                                                                        className="px-2 py-1 rounded select-none bg-transparent border-none"
                                                                        disabled
                                                                    />
                                                                </Table.Cell>
                                                            )
                                                        })
                                                }
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </div>
                            <div className='sticky bottom-0 mt-5 bg-white py-2 w-full'>
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
