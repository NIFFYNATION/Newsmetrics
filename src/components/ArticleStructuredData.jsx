import { Helmet } from "react-helmet-async";

const ArticleStructuredData = ({ article }) => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: article.title,
        datePublished: article.date,
        author: {
          "@type": "Person",
          name: article.author,
        },
        description: article.description,
      })}
    </script>
  </Helmet>
);

export default ArticleStructuredData;
