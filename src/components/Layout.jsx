import Navbar from "./Navbar";
import { Outlet } from 'react-router-dom'; 

function Layout() {
  return (
    <>
      <Navbar />
      <section>
        <Outlet /> 
      </section>
    </>
  );
}

export default Layout;