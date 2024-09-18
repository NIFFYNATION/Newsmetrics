import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About - News Metrics</title>
        <meta name="description" content="Learn about News Metrics" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8">About News Metrics</h1>
        {/* Add content for the About page here */}
      </div>
    </>
  );
};

export default About;