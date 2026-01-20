import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useComposedRefs } from "framer-motion";
import { useNavigate } from "react-router";
export const BLOG_POSTS = [
  {
    id: "b1",
    title: "The Future of Neural Edge Processing",
    excerpt:
      "Exploring how quantized neural networks are revolutionizing real-time drone navigation and autonomous systems.",
    content:
      "<h1>The Evolution of the Edge</h1><p>In the rapidly evolving landscape of artificial intelligence, the shift from centralized cloud processing to edge computing is not just a trend—it is a necessity. For autonomous drone swarms, every millisecond counts...</p><h2>Quantization: The Key to Speed</h2><p>Quantization techniques allow us to compress high-precision neural networks into formats that can be executed on specialized edge hardware with minimal loss in accuracy...</p>",
    author: "Sarah Jenkins",
    date: "Dec 12, 2024",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
    category: "Intelligence",
    tags: ["AI", "Edge Computing", "Robotics"],
  },
  {
    id: "b2",
    title: "Mastering RAG Architectures",
    excerpt:
      "A deep dive into Retrieval Augmented Generation and why it is the backbone of modern enterprise LLM solutions.",
    content:
      "<h1>Beyond Simple Prompts</h1><p>While base LLMs are powerful, their knowledge is frozen in time. Retrieval Augmented Generation (RAG) allows us to ground model responses in real-time, proprietary data...</p><h2>Vector Databases</h2><p>The choice of vector database—whether Pinecone, Weaviate, or Milvus—defines the retrieval latency and scalability of the entire agentic system...</p>",
    author: "Julian Reed",
    date: "Dec 05, 2024",
    readTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    category: "LLM",
    tags: ["LLM", "RAG", "Python"],
  },
  {
    id: "b3",
    title: "Spatial UI: The Next Frontier",
    excerpt:
      "How Three.js and WebGL are transforming standard dashboards into immersive, actionable 3D environments.",
    content:
      "<h1>The Death of Flat Dashboards</h1><p>Standard 2D charts are no longer sufficient for visualizing high-density global logistics. Spatial UI offers a third dimension of context...</p><h2>Optimizing Render Loops</h2><p>Performance is the primary constraint. We use custom GLSL shaders to handle 500k+ data points at 60fps directly in the browser...</p>",
    author: "Marcus Thorne",
    date: "Nov 28, 2024",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop",
    category: "Web",
    tags: ["Three.js", "WebGL", "UI/UX"],
  },
];

const BlogPage = () => {
  const containerRef = useComposedRefs(null);
  const navigate = useNavigate();
  const createPost = () => {
    navigate("/blog-editor");
  };

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".blog-reveal",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
    );
  }, []);

  const onSelectPost = (post) => {
    navigate(`/blog/${post.id}`);
  };

  return (
    <div ref={containerRef} className="pt-32 pb-40 bg-[#020617] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 blog-reveal">
          <div>
            <div className="flex items-center gap-6 mb-8">
              <div className="h-px w-20 bg-blue-500" />
              <span className="text-[10px] font-black text-blue-400 tracking-[0.5em] uppercase">
                Intelligence Stream
              </span>
            </div>
            <h1 className="text-6xl md:text-[9rem] font-black text-white tracking-tighter leading-[0.85]">
              JVAI <br /> <span className="text-gradient">Insider.</span>
            </h1>
          </div>

          <button
            onClick={createPost}
            className="px-10 py-5 bg-white hover:cursor-pointer text-slate-950 rounded-full text-[11px] font-black tracking-widest uppercase hover:bg-blue-500 hover:text-white transition-all shadow-xl group flex items-center gap-4"
          >
            Create Entry
            <svg
              className="w-4 h-4 group-hover:rotate-90 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="3"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>

        {/* Featured Post */}
        <div
          className="blog-reveal relative group cursor-pointer mb-32 overflow-hidden rounded-[3rem] glass border border-white/5 aspect-21/9"
          onClick={() => onSelectPost(BLOG_POSTS[0])}
        >
          <img
            src={BLOG_POSTS[0].image}
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-12 md:p-20">
            <span className="px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-6 inline-block border border-blue-500/30">
              Featured // {BLOG_POSTS[0].category}
            </span>
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6 max-w-4xl">
              {BLOG_POSTS[0].title}
            </h2>
            <div className="flex items-center gap-8 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <span>{BLOG_POSTS[0].author}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span>{BLOG_POSTS[0].date}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span>{BLOG_POSTS[0].readTime}</span>
            </div>
          </div>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(1).map((post) => (
            <div
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="blog-reveal group glass p-8 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all duration-500 cursor-pointer"
            >
              <div className="aspect-4/3 rounded-3xl overflow-hidden mb-8">
                <img
                  src={post.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4 inline-block">
                {post.category}
              </span>
              <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed mb-8 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center font-black text-[10px] text-blue-400 border border-blue-500/30">
                    {post.author.charAt(0)}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {post.author}
                  </span>
                </div>
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
                  {post.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
