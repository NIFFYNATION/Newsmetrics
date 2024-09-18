const Advertisement = ({ isHomePage = false }) => (
  <div className={`bg-gray-100 p-4 rounded-lg ${isHomePage ? "" : "my-6"}`}>
    <h2 className="text-lg font-bold mb-2">Advertisement</h2>
    <div
      className={`bg-gray-300 flex items-center justify-center text-gray-600 ${
        isHomePage ? "h-60" : "h-40"
      }`}
    >
      Ad Space
    </div>
  </div>
);

export default Advertisement;
