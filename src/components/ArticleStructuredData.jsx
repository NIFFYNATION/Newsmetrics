import { Helmet } from "react-helmet-async";

const ArticleStructuredData = ({ article }) => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: article.metaTitle || article.title,
        datePublished: article.date,
        dateModified: article.lastModified || article.date,
        author: {
          "@type": "Person",
          name: article.author,
        },
        description: article.metaDescription || article.description,
        image: article.image,
        articleBody: article.content,
        publisher: {
          "@type": "Organization",
          name: "News Metrics",
          logo: {
            "@type": "ImageObject",
            url: "https://www.newsmetrics.ng/logo.png"
          }
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://www.newsmetrics.ng/article/${article.id}`
        },
        keywords: article.keywords ? article.keywords.join(', ') : '',
      })}
    </script>
  </Helmet>
);

export default ArticleStructuredData;
