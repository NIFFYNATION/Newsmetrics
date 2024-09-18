import { Helmet } from "react-helmet-async";

const Crime = () => {
  return (
    <>
      <Helmet>
        <title>Crime News - News Metrics</title>
        <meta name="description" content="Crime news from News Metrics" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8">Crime News</h1>
        {/* Add content for crime news here */}
      </div>
    </>
  );
};

export default Crime;