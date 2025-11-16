/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const useImageHandler = (multiple = false) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Handle one or multiple file selections
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setLoading(true);

    const fileArray = multiple ? Array.from(selectedFiles) : [selectedFiles[0]]; // Limit to one file if multiple = false

    const previewArray: string[] = [];

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previewArray.push(reader.result as string);

        // ✅ Update previews only when all files are read
        if (previewArray.length === fileArray.length) {
          setPreviews(previewArray);
          setFiles(fileArray);
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const resetImages = () => {
    setPreviews([]);
    setFiles([]);
  };

  return {
    previews,
    files,
    loading,
    handleImageChange,
    resetImages,
    setFiles,
    setPreviews,
  };
};

export default useImageHandler;
