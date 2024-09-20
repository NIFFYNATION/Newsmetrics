import { Helmet } from "react-helmet-async";

const ArticleStructuredData = ({ article }) => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: article.title,
        datePublished: article.date,
        // dateModified: article.date, // Add this if you have a last modified date
        author: {
          "@type": "Person",
          name: article.author,
        },
        description: article.description,
        image: article.image,
        publisher: {
          "@type": "Organization",
          name: "News Metrics",
          logo: {
            "@type": "ImageObject",
            url: "https://www.newsmetrics.com/logo.png" // Replace with your actual logo URL
          }
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://www.newsmetrics.com/article/${article.id}` // Replace with your actual URL structure
        }
      })}
    </script>
  </Helmet>
);

export default ArticleStructuredData;
