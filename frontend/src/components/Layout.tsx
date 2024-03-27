import {Link, Outlet} from "react-router-dom";

export default function Layout() {
  return (
    <header>
      <nav className="w-full px-14 py-7">
        <div className="flex justify-around items-center w-full">
          <Link to="/" className="text-2xl font-semibold italic">
            Food Delivery
          </Link>
          <Link
            to="/create-organization"
            className="bg-indigo-500 p-2 rounded-md font-medium"
          >
            Create Organization
          </Link>
        </div>
        <div>{<Outlet />}</div>
      </nav>
    </header>
  );
}
