import { Helmet } from "react-helmet-async";

const Politics = () => {
  return (
    <>
      <Helmet>
        <title>Politics - News Metrics</title>
        <meta name="description" content="Political news from News Metrics" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8">Politics</h1>
        {/* Add content for political news here */}
      </div>
    </>
  );
};

export default Politics;