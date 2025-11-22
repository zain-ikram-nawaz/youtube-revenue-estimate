import axios from 'axios';
import { calculateReadTime } from "./readTime"

export const handleSubmitGuide = async ({
  e,
  formData,
  setFormData,
  setMessage,
  setThumbnailPreview,
  fileInputRef,
  setIsSubmitting
}) => {
  e.preventDefault();
  setIsSubmitting(true);
  setMessage({ text: '', type: '' });

  try {
    const readTime = calculateReadTime(formData);
    const submitData = new FormData();
    const blocksWithPlaceholders = [];
    let fileIndex = 0;

    formData.blocks.forEach((block, index) => {
      const blockCopy = { ...block };
      if (block.type === 'image' && block.file instanceof File) {
        const fileKey = `blockImage_${fileIndex}`;
        submitData.append(fileKey, block.file, block.file.name);
        blockCopy.file = fileKey;
        fileIndex++;
      }
      blocksWithPlaceholders.push(blockCopy);
    });

    Object.keys(formData).forEach(key => {
      if (key !== 'thumbnail' && key !== 'blocks' && key !== 'faqs') {
        if (Array.isArray(formData[key])) {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      }
    });

    if (formData.thumbnail) {
      submitData.append('thumbnail', formData.thumbnail, formData.thumbnail.name);
    }

    submitData.append('blocks', JSON.stringify(blocksWithPlaceholders));
    submitData.append('faqs', JSON.stringify(formData.faqs));
    submitData.append('readTime', readTime);

    await axios.post('/api/guide', submitData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    setMessage({
      text: 'Guide created successfully!',
      type: 'success'
    });

    setFormData({
      title: '',
      category: '',
      author: 'Admin',
      thumbnail: null,
      metaTitle: '',
      metaDescription: '',
      summary: '',
      excerpt: '',
      tags: [],
      keywords: [],
      blocks: [],
      faqs: []
    });
    setThumbnailPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

  } catch (error) {
    console.error('Error creating guide:', error);
    const errorMessage = error.response?.data?.message || 'Error creating guide. Please try again.';
    setMessage({ text: errorMessage, type: 'error' });
  } finally {
    setIsSubmitting(false);
  }
};
