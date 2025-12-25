import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ServiceCard = ({ service, index, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={() => onSelect(service)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#0f0f0f] border border-white/5 hover:border-white/20 transition-all duration-500"
    >
      <div className="aspect-4/3 overflow-hidden">
        <motion.img
          src={service.img}
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale-[0.5]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">
          {service.category}
        </p>
        <h3 className="text-2xl font-bold font-heading">{service.title}</h3>

        <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <span className="text-sm text-white/70">Discover Impact</span>
          <div className="bg-white text-black p-2 rounded-full">
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
