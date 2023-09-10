import MainNavigation from "../Components/MainNavigation";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <div className="fixed w-full top-0">
        <MainNavigation />
      </div>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Root;
