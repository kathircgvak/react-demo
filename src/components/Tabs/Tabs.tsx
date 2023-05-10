import { useState, FC, ReactElement } from "react";
import "./Tabs.scss";
import classNames from "classnames";

const TabsList: any = [
  {
    name: "ORDERS A",
    key: 1,
    isActive: false,
  },
  {
    name: "ORDERS AA",
    key: 2,
    isActive: false,
  },
  {
    name: "ORDERS AAA",
    key: 3,
    isActive: false,
  },
  {
    name: "ORDERS B",
    key: 4,
    isActive: false,
  },
  {
    name: "ORDERS C",
    key: 5,
    isActive: false,
  },
];

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
