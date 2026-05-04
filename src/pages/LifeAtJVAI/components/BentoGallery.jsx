import React from "react";
import { motion } from "framer-motion";
import { Camera, ArrowRight } from "lucide-react";
import { baseUri } from "../../../../redux/features/apiSlice";


const GalleryItem = ({ item, index, onOpen }) => {
  const imageUrl =
    item.activity_pictures?.[0]?.file_url ||
    (item.activity_pictures?.[0]?.file
      ? `${baseUri}${item.activity_pictures[0].file}`
      : "https://res.cloudinary.com/dn98ksbcf/image/upload/v1777890276/Gazi_vai_k9nlal.png");

  const spans = [
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
  ];
  const spanClass = spans[index % spans.length];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onClick={() => onOpen(item)}
      className={`${spanClass} relative group cursor-pointer overflow-hidden rounded-4xl border border-white/5 bg-slate-900 shadow-xl`}
    >
      <img
        src={imageUrl}
        alt={item.activity_title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2">
          {item.activity_date
            ? new Date(item.activity_date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })
            : "Archive_Log"}
        </p>
        <h3 className="text-xl font-bold text-white leading-tight">
          {item.activity_title}
        </h3>
      </div>
    </motion.div>
  );
};

const BentoGallery = ({ moments, isLoading }) => {
  const [filter, setFilter] = React.useState("all");
  const [visibleCount, setVisibleCount] = React.useState(20);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const filteredMoments = moments.filter((m) => {
    if (filter === "all") return true;
    if (filter === "work")
      return (
        m.activity_title?.toLowerCase().includes("work") ||
        m.activity_title?.toLowerCase().includes("operation")
      );
    if (filter === "life")
      return (
        !m.activity_title?.toLowerCase().includes("work") &&
        !m.activity_title?.toLowerCase().includes("operation")
      );
    return true;
  });

  const visibleMoments = filteredMoments.slice(0, visibleCount);

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
            Moments in <br />
            <span className="text-blue-500">Synchronization.</span>
          </h2>
          <p className="text-slate-500 text-lg font-light max-w-md">
            A snapshot of our daily operations—where deep work meets explosive creativity.
          </p>
        </div>
        <div className="flex items-center gap-6 text-slate-700">
          <Camera size={40} strokeWidth={1} />
          <div className="h-px w-24 bg-white/5" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            Gallery_Module_v2.0
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-8 mb-16">
        <div className="flex items-center gap-3">
          {["all", "work", "life"].map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setVisibleCount(20);
              }}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                filter === f
                  ? "bg-blue-500 text-white shadow-xl shadow-blue-500/20"
                  : "bg-white/5 text-slate-500 hover:bg-white/10 hover:text-white"
              }`}
            >
              {f === "all" ? "Archive_Main" : f === "work" ? "Operations" : "Pulse_v2.0"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 text-slate-700">
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">
            Index_Map: {visibleMoments.length} / {filteredMoments.length}
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-3 md:grid-cols-6 grid-flow-dense auto-rows-[150px] gap-4">
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className={`bg-white/5 rounded-2xl animate-pulse ${i % 7 === 5 ? "col-span-2" : ""}`}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-16">
          <div className="grid grid-cols-3 md:grid-cols-6 grid-flow-dense auto-rows-[120px] md:auto-rows-[180px] gap-4">
            {visibleMoments.map((moment, index) => (
              <GalleryItem
                key={moment.id || index}
                item={moment}
                index={index}
                onOpen={setSelectedImage}
              />
            ))}
          </div>

          {visibleCount < filteredMoments.length && (
            <div className="flex justify-center pt-8">
              <button
                onClick={() => setVisibleCount((prev) => prev + 12)}
                className="group flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 transition-all duration-500">
                  <ArrowRight className="text-slate-500 group-hover:text-white rotate-90 transition-all" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 group-hover:text-blue-400">
                  Expand_Data_Stream
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 z-100 bg-slate-950/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-7xl w-full"
          >
            <img
              src={
                selectedImage.activity_pictures?.[0]?.file_url ||
                (selectedImage.activity_pictures?.[0]?.file
                  ? `${baseUri}${selectedImage.activity_pictures[0].file}`
                  : "")
              }
              alt="Fullscreen View"
              className="w-full h-auto rounded-[3.5rem] shadow-2xl border border-white/5"
            />
            <div className="absolute top-8 right-8">
              <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <ArrowRight className="-rotate-45" size={20} />
              </button>
            </div>
            <div className="absolute -bottom-16 left-0 right-0 text-center px-6">
              <h3 className="text-2xl font-black tracking-tighter text-white">
                {selectedImage.activity_title}
              </h3>
              <p className="text-blue-500 font-mono text-xs uppercase tracking-widest mt-1">
                {selectedImage.activity_date}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default BentoGallery;
