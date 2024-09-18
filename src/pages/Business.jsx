import { Helmet } from "react-helmet-async";

const Business = () => {
  return (
    <>
      <Helmet>
        <title>Business News - News Metrics</title>
        <meta name="description" content="Business news from News Metrics" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8">Business News</h1>
        {/* Add content for business news here */}
      </div>
    </>
  );
};

export default Business;