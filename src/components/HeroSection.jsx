import HeroCarousel from "./HeroCarousel";
import TrendingArticle from "./TrendingArticle";

const HeroSection = ({ latestPosts }) => {
  const carouselPosts = latestPosts.slice(0, 5);
  const remainingPosts = latestPosts.slice(2);
  const trendingPosts = remainingPosts.slice(0, 7);

  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-8">
      <div className="lg:w-2/3">
        <HeroCarousel latestPosts={carouselPosts} />
      </div>
      <aside className="lg:w-1/3 space-y-6">
        <h2 className="text-[#111418] text-xl font-bold leading-tight tracking-[-0.015em] mb-4 pb-2 border-b border-gray-200">
          Trending Now
        </h2>
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
          {trendingPosts.map((post) => (
            <TrendingArticle key={post.id} article={post} />
          ))}
        </div>
      </aside>
    </div>
  );
};

export default HeroSection;
