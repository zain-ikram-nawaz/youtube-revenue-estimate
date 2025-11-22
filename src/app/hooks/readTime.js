// Calculate read time based on content
export const calculateReadTime = (formData) => {
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
