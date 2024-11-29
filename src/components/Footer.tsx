export const Footer = () => {
  return (
    <footer className="bg-gray-900/50 backdrop-blur-sm py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © 2024 412-Chrono. Tous droits réservés.
          </div>
          <div className="flex gap-6">
            <a href="#about" className="text-gray-400 hover:text-white transition-colors">
              À Propos
            </a>
            <a href="#support" className="text-gray-400 hover:text-white transition-colors">
              Support
            </a>
            <a href="#terms" className="text-gray-400 hover:text-white transition-colors">
              Conditions Générales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};