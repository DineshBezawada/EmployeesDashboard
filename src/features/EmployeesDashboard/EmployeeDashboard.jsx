import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployeesRequest,
  updateCurrentPage,
} from "../../redux/actions/employeesDataAction";
import Table from "../../components/Table";
import { headerData } from "../../utils/tableHeaderData";
import EmployeeDetails from "../EmployeeDetails";
import { showingData } from "./utils";
import "./employeesDashboard.css";
import SearchInput from "../../components/SearchInput/SearchInput";
import { allData } from "../../utils/data";

const EmployeeDashboard = () => {
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState({
    type: "",
    isReverse: false,
    isFilterClicked: false,
  });
  const dispatch = useDispatch();
  const { data, totalRecords, loading, currentPage, pageDataLimit } =
    useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(fetchEmployeesRequest(currentPage, pageDataLimit, filterType));
  }, [currentPage, pageDataLimit]);
  useEffect(() => {
    if (filterType?.isFilterClicked) {
      dispatch(fetchEmployeesRequest(1, pageDataLimit, filterType));
      dispatch(updateCurrentPage(1));
    }
  }, [filterType]);
  const handleGetUserDetails = async (id) => {
    if (data?.length > 0) {
      try {
        setIsLoading(true);
        // const employeeDetails =await getEmployeeDetails(id);
        const employeeDetails = data.find((employee) => employee.id === id);
        setEmployeeDetails(employeeDetails);
        setIsModalOpen(true);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const updateCurrentPageNumber = (pageNumber) => {
    if (pageNumber >= 1) {
      dispatch(updateCurrentPage(pageNumber));
    }
  };

  const handleSearch = (searchQuery) => {
    console.log(searchQuery);
    dispatch(fetchEmployeesRequest(1, pageDataLimit, filterType, searchQuery));
    dispatch(updateCurrentPage(1));
  };

  return (
    <div className="employee-dashboard">
      <span>{showingData(currentPage, pageDataLimit, totalRecords)}</span>
      <SearchInput handleSearch={handleSearch} />
      <Table
        header={headerData}
        data={data}
        loading={loading}
        paginate={true}
        totalRecords={totalRecords}
        pageDataLimit={pageDataLimit}
        filterType={filterType}
        setFilterType={setFilterType}
        handleGetUserDetails={handleGetUserDetails}
        currentPage={currentPage}
        updateCurrentPage={updateCurrentPageNumber}
      />
      {isModalOpen && (
        <EmployeeDetails
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          employeeDetails={employeeDetails}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default EmployeeDashboard;
