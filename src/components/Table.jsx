import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { Button, Modal, Spinner, Table } from "flowbite-react";
import LocationSelector from './LocationSelector';
// import { useGetCountriesQuery } from '../redux/slice/apiSlice';

const Pagination = lazy(() => import('./Pagination'));


const DataTable = () => {
  const [datas, setData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Pending' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', status: 'Rejected' },
    { id: 3, name: 'Bob Smith', email: 'bob@example.com', status: 'Success' },
    { id: 4, name: 'John Doe', email: 'john@example.com', status: 'Pending' },
    { id: 5, name: 'Jane Doe', email: 'jane@example.com', status: 'Pending' },
    { id: 6, name: 'Bob Smith', email: 'bob@example.com', status: 'Success' },
    { id: 8, name: 'John Doe', email: 'john@example.com', status: 'Success' },
    { id: 9, name: 'Jane Doe', email: 'jane@example.com', status: 'Rejected' },
    { id: 10, name: 'Bob Smith', email: 'bob@example.com', status: 'Pending' },
    { id: 11, name: 'John Doe', email: 'john@example.com', status: 'Success' },
    { id: 13, name: 'Bob Smith', email: 'bob@example.com', status: 'Success' },
    { id: 14, name: 'Jane Doe', email: 'jane@example.com', status: 'Pending' },
    { id: 15, name: 'Bob Smith', email: 'bob@example.com', status: 'Pending' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isEditable, setIsEditable] = useState(null);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const rowsPerPage = 10;

  // const [countries,{ data, isError, error, isLoading, isSuccess }]=useGetCountriesQuery();
  // console.log(data);


 

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

    console.log(currentPage);
    console.log(pageNum);
    setCurrentPage(pageNum);
  }, []);

  const handleFilter=async()=>{
    setFilterOpen(true)
    await countries();
  }


  return (
    <>
      <div className="">
        {/* <LocationSelector /> */}
        <img src={`./src/assets/filter.png`} onClick={handleFilter} className='h-8 w-8 mb-4 cursor-pointer' loading="lazy" alt="image" />
        <Table className='overflow-x-auto max-h-50 no-scrollbar border-4' striped>
          <Table.Head className='text-white sticky top-0 z-20 bg-[#15283c]'>
            <Table.HeadCell className='bg-[#15283c]'>ID</Table.HeadCell>
            <Table.HeadCell className='bg-[#15283c]'>Name</Table.HeadCell>
            <Table.HeadCell className='bg-[#15283c]'>Email</Table.HeadCell>
            <Table.HeadCell className='bg-[#15283c]'>Action</Table.HeadCell>
            <Table.HeadCell className='bg-[#15283c]'>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {
              currentRows.map((row) => (
                <Table.Row key={row.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {row.id}
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => handleInputChange(e, row.id, 'name')}
                      className={`${isEditable === row.id ? 'border' : 'border-none'} px-2 py-1 rounded select-none bg-transparent`}
                      disabled={isEditable !== row.id}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      type="text"
                      value={row.email}
                      onChange={(e) => handleInputChange(e, row.id, 'email')}
                      className={`${isEditable === row.id ? 'border' : 'border-none'} px-2 py-1 rounded select-none bg-transparent`}
                      disabled={isEditable !== row.id}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {
                      isEditable === row.id ? (
                        <div className='flex gap-5'>
                          <p onClick={() => setIsEditable(null)} className="font-medium text-green-600 hover:underline dark:text-green-500 cursor-pointer">
                            Confirm
                          </p>
                          <p onClick={() => setIsEditable(null)} className="font-medium text-red-600 hover:underline dark:text-red-500 cursor-pointer">
                            Cancel
                          </p>
                        </div>
                      ) : (
                        <p onClick={() => setIsEditable(row.id)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer">
                          Edit
                        </p>
                      )
                    }
                  </Table.Cell>
                  <Table.Cell>
                    <p className={`p-2 ${row.status === 'Rejected' ? 'bg-red-300' : (row.status === 'Pending' ? 'bg-slate-300' : 'bg-green-300')} backdrop-blur-md rounded-md text-center font-semibold text-black/80`}>
                      {row.status}
                    </p>
                  </Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
        <div className='sticky bottom-0 bg-[#fafafb] mt-5 py-2'>
          <Suspense fallback={<Spinner color='info' />}>
            <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
          </Suspense>
        </div>
      </div>

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

