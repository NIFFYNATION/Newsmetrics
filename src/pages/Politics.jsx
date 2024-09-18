import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import PoliticsArticle from "../components/PoliticsArticle";
import Pagination from "../components/Pagination";
import { samplePosts } from "../utils/samplePosts";
import Advertisement from "../components/Advertisement";
import RandomPostsGrid from "../components/RandomPostsGrid";

const Politics = () => {
  const [politicsPosts, setPoliticsPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const filteredPosts = samplePosts.filter(post => post.category.toLowerCase() === "politics");
    setPoliticsPosts(filteredPosts);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = politicsPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(politicsPosts.length / postsPerPage);

  return (
    <>
      <Helmet>
        <title>Politics News - News Metrics</title>
        <meta name="description" content="Politics news from News Metrics" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8">Politics News</h1>
        <div className="space-y-6">
          {currentPosts.map((post) => (
            <PoliticsArticle key={post.id} {...post} />
          ))}
                <div className="w-3/4 mx-auto">
  <Advertisement isHomePage={false} />
</div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={paginate}
        />
        <RandomPostsGrid />
      </div>
    </>
  );
};

export default Politics;