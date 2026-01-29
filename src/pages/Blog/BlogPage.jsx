import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router";
import { useGetAllBlogQuery, baseUri } from "../../../redux/features/apiSlice";

const BlogPage = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { data: blogResponse, isLoading } = useGetAllBlogQuery();
  const blogs = blogResponse?.Data || (Array.isArray(blogResponse) ? blogResponse : []);

  const createPost = () => {
    navigate("/blog-editor");
  };

  useEffect(() => {
    if (isLoading) return;
    const tl = gsap.timeline();
    tl.fromTo(
      ".blog-reveal",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
    );
  }, [isLoading]);

  const onSelectPost = (post) => {
    navigate(`/blog/${post.id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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

        {blogs.length > 0 ? (
          <>
            {/* Featured Post */}
            <div
              className="blog-reveal relative group cursor-pointer mb-32 overflow-hidden rounded-[3rem] glass border border-white/5 aspect-21/9"
              onClick={() => onSelectPost(blogs[0])}
            >
              <img
                src={blogs[0].picture ? `${baseUri}${blogs[0].picture}` : "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop"}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-12 md:p-20 w-full">
                <span className="px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-6 inline-block border border-blue-500/30">
                  Featured // Intelligence
                </span>
                <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6 max-w-4xl uppercase">
                  {blogs[0].title}
                </h2>
                <div className="flex items-center gap-8 text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <span>JVAI COLLECTIVE</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <span>TRANSMISSION ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Post Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.slice(1).map((post) => (
                <div
                  key={post.id}
                  onClick={() => onSelectPost(post)}
                  className="blog-reveal group glass p-8 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all duration-500 cursor-pointer flex flex-col"
                >
                  <div className="aspect-4/3 rounded-3xl overflow-hidden mb-8">
                    <img
                      src={post.picture ? `${baseUri}${post.picture}` : "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4 inline-block">
                    {post.category || "Intelligence"}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors uppercase line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed mb-8 line-clamp-3">
                    {post.short_description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center font-black text-[10px] text-blue-400 border border-blue-500/30">
                        J
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        JVAI
                      </span>
                    </div>
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
                        PROTOCOL ACTIVE
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
            <div className="py-40 text-center glass rounded-[3rem] border border-dashed border-white/10 blog-reveal">
                <p className="text-slate-500 font-black uppercase tracking-[0.5em] text-xs">No active intel nodes found in this sector.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
