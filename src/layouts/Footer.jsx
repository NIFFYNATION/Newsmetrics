import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="flex justify-center border-t border-gray-200">
    <div className=" max-w-7xl mx-auto flex  flex-1 flex-col">
      <div className="flex flex-col gap-6 px-5 py-10 text-center @container">
        <nav className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
          <div>
            <Link to="/">
              <h1 className="text-[#111418] text-xl font-bold min-w-40 leading-tight tracking-[-0.015em] sm:text-[1.7rem]">
                News
                <span className="text-red-600">Metrics</span>
              </h1>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            <Link
              to="/about"
              className="text-[#637588] text-sm sm:text-base font-normal leading-normal hover:text-[#111418] transition-colors duration-300 px-2 py-1 rounded-md hover:bg-gray-100"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-[#637588] text-sm sm:text-base font-normal leading-normal hover:text-[#111418] transition-colors duration-300 px-2 py-1 rounded-md hover:bg-gray-100"
            >
              Contact
            </Link>
            <Link
              to="/privacy-policy"
              className="text-[#637588] text-sm sm:text-base font-normal leading-normal hover:text-[#111418] transition-colors duration-300 px-2 py-1 rounded-md hover:bg-gray-100"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-[#637588] text-sm sm:text-base font-normal leading-normal hover:text-[#111418] transition-colors duration-300 px-2 py-1 rounded-md hover:bg-gray-100"
            >
              Terms of Service
            </Link>
          </div>

          <div>
            <h3
              className="font-[600] text-base font-normal leading-normal max-w-40"
              
            >
              Powered by EmDev
            </h3>
          </div>
        </nav>
        <p className="text-[#637588] text-base font-normal leading-normal">
          © {new Date().getFullYear()} NewsMetrics
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;