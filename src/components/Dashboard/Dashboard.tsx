import { Tabs, TabsProps } from "antd";
import { DashBoardWrap } from "./Dashboard.styles";
import Tab1 from "./components/Tab1";
import Tab2 from "./components/Tab2";

export default function Dashboard() {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Thống kê tổng quan",
      children: <Tab1 />,
    },
    {
      key: "2",
      label: "Thống kê theo đơn vị",
      children: <Tab2 />,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <DashBoardWrap>
      <div className="content-area">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </DashBoardWrap>
  );
}
