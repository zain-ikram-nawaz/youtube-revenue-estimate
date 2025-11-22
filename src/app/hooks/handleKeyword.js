// Add a keyword
export const handleAddKeyword = (currentKeyword, formData, setFormData, setCurrentKeyword) => {
  if (currentKeyword.trim() && !formData.keywords.includes(currentKeyword.trim())) {
    setFormData({
      ...formData,
      keywords: [...formData.keywords, currentKeyword.trim()]
    });
    setCurrentKeyword('');
  }
};

// Remove a keyword
export const handleRemoveKeyword = (index, formData, setFormData) => {
  setFormData({
    ...formData,
    keywords: formData.keywords.filter((_, i) => i !== index)
  });
};
