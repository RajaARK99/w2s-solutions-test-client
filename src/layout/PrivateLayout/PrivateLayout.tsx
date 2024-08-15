import { Outlet } from "@tanstack/react-router";

const PrivateLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
