import DOMPurify from "dompurify";
import { useNavigate } from "react-router";
import { useGetOneBlogQuery, baseUri } from "../../../redux/features/apiSlice";
import { useParams } from "react-router";
import { useEffect } from "react";
import gsap from "gsap";

const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: blogResponse, isLoading } = useGetOneBlogQuery(id);
  const post = blogResponse?.Data || blogResponse;

  const sanitizedDescription = post?.description ? DOMPurify.sanitize(post.description) : "";

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) {
      const tl = gsap.timeline();
      tl.fromTo(
        ".blog-detail-animate",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      );
    }
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-black mb-6 uppercase tracking-widest text-blue-500">Intel Node Not Found</h2>
        <button 
            onClick={() => navigate("/blog")}
            className="px-8 py-3 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-2xl"
        >
            Return to Journal Grid
        </button>
      </div>
    );
  }

  return (
    <div className="pt-10 pb-40 px-6 bg-[#020617] min-h-screen relative">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="blog-detail-animate fixed top-32 left-10 hidden xl:flex items-center gap-3 text-indigo-400 hover:text-white transition-colors group hover:cursor-pointer z-20"
        >
          <div className="w-12 h-12 rounded-full border border-indigo-500/20 flex items-center justify-center group-hover:border-indigo-500/50 transition-all">
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
          </div>
        </button>

        <button
          onClick={() => navigate(-1)}
          className="blog-detail-animate flex xl:hidden items-center gap-3 text-indigo-400 hover:text-white transition-colors mb-12 group hover:cursor-pointer"
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
        <header className="mb-24">
          <div className="blog-detail-animate flex items-center gap-4 mb-10">
            <span className="px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-blue-400 text-[10px] font-black tracking-widest uppercase">
              Intelligence Stream
            </span>
            <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
              PROTOCOL_ACTIVE • DECRYPTED
            </span>
          </div>
          <h1 className="blog-detail-animate text-5xl md:text-5xl font-black text-white tracking-tighter leading-[0.85] mb-16 uppercase">
            {post.title}
          </h1>

          
        </header>

        {/* Featured Image */}
        <div className="blog-detail-animate mb-32 rounded-[4rem] overflow-hidden aspect-video border border-white/5 shadow-2xl relative">
          <img src={post.picture ? post.picture.startsWith("http") ? post.picture : `${baseUri}${post.picture}` : "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop"} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-[#020617]/50 to-transparent" />
        </div>

        {/* Content */}
        <article className="blog-detail-animate relative">
          <div className="absolute -left-12 top-0 bottom-0 w-px bg-linear-to-b from-blue-500/50 via-transparent to-transparent hidden lg:block" />
          <div
            className="make_child_style"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          />
        </article>

        {/* Footer Meta */}
        <footer className="blog-detail-animate mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8 items-center">
            <div className="flex gap-4">
                <span className="px-5 py-2 rounded-xl bg-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest border border-white/5">{post.tags}</span>
            </div>
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">Transmission Protocol: JVAI_CORE_V9.0</p>
        </footer>
      </div>
    </div>
  );
};

export default BlogDetails;
