"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, X, Mic, Image, Paperclip } from "lucide-react";

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm Xander, your AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");

    // Simulate AI response after a delay
    setTimeout(() => {
      const responses = [
        "I'm analyzing your request. Give me a moment.",
        "That's an interesting query. Let me process that for you.",
        "I can help with that. Here's what I've found...",
        "Based on my analysis, I'd recommend the following approach.",
        "Let me provide you with some insights on this topic.",
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const newAiMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newAiMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-30">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 h-96 bg-black/80 backdrop-blur-xl rounded-2xl border border-neutral-800 flex flex-col overflow-hidden shadow-xl"
          >
            <div className="p-3 border-b border-neutral-800 flex items-center justify-between bg-gradient-to-r from-blue-600/30 to-purple-600/30">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600">
                  <AvatarFallback>X</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-white text-sm">Xander Assistant</h3>
                  <div className="text-xs text-green-400 flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                    Online
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-7 w-7 text-neutral-400 hover:text-white" onClick={() => setIsOpen(false)}>
                <X size={16} />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex items-start gap-2 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  {message.sender === "ai" ? (
                    <Avatar className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 shrink-0">
                      <AvatarFallback>X</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="h-8 w-8 bg-neutral-700 shrink-0">
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  )}
                  <div 
                    className={`rounded-xl p-3 text-sm max-w-[85%] ${
                      message.sender === "ai" 
                        ? "bg-neutral-800 rounded-tl-none text-white" 
                        : "bg-blue-600 rounded-tr-none text-white"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-3 border-t border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Input 
                    ref={inputRef}
                    type="text" 
                    placeholder="Ask Xander anything..." 
                    className="bg-neutral-800 border-neutral-700 text-white pr-10"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button 
                    className="absolute right-0 top-0 h-full aspect-square bg-transparent hover:bg-transparent text-neutral-400 hover:text-white"
                    onClick={handleSend}
                  >
                    <Send size={16} />
                  </Button>
                </div>
                <Button size="sm" variant="outline" className="h-10 w-10 border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800">
                  <Mic size={16} />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2 px-1">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-7 w-7 text-neutral-500 hover:text-white hover:bg-neutral-800/50">
                    <Paperclip size={14} />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 text-neutral-500 hover:text-white hover:bg-neutral-800/50">
                    <Image size={14} />
                  </Button>
                </div>
                <div className="text-xs text-neutral-500">AI Assistant</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 p-0 shadow-lg shadow-blue-600/20"
        >
          <MessageSquare size={24} />
        </Button>
      </motion.div>
    </div>
  );
}

// Also export as default to ensure compatibility with both import styles
export default ChatWidget; 