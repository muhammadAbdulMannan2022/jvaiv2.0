import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { useGetFaQQuery } from "../../../../redux/features/apiSlice";
import { Link } from "react-router";

const FAQItem = ({ faq, isOpen, toggle }) => {
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={toggle}
        className="w-full py-8 flex items-start justify-between gap-6 text-left group hover:cursor-pointer"
      >
        <div className="flex gap-6">
          <div
            className={`mt-1 transition-colors duration-500 ${isOpen ? "text-blue-500" : "text-white/20 group-hover:text-white/40"}`}
          >
            <HelpCircle size={22} />
          </div>
          <h3
            className={`text-xl md:text-2xl font-bold transition-all duration-500 tracking-tight ${isOpen ? "text-white" : "text-white/60 group-hover:text-white/80"}`}
          >
            {faq.question}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className={`mt-2 shrink-0 ${isOpen ? "text-blue-500" : "text-white/20"}`}
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 ml-12 md:ml-12 pl-4 border-l-2 border-blue-500/20">
              <p className="text-slate-400 text-lg leading-relaxed font-light max-w-4xl">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const { data: faqsData, isLoading, isError } = useGetFaQQuery();
  const faqs = faqsData?.Data || faqsData || [];
  const [openId, setOpenId] = useState(null);

  if (isLoading) {
    return (
      <section className="py-32 px-6 bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24 space-y-6">
            <div className="h-3 w-40 bg-white/5 rounded-full mx-auto animate-pulse" />
            <div className="h-16 w-2/3 bg-white/5 rounded-2xl mx-auto animate-pulse" />
            <div className="h-6 w-1/2 bg-white/5 rounded-xl mx-auto animate-pulse" />
          </div>
          <div className="bg-white/2 border border-white/5 rounded-[3rem] p-8 md:p-16 space-y-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 w-full bg-white/5 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError)
    return (
      <div className="py-10 text-center text-white/20 uppercase tracking-widest text-[10px]">
        Failed to initialize knowledge base node.
      </div>
    );

  if (!faqs || faqs.length === 0)
    return (
      <div className="py-10 text-center text-white/20 uppercase tracking-widest text-[10px]">
        Knowledge base archive is currently empty.
      </div>
    );

  return (
    <section className="py-32 px-6 bg-[#050505] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <Sparkles size={16} className="text-blue-500" />
            <span className="text-blue-500 uppercase tracking-[0.6em] font-black text-[10px]">
              Insights & Architecture
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8"
          >
            Frequently Asked <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-indigo-400">
              Questions.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-lg md:text-xl font-light max-w-2xl mx-auto"
          >
            Everything you need to know about our technology, process, and
            partnership model.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-white/2 border border-white/5 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl"
        >
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              toggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-white/30 text-sm font-medium uppercase tracking-widest mb-6">
            Still have architectural questions?
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 hover:cursor-pointer"
          >
            Contact Our Engineers
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
