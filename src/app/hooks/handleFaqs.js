// Add a FAQ
export const addFAQ = (formData, setFormData) => {
  setFormData({
    ...formData,
    faqs: [...formData.faqs, { question: '', answer: '' }]
  });
};

// Update a FAQ
export const updateFAQ = (index, field, value, formData, setFormData) => {
  const updatedFaqs = [...formData.faqs];
  updatedFaqs[index] = {
    ...updatedFaqs[index],
    [field]: value
  };
  setFormData({
    ...formData,
    faqs: updatedFaqs
  });
};

// Remove a FAQ
export const removeFAQ = (index, formData, setFormData) => {
  setFormData({
    ...formData,
    faqs: formData.faqs.filter((_, i) => i !== index)
  });
};
