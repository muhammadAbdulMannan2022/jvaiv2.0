import React, { useEffect } from "react";
import gsap from "gsap";
import { useNavigate, useParams } from "react-router";
import { BLOG_POSTS } from "./BlogPage";

const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const post = BLOG_POSTS.find((post) => post.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    const tl = gsap.timeline();
    tl.fromTo(
      ".blog-detail-animate",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
    );
  }, [post]);

  return (
    <div className="pt-10 pb-40 px-6 bg-[#020617] min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="blog-detail-animate absolute left-10 flex items-center gap-3 text-indigo-400 hover:text-white transition-colors mb-16 group hover:cursor-pointer"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="text-[10px] font-black uppercase tracking-widest">
            Back to Journal
          </span>
        </button>

        {/* Header */}
        <header className="mb-20">
          <div className="blog-detail-animate flex items-center gap-4 mb-8">
            <span className="px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-blue-400 text-[10px] font-black tracking-widest uppercase">
              {post.category}
            </span>
            <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
              {post.date} • {post.readTime}
            </span>
          </div>
          <h1 className="blog-detail-animate text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-12">
            {post.title}
          </h1>

          <div className="blog-detail-animate flex items-center gap-6 p-8 glass rounded-3xl border border-white/5">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-2xl font-black text-white shadow-xl">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                Written By
              </p>
              <h4 className="text-xl font-bold text-white tracking-tight">
                {post.author}
              </h4>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="blog-detail-animate mb-20 rounded-[3rem] overflow-hidden aspect-video border border-white/5 shadow-2xl">
          <img src={post.image} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <article
          className="blog-detail-animate prose prose-invert prose-lg max-w-none prose-h1:text-4xl prose-h1:font-black prose-h1:tracking-tighter prose-h2:text-3xl prose-h2:font-black prose-h2:tracking-tighter prose-p:text-slate-400 prose-p:leading-relaxed prose-p:font-light prose-strong:text-white prose-strong:font-bold"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer Tags */}
        <footer className="blog-detail-animate mt-20 pt-12 border-t border-white/5">
          <div className="flex flex-wrap gap-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-5 py-2 rounded-xl bg-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest border border-white/5 hover:border-indigo-500/30 hover:text-white transition-all cursor-default"
              >
                #{tag}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BlogDetails;
