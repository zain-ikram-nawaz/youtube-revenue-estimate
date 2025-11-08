"use client";
import React, { useState, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';

const GuideForm = () => {
  const [formData, setFormData] = useState({
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

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [currentTag, setCurrentTag] = useState('');
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const fileInputRef = useRef(null);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle thumbnail upload with preview
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        thumbnail: file
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add a tag
  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  // Remove a tag
  const handleRemoveTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  // Add a keyword
  const handleAddKeyword = () => {
    if (currentKeyword.trim() && !formData.keywords.includes(currentKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, currentKeyword.trim()]
      }));
      setCurrentKeyword('');
    }
  };

  // Remove a keyword
  const handleRemoveKeyword = (index) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index)
    }));
  };

  // Add a new content block
  const addContentBlock = (type) => {
    const newBlock = { type };

    // Set default values based on block type
    switch(type) {
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

    setFormData(prev => ({
      ...prev,
      blocks: [...prev.blocks, newBlock]
    }));
  };

  // Update content block
  const updateContentBlock = (index, field, value) => {
    setFormData(prev => {
      const updatedBlocks = [...prev.blocks];
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        [field]: value
      };
      return {
        ...prev,
        blocks: updatedBlocks
      };
    });
  };

  // Add a list item
  const addListItem = (blockIndex) => {
    setFormData(prev => {
      const updatedBlocks = [...prev.blocks];
      updatedBlocks[blockIndex].items = [...updatedBlocks[blockIndex].items, ''];
      return {
        ...prev,
        blocks: updatedBlocks
      };
    });
  };

  // Update a list item
  const updateListItem = (blockIndex, itemIndex, value) => {
    setFormData(prev => {
      const updatedBlocks = [...prev.blocks];
      updatedBlocks[blockIndex].items[itemIndex] = value;
      return {
        ...prev,
        blocks: updatedBlocks
      };
    });
  };

  // Remove a list item
  const removeListItem = (blockIndex, itemIndex) => {
    setFormData(prev => {
      const updatedBlocks = [...prev.blocks];
      updatedBlocks[blockIndex].items = updatedBlocks[blockIndex].items.filter((_, i) => i !== itemIndex);
      return {
        ...prev,
        blocks: updatedBlocks
      };
    });
  };

  // Add a table row
  const addTableRow = (blockIndex) => {
    setFormData(prev => {
      const updatedBlocks = [...prev.blocks];
      const columns = updatedBlocks[blockIndex].rows[0].length;
      updatedBlocks[blockIndex].rows.push(Array(columns).fill(''));
      return {
        ...prev,
        blocks: updatedBlocks
      };
    });
  };

  // Update a table cell
  const updateTableCell = (blockIndex, rowIndex, colIndex, value) => {
    setFormData(prev => {
      const updatedBlocks = [...prev.blocks];
      updatedBlocks[blockIndex].rows[rowIndex][colIndex] = value;
      return {
        ...prev,
        blocks: updatedBlocks
      };
    });
  };

  // Remove a table row
  const removeTableRow = (blockIndex, rowIndex) => {
    setFormData(prev => {
      const updatedBlocks = [...prev.blocks];
      updatedBlocks[blockIndex].rows = updatedBlocks[blockIndex].rows.filter((_, i) => i !== rowIndex);
      return {
        ...prev,
        blocks: updatedBlocks
      };
    });
  };

  // Remove a content block
  const removeContentBlock = (index) => {
    setFormData(prev => ({
      ...prev,
      blocks: prev.blocks.filter((_, i) => i !== index)
    }));
  };

  // Add a FAQ
  const addFAQ = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  // Update a FAQ
  const updateFAQ = (index, field, value) => {
    setFormData(prev => {
      const updatedFaqs = [...prev.faqs];
      updatedFaqs[index] = {
        ...updatedFaqs[index],
        [field]: value
      };
      return {
        ...prev,
        faqs: updatedFaqs
      };
    });
  };

  // Remove a FAQ
  const removeFAQ = (index) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  // Calculate read time based on content
  const calculateReadTime = () => {
    // Simple calculation: 200 words per minute
    let wordCount = 0;

    // Count words in title, summary, excerpt
    wordCount += (formData.title || '').split(/\s+/).length;
    wordCount += (formData.summary || '').split(/\s+/).length;
    wordCount += (formData.excerpt || '').split(/\s+/).length;

    // Count words in content blocks
    formData.blocks.forEach(block => {
      if (block.text) wordCount += block.text.split(/\s+/).length;
      if (block.items) block.items.forEach(item => wordCount += item.split(/\s+/).length);
      if (block.rows) block.rows.forEach(row => row.forEach(cell => wordCount += cell.split(/\s+/).length));
      if (block.question) wordCount += block.question.split(/\s+/).length;
      if (block.answer) wordCount += block.answer.split(/\s+/).length;
    });

    // Count words in FAQs
    formData.faqs.forEach(faq => {
      wordCount += (faq.question || '').split(/\s+/).length;
      wordCount += (faq.answer || '').split(/\s+/).length;
    });

    // Calculate minutes (at least 1 minute)
    return Math.max(1, Math.ceil(wordCount / 200));
  };

// ... (rest of the component code, state, and other handlers remain the same)

// Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
        // 1. Calculate read time
        const readTime = calculateReadTime();

        // 2. Prepare form data for submission
        const submitData = new FormData();

        // This array will hold the blocks structure, with File objects replaced by placeholders
        const blocksWithPlaceholders = [];

        // Used to create unique keys for files in FormData
        let fileIndex = 0;

        // Iterate over blocks to append files and create placeholders
        formData.blocks.forEach((block, index) => {
            const blockCopy = { ...block }; // Create a shallow copy for modification

            if (block.type === 'image' && block.file instanceof File) {
                // Generate a unique key for the file in FormData
                const fileKey = `blockImage_${fileIndex}`;

                // Append the actual File object to FormData
                submitData.append(fileKey, block.file, block.file.name);

                // Replace the File object in the block copy with the file key (placeholder)
                // The server will use this key to find the corresponding file in the request
                blockCopy.file = fileKey;
                fileIndex++;
            }
            // If it's an image block but no file, or a file object is not present,
            // the placeholder will remain as null/undefined which is fine.

            blocksWithPlaceholders.push(blockCopy);
        });

        // 3. Add all non-file form fields
        Object.keys(formData).forEach(key => {
            // Exclude blocks, faqs, and thumbnail (handled separately/modified)
            if (key !== 'thumbnail' && key !== 'blocks' && key !== 'faqs') {
                // For array fields (tags, keywords), append JSON string
                if (Array.isArray(formData[key])) {
                    submitData.append(key, JSON.stringify(formData[key]));
                } else {
                    submitData.append(key, formData[key]);
                }
            }
        });

        // 4. Add the main thumbnail file
        if (formData.thumbnail) {
            submitData.append('thumbnail', formData.thumbnail, formData.thumbnail.name);
        }

        // 5. Add blocks and FAQs as JSON strings
        submitData.append('blocks', JSON.stringify(blocksWithPlaceholders));
        submitData.append('faqs', JSON.stringify(formData.faqs));
        submitData.append('readTime', readTime);

        // 6. Single request - create guide
        // Note: The Content-Type header is not strictly required for FormData
        // as axios will set it correctly (multipart/form-data) with the boundary.
        const response = await axios.post('/api/guide', submitData, {
             headers: {
                 // You can omit this, but keeping it for clarity
                 'Content-Type': 'multipart/form-data',
             }
        });

        // ... (rest of success/reset logic remains the same)

        setMessage({
            text: 'Guide created successfully!',
            type: 'success'
        });

        // Reset form
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
        // Check for specific error response from the server if possible
        const errorMessage = error.response?.data?.message || 'Error creating guide. Please try again.';
        setMessage({
            text: errorMessage,
            type: 'error'
        });
    } finally {
        setIsSubmitting(false);
    }
};
  return (
    <div className="guide-form-container">
      <div className="form-header">
        <h1>Create New Guide</h1>
        <p>Fill in the details below to create a new guide</p>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="guide-form">
        {/* Basic Information Section */}
        <div className="form-section">
          <h2>Basic Information</h2>

          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter guide title"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                placeholder="e.g., Technology, Health"
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Author name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="thumbnail">Thumbnail</label>
            <div className="thumbnail-upload">
              <input
                type="file"
                id="thumbnail"
                ref={fileInputRef}
                onChange={handleThumbnailChange}
                accept="image/*"
              />
              {thumbnailPreview && (
                <div className="thumbnail-preview">
                  <Image width={100} height={100} src={thumbnailPreview} alt="Thumbnail preview" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SEO Section */}
        <div className="form-section">
          <h2>SEO Information</h2>

          <div className="form-group">
            <label htmlFor="metaTitle">Meta Title</label>
            <input
              type="text"
              id="metaTitle"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleInputChange}
              placeholder="Meta title for SEO"
            />
          </div>

          <div className="form-group">
            <label htmlFor="metaDescription">Meta Description</label>
            <textarea
              id="metaDescription"
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleInputChange}
              rows="3"
              placeholder="Meta description for SEO"
            />
          </div>

          <div className="form-group">
            <label htmlFor="summary">Summary</label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              rows="3"
              placeholder="Brief summary of the guide"
            />
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Excerpt</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows="2"
              placeholder="Short excerpt for preview"
            />
          </div>

          <div className="form-group">
            <label>Tags</label>
            <div className="tag-input">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Add a tag and press Enter"
              />
              <button type="button" onClick={handleAddTag} className="add-btn">
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <div className="tags-container">
              {formData.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(index)}>
                    <i className="fas fa-times"></i>
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Keywords</label>
            <div className="tag-input">
              <input
                type="text"
                value={currentKeyword}
                onChange={(e) => setCurrentKeyword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                placeholder="Add a keyword and press Enter"
              />
              <button type="button" onClick={handleAddKeyword} className="add-btn">
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <div className="tags-container">
              {formData.keywords.map((keyword, index) => (
                <span key={index} className="tag">
                  {keyword}
                  <button type="button" onClick={() => handleRemoveKeyword(index)}>
                    <i className="fas fa-times"></i>
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content Blocks Section */}
        <div className="form-section">
          <div className="section-header">
            <h2>Content Blocks</h2>
            <div className="block-options">
              <span>Add Block:</span>
              <button type="button" onClick={() => addContentBlock('heading')}>
                <i className="fas fa-heading"></i> Heading
              </button>
              <button type="button" onClick={() => addContentBlock('subheading')}>
                <i className="fas fa-heading"></i> Subheading
              </button>
              <button type="button" onClick={() => addContentBlock('paragraph')}>
                <i className="fas fa-paragraph"></i> Paragraph
              </button>
              <button type="button" onClick={() => addContentBlock('list')}>
                <i className="fas fa-list"></i> List
              </button>
              <button type="button" onClick={() => addContentBlock('table')}>
                <i className="fas fa-table"></i> Table
              </button>
              <button type="button" onClick={() => addContentBlock('image')}>
                <i className="fas fa-image"></i> Image
              </button>
              <button type="button" onClick={() => addContentBlock('video')}>
                <i className="fas fa-video"></i> Video
              </button>
              <button type="button" onClick={() => addContentBlock('faq')}>
                <i className="fas fa-question"></i> FAQ
              </button>
              <button type="button" onClick={() => addContentBlock('link')}>
                <i className="fas fa-link"></i> Link
              </button>
            </div>
          </div>

          {formData.blocks.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-plus-circle"></i>
              <p>No content blocks added yet. Use the buttons above to add your first block.</p>
            </div>
          ) : (
            <div className="blocks-container">
              {formData.blocks.map((block, index) => (
                <div key={index} className="content-block">
                  <div className="block-header">
                    <span className="block-type">{block.type}</span>
                    <button
                      type="button"
                      onClick={() => removeContentBlock(index)}
                      className="remove-block"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>

                  <div className="block-content">
                    {block.type === 'heading' || block.type === 'subheading' || block.type === 'paragraph' || block.type === 'link' ? (
                      <div className="form-group">
                        <label>
                          {block.type === 'heading' ? 'Heading Text' :
                           block.type === 'subheading' ? 'Subheading Text' :
                           block.type === 'paragraph' ? 'Paragraph Text' : 'Link Text'}
                        </label>
                        {block.type === 'paragraph' ? (
                          <textarea
                            value={block.text || ''}
                            onChange={(e) => updateContentBlock(index, 'text', e.target.value)}
                            rows="4"
                            placeholder={`Enter ${block.type} text`}
                          />
                        ) : (
                          <input
                            type="text"
                            value={block.text || ''}
                            onChange={(e) => updateContentBlock(index, 'text', e.target.value)}
                            placeholder={`Enter ${block.type} text`}
                          />
                        )}
                        {block.type === 'link' && (
                          <input
                            type="text"
                            value={block.url || ''}
                            onChange={(e) => updateContentBlock(index, 'url', e.target.value)}
                            placeholder="Enter URL"
                          />
                        )}
                      </div>
                    ) : block.type === 'list' ? (
                      <div className="form-group">
                        <label>List Items</label>
                        {block.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="list-item">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => updateListItem(index, itemIndex, e.target.value)}
                              placeholder={`List item ${itemIndex + 1}`}
                            />
                            {block.items.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeListItem(index, itemIndex)}
                                className="remove-item"
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addListItem(index)}
                          className="add-more"
                        >
                          <i className="fas fa-plus"></i> Add List Item
                        </button>
                      </div>
                    ) : block.type === 'table' ? (
                      <div className="form-group">
                        <label>Table</label>
                        <div className="table-editor">
                          <table>
                            <tbody>
                              {block.rows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                  {row.map((cell, colIndex) => (
                                    <td key={colIndex}>
                                      <input
                                        type="text"
                                        value={cell}
                                        onChange={(e) => updateTableCell(index, rowIndex, colIndex, e.target.value)}
                                        placeholder={`Cell ${rowIndex+1}-${colIndex+1}`}
                                      />
                                    </td>
                                  ))}
                                  <td>
                                    {block.rows.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => removeTableRow(index, rowIndex)}
                                        className="remove-row"
                                      >
                                        <i className="fas fa-trash"></i>
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <button
                            type="button"
                            onClick={() => addTableRow(index)}
                            className="add-more"
                          >
                            <i className="fas fa-plus"></i> Add Row
                          </button>
                        </div>
                      </div>
                    ) : block.type === 'image' ? (
                      <div className="form-group">
                        <label>Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) updateContentBlock(index, 'file', file);
                          }}
                        />
                        <input
                          type="text"
                          value={block.caption || ''}
                          onChange={(e) => updateContentBlock(index, 'caption', e.target.value)}
                          placeholder="Image caption"
                        />
                      </div>
                    ) : block.type === 'video' ? (
                      <div className="form-group">
                        <label>Video URL</label>
                        <input
                          type="text"
                          value={block.url || ''}
                          onChange={(e) => updateContentBlock(index, 'url', e.target.value)}
                          placeholder="Enter video URL"
                        />
                      </div>
                    ) : block.type === 'faq' ? (
                      <div className="form-group">
                        <label>FAQ</label>
                        <input
                          type="text"
                          value={block.question || ''}
                          onChange={(e) => updateContentBlock(index, 'question', e.target.value)}
                          placeholder="Question"
                        />
                        <textarea
                          value={block.answer || ''}
                          onChange={(e) => updateContentBlock(index, 'answer', e.target.value)}
                          rows="3"
                          placeholder="Answer"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FAQs Section */}
        <div className="form-section">
          <div className="section-header">
            <h2>FAQs</h2>
            <button type="button" onClick={addFAQ} className="add-faq-btn">
              <i className="fas fa-plus"></i> Add FAQ
            </button>
          </div>

          {formData.faqs.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-question-circle"></i>
              <p>No FAQs added yet. Click the button above to add your first FAQ.</p>
            </div>
          ) : (
            <div className="faqs-container">
              {formData.faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <div className="faq-header">
                    <span>FAQ {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeFAQ(index)}
                      className="remove-faq"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      value={faq.question || ''}
                      onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                      placeholder="Question"
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      value={faq.answer || ''}
                      onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                      rows="3"
                      placeholder="Answer"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Section */}
        <div className="form-actions">
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-btn"
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Creating Guide...
              </>
            ) : (
              <>
                <i className="fas fa-plus-circle"></i> Create Guide
              </>
            )}
          </button>

          <div className="form-info">
            <p><i className="fas fa-info-circle"></i> Slug, published date, and read time will be auto-generated</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GuideForm;