import { useState } from "react";
import { ShoppingCart, Menu, Search } from "lucide-react";
import "../styles/Header.css";

export default function Nav() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="nav">
            <div className="nav-container">
                {/* Logo */}
                <div className="logo">
                    <span className="brand">La DesEsperanza</span>
                    <span className="tagline">Panadería artesanal</span>
                </div>

                {/* Menú desktop */}
                <div className="links">
                    <a href="#">Inicio</a>
                    <a href="#">Productos</a>
                    <a href="#">Ofertas</a>
                    <a href="#">Nosotros</a>
                    <a href="#">Contacto</a>
                </div>

                {/* Buscador */}
                <div className="search-bar">
                    <input type="text" placeholder="Buscar pan, café, postres..." />
                    <button>
                        <Search size={18} />
                    </button>
                </div>

                {/* Acciones */}
                <div className="actions">
                    <button className="cart-btn">
                        <ShoppingCart size={22} />
                        <span className="badge">3</span>
                    </button>
                    <button className="login-btn">Iniciar Sesión</button>
                    <button
                        className="menu-btn"
                        onClick={() => setOpen(!open)}
                    >
                        <Menu size={22} />
                    </button>
                </div>
            </div>

            {/* Menú móvil */}
            {open && (
                <div className="mobile-menu">
                    <a href="#">Inicio</a>
                    <a href="#">Productos</a>
                    <a href="#">Ofertas</a>
                    <a href="#">Nosotros</a>
                    <a href="#">Contacto</a>
                    <hr />
                    <a href="#">Iniciar Sesión</a>
                </div>
            )}
        </nav>
    );
}
