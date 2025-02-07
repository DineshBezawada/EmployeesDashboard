import { imgFallbackURL } from "../../utils/constants";
import Img from "../FallbackImg";

const TableBody = ({ data, header, handleGetUserDetails }) => {
  return (
    <tbody>
      {data?.map((row) => (
        <tr key={row.id}>
          {header?.map((column, colIndex) => (
            <td key={colIndex}>
              {column.field === "firstName" ? (
                <>
                  <div className="flex_div">
                    <div
                      className="user_img"
                      onClick={() => {
                        handleGetUserDetails(row?.id);
                      }}
                    >
                      <Img
                        lazy
                        src={row.avatar}
                        alt="DK"
                        fallbackSrc={imgFallbackURL}
                      />
                    </div>
                    <div className="user_name">{row[column.field]}</div>
                  </div>
                </>
              ) : (
                <>{row[column.field]}</>
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
