export function calculateReadTime(guide) {
  if (!guide) return 1;
  let totalWords = 0;

  ["title", "summary", "excerpt"].forEach(field => {
    if (guide[field]) totalWords += guide[field].split(/\s+/).length;
  });

  guide.blocks?.forEach(block => {
    ["text", "caption", "question", "answer"].forEach(f => {
      if (block[f]) totalWords += block[f].split(/\s+/).length;
    });

    block.items?.forEach(item => totalWords += item.split(/\s+/).length);
    block.rows?.forEach(row => row.forEach(cell => totalWords += cell.split(/\s+/).length));
  });

  guide.faqs?.forEach(faq => {
    if (faq.question) totalWords += faq.question.split(/\s+/).length;
    if (faq.answer) totalWords += faq.answer.split(/\s+/).length;
  });

  return Math.max(1, Math.ceil(totalWords / 200));
}
