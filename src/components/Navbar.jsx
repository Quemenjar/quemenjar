import { Link, NavLink } from "react-router-dom";

function Navbar () {
    return (
        <nav className="navbar display-header">
            <h1>Quemenjar</h1>
            <ul>
                <li>
                    <NavLink to="/">
                        Inventario
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/shopping-list">
                        Lista de la compra
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;