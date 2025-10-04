import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function Dashboard() {
  return (
    <div className="flex">
     
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />
      </div>
    </div>
  );
}

export default Dashboard;
