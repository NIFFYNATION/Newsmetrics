import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import BusinessArticle from "../components/BusinessArticle";
import Pagination from "../components/Pagination";
import { samplePosts } from "../utils/samplePosts";
import Advertisement from "../components/Advertisement";
import RandomPostsGrid from "../components/RandomPostsGrid";

const Business = () => {
  const [businessPosts, setBusinessPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const filteredPosts = samplePosts.filter(
      (post) => post.category.toLowerCase() === "business"
    );
    setBusinessPosts(filteredPosts);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = businessPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(businessPosts.length / postsPerPage);

  return (
    <>
      <Helmet>
        <title>Business News - News Metrics</title>
        <meta name="description" content="Business news from News Metrics" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8">Business News</h1>
        <div className="space-y-6">
          {currentPosts.map((post) => (
            <BusinessArticle key={post.id} {...post} />
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

export default Business;
