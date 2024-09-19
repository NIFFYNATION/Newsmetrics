import { format } from "date-fns";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';

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
}) => {
  const shareUrl = `${window.location.origin}/article/${id}`;

  return (
    <article className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-64 object-cover" />
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
              {format(new Date(date), "MMMM d, yyyy • h:mm a")}
            </p>
          </div>
        </div>
        
        <div className="prose max-w-none">
          <p className="text-xl mb-6 text-gray-700 leading-relaxed">{description}</p>
          <div 
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        </div>
      </div>
      
      <div className="bg-gray-100 px-6 py-4 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Share this article</h2>
        <div className="flex space-x-4">
          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton url={shareUrl} title={title}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </div>
    </article>
  );
};

export default SinglePostArticle;