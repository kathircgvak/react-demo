import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as Star } from "../../assets/star.svg";
import { ReactComponent as User } from "../../assets/user.svg";
import { ReactComponent as User1 } from "../../assets/user-1.svg";
import { ReactComponent as Home } from "../../assets/home.svg";
import { ReactComponent as Mobile } from "../../assets/mobile.svg";
import { ReactComponent as Building } from "../../assets/building.svg";
import { ReactComponent as At } from "../../assets/at.svg";
import { ReactComponent as Cross } from "../../assets/times.svg";
import ProcessingLoader from "../ProessingLoader/ProessingLoader";
import moment from "moment";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getSummary } from "../../redux/actions";

import "./Header.scss";

type HeaderInterface = {
  data: {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    birth_date: string;
    home_phone: string;
    mobile_phone: string;
    work_phone: string;
    email: string;
    activity: {
      sms: number;
      email: number;
      orders: number;
    };
    carrier_status: {
      since: string;
      status: string;
    };
  };
  error: {
    message: string;
  };
};

interface Header {
  summaryReducer: HeaderInterface;
}

const Header = () => {
  const dispatch = useDispatch();
  const headerData = useSelector((state: Header) => state.summaryReducer);
  const [processingLoader, setProcessingLoader] = useState<Boolean>(false);

  useEffect(() => {
    dispatch(getSummary());
  }, []);

  useEffect(() => {
    if (headerData?.error?.message) {
      toast.error("Something went wrong in Summary !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [headerData]);

  return (
    <>
      <div className="header-wrapper">
        <div className="header-top-layer">
          <div>
            <Star className="header-star" />
            <p>
              {`${headerData?.data?.first_name} ${headerData?.data?.last_name}`}{" "}
            </p>
          </div>
          <button
            className="new-order-btn"
            onClick={() => setProcessingLoader(true)}
          >
            New Order
          </button>
        </div>
        <div className="header-details">
          <div className="grid-container-1">
            <User style={{ width: "63px", paddingTop: "21px" }} />
            <p>{`${headerData?.data?.gender} - ${moment().diff(
              headerData?.data?.birth_date,
              "years"
            )} 
        `}</p>
          </div>
          <div className="grid-container-2">
            <div>
              <User1
                style={{
                  width: "12px",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                }}
              />
              <span>#{headerData?.data?.id}</span>
            </div>
            <div>
              <Mobile
                style={{
                  width: "9px",
                  paddingLeft: "14px",
                  paddingRight: "13px",
                }}
              />
              <span>{headerData?.data?.mobile_phone}</span>
            </div>
            <div>
              <Building
                style={{
                  width: "12px",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                }}
              />
              <span>{headerData?.data?.work_phone}</span>
            </div>
            <div>
              <Home
                style={{
                  width: "16px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              />
              <span>{headerData?.data?.home_phone}</span>
            </div>
            <div>
              <At
                style={{
                  width: "14px",
                  paddingLeft: "11px",
                  paddingRight: "12px",
                }}
              />
              <span
                style={{ font: "normal normal normal 11px/15px Open Sans" }}
              >
                {headerData?.data?.email}
              </span>
            </div>
          </div>
          <div className="grid-container-3">
            <div className="title">90-DAY COMMUNICATION ACTIVITY</div>
            <div className="content">
              <div className="card">
                <div className="number">{headerData?.data?.activity?.sms}</div>
                <div className="data">SMS</div>
              </div>
              <div className="card">
                <div className="number">
                  {headerData?.data?.activity?.email}
                </div>
                <div className="data">EMAIL</div>
              </div>
              <div className="card">
                <div className="number">
                  {headerData?.data?.activity?.orders}
                </div>
                <div className="data">ORDERS</div>
              </div>
            </div>
          </div>
          <div className="grid-container-4">
            <div className="title">SMS CARRIER STATUS</div>
            <div className="content">
              <div className="card">
                <div className="number">
                  {headerData?.data?.carrier_status?.status}
                </div>
                <div className="data">
                  SINCE{" "}
                  {moment(headerData?.data?.carrier_status?.since).format("ll")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      {processingLoader ? (
        <div className="processing-loader">
          <ProcessingLoader />
          <Cross
            className="close-icn"
            onClick={() => setProcessingLoader(false)}
          />
        </div>
      ) : null}
    </>
  );
};

export default Header;
