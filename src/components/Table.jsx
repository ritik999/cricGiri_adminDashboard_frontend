import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { Button, Modal, Spinner, Table } from "flowbite-react";
import LocationSelector from './LocationSelector';
import { useLocation } from 'react-router';

const Pagination = lazy(() => import('./Pagination'));

const DataTable = () => {
  const location = useLocation();
  const pathSplit = location.pathname?.split('/');
  const apiPath = pathSplit[pathSplit.length - 1].split('-').join('').toLowerCase();
  const [datas, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(null);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const rowsPerPage = 10;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/admin${location?.state || '/master/playertype'}`, {
        method: 'POST'
      });
      if (!res.ok) {
        setIsLoading(false);
        return;
      }
      const data = await res.json();
      setData(data?.result || []);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiPath, location]);

  const handleInputChange = (e, id, field) => {

    const updatedData = datas.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: e.target.value };
      }
      return row;
    });
    setData(updatedData);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = datas.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(datas.length / rowsPerPage);

  const handlePageChange = useCallback((pageNum) => {
    setCurrentPage(pageNum);
  }, []);

  const handleFilter = () => {
    setFilterOpen(true);
  };

  if (isLoading) <h1>loading...</h1>

  return (
    <>
      {datas.length == 0 ? (
        <>
          <h1 className='text-center font-bold'>No Data available to Show</h1>
        </>
      ) : (
        <>
          <div>
            <img src={`/assets/filter.png`} onClick={handleFilter} className='h-8 w-8 mb-4 cursor-pointer' alt="image" />
            <div className='overflow-x-scroll no-scrollbar'>
            <Table className='overflow-x-scroll max-h-50 no-scrollbar border-4' striped>
              <Table.Head className='text-white sticky top-0 z-20 bg-[#15283c]'>
                {datas.length > 0 && datas[0] && Object.keys(datas[0]).map((key, index) => (
                  <Table.HeadCell key={index} className='bg-[#15283c]'>
                    {key}
                  </Table.HeadCell>
                ))}
                <Table.HeadCell className='bg-[#15283c]'>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {currentRows.map((row) => (
                  <Table.Row key={row.id || row.Id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    {(row.id || row.Id) && (
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {row.id || row.Id}
                      </Table.Cell>
                    )}

                    {
                      Object.entries(row)
                        .filter(([key]) => key.toLocaleLowerCase() !== 'id')
                        .map(([key, value]) => {                          
                          return (
                            <Table.Cell>
                              <input
                                type="text"
                                value={value}
                                onChange={(e) => handleInputChange(e, row.id || row.Id, 'name')}
                                className={`${isEditable === (row.id || row.Id) ? 'border' : 'border-none'} px-2 py-1 rounded select-none bg-transparent`}
                                disabled={isEditable !== (row.id || row.Id)}
                              />
                            </Table.Cell>
                          )
                        })
                    }

                    <Table.Cell>
                      {isEditable === (row.id || row.Id) ? (
                        <div className='flex gap-5'>
                          <p onClick={() => setIsEditable(null)} className="font-medium text-green-600 hover:underline dark:text-green-500 cursor-pointer">
                            Confirm
                          </p>
                          <p onClick={() => setIsEditable(null)} className="font-medium text-red-600 hover:underline dark:text-red-500 cursor-pointer">
                            Cancel
                          </p>
                        </div>
                      ) : (
                        <p onClick={() => setIsEditable(row.id || row.Id)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer">
                          Edit
                        </p>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              {/* bg-[#fafafb] */}
            </Table>
            </div>
            <div className='sticky bottom-0 bg-white mt-5 py-2 w-full'>
              <Suspense fallback={<Spinner color='info' />}>
                <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
              </Suspense>
            </div>
            {/* </div> */}
          </div>
        </>
      )}

      <Modal show={isFilterOpen} onClose={() => setFilterOpen(false)}>
        <Modal.Header>Filter</Modal.Header>
        <Modal.Body>
          <div className="space-y-2">
            <p className='font-bold'>Filter based on Country & City</p>
            <LocationSelector />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color='green' onClick={() => setFilterOpen(false)}>Done</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DataTable;
