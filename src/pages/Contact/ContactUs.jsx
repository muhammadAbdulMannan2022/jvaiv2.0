import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useSubmitContactMutation } from "../../../redux/features/apiSlice";

const ContactPage = () => {
  const [formState, setFormState] = useState({
    full_name: "",
    email: "",
    service: "AI Solutions",
    project_budget: "Under $5,000",
    project_details: "",
    whatsapp_number: "",
  });
  const [submitContact, { isLoading: isTransmitting }] = useSubmitContactMutation();
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".contact-reveal",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
    );

    gsap.fromTo(
      ".line-grow",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: "expo.inOut", stagger: 0.2 },
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await submitContact(formState).unwrap();
      setIsSuccess(true);
      gsap.fromTo(
        ".success-msg",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out" },
      );
    } catch (err) {
      alert("Transmission failed. Please check your data packets and retry.");
      console.error(err);
    }
  };


  return (
    <div className="relative min-h-screen pt-24 bg-[#020617] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Left Side: Meta Data & Sectors */}
          <div className="space-y-20">
            <div>
              <div className="flex items-center gap-6 mb-8 contact-reveal">
                <div className="line-grow h-px w-20 bg-indigo-500 origin-left" />
                <span className="text-[10px] font-black text-indigo-400 tracking-[0.5em] uppercase">
                  Transmission Protocol
                </span>
              </div>
              <h1 className="contact-reveal text-6xl md:text-[9rem] font-black text-white tracking-tighter leading-[0.85] mb-12">
                Direct <br />
                <span className="text-gradient">Uplink.</span>
              </h1>
              <p className="contact-reveal text-slate-500 text-xl font-light leading-relaxed max-w-lg">
                Initiate a high-bandwidth connection with our core strategy
                nodes. We specialize in rapid response for complex engineering
                challenges.
              </p>
            </div>

            

            <div className="contact-reveal flex gap-12 pt-10 border-t border-white/5">
              <div>
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">
                  Comms_Line
                </p>
                <p className="text-white font-bold">info@joinventureai.com</p>
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">
                  Secure_Chat
                </p>
                <p className="text-white font-bold">@joinventureai</p>
              </div>
            </div>
          </div>

          {/* Right Side: Terminal Form */}
          <div className="relative">
            <div
              className={`glass p-5 md:p-16 rounded-[3rem] border border-white/10 transition-all duration-700 ${isTransmitting ? "scale-[0.98] blur-[2px] pointer-events-none opacity-50" : ""}`}
            >
              {isSuccess ? (
                <div className="success-msg py-20 text-center">
                  <div className="w-24 h-24 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-teal-500/20">
                    <svg
                      className="w-12 h-12 text-teal-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-black text-white tracking-tighter mb-4">
                    Sync Confirmed.
                  </h2>
                  <p className="text-slate-500 font-light mb-12">
                    Your transmission has been packetized and routed to the
                    corresponding sector head.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormState({
                        full_name: "",
                        email: "",
                        service: "AI Solutions",
                        project_budget: "Under $5,000",
                        project_details: "",
                        whatsapp_number: "",
                      });
                    }}
                    className="px-12 py-4 bg-white text-slate-950 text-[10px] font-black tracking-widest uppercase hover:bg-teal-400 hover:text-white transition-all"
                  >
                    Reset Connection
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-8 contact-reveal"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-4">
                        Full Name
                        </label>
                        <input
                        required
                        type="text"
                        placeholder="ENTER IDENTITY"
                        value={formState.full_name}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-indigo-500/50 font-mono text-sm tracking-wider"
                        onChange={(e) =>
                            setFormState({ ...formState, full_name: e.target.value })
                        }
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-4">
                        Data Return Link (Email)
                        </label>
                        <input
                        required
                        type="email"
                        placeholder="USER@DOMAIN.SYS"
                        value={formState.email}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-indigo-500/50 font-mono text-sm tracking-wider"
                        onChange={(e) =>
                            setFormState({ ...formState, email: e.target.value })
                        }
                        />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-4">
                        Number
                        </label>
                        <input
                        required
                        type="text"
                        placeholder="+X XXX XXX XXXX"
                        value={formState.whatsapp_number}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-indigo-500/50 font-mono text-sm tracking-wider"
                        onChange={(e) =>
                            setFormState({ ...formState, whatsapp_number: e.target.value })
                        }
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-4">
                        Project Budget Vector
                        </label>
                        <select
                            required
                            className="w-full bg-[#020617] border border-white/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-indigo-500/50 font-mono text-sm tracking-wider appearance-none cursor-pointer"
                            value={formState.project_budget}
                            onChange={(e) =>
                                setFormState({ ...formState, project_budget: e.target.value })
                            }
                        >
                            <option value="Under $1,000">Under $1,000</option>
                            <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                            <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                            <option value="$10,000+">$10,000+</option>
                        </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-4">
                      Select_Operational_Protocol
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {["AI Solutions", "UI/UX Design", "Web Engineering", "Apps Development", "Others"].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() =>
                            setFormState({ ...formState, service: p })
                          }
                          className={`px-6 py-2.5 rounded-full text-[9px] font-black tracking-widest uppercase border transition-all hover:cursor-pointer ${
                            formState.service === p
                              ? "bg-indigo-500 border-indigo-500 text-white"
                              : "border-white/10 text-slate-500 hover:text-white hover:border-white/30"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-4">
                      Transmission_Payload (Project Details)
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="DESCRIBE THE OPERATION..."
                      value={formState.project_details}
                      className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-white focus:outline-none focus:border-indigo-500/50 font-mono text-sm tracking-wider resize-none"
                      onChange={(e) =>
                        setFormState({ ...formState, project_details: e.target.value })
                      }
                    />
                  </div>

                  <button
                    disabled={isTransmitting}
                    type="submit"
                    className="w-full py-6 hover:cursor-pointer bg-white text-slate-950 text-[11px] font-black tracking-[0.3em] uppercase hover:bg-indigo-500 hover:text-white transition-all group relative overflow-hidden disabled:opacity-50 disabled:cursor-wait"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-4">
                      {isTransmitting ? "DATA PACKETIZING..." : "Initialize Transmission"}
                      <svg
                        className="w-4 h-4 group-hover:translate-x-2 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </form>
              )}
            </div>

            {/* Transmission Loader */}
            {isTransmitting && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mb-8">
                  <div className="h-full bg-indigo-500 animate-progress origin-left" />
                </div>
                <p className="text-[10px] font-black text-indigo-400 tracking-[0.5em] animate-pulse uppercase">
                  Packetizing Data...
                </p>
                <div className="mt-4 flex gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 flex justify-between items-center text-[9px] font-black text-slate-600 tracking-widest uppercase relative z-10">
        <p>Security_Protocol: AES-256-GCM</p>
        <p>System_Time: {new Date().toISOString().slice(11, 19)} UTC</p>
        <p className="hidden md:block">JVAI Dynamics Global Lattice v9.0</p>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes progress {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(1); }
        }
        .animate-progress {
          animation: progress 2.5s ease-in-out forwards;
        }
      `,
        }}
      />
    </div>
  );
};

export default ContactPage;
