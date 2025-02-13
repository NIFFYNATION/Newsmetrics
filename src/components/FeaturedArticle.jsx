import { Link } from "react-router-dom";
import { format, isValid } from "date-fns";
import ArticleStructuredData from "./ArticleStructuredData";
import { useComments } from '../context/CommentsContext';
import { slugify } from '../utils/slugify';

const FeaturedArticle = ({ id, title, author, date, description, image, category }) => {
  const { getCommentCount } = useComments();
  const commentCount = getCommentCount(id);
  const slug = slugify(title);
  return (
    <article>
      <ArticleStructuredData 
        article={{id, image, title, author, description, date, category: "Featured"}}
      />
      <Link
        to={`/article/${slug}`}
        className="block hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 last:border-b-0"
      >
        <div className="p-4 @container">
          <div className="flex flex-col items-stretch justify-start rounded-xl sm:flex-row sm:items-start">
            <div className="w-full h-48 sm:h-full bg-center bg-no-repeat bg-cover rounded-xl sm:w-1/2 lg:w-2/5 overflow-hidden">
              <img src={image}  alt={`Featured article: ${title}`}  className="w-full h-full object-cover" />
            </div>
            <div className="flex w-full grow flex-col items-stretch justify-center gap-2 py-4 sm:px-4">
              <p className="text-[#637588] text-sm font-normal leading-normal">
                Featured • {date && isValid(new Date(date))
                  ? format(new Date(date), "MMMM d, yyyy • h:mm a")
                  : "No date available"}
              </p>
              <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] sm:text-xl lg:text-2xl">
                {title}
              </h2>
              <p className="text-[#637588] text-base font-normal leading-normal">
                {description}
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <p className="text-[#637588] text-base font-normal leading-normal">
                  By: {author}
                </p>
                <div className="flex items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">{commentCount} comments</span>
                </div>
                <span className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-red-600 text-white text-sm font-medium leading-normal mt-2 sm:mt-0">
                  Read More
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default FeaturedArticle;
