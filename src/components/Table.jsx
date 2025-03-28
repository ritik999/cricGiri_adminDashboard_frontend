import React, { lazy, Suspense, useState } from "react";
import { Button, Modal, Spinner, Table } from "flowbite-react";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchFunction";
import LocationSelector from "./LocationSelector";
import { formatString } from "../utils/dataFormatter";

const Pagination = lazy(() => import("./Pagination"));

const DataTable = () => {
  const location = useLocation();
  const pathSplit = location.pathname?.split("/");
  const apiPath = pathSplit[pathSplit.length - 1]
    .split("-")
    .join("")
    .toLowerCase();

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [isFilterOpen, setFilterOpen] = useState(false);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const {
    data: datas = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["data", apiPath],
    queryFn: () =>
      fetchData(`/admin${location?.state || "/master/playertype"}`, "POST"),
    enabled: !!apiPath, // only fetch when the API path is available
    staleTime: 5 * 60 * 1000,
  });

  const currentRows = datas.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(datas.length / rowsPerPage);

  const handleFilter = () => {
    setFilterOpen(true);
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">{`Error: ${error.message}`}</div>
    );
  }

  return (
    <>
      {datas.length === 0 ? (
        <h1 className="text-center font-bold">No Data available to Show</h1>
      ) : (
        <>
          <div>
            <img
              src={`/assets/filter.png`}
              onClick={handleFilter}
              className="h-8 w-8 mb-4 cursor-pointer"
              alt="filter icon"
            />
            <div className="overflow-x-scroll no-scrollbar">
              <Table
                className="overflow-x-scroll max-h-50 no-scrollbar border-4"
                striped
              >
                <Table.Head className="text-white sticky top-0 z-20 bg-[#15283c]">
                  {datas.length > 0 &&
                    datas[0] &&
                    Object.keys(datas[0]).map((key, index) => (
                      <Table.HeadCell key={index} className="bg-[#15283c]">
                        {key}
                      </Table.HeadCell>
                    ))}
                  <Table.HeadCell className="bg-[#15283c]">
                    Action
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {currentRows.map((row, index) => (
                    <Table.Row
                      key={row.id || row.Id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      {(row.id || row.Id) && (
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {index + 1}
                        </Table.Cell>
                      )}
                      {Object.entries(row)
                        .filter(([key]) => key.toLocaleLowerCase() !== "id")
                        .map(([key, value]) => (
                          <Table.Cell key={key}>
                            {value.toString().split("/")[1] == "uploads" ? (
                              <img
                                src={`${
                                  import.meta.env?.VITE_BASE_URL
                                }${value}`}
                                alt={`icon`}
                                className="h-16 w-16"
                              />
                            ) : (
                              <input
                                type="text"
                                value={formatString(value)}
                                className="px-2 py-1 rounded select-none bg-transparent border-none"
                                disabled
                              />
                            )}
                          </Table.Cell>
                        ))}
                      <Table.Cell>
                        <p className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer">
                          Edit
                        </p>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
            <div className="sticky bottom-0 bg-white mt-5 py-2 w-full">
              <Suspense fallback={<Spinner color="info" />}>
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                />
              </Suspense>
            </div>
          </div>
        </>
      )}

      {/* Filter Modal */}
      <Modal show={isFilterOpen} onClose={() => setFilterOpen(false)}>
        <Modal.Header>Filter</Modal.Header>
        <Modal.Body>
          <div className="space-y-2">
            <p className="font-bold">Filter based on Country & City</p>
            <LocationSelector />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="green" onClick={() => setFilterOpen(false)}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DataTable;
