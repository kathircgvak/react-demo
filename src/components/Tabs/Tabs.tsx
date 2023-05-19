import { useState, FC, ReactElement } from "react";
import "./Tabs.scss";
import classNames from "classnames";
import { TabsList } from "../../constants/GlobalConstants";

type props = {
  handleTabIndex: (tab: number) => void;
};

const Tabs: FC<props> = ({ handleTabIndex }): ReactElement => {
  const [activeTab, setActiveTab] = useState(3);

  return (
    <>
      <div className="tab-component-wrapper">
        {TabsList?.map((tab: any, index: number) => (
          <div
            key={index}
            className={classNames("individual-tab-item", {
              "tab-active": activeTab === tab.key,
            })}
            onClick={() => {
              setActiveTab(tab.key);
              handleTabIndex(tab.key);
            }}
          >
            {tab?.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default Tabs;
