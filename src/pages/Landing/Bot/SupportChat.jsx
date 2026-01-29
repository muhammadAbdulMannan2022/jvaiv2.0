import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useSendToBotMutation } from "../../../../redux/features/apiSlice";
import Markdown from "react-markdown";

const initialMessages = [
  {
    id: "1",
    text: "Hi! Your JVAI buddy is here. How can I help you today?",
    isUser: false,
    timestamp: new Date(Date.now() - 60000),
    status: "sent",
  },
];

const ChatMessage = ({ message }) => {
  return (
    <div
      className={`flex ${message.isUser ? "justify-end" : "justify-start"} mb-2 group`}
    >
      <div
        className={`max-w-[70%] p-3 rounded-2xl transition-all duration-300 transform group-hover:scale-[1.02] ${
          message.isUser
            ? "bg-linear-to-br from-blue-500 to-blue-600 text-white"
            : "bg-white/70 backdrop-blur-md text-gray-800 shadow-sm"
        }`}
      >
        <p className="text-sm">
          <Markdown>{message.text}</Markdown>
        </p>
        <p className="text-xs opacity-70 mt-1">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          {message.isUser && (
            <span className="ml-2">
              {message.status === "sending" && "Sending..."}
              {message.status === "sent" && "✓✓"}
              {message.status === "failed" && "⚠"}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-1 p-3">
      <div
        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      ></div>
    </div>
  );
};

const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [sendMessage, { isLoading }] = useSendToBotMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
    }
  }, [isOpen]);

  const handleScroll = (e) => {
    e.stopPropagation();
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const optimisticMessage = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
      status: "sending",
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setInputValue("");

    try {
      const history = messages.map((msg) => ({
        role: msg.isUser ? "user" : "model",
        text: msg.text,
      }));

      const response = await sendMessage({
        query: inputValue.trim(),
        history,
      }).unwrap();

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === optimisticMessage.id ? { ...msg, status: "sent" } : msg,
        ),
      );

      setIsTyping(true);
      setTimeout(() => {
        const newMessage = {
          id: Date.now().toString(),
          text:
            response.response?.trim() ||
            "Thanks for your message! Our team will get back to you soon.",
          isUser: false,
          timestamp: new Date(),
          status: "sent",
        };
        setMessages((prev) => [...prev, newMessage]);
        setIsTyping(false);
        if (!isOpen || isMinimized) {
          setHasNewMessage(true);
        }
      }, 1000);
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === optimisticMessage.id ? { ...msg, status: "failed" } : msg,
        ),
      );
      console.error("Failed to send message:", error);
    }
  };

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
    setHasNewMessage(false);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      <div
        className={`fixed bottom-5 right-6 z-50 transition-all duration-500 ease-in-out ${
          isOpen && !isMinimized
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95 pointer-events-none"
        }`}
      >
        <div className="w-96 h-137.5 bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden font-sans flex flex-col">
          <div className="bg-blue-600/80  backdrop-blur-md p-4 border-b border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white">
                    Support Chat
                  </h3>
                  <p className="text-xs text-white/80">
                    We're here to assist you!
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={closeChat}
                  className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 rounded-lg transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={messagesContainerRef}
            className="flex-1 px-4 py-4 bg-transparent overflow-y-auto custom-scrollbar"
            onWheel={handleScroll}
            onScroll={handleScroll}
          >
            <div className="space-y-2">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="border-t border-white/20 p-4 bg-white backdrop-blur-md">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-black/20 border border-black/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-black/60 text-sm transition-all duration-200"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-xl transition-all duration-200"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:cursor-pointer text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
          {hasNewMessage && !isOpen && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-bounce">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-ping absolute"></div>
            </div>
          )}
          {!isOpen && (
            <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20"></div>
          )}
        </button>
      )}
    </>
  );
};

export default SupportChat;
