import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h5 className="font-bold text-lg mb-4">Aura-stile</h5>
            <p className="mb-4">© 2025 Aura-stile. Todos los derechos reservados.</p>
            <p>Dirección ficticia: Calle Falsa 123, Ciudad Imaginaria</p>
            <p>Teléfono ficticio: +123 456 7890</p>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4">Síguenos</h5>
            <div className="flex space-x-4">
              {/* Logos de redes sociales */}
              <a href="#facebook" className="hover:text-gray-400 transition-colors">Facebook</a>
              <a href="#twitter" className="hover:text-gray-400 transition-colors">Twitter</a>
              <a href="#instagram" className="hover:text-gray-400 transition-colors">Instagram</a>
            </div>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4">Enlaces Rápidos</h5>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-gray-400 transition-colors">Sobre Nosotros</a></li>
              <li><a href="#contact" className="hover:text-gray-400 transition-colors">Contacto</a></li>
              <li><a href="#privacy" className="hover:text-gray-400 transition-colors">Política de Privacidad</a></li>
              <li><a href="#terms" className="hover:text-gray-400 transition-colors">Términos y Condiciones</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;