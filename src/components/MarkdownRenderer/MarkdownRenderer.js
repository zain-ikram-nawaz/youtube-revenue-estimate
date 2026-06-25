"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function MarkdownRenderer({ content }) {
  return (
    <div className="prose prose-gray max-w-none
      prose-h2:text-2xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-3
      prose-h3:text-xl prose-h3:font-bold prose-h3:text-gray-800 prose-h3:mt-8 prose-h3:mb-3
      prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-base prose-p:mb-5
      prose-strong:text-gray-900 prose-strong:font-bold
      prose-em:text-gray-700
      prose-a:text-green-700 prose-a:font-semibold hover:prose-a:text-green-600
      prose-ul:my-4 prose-li:text-gray-700 prose-li:leading-relaxed
      prose-ol:my-4
      prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:bg-green-50 prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-700 prose-blockquote:not-italic
      prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
      prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-5 prose-pre:overflow-x-auto
      prose-img:rounded-xl prose-img:shadow-md prose-img:my-8
      prose-table:text-sm prose-thead:bg-gray-50 prose-th:font-bold prose-th:text-gray-900 prose-td:text-gray-700
      prose-hr:border-gray-200 prose-hr:my-8">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
