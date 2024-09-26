import { Helmet } from "react-helmet-async";
import ContactComp from "../components/ContactComp";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact - News Metrics</title>
        <meta name="description" content="Contact News Metrics" />
      </Helmet>
   
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactComp />
    
      </div>
      
    </>
  );
};

export default Contact;
