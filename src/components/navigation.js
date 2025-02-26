import { useState } from 'react';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const links = [
    { id: 1, text: 'ABOUT', href: '#about' },
    { id: 2, text: 'TIMELINE', href: '#timeline' },
    { id: 3, text: 'SPONSORS', href: '#sponsors' },
    { id: 4, text: 'TEAM', href: '#team' },
    { id: 5, text: 'FAQ', href: '#faq' },
    { id: 6, text: 'CONTACT', href: '#contact' }
  ];

  return (
    <nav className="fixed top-10 left-0 right-0 z-50 w-screen md:w-[50%]   mx-auto">
      <div className="flex justify-between items-center py-4 px-10 bg-white dark:bg-transparent dark:backdrop-blur-[10px] rounded-full">
        {/* Mobile Menu Button with Logo */}
        <img 
            src="/logo1.webp" 
            alt="Logo" 
            className="w-6 h-6 rounded-full "
          />
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-full  flex items-center space-x-2"
        >
         
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black backdrop-blur-[20px] rounded-[20px] shadow-lg rounded-b-lg">
            <div className="flex flex-col p-4 space-y-4">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="text-white font-[tech] hover:text-gray-300 transition-colors"
                  onClick={toggleMenu}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Desktop Menu */}
        <div className="mx-auto hidden  md:flex space-x-6 text-center justify-center">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="text-white font-[tech] hover:text-gray-300 transition-colors"
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;