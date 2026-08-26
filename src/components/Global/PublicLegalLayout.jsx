import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "../../assets/export";
import { styles } from "../../styles/styles";

const PublicLegalLayout = ({ children, title }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className={`min-h-screen flex flex-col ${styles.bodyBg} text-gray-800`}>
      {/* Public Header */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={Logo} alt="Carveeps Logo" className="h-10 w-auto object-contain" />
          </Link>

          <nav className="flex items-center gap-2 sm:gap-6">
            <Link
              to="/privacy-policy"
              className={`text-sm font-medium transition-colors px-3 py-2 rounded-lg ${
                currentPath.includes("privacy-policy")
                  ? "text-[#FF204E] font-semibold bg-[#FF204E]/10"
                  : "text-gray-600 hover:text-[#FF204E]"
              }`}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-and-conditions"
              className={`text-sm font-medium transition-colors px-3 py-2 rounded-lg ${
                currentPath.includes("terms")
                  ? "text-[#FF204E] font-semibold bg-[#FF204E]/10"
                  : "text-gray-600 hover:text-[#FF204E]"
              }`}
            >
              Terms &amp; Conditions
            </Link>
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#FF204E] hover:bg-[#e01b44] rounded-xl transition-all shadow-sm shadow-[#FF204E]/20"
            >
              Dealer Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10 lg:p-12">
          {children}
        </div>
      </main>

      {/* Public Footer */}
      <footer className="w-full bg-white border-t border-gray-200 mt-auto py-8 text-center text-sm text-gray-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Carveeps" className="h-6 w-auto opacity-80" />
            <span>&copy; {new Date().getFullYear()} Carveeps, Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy-policy" className="hover:text-[#FF204E] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-[#FF204E] transition-colors">
              Terms of Service
            </Link>
            <a href="mailto:Admin@carveeps.com" className="hover:text-[#FF204E] transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLegalLayout;
