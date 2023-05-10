import { useState, useEffect } from "react";
import Table from "../Table/Table";
import Tabs from "../Tabs/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getOrders } from "../../redux/actions";
// @ts-ignore
import _ from "lodash";
import moment from "moment";

const TableHeader = [
  {
    id: 1,
    name: "DATE & TIME",
    key: "date",
    width: "11%",
  },
  { id: 2, name: "SUBJECT", key: "subject", width: "38%" },
  {
    id: 3,
    name: "COMMUNICATION TYPE",
    key: "type",
    width: "18%",
  },
  {
    id: 4,
    name: "ORDER #",
    key: "orderId",
    width: "15%",
  },
  { id: 5, name: "", key: "button", width: "10%" },
];

type OrderItems = {
  id: number;
  orderId: number;
  date: string;
  time: string;
  title: string;
  email: string;
  type: string;
};

type DataInterface = OrderItems[];

const Order = () => {
  const dispatch = useDispatch();
  const orderData = useSelector((state: any) => state.orderReducer);
  const [filteredOrderData, setFilteredOrderData] = useState<DataInterface>();
  const [tableData, setTableData] = useState<DataInterface>();
  const [tabIndex, setTabIndex] = useState(3);

  useEffect(() => {
    if (tabIndex === 3) {
      dispatch(getOrders());
    } else {
      setTableData([]);
    }
  }, [tabIndex]);

  useEffect(() => {
    setFilteredOrderData(orderData?.data?.orders_AAA?.sent);
  }, [orderData]);

  useEffect(() => {
    if (filteredOrderData?.length) {
      const data = filteredOrderData?.map((data: any) => {
        return {
          id: data?.id,
          orderId: data?.order_id,
          date: (
            <div>
              <div style={{ font: "normal normal normal 16px/22px Open Sans" }}>
                {moment(data?.sent_dt).format("ddd, MMM D")}
              </div>
              <div>{moment(data?.sent_tm, "h:mm a").format("h:mm a")}</div>
            </div>
          ),
          subject: (
            <div>
              <div style={{ font: "normal normal normal 16px/22px Open Sans" }}>
                {data?.subject?.title?.length > 52
                  ? `${data?.subject?.title?.substring(0, 52)}...`
                  : data?.subject?.title}
              </div>
              <div>{data?.subject?.email}</div>
            </div>
          ),
          type: data?.type,
          button: <button className="resend-btn">RESEND</button>,
        };
      });

      setTimeout(() => {
        setTableData(data as any);
      }, 2000);
    } else if (orderData?.error?.message) {
      toast.error("Something went wrong in Order !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [filteredOrderData]);

  const handleSortFunction = (value: any) => {
    setFilteredOrderData(
      _.orderBy(
        filteredOrderData,
        (item: any) => item.subject.title,
        value ? "asc" : "desc"
      )
    );
  };

  return (
    <>
      <Tabs
        handleTabIndex={(key: any) => {
          setTabIndex(key);
        }}
      />
      <Table
        tHead={TableHeader}
        tBody={tableData}
        tabIndex={tabIndex}
        handleSort={(value: any) => handleSortFunction(value)}
      />
      <ToastContainer />
    </>
  );
};

export default Order;
