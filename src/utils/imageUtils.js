// Add this function to your utilities file (e.g., src/utils/imageUtils.js)
export const getImageUrl = (imageRef) => {
  if (!imageRef) return 'https://newsmetrics.ng/default-article-image.jpg';
  if (typeof imageRef === 'string') return imageRef;
  // Assuming imageRef is a Firebase storage reference
  return `https://firebasestorage.googleapis.com/v0/b/${imageRef.bucket}/o/${encodeURIComponent(imageRef.fullPath)}?alt=media`;
};

