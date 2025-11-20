/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const useImageHandler = (multiple = false) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setLoading(true);

    // Convert current selections
    const newFiles = multiple ? Array.from(selectedFiles) : [selectedFiles[0]];

    // Merge with existing files
    const mergedFiles = multiple ? [...files, ...newFiles] : newFiles;

    const previewArray: string[] = [];
    let processed = 0;

    mergedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previewArray.push(reader.result as string);

        processed++;

        // Update once all previews are fully generated
        if (processed === mergedFiles.length) {
          setFiles(mergedFiles);
          setPreviews(previewArray);
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

  // New function to add existing previews (URLs from server)
  const addExistingPreviews = (urls: string[]) => {
    setPreviews((prev) => [
      ...prev,
      ...urls.filter((url) => !prev.includes(url)),
    ]);
  };

  // New function to set both previews and files separately
  const setPreviewsOnly = (urls: string[]) => {
    setPreviews(urls);
    // Don't modify files array when setting existing previews
  };

  // New function to add new files with previews
  const addNewFiles = (newFiles: File[]) => {
    if (newFiles.length === 0) return;

    setLoading(true);
    const mergedFiles = multiple ? [...files, ...newFiles] : newFiles;

    const previewArray: string[] = [];
    let processed = 0;

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previewArray.push(reader.result as string);
        processed++;

        if (processed === newFiles.length) {
          setFiles(mergedFiles);
          setPreviews((prev) => [...prev, ...previewArray]);
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return {
    previews,
    files,
    loading,
    handleImageChange,
    resetImages,
    setFiles,
    setPreviews,
    addExistingPreviews,
    setPreviewsOnly,
    addNewFiles,
  };
};

export default useImageHandler;
