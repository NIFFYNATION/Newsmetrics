import { Helmet } from "react-helmet-async";
import Advertisement from "../components/Advertisement";
import { FaShieldAlt, FaUserSecret, FaCookieBite, FaEnvelope } from 'react-icons/fa';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - News Metrics</title>
        <meta name="description" content="News Metrics Privacy Policy - Learn how we protect your personal information and respect your privacy." />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8 text-red-800">Privacy Policy</h1>
        
        <section className="mb-12 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-red-600 flex items-center">
            <FaShieldAlt className="mr-2" />
            Our Commitment to Privacy
          </h2>
          <p className="text-gray-700 mb-4">
            At News Metrics, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or use our services.
          </p>
        </section>

        <section className="mb-12 bg-red-50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-red-800 flex items-center">
            <FaUserSecret className="mr-2" />
            Information We Collect
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Personal information (e.g., name, email address) when you register or subscribe</li>
            <li>Usage data and analytics to improve our services</li>
            <li>Comments and feedback you provide on our articles</li>
            <li>Information from social media if you interact with our content on those platforms</li>
          </ul>
        </section>

        <section className="mb-12 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-red-600 flex items-center">
            <FaCookieBite className="mr-2" />
            Use of Cookies
          </h2>
          <p className="text-gray-700 mb-4">
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.
          </p>
        </section>

        <section className="mb-12 bg-red-50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-red-800 flex items-center">
            <FaEnvelope className="mr-2" />
            Contact Us
          </h2>
          <p className="text-gray-700 mb-4">
            If you have any questions or concerns about our Privacy Policy, please contact us at:
          </p>
          <p className="text-red-600 font-semibold">privacy@newsmetrics.com</p>
        </section>

        <div className="w-3/4 mx-auto mt-12">
          <Advertisement isHomePage={false} />
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
