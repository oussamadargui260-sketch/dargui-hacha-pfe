import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div>
      <h2>User Navbar</h2>
      <Outlet />
    </div>
  );
}