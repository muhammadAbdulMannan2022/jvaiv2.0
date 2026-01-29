import React, { useRef, useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  ImageIcon,
  Heading1,
  Heading2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Send,
  X,
  ChevronLeft,
} from "lucide-react";
import gsap from "gsap";
import { useNavigate } from "react-router";
import { usePostBlogMutation } from "../../../redux/features/apiSlice";

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const contentRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      ".editor-reveal",
      { opacity: 0, scale: 0.98, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      },
    );
  }, []);

  const [imageFile, setImageFile] = useState(null);
  const [postBlog, { isLoading: isPublishing }] = usePostBlogMutation();

  const applyStyle = (command, value = null) => {
    document.execCommand(command, false, value === null ? undefined : value);
    contentRef.current?.focus();
  };

  const handleImageChange = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = async () => {
    const description = contentRef.current?.innerHTML || "";
    if (!title || !description) {
        alert("Transmission failure: Header and Payload required.");
        return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("short_description", description.replace(/<[^>]*>/g, '').slice(0, 150) + "...");
    formData.append("description", description);
    if (imageFile) {
        formData.append("picture", imageFile);
    }

    try {
      await postBlog(formData).unwrap();
      alert("Intel Sync Complete. Transmission verified.");
      navigate("/blog");
    } catch (err) {
      alert("Synchronization failed. Check packet integrity.");
      console.error(err);
    }
  };
  const onBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#020617] py-10 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <button
          onClick={onBack}
          className="editor-reveal absolute left-10 flex items-center gap-3 text-slate-500 hover:text-white transition-colors mb-12 group hover:cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Cancel Draft
          </span>
        </button>

        <div className="editor-reveal glass rounded-[3rem] border border-white/10 overflow-hidden shadow-3xl bg-slate-950/50 backdrop-blur-3xl">
          <div className="p-12 md:p-16">
            {/* Title Input */}
            <input
              type="text"
              placeholder="YOUR STORY TITLE..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-4xl md:text-6xl font-black border-none outline-none bg-transparent mb-12 placeholder:text-slate-800 text-white tracking-tighter"
            />

            {/* Image Upload */}
            {imagePreview ? (
              <div className="relative group mb-12 rounded-3xl overflow-hidden border border-white/10 aspect-21/9">
                <img
                  loading="lazy"
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setImagePreview(null)}
                  className="absolute top-6 right-6 bg-black/50 backdrop-blur-md p-3 rounded-full text-white hover:bg-red-500/50 transition-all border border-white/20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label
                className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-4xl cursor-pointer transition-all duration-500 mb-12 ${
                  isDragOver
                    ? "border-indigo-500 bg-indigo-500/5"
                    : "border-white/10 hover:border-white/30 hover:bg-white/5"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                  if (e.dataTransfer.files[0])
                    handleImageChange(e.dataTransfer.files[0]);
                }}
              >
                <div className="p-6 rounded-3xl bg-white/5 mb-4">
                  <ImageIcon className="w-8 h-8 text-indigo-400" />
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Drop cover image or click to upload
                </p>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && handleImageChange(e.target.files[0])
                  }
                />
              </label>
            )}

            {/* Toolbar */}
            <div className="sticky top-24 z-20 flex flex-wrap items-center gap-2 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 mb-10 shadow-2xl overflow-x-auto whitespace-nowrap scrollbar-hide">
              <div className="flex gap-1 pr-2 border-r border-white/10">
                {[
                  { icon: Bold, cmd: "bold" },
                  { icon: Italic, cmd: "italic" },
                  { icon: Underline, cmd: "underline" },
                ].map(({ icon: Icon, cmd }, i) => (
                  <button
                    key={i}
                    onClick={() => applyStyle(cmd)}
                    className="p-2.5 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>

              <div className="flex gap-1 pr-2 border-r border-white/10">
                {[
                  { icon: Heading1, cmd: "formatBlock", val: "h1" },
                  { icon: Heading2, cmd: "formatBlock", val: "h2" },
                ].map(({ icon: Icon, cmd, val }, i) => (
                  <button
                    key={i}
                    onClick={() => applyStyle(cmd, val)}
                    className="p-2.5 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>

              <div className="flex gap-1">
                {[
                  { icon: AlignLeft, cmd: "justifyLeft" },
                  { icon: AlignCenter, cmd: "justifyCenter" },
                  { icon: AlignRight, cmd: "justifyRight" },
                ].map(({ icon: Icon, cmd }, i) => (
                  <button
                    key={i}
                    onClick={() => applyStyle(cmd)}
                    className="p-2.5 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Editable Content */}
            <div
              ref={contentRef}
              contentEditable
              className="min-h-100 p-8 border border-white/5 rounded-3xl bg-white/2 focus:outline-none focus:border-indigo-500/30 prose prose-invert prose-lg max-w-none prose-p:text-slate-400 prose-p:font-light"
              onFocus={() => {
                if (contentRef.current?.innerHTML === "Start writing here...") {
                  contentRef.current.innerHTML = "";
                }
              }}
            >
              Start writing here...
            </div>

            {/* Author Meta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-4">
                  Author_Name
                </label>
                <input
                  type="text"
                  placeholder="IDENTITY"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-indigo-500/50 font-mono text-xs"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-4">
                  Employ_id
                </label>
                <input
                  type="text"
                  placeholder="ID"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-indigo-500/50 font-mono text-xs"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-12 py-8 bg-black/40 border-t border-white/5 flex justify-end">
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="flex items-center gap-4 px-12 hover:cursor-pointer py-5 bg-linear-to-r from-indigo-600 to-blue-600 text-white rounded-full text-[11px] font-black tracking-widest uppercase hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-wait"
            >
              <Send className="w-4 h-4" /> {isPublishing ? "Syncing..." : "Sync To Mesh"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
