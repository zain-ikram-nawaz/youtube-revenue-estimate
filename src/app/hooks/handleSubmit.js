import axios from 'axios';
import { calculateReadTime } from "./readTime"
export const handleSubmitGuide = async ({
  e,
  formData,
  setFormData,
  setMessage,
  setThumbnailPreview,
  fileInputRef,
  setIsSubmitting,
  editId = null // Naya parameter for editing
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
      // Sirf tab append karein jab block.file ek nayi File ho (URL na ho)
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

    // Thumbnail logic: Sirf tab append karein agar nayi file select hui ho
    if (formData.thumbnail instanceof File) {
      submitData.append('thumbnail', formData.thumbnail, formData.thumbnail.name);
    } else if (typeof formData.thumbnail === 'string') {
      // Agar purani image hi hai, to URL string bhej dein
      submitData.append('existingThumbnail', formData.thumbnail);
    }

    submitData.append('blocks', JSON.stringify(blocksWithPlaceholders));
    submitData.append('faqs', JSON.stringify(formData.faqs));
    submitData.append('readTime', readTime);

    // API Call Logic
    const url = editId ? `/api/guide/${editId}` : '/api/guide';
    const method = editId ? 'put' : 'post';

    await axios[method](url, submitData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    setMessage({
      text: editId ? 'Guide updated successfully!' : 'Guide created successfully!',
      type: 'success'
    });

    // Agar update hai to form clear na karein (marzi hai aapki)
    if (!editId) {
      // Reset form logic here...
    }

  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error.response?.data?.message || 'Error saving guide.';
    setMessage({ text: errorMessage, type: 'error' });
  } finally {
    setIsSubmitting(false);
  }
};
