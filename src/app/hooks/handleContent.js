// Add a new content block
export const addContentBlock = (type, formData, setFormData) => {
  const newBlock = { type };

  // Set default values based on block type
  switch (type) {
    case 'heading':
    case 'subheading':
    case 'paragraph':
      newBlock.text = '';
      break;
    case 'list':
      newBlock.items = [''];
      break;
    case 'table':
      newBlock.rows = [['', '']];
      break;
    case 'image':
      newBlock.file = null;
      newBlock.caption = '';
      break;
    case 'video':
    case 'link':
      newBlock.url = '';
      if (type === 'link') newBlock.text = '';
      break;
    case 'faq':
      newBlock.question = '';
      newBlock.answer = '';
      break;
    default:
      break;
  }

  setFormData({
    ...formData,
    blocks: [...formData.blocks, newBlock]
  });
};

// Update content block
export const updateContentBlock = (index, field, value, formData, setFormData) => {
  const updatedBlocks = [...formData.blocks];
  updatedBlocks[index] = {
    ...updatedBlocks[index],
    [field]: value
  };
  setFormData({
    ...formData,
    blocks: updatedBlocks
  });
};

// Remove a content block
export const removeContentBlock = (index, formData, setFormData) => {
  setFormData({
    ...formData,
    blocks: formData.blocks.filter((_, i) => i !== index)
  });
};
