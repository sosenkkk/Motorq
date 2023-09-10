import MainNavigation from "../Components/MainNavigation";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <div className="fixed w-full">
        <MainNavigation />
      </div>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Root;
