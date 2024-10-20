import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format, isValid } from "date-fns";
import ArticleStructuredData from "./ArticleStructuredData";
import LoadingSpinner from './LoadingSpinner';
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../services/firebase";
import { slugify } from '../utils/slugify';


const TrendingArticle = ({ article }) => {
  if (!article) {
    return <LoadingSpinner />;
  }

  const slug = slugify(article.title);

  return (
    <article className="trending-article">
      <ArticleStructuredData article={article} />
      <Link
        to={`/article/${slug}`}
        className="block hover:bg-gray-100 transition-colors duration-200 border-b border-gray-200 last:border-b-0"
      >
        <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
          <div className="flex items-center gap-4">
            <img
              src={article.image}
              alt={`Thumbnail for ${article.title}`}
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 shrink-0"
              loading="lazy"
            />
            <div className="flex flex-col justify-center">
              <h2 className="text-[#111418] text-base font-medium leading-normal line-clamp-1">
                {article.title}
              </h2>
              <p className="text-[#637588] text-sm font-normal leading-normal line-clamp-2">
                {article.category}
              </p>
              <time 
                dateTime={isValid(article.date) ? article.date.toISOString() : ''}
                className="text-[#637588] text-xs font-normal leading-normal"
              >
                {isValid(article.date) ? format(article.date, "MMM d, yyyy • h:mm a") : "No date"}
              </time>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default TrendingArticle;
