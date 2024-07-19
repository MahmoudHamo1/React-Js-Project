import TopBar from "../../Components/TopBar";
import SideBar from "../../Components/SideBar";
import { Outlet } from "react-router-dom";
import "./dashboard.css";
export default function Dashboard() {
  return (
    <div>
      <TopBar />
      <div className="content-flex">
        <SideBar />
        <div style={{ width: "80%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
