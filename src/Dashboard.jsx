import DashboardContent from "./components/DashboardContent";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function Dashboard() {
  return (
    <div className="flex">
     
      <Sidebar />

      <div className="flex flex-col flex-1 h-screen overflow-auto">
        <Header />

       <DashboardContent />
      </div>
    </div>
  );
}

export default Dashboard;
