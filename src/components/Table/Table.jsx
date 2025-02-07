import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "../Pagination/Pagination";
import "./table.css";
import Loader from "../Loader/Loader";
const Table = ({
  header,
  data,
  loading,
  paginate,
  totalRecords,
  filterType,
  setFilterType,
  pageDataLimit,
  handleGetUserDetails,
  currentPage,
  updateCurrentPage,
}) => {
  if (loading) {
    return <Loader />;
  }
return (
    <div className="table-container">
      <table>
        <TableHeader
          header={header}
          filterType={filterType}
          setFilterType={setFilterType}
        />
<TableBody
          data={data}
          header={header}
          handleGetUserDetails={handleGetUserDetails}
        />
      </table>
{paginate && (
        <Pagination
          totalRecords={totalRecords}
          pageDataLimit={pageDataLimit}
          currentPage={currentPage}
          updateCurrentPage={updateCurrentPage}
        />
      )}
    </div>
  );
};

export default Table;