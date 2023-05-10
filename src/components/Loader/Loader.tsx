import { FC, ReactElement } from "react";

import "./Loader.scss";

type props = {
  showLoader: boolean;
};

const Loader: FC<props> = ({ showLoader }): ReactElement => {
  return (
    <>
      {showLoader ? (
        <div className="loader-wrapper">
          <div className="dot-flashing"></div>
        </div>
      ) : (
        <div className="no-items">No Items</div>
      )}
    </>
  );
};

export default Loader;
