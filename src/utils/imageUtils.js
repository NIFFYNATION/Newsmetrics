// Add this function to your utilities file (e.g., src/utils/imageUtils.js)
export const getImageUrl = (imageRef) => {
  if (!imageRef) return 'https://firebasestorage.googleapis.com/v0/b/newsmetrics-3173e.appspot.com/o/post_images%2Fpcwall.svg%20(1)%20(1).png?alt=media&token=59376458-fffb-4aec-ade4-552240e27b9f';
  if (typeof imageRef === 'string') return imageRef;
  // Assuming imageRef is a Firebase storage reference
  return `https://firebasestorage.googleapis.com/v0/b/${imageRef.bucket}/o/${encodeURIComponent(imageRef.fullPath)}?alt=media`;
};

