import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button, Modal, Spinner, Table, Tooltip } from "flowbite-react";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchFunction";
import LocationSelector from "./LocationSelector";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify components
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify
import { formatString } from "../utils/dataFormatter";

const Pagination = lazy(() => import("./Pagination"));

const DataTable = () => {
  const location = useLocation();
  const pathSplit = location.pathname?.split("/");
  const apiPath = pathSplit[pathSplit.length - 1]
    .split("-")
    .join("")
    .toLowerCase();
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowPerPage] = useState(10);
  const [isFilterOpen, setFilterOpen] = useState(false);

  const handlePageChange = useCallback((pageNum) => {
    setCurrentPage(pageNum);
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const {
    data: datas = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ["data", apiPath],
    queryFn: () =>
      fetchData(
        `/admin${location?.state?.apiEndpoint || "/master/playertype"}`,
        "POST",
        location?.state?.apiBody || {}
      ),
    staleTime: Infinity,
    keepPreviousData: true,
  });

  const currentRows = useMemo(() => {
    return datas.slice(indexOfFirstRow, indexOfLastRow);
  }, [datas, currentPage, location.pathname, rowsPerPage]);

  useEffect(() => {
    setRowPerPage(10);
  }, [location.pathname]);

  useEffect(() => {
    if (datas && isFetching) {
      toast.info("Refetching data...", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  }, [isFetching]);

  useEffect(() => {
    if (isError) {
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  }, [isError, error]);

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
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500 mb-1">Data per page</p>
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
                <Tooltip content={"Click to Re-fetch data"} placement="left">
                  <button
                    onClick={refetch}
                    className="cursor-pointer"
                    disabled={isFetching}
                  >
                    <img
                      className="mr-2 hover:rotate-[360deg] transition-transform duration-500 ease-in-out"
                      src={`/assets/sync.png`}
                      alt="Sync"
                    />
                  </button>
                </Tooltip>
              </div>
            </div>
            <div className="overflow-x-scroll no-scrollbar">
              <Table
                className="overflow-x-scroll max-h-50 no-scrollbar border-4 text-center "
                striped
              >
                <Table.Head className="text-white sticky top-0 z-20 bg-[#15283c]">
                  {datas.length > 0 &&
                    datas[0] &&
                    Object.keys(datas[0]).map((key, index) => (
                      <Table.HeadCell key={index} className="bg-[#15283c] ">
                        {key}
                      </Table.HeadCell>
                    ))}
                </Table.Head>
                <Table.Body className="divide-y">
                  {currentRows.map((row, index) => (
                    <Table.Row
                      key={row.id || row.Id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      {(row.id || row.Id) && (
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 text-center dark:text-white">
                          {index + 1}
                        </Table.Cell>
                      )}

                      {Object.entries(row)
                        .filter(([key]) => key.toLocaleLowerCase() !== "id")
                        .map(([key, value]) => (
                          <Table.Cell key={key} className="">
                            {value.toString().split("/")[1] == "uploads" ? (
                              <img
                                src={`${
                                  import.meta.env?.VITE_BASE_URL
                                }${value}`}
                                alt={`icon`}
                                className="h-16 w-16"
                              />
                            ) : (
                              <p>{formatString(value)}</p>
                            )}
                          </Table.Cell>
                        ))}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
            <div className="sticky bottom-0 bg-white mt-5 py-2 w-full">
              <Suspense fallback={<Spinner color="info" />}>
                <Pagination
                  totalPages={Math.ceil(datas.length / rowsPerPage)}
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

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default DataTable;
