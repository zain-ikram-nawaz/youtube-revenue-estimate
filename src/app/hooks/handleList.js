// Add a list item
export const addListItem = (blockIndex, formData, setFormData) => {
  const updatedBlocks = [...formData.blocks];
  updatedBlocks[blockIndex].items = [...updatedBlocks[blockIndex].items, ''];
  setFormData({
    ...formData,
    blocks: updatedBlocks
  });
};

// Update a list item
export const updateListItem = (blockIndex, itemIndex, value, formData, setFormData) => {
  const updatedBlocks = [...formData.blocks];
  updatedBlocks[blockIndex].items[itemIndex] = value;
  setFormData({
    ...formData,
    blocks: updatedBlocks
  });
};

// Remove a list item
export const removeListItem = (blockIndex, itemIndex, formData, setFormData) => {
  const updatedBlocks = [...formData.blocks];
  updatedBlocks[blockIndex].items = updatedBlocks[blockIndex].items.filter((_, i) => i !== itemIndex);
  setFormData({
    ...formData,
    blocks: updatedBlocks
  });
};
