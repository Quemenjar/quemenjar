import { Link } from "react-router-dom";

function Navbar () {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">
                        Inventario
                    </Link>
                </li>
                <li>
                    <Link to="/shopping-list">
                        Lista de la compra
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;