import { Helmet } from "react-helmet-async";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact - News Metrics</title>
        <meta name="description" content="Contact News Metrics" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8">Contact Us</h1>
        {/* Add content for the Contact page here */}
      </div>
    </>
  );
};

export default Contact;