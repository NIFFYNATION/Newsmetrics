import { format, isValid } from "date-fns";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import ArticleStructuredData from "./ArticleStructuredData";
import Comments from './Comments';
import { useComments } from '../context/CommentsContext';
import { slugify } from '../utils/slugify';


const SinglePostArticle = ({
  id,
  authorImage,
  title,
  author,
  description,
  date,
  content,
  image,
  category,
  comments = []
}) => {
 
  // Convert Firestore Timestamp to JavaScript Date
    const jsDate = date && date.toDate ? date.toDate() : new Date(date);
 

  const { getCommentCount } = useComments();
  const commentCount = getCommentCount(id);
  const shareUrl = `${window.location.origin}/article/${slugify(title)}`;

  return (
    <article className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <ArticleStructuredData article={{id, image, title, author, jsDate, category}} />
      <link rel="canonical" href={`${window.location.origin}/article/${slugify(title)}`} />
      <div className="relative">
        <img src={image} alt={`${title} - ${category} article by ${author}`} className="w-full h-[auto] aspect-contain" />
        <div className="absolute top-0 left-0 bg-red-600 text-white px-4 py-2 rounded-br-lg">
          {category}
        </div>
      </div>
      
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{title}</h1>
        
        <div className="flex items-center mb-6">
          <img
            src={authorImage}
            alt={author}
            className="w-12 h-12 rounded-full mr-4 border-2 border-red-600"
          />
          <div>
            <p className="font-semibold text-gray-800">{author}</p>
            <p className="text-sm text-gray-600">
              {isValid(jsDate)
                ? format(jsDate, "MMMM d, yyyy • h:mm a")
                : "No date available"}
            </p>
          </div>
        </div>
        
        <div className="prose max-w-none">
          {/* <p className="text-xl mb-6 text-gray-700 leading-relaxed">{description}</p> */}
          <div 
            className="text-gray-800 leading-relaxed article-content"
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        </div>
      </div>
      
      <div className="bg-gray-100 border py-4 mt-8 border-b-4 border-b-red-600">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 ml-4">Share post:</h2>
        <div className="flex space-x-4 ml-4">
          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={32} round />
            <span className="sr-only">Share on Facebook</span>
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={32} round />
            <span className="sr-only">Share on Twitter</span>
          </TwitterShareButton>
          <WhatsappShareButton url={shareUrl} title={title}>
            <WhatsappIcon size={32} round />
            <span className="sr-only">Share on WhatsApp</span>
          </WhatsappShareButton>
        </div>
      </div>
      <div className="mt-8">
        <Comments postId={id} comments={comments} />
      </div>
    </article>
    
  );
};

export default SinglePostArticle;
