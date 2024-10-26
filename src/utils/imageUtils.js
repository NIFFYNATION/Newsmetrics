import { ref, getDownloadURL } from "firebase/storage";
import { imgStorage } from "../services/firebase";

export const getImageUrl = async (imageRef) => {
  if (!imageRef) return 'https://newsmetrics.ng/favicon.svg';
  if (typeof imageRef === 'string') return imageRef;

  try {
    const storageRef = ref(imgStorage, imageRef);
    const bucket = storageRef.bucket;
    const fullPath = storageRef.fullPath;
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error getting image URL:", error);
    return 'https://newsmetrics.ng/favicon.svg';
  }
};
