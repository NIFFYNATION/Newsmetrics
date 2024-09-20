import HeroCarousel from "./HeroCarousel";
import TrendingArticle from "./TrendingArticle";

const HeroSection = ({ latestPosts }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-8">
      <div className="lg:w-2/3">
        <HeroCarousel latestPosts={latestPosts.slice(0, 5)} />
      </div>
      <aside className="lg:w-1/3 space-y-6">
        <h2 className="text-[#111418] text-xl font-bold leading-tight tracking-[-0.015em] mb-4 pb-2 border-b border-gray-200">
          Trending Now
        </h2>
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
          {latestPosts.slice(0, 5).map((post) => (
            <TrendingArticle key={post.id} {...post} />
          ))}
        </div>
      </aside>
    </div>
  );
};

export default HeroSection;