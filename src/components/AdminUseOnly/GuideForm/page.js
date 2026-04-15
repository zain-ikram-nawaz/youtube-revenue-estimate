"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
// Font Awesome icons ke liye, main standard class names use kar raha hoon. Agar aap Font Awesome use nahi kar rahe to inko hata dejiye.

// Assuming these custom hooks are defined elsewhere and work correctly
import { handleAddTag, handleRemoveTag } from '@/app/hooks/handleTag';
import { handleThumbnailChange } from '@/app/hooks/handleThumbnail';
import { handleAddKeyword, handleRemoveKeyword } from '@/app/hooks/handleKeyword';
import { addFAQ, removeFAQ, updateFAQ } from '@/app/hooks/handleFaqs';
import { addListItem, updateListItem, removeListItem } from '@/app/hooks/handleList';
import { addTableRow, removeTableRow, updateTableCell } from '@/app/hooks/handleTable';
import { addContentBlock, updateContentBlock, removeContentBlock } from '@/app/hooks/handleContent';
import { handleSubmitGuide } from '@/app/hooks/handleSubmit';

// === COLLAPSIBLE BLOCK COMPONENT (For Cleaner Content Section) ===
// Iste'maal ke liye ise isi file mein ya ek separate file mein define kiya ja sakta hai.
const CollapsibleContentBlock = ({ block, index, formData, setFormData, children, updateContentBlockHandler, removeContentBlockHandler, addContentBlockAtPosition }) => {
    // Har block ke liye alag state. Shuru mein sab band rakhen.
    const [isOpen, setIsOpen] = useState(false);
    const [showAddMenu, setShowAddMenu] = useState(false);

    const getBlockTitle = (block) => {
        switch (block.type) {
            case 'heading': return `Heading: ${block.text || 'Untitled'}`;
            case 'subheading': return `Subheading: ${block.text || 'Untitled'}`;
            case 'paragraph': return `Paragraph: ${block.text ? `${block.text.substring(0, 50)}...` : 'Empty'}`;
            case 'list': return `List: (${block.items.length} items)`;
            case 'table': return `Table: (${block.rows.length} rows)`;
            case 'image': return `Image: ${block.caption || 'No Caption'}`;
            case 'video': return `Video: ${block.url ? block.url.substring(0, 30) : 'No URL'}`;
            case 'link': return `Link: ${block.text || 'No Text'}`;
            case 'faq': return `FAQ: ${block.question || 'No Question'}`;
            default: return 'Content Block';
        }
    };

    const handleAddBlockAtPosition = (blockType) => {
        addContentBlockAtPosition(blockType, index + 1);
        setShowAddMenu(false);
    };

    return (
        <>
            <div className={`content-block ${isOpen ? 'open' : ''}`}>
                <div className="block-header" onClick={() => setIsOpen(!isOpen)}>
                    <span className="block-type">{block.type.toUpperCase()}</span>
                    <span className="block-title">{getBlockTitle(block)}</span>
                    <div className="block-actions">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevents collapse/expand
                                removeContentBlockHandler(index, formData, setFormData);
                            }}
                            className="remove-block-btn"
                            title="Remove Block"
                        >
                            <i className="fas fa-trash"></i>
                        </button>
                        <i className={`fas fa-chevron-down toggle-icon ${isOpen ? 'rotated' : ''}`}></i>
                    </div>
                </div>

                <div className={`block-content-panel ${isOpen ? 'expanded' : 'collapsed'}`}>
                    {children}
                </div>
            </div>

            {/* Add Block Here Button - Har block ke neeche */}
            <div className="add-block-between">
                {/* <button
                    type="button"
                    className="add-block-here-btn"
                    onClick={() => setShowAddMenu(!showAddMenu)}
                >
                    <i className="fas fa-plus-circle"></i> Add Block Here
                </button> */}
                {!showAddMenu && (
                    <div
                        className="
      inline-block-menu
      flex flex-wrap gap-2
      p-3
      bg-white
      border border-slate-200
      rounded-xl
      shadow-lg
      max-w-xl
    "
                    >
                        <button
                            type="button"
                            onClick={() => handleAddBlockAtPosition('heading')}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-full hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 transition-all active:scale-95 whitespace-nowrap"
                        >
                            <i className="fas fa-heading text-xs text-slate-500" />
                            Heading
                        </button>

                        <button
                            type="button"
                            onClick={() => handleAddBlockAtPosition('subheading')}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-full hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 transition-all active:scale-95 whitespace-nowrap"
                        >
                            <i className="fas fa-heading text-xs text-slate-500" />
                            Subheading
                        </button>

                        <button
                            type="button"
                            onClick={() => handleAddBlockAtPosition('paragraph')}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-full hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 transition-all active:scale-95 whitespace-nowrap"
                        >
                            <i className="fas fa-paragraph text-xs text-slate-500" />
                            Paragraph
                        </button>

                        <button
                            type="button"
                            onClick={() => handleAddBlockAtPosition('list')}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-full hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 transition-all active:scale-95 whitespace-nowrap"
                        >
                            <i className="fas fa-list-ul text-xs text-slate-500" />
                            List
                        </button>

                        <button
                            type="button"
                            onClick={() => handleAddBlockAtPosition('table')}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-full hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 transition-all active:scale-95 whitespace-nowrap"
                        >
                            <i className="fas fa-table text-xs text-slate-500" />
                            Table
                        </button>

                        <button
                            type="button"
                            onClick={() => handleAddBlockAtPosition('image')}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-full hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 transition-all active:scale-95 whitespace-nowrap"
                        >
                            <i className="fas fa-image text-xs text-slate-500" />
                            Image
                        </button>

                        <button
                            type="button"
                            onClick={() => handleAddBlockAtPosition('video')}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-full hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 transition-all active:scale-95 whitespace-nowrap"
                        >
                            <i className="fas fa-video text-xs text-slate-500" />
                            Video
                        </button>

                        <button
                            type="button"
                            onClick={() => handleAddBlockAtPosition('link')}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-full hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 transition-all active:scale-95 whitespace-nowrap"
                        >
                            <i className="fas fa-link text-xs text-slate-500" />
                            Link
                        </button>

                        <button
                            type="button"
                            onClick={() => handleAddBlockAtPosition('faq')}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-full hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 transition-all active:scale-95 whitespace-nowrap"
                        >
                            <i className="fas fa-question-circle text-xs text-slate-500" />
                            FAQ
                        </button>
                    </div>
                )}

            </div>
        </>
    );
};

// === MAIN GUIDE FORM COMPONENT ===
const GuideForm = ({ editData }) => {
    console.log(editData, "edit")
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    useEffect(() => {
        if (editData && Object.keys(editData).length > 0) {
            setFormData({
                title: editData.title || '',
                category: editData.category || '',
                author: editData.author || 'Admin',
                // IMPORTANT: Hum original URL ko rakhenge,
                // handleSubmit function check karega ke ye String hai ya File
                thumbnail: editData.thumbnail || null,
                metaTitle: editData.metaTitle || '',
                metaDescription: editData.metaDescription || '',
                summary: editData.summary || '',
                excerpt: editData.excerpt || '',
                tags: editData.tags || [],
                keywords: editData.keywords || [],
                // Blocks ko properly map karein taake edit ke waqt UI mein masla na ho
                blocks: editData.blocks ? [...editData.blocks] : [],
                faqs: editData.faqs ? [...editData.faqs] : []
            });

            // Preview set karein (Ye Cloudinary ka URL dikhayega)
            if (editData.thumbnail) {
                setThumbnailPreview(editData.thumbnail);
            }
        }
    }, [editData]);// Jab bhi editData change hoga, form fill ho jayega

    const handleSubmit = (e) => handleSubmitGuide({
        e,
        formData,
        setFormData,
        setMessage,
        setThumbnailPreview,
        fileInputRef,
        setIsSubmitting,
        editId: editData?._id // Pass the ID here
    });

    // Content Block Update Handler, passing it down to the Collapsible component
    const updateBlock = (index, field, value) => {
        updateContentBlock(index, field, value, formData, setFormData);
    };

    // Content Block Remove Handler, passing it down to the Collapsible component
    const removeBlock = (index) => {
        removeContentBlock(index, formData, setFormData);
    };

    // NEW: Add content block at specific position
    const addContentBlockAtPosition = (type, position) => {
        const newBlock = {
            type,
            text: '',
            items: type === 'list' ? [''] : undefined,
            rows: type === 'table' ? [['', '']] : undefined,
            url: type === 'video' || type === 'link' ? '' : undefined,
            caption: type === 'image' ? '' : undefined,
            file: type === 'image' ? null : undefined,
            question: type === 'faq' ? '' : undefined,
            answer: type === 'faq' ? '' : undefined
        };

        setFormData(prev => {
            const newBlocks = [...prev.blocks];
            newBlocks.splice(position, 0, newBlock);
            return {
                ...prev,
                blocks: newBlocks
            };
        });
    };

    return (
        <div className="guide-form-wrapper">
            <div className="guide-form-container">
                <div className="form-header-main">
                    <h1>📝 Create New Guide</h1>
                    <p>Fill in the details below to create a new guide</p>
                </div>

                {message.text && (
                    <div className={`message-alert ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="guide-form">

                    {/* Basic Information */}
                    <div className="form-section card-style">
                        <h2><i className="fas fa-info-circle"></i> Basic Information</h2>

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

                        <div className="form-row-grid">
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

                        <div className="form-group thumbnail-upload-group">
                            <label htmlFor="thumbnail">Thumbnail</label>
                            <div className="thumbnail-upload">
                                <input
                                    type="file"
                                    id="thumbnail"
                                    ref={fileInputRef}
                                    onChange={(e) => handleThumbnailChange(e, setFormData, setThumbnailPreview)}
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
                    <div className="form-section card-style">
                        <h2><i className="fas fa-search"></i> SEO & Summary</h2>

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

                        <div className="form-row-grid">
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
                                    rows="3"
                                    placeholder="Short excerpt for preview"
                                />
                            </div>
                        </div>

                        {/* Tags and Keywords in a row */}
                        <div className="form-row-grid">
                            <div className="form-group tag-keywords-group">
                                <label><i className="fas fa-tags"></i> Tags</label>
                                <div className="tag-input">
                                    <input
                                        type="text"
                                        value={currentTag}
                                        onChange={(e) => setCurrentTag(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag(currentTag, formData, setFormData, setCurrentTag))}
                                        placeholder="Add a tag and press Enter"
                                    />
                                    <button type="button" onClick={() => handleAddTag(currentTag, formData, setFormData, setCurrentTag)} className="add-btn-tag">
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                                <div className="tags-container">
                                    {formData.tags.map((tag, index) => (
                                        <span key={index} className="tag">
                                            {tag}
                                            <button type="button" onClick={() => handleRemoveTag(index, formData, setFormData)} className="remove-tag-btn">
                                                x
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group tag-keywords-group">
                                <label><i className="fas fa-key"></i> Keywords</label>
                                <div className="tag-input">
                                    <input
                                        type="text"
                                        value={currentKeyword}
                                        onChange={(e) => setCurrentKeyword(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword(currentKeyword, formData, setFormData, setCurrentKeyword))}
                                        placeholder="Add a keyword and press Enter"
                                    />
                                    <button type="button" onClick={() => handleAddKeyword(currentKeyword, formData, setFormData, setCurrentKeyword)} className="add-btn-tag">
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                                <div className="tags-container">
                                    {formData.keywords.map((keyword, index) => (
                                        <span key={index} className="tag keyword">
                                            {keyword}
                                            <button type="button" onClick={() => handleRemoveKeyword(index, formData, setFormData)} className="remove-tag-btn">
                                                x
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Content Blocks Section - Now using Collapsible Blocks */}
                    <div className="form-section content-builder-section">
                        <div className="section-header">
                            <h2><i className="fas fa-drafting-compass"></i> Guide Content Blocks</h2>
                        </div>

                        {formData.blocks.length === 0 ? (
                            <div className="empty-state">
                                <i className="fas fa-plus-circle"></i>
                                <p>No content blocks added yet. Click "Add Block Here" below to add your first block.</p>
                            </div>
                        ) : (
                            <div className="blocks-container">
                                {formData.blocks.map((block, index) => (
                                    <CollapsibleContentBlock
                                        key={index}
                                        block={block}
                                        index={index}
                                        formData={formData}
                                        setFormData={setFormData}
                                        updateContentBlockHandler={updateBlock}
                                        removeContentBlockHandler={removeBlock}
                                        addContentBlockAtPosition={addContentBlockAtPosition}
                                    >
                                        {/* Block-specific content is rendered here */}
                                        <div className="block-content">
                                            {block.type === 'heading' || block.type === 'subheading' || block.type === 'paragraph' || block.type === 'link' ? (
                                                <div className="form-group">
                                                    <label>
                                                        {block.type === 'heading' ? 'Heading Text (H2)' :
                                                            block.type === 'subheading' ? 'Subheading Text (H3)' :
                                                                block.type === 'paragraph' ? 'Paragraph Text' : 'Link Text'}
                                                    </label>
                                                    {block.type === 'paragraph' ? (
                                                        <textarea
                                                            value={block.text || ''}
                                                            onChange={(e) => updateBlock(index, 'text', e.target.value)}
                                                            rows="4"
                                                            placeholder={`Enter ${block.type} text`}
                                                        />
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            value={block.text || ''}
                                                            onChange={(e) => updateBlock(index, 'text', e.target.value)}
                                                            placeholder={`Enter ${block.type} text`}
                                                        />
                                                    )}
                                                    {block.type === 'link' && (
                                                        <input
                                                            type="text"
                                                            value={block.url || ''}
                                                            onChange={(e) => updateBlock(index, 'url', e.target.value)}
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
                                                                onChange={(e) => updateListItem(index, itemIndex, e.target.value, formData, setFormData)}
                                                                placeholder={`List item ${itemIndex + 1}`}
                                                            />
                                                            {block.items.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeListItem(index, itemIndex, formData, setFormData)}
                                                                    className="remove-item-btn"
                                                                >
                                                                    <i className="fas fa-times"></i>
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                    <button
                                                        type="button"
                                                        onClick={() => addListItem(index, formData, setFormData)}
                                                        className="add-more-btn"
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
                                                                                    onChange={(e) => updateTableCell(index, rowIndex, colIndex, e.target.value, formData, setFormData)}
                                                                                    placeholder={`Cell ${rowIndex + 1}-${colIndex + 1}`}
                                                                                />
                                                                            </td>
                                                                        ))}
                                                                        <td>
                                                                            {block.rows.length > 1 && (
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => removeTableRow(index, rowIndex, formData, setFormData)}
                                                                                    className="remove-row-btn"
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
                                                            onClick={() => addTableRow(index, formData, setFormData)}
                                                            className="add-more-btn"
                                                        >
                                                            <i className="fas fa-plus"></i> Add Row
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : block.type === 'image' ? (
                                                <div className="form-group">
                                                    <label>Image File/URL</label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) updateBlock(index, 'file', file);
                                                        }}
                                                    />
                                                    <input
                                                        type="text"
                                                        value={block.caption || ''}
                                                        onChange={(e) => updateBlock(index, 'caption', e.target.value)}
                                                        placeholder="Image caption"
                                                    />
                                                </div>
                                            ) : block.type === 'video' ? (
                                                <div className="form-group">
                                                    <label>Video URL</label>
                                                    <input
                                                        type="text"
                                                        value={block.url || ''}
                                                        onChange={(e) => updateBlock(index, 'url', e.target.value)}
                                                        placeholder="Enter video URL (e.g., YouTube link)"
                                                    />
                                                </div>
                                            ) : block.type === 'faq' ? (
                                                <div className="form-group">
                                                    <label>FAQ Content</label>
                                                    <input
                                                        type="text"
                                                        value={block.question || ''}
                                                        onChange={(e) => updateBlock(index, 'question', e.target.value)}
                                                        placeholder="Question"
                                                    />
                                                    <textarea
                                                        value={block.answer || ''}
                                                        onChange={(e) => updateBlock(index, 'answer', e.target.value)}
                                                        rows="3"
                                                        placeholder="Answer"
                                                    />
                                                </div>
                                            ) : null}
                                        </div>
                                    </CollapsibleContentBlock>
                                ))}
                            </div>
                        )}

                        {/* Add first block button when no blocks exist */}
                        {formData.blocks.length === 0 && (
                            <div className="flex flex-col items-center gap-4 mt-6">

                                <button
                                    type="button"
                                    onClick={() => {
                                        const showMenu = document.querySelector('.first-block-menu');
                                        showMenu.style.display =
                                            showMenu.style.display === 'flex' ? 'none' : 'flex';
                                    }}
                                    className="
        flex items-center gap-2
        px-5 py-2
        text-sm font-semibold
        text-indigo-600
        bg-indigo-50
        border border-indigo-200
        rounded-full
        hover:bg-indigo-100
        hover:border-indigo-400
        transition-all
        shadow-sm
      "
                                >
                                    <i className="fas fa-plus-circle text-indigo-500" />
                                    Add First Block
                                </button>

                                <div
                                    className="
        inline-block-menu first-block-menu
        hidden
        flex flex-wrap justify-center gap-2
        p-4
        bg-white
        border border-slate-200
        rounded-xl
        shadow-lg
        max-w-2xl
      "
                                    style={{ display: 'none' }}
                                >
                                    {[
                                        ['heading', 'fa-heading', 'Heading'],
                                        ['subheading', 'fa-heading', 'Subheading'],
                                        ['paragraph', 'fa-paragraph', 'Paragraph'],
                                        ['list', 'fa-list-ul', 'List'],
                                        ['table', 'fa-table', 'Table'],
                                        ['image', 'fa-image', 'Image'],
                                        ['video', 'fa-video', 'Video'],
                                        ['link', 'fa-link', 'Link'],
                                        ['faq', 'fa-question-circle', 'FAQ'],
                                    ].map(([type, icon, label]) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => addContentBlockAtPosition(type, 0)}
                                            className="
            flex items-center gap-2
            px-3 py-1.5
            text-sm font-medium
            text-slate-700
            bg-slate-50
            border border-slate-200
            rounded-full
            hover:bg-indigo-50
            hover:text-indigo-600
            hover:border-indigo-400
            transition-all
            active:scale-95
            whitespace-nowrap
          "
                                        >
                                            <i className={`fas ${icon} text-xs text-slate-500`} />
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Separate FAQs Section - No major changes, keeping it simple */}
                    <div className="form-section card-style">
                        <div className="section-header">
                            <h2><i className="fas fa-question-circle"></i> Schema FAQs (Separate)</h2>
                            <button type="button" onClick={() => addFAQ(formData, setFormData)} className="add-faq-btn-inline">
                                <i className="fas fa-plus"></i> Add FAQ
                            </button>
                        </div>

                        {formData.faqs.length === 0 ? (
                            <div className="empty-state-mini">
                                <p>No Schema FAQs added yet.</p>
                            </div>
                        ) : (
                            <div className="faqs-container">
                                {formData.faqs.map((faq, index) => (
                                    <div key={index} className="faq-item">
                                        <div className="faq-header">
                                            <span>FAQ {index + 1}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeFAQ(index, formData, setFormData)}
                                                className="remove-faq-btn"
                                            >
                                                <i className="fas fa-trash"></i> Remove
                                            </button>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                value={faq.question || ''}
                                                onChange={(e) => updateFAQ(index, 'question', e.target.value, formData, setFormData)}
                                                placeholder="Question"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <textarea
                                                value={faq.answer || ''}
                                                onChange={(e) => updateFAQ(index, 'answer', e.target.value, formData, setFormData)}
                                                rows="3"
                                                placeholder="Answer"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </form>

                {/* Submit Button Section */}
                <div className="form-actions submit-bar">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        className="submit-btn"
                    >
                        {isSubmitting ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i> Creating Guide...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-save"></i> Create Guide
                            </>
                        )}
                    </button>

                    <div className="form-info">
                        <p><i className="fas fa-info-circle"></i> Slug, published date, and read time will be auto-generated</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuideForm;