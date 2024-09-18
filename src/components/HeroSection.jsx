import HeroCarousel from "./HeroCarousel";

const HeroSection = ({ latestPosts }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-8">
      <div className="lg:w-2/3">
        <HeroCarousel latestPosts={latestPosts} />
      </div>
      <aside className="lg:w-1/3 bg-gray-100 p-4 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Trending Topics</h2>
        <ul className="space-y-2">
          <li className="bg-white p-3 rounded-lg shadow-sm">
            <a href="#" className="text-blue-600 hover:underline">
              COVID-19 Updates
            </a>
          </li>
          <li className="bg-white p-3 rounded-lg shadow-sm">
            <a href="#" className="text-blue-600 hover:underline">
              Climate Change
            </a>
          </li>
          <li className="bg-white p-3 rounded-lg shadow-sm">
            <a href="#" className="text-blue-600 hover:underline">
              Tech Innovations
            </a>
          </li>
          <li className="bg-white p-3 rounded-lg shadow-sm">
            <a href="#" className="text-blue-600 hover:underline">
              Global Economy
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default HeroSection;
