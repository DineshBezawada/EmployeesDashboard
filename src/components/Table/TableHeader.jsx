const TableHeader = ({ header, filterType, setFilterType }) => {
    const { type, isReverse, isFilterClicked } = filterType;
    const updateFilter = (filterValue) => {
      if (filterValue === filterType?.type) {
        setFilterType({
          type: filterValue,
          isReverse: !isReverse,
          isFilterClicked: true,
        });
        console.log(filterType, filterValue, "Test");
      } else {
        setFilterType({
          type: filterValue,
          isReverse: false,
          isFilterClicked: true,
        });
      }
    };
  
    return (
      <thead>
        <tr>
          {header?.map((column) => (
            <th
              key={column.field}
              onClick={() => {
                updateFilter(column.field);
              }}
              className="header_column"
            >
              {column.name}
              <>
                <button
                  style={{
                    opacity:
                      type === column.field && isFilterClicked && !isReverse
                        ? `1`
                        : `0.5`,
                  }}
                  className="down_arrow"
                >
                  ▼
                </button>
                <button
                  style={{
                    opacity:
                      type === column.field && isFilterClicked && isReverse
                        ? `1`
                        : `0.5`,
                  }}
                  className="up_arrow"
                >
                  ▲
                </button>
              </>
            </th>
          ))}
        </tr>
      </thead>
    );
  };
  
  export default TableHeader;
  