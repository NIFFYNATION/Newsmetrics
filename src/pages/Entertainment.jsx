import { Helmet } from "react-helmet-async";

const Entertainment = () => {
  return (
    <>
      <Helmet>
        <title>Entertainment - News Metrics</title>
        <meta name="description" content="Entertainment news from News Metrics" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8">Entertainment</h1>
        {/* Add content for entertainment news here */}
      </div>
    </>
  );
};

export default Entertainment;