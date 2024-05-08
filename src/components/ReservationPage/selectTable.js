import { useContext, useEffect } from "react";
import { tableContext } from "../context/TableContext/TableContext";
import { Link } from "react-router-dom";
const SelectTable = () => {
  const { getTableDetailsAction, table, error } = useContext(tableContext);

  useEffect(() => {
    getTableDetailsAction();
  }, []);
  return (
    <>
      {error ? (
        <>
          <div
            className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>{" "}
            <span className="block sm:inline ">{error}</span>
          </div>
        </>
      ) : (
        <>
          <p className="text-center text-2xl mt-10 ">Select a Table</p>
          <div className="grid grid-cols-2 gap-4 my-10 w-3/4 mx-auto border-dashed border-2 border-sky-500 p-10 sm:w-1/2">
            {table?.map((t) => {
              return (
                <Link to={`/reservation/${t?._id}`}>
                  <div className="bg-cyan-500 p-10 rounded-md cursor-pointer hover:bg-cyan-700 hover:text-white ">
                    <p className="text-center">Table {t.tableNumber}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default SelectTable;
