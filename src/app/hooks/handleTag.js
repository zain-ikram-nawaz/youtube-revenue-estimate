// utils/guideFormHandlers.js
export const handleAddTag = (currentTag, formData, setFormData, setCurrentTag) => {
  if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
    setFormData({
      ...formData,
      tags: [...formData.tags, currentTag.trim()]
    });
    setCurrentTag('');
  }
};

export const handleRemoveTag = (index, formData, setFormData) => {
  setFormData({
    ...formData,
    tags: formData.tags.filter((_, i) => i !== index)
  });
};

// Similarly, you can export handleAddKeyword, removeKeyword, addContentBlock, updateContentBlock, addListItem, etc.
