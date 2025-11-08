import Image from "next/image";

export default function ContentBlockRenderer({ block, index }) {
  switch (block.type) {
    case "heading":
      return <h1 key={index} className="text-3xl md:text-4xl font-bold text-gray-900 mt-12 mb-6 leading-tight">{block.text}</h1>;

    case "subheading":
      return <h2 key={index} className="text-2xl md:text-3xl font-bold text-gray-800 mt-10 mb-4 leading-tight">{block.text}</h2>;

    case "paragraph":
      return <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">{block.text}</p>;

    case "list":
      return (
        <ul key={index} className="mb-6 space-y-3">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3"></div>
              <span className="text-gray-700 text-lg">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "image":
      return (
        <div key={index} className="my-8">
          <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
            <Image src={block.file} alt={block.caption || "Guide image"} fill className="object-cover" />
          </div>
          {block.caption && <p className="text-center text-gray-600 mt-3 text-sm italic">{block.caption}</p>}
        </div>
      );

    case "video":
      return (
        <div key={index} className="my-8 relative aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe
            src={block.url.replace("youtu.be/", "www.youtube.com/embed/")}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      );

    case "faq":
      return (
        <div key={index} className="my-6 bg-red-50 border border-red-100 rounded-xl p-6">
          <h4 className="font-semibold text-red-700 text-lg mb-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            {block.question}
          </h4>
          <p className="text-gray-700 ml-4">{block.answer}</p>
        </div>
      );

    default:
      return null;
  }
}
