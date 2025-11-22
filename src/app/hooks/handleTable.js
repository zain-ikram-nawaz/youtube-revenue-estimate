// Add a table row
export const addTableRow = (blockIndex, formData, setFormData) => {
  const updatedBlocks = [...formData.blocks];
  const columns = updatedBlocks[blockIndex].rows[0].length;
  updatedBlocks[blockIndex].rows.push(Array(columns).fill(''));
  setFormData({
    ...formData,
    blocks: updatedBlocks
  });
};

// Update a table cell
export const updateTableCell = (blockIndex, rowIndex, colIndex, value, formData, setFormData) => {
  const updatedBlocks = [...formData.blocks];
  updatedBlocks[blockIndex].rows[rowIndex][colIndex] = value;
  setFormData({
    ...formData,
    blocks: updatedBlocks
  });
};

// Remove a table row
export const removeTableRow = (blockIndex, rowIndex, formData, setFormData) => {
  const updatedBlocks = [...formData.blocks];
  updatedBlocks[blockIndex].rows = updatedBlocks[blockIndex].rows.filter((_, i) => i !== rowIndex);
  setFormData({
    ...formData,
    blocks: updatedBlocks
  });
};
