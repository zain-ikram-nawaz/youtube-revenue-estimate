"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function MarkdownRenderer({ content }) {
  return (
    <div className="prose prose-gray max-w-none
      prose-h2:font-display prose-h2:text-2xl prose-h2:font-bold prose-h2:text-foreground prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-3
      prose-h3:font-display prose-h3:text-xl prose-h3:font-bold prose-h3:text-foreground prose-h3:mt-8 prose-h3:mb-3
      prose-p:text-muted prose-p:leading-relaxed prose-p:text-base prose-p:mb-5
      prose-strong:text-foreground prose-strong:font-bold
      prose-em:text-muted
      prose-a:text-primary prose-a:font-semibold hover:prose-a:text-primary-hover
      prose-ul:my-4 prose-li:text-muted prose-li:leading-relaxed
      prose-ol:my-4
      prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-accent/10 prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:rounded-r-xl prose-blockquote:text-foreground prose-blockquote:not-italic
      prose-code:bg-secondary prose-code:text-foreground prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
      prose-pre:bg-ink prose-pre:text-white prose-pre:rounded-2xl prose-pre:p-5 prose-pre:overflow-x-auto
      prose-img:rounded-2xl prose-img:shadow-md prose-img:my-8
      prose-table:text-sm prose-thead:bg-secondary prose-th:font-bold prose-th:text-foreground prose-td:text-muted
      prose-hr:border-border prose-hr:my-8">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
