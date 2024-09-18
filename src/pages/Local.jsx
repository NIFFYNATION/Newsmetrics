import { Helmet } from "react-helmet-async";

const Local = () => {
  return (
    <>
      <Helmet>
        <title>Local News - News Metrics</title>
        <meta name="description" content="Local news from News Metrics" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8">Local News</h1>
        {/* Add content for local news here */}
      </div>
    </>
  );
};

export default Local;