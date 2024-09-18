import { Helmet } from "react-helmet-async";

const Tech = () => {
  return (
    <>
      <Helmet>
        <title>Tech News - News Metrics</title>
        <meta name="description" content="Technology news from News Metrics" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8">Tech News</h1>
        {/* Add content for tech news here */}
      </div>
    </>
  );
};

export default Tech;