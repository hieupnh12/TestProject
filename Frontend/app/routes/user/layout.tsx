import { Outlet } from "react-router";

export default function UserLayout() {
  return (
    <div className="user-layout">
      <header>User Header</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}