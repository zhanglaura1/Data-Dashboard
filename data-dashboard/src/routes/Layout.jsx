import { Outlet, Link } from "react-router-dom"

function Layout(){
  return (
    <div>
      <nav>
        <ul>
            <li className="home-link" key="home-button">
            <Link style={{ color: "black", fontWeight: "bolder", textDecoration: "none" }} to="/">
                Home
            </Link>
            </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

export default Layout