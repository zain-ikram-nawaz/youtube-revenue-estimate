// Handle thumbnail change with preview
export const handleThumbnailChange = (e, setFormData, setThumbnailPreview) => {
  const file = e.target.files[0];
  if (file) {
    setFormData(prev => ({
      ...prev,
      thumbnail: file
    }));

    const reader = new FileReader();
    reader.onload = (event) => {
      setThumbnailPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  }
};
