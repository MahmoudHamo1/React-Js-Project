import { NavLink } from "react-router-dom";
export default function SideBar() {
  return (
    <div className="side-bar">
      <NavLink
        activeClassName="active"
        to="/dashboard/users"
        className="item-link"
      >
        <i className="fa-solid fa-users"></i> Users
      </NavLink>
      <NavLink
        activeClassName="active"
        to="/dashboard/users/create"
        className="item-link"
      >
        <i className="fa-solid fa-users"></i>New Users
      </NavLink>
      <NavLink
        activeClassName="active"
        to="/dashboard/products/"
        className="item-link"
      >
        <i className="fa-solid fa-brands fa-product-hunt"></i> Products
      </NavLink>
      <NavLink
        activeClassName="active"
        to="/dashboard/products/create"
        className="item-link"
      >
        <i className="fa-solid fa-plus"></i> New Product
      </NavLink>
    </div>
  );
}
