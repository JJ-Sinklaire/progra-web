import "../styles/Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Columna 1 - Logo + descripción */}
                <div className="footer-col">
                    <h2 className="logo">La DesEsperanza</h2>
                    <p className="desc">
                        Panadería artesanal en el corazón de la ciudad.
                        Productos frescos cada día con amor y tradición.
                    </p>
                </div>

                {/* Columna 2 - Links rápidos */}
                <div className="footer-col">
                    <h3>Enlaces</h3>
                    <ul>
                        <li><a href="#">Inicio</a></li>
                        <li><a href="#">Productos</a></li>
                        <li><a href="#">Ofertas</a></li>
                        <li><a href="#">Nosotros</a></li>
                        <li><a href="#">Contacto</a></li>
                    </ul>
                </div>

                {/* Columna 3 - Contacto */}
                <div className="footer-col">
                    <h3>Contacto</h3>
                    <p>+52 55 1234 5678</p>
                    <p>contacto@ladesesperanza.com</p>
                </div>

                {/* Columna 4 - Redes sociales */}
                <div className="footer-col">
                    <h3>Síguenos</h3>
                    <div className="socials">
                        <a href="#">Facebook</a>
                        <a href="#">Instagram</a>
                        <a href="#">TikTok</a>
                    </div>
                </div>
            </div>

            {/* Barra inferior */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} La DesEsperanza · Todos los derechos reservados :/</p>
            </div>
        </footer>
    );
}
