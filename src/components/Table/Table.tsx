import { useState, useEffect, FC, ReactElement } from "react";
import classNames from "classnames";
import "./Table.scss";
import Loader from "../Loader/Loader";

type props = {
  tHead: any;
  tBody: any;
  tabIndex: number;
  handleSort: any;
};

const Table: FC<props> = ({
  tHead,
  tBody,
  tabIndex,
  handleSort,
}): ReactElement => {
  const [sentActive, setSentActive] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [sortByAsc, setSortByAsc] = useState(false);

  useEffect(() => {
    if (showLoader) {
      setTimeout(() => {
        setShowLoader(false);
      }, 2000);
    }
  }, [showLoader]);

  useEffect(() => {
    setShowLoader(true);
  }, [tabIndex]);

  return (
    <>
      <div className="recent-orders">
        <div>
          <button
            className={classNames("tab-btn", {
              "button-active": sentActive === true,
            })}
            onClick={() => {
              setShowLoader(true);
              setSentActive(!sentActive);
            }}
          >
            SENT
          </button>
          <button
            className={classNames("tab-btn", {
              "button-active": sentActive === false,
            })}
            onClick={() => {
              setShowLoader(true);
              setSentActive(!sentActive);
            }}
          >
            ERRORS
          </button>
        </div>
        <div className="title">RECENT ORDERS</div>
      </div>
      {tBody?.length > 0 && sentActive && !showLoader ? (
        <table>
          <thead className="table-head">
            <tr>
              {tHead?.map((item: any, index: number) => (
                <td
                  key={index}
                  style={{ width: item.width, cursor: "pointer" }}
                  onClick={() => {
                    handleSort(sortByAsc);
                    setSortByAsc(!sortByAsc);
                  }}
                >
                  {item.name}
                </td>
              ))}
            </tr>
          </thead>
          <tbody className="table-body">
            {tBody?.map((item: any, index: number) => (
              <tr key={index}>
                {tHead?.map((row: any, index: number) => (
                  <td key={index}>{item[row.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Loader showLoader={showLoader} />
      )}
    </>
  );
};

export default Table;
