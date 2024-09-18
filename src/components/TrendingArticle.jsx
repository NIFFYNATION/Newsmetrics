import { Link } from "react-router-dom";
import { format } from "date-fns";
import ArticleStructuredData from "./ArticleStructuredData";


  const TrendingArticle = ({ id, image, title, category, date }) => (
    <>
      <ArticleStructuredData 
        article={{id, image, title, category, date}}
      />
      <Link
        to={`/article/${id}`}
        className="block hover:bg-gray-100 transition-colors duration-200 border-b border-gray-200 last:border-b-0"
      >
         <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
      <div className="flex items-center gap-4">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14 shrink-0"
          style={{ backgroundImage: `url("${image}")` }}
        ></div>
        <div className="flex flex-col justify-center">
          <p className="text-[#111418] text-base font-medium leading-normal line-clamp-1">
            {title}
          </p>
          <p className="text-[#637588] text-sm font-normal leading-normal line-clamp-2">
            {category}
          </p>
          <p className="text-[#637588] text-xs font-normal leading-normal">
            {format(new Date(date), "MMM d, yyyy • h:mm a")}
          </p>
        </div>
      </div>
      <div className="shrink-0">
        <div
          className="text-[#111418] flex size-7 items-center justify-center"
          data-icon="ArrowRight"
          data-size="24px"
          data-weight="regular"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
          </svg>
        </div>
      </div>
    </div>
      </Link>
    </>
  );
  
     
    

export default TrendingArticle;
