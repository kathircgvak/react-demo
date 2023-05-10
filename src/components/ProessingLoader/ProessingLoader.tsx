import "./ProessingLoader.scss";

const ProcessingLoader = () => {
  return (
    <div className="loader_body">
      <div className="loader_content">
        <div className="data">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="txt">Processing</div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingLoader;
