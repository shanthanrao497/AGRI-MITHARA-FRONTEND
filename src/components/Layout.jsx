import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import BottomNavigation from "./BottomNavigation";

function Layout({ children }) {
  return (
    <div className="app-layout">

      <Navbar />

      <div className="app-body">
        <Sidebar />

        <main className="app-main">
          {children}
        </main>
      </div>

      <BottomNavigation />

    </div>
  );
}

export default Layout;