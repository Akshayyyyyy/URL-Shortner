import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import axios from "axios";

function ShortenForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  async function handleSubmit() {
    if (!url) return;
    try {
      const { data } = await axios.post(`${API_BASE_URL}/create`, {
        fullUrl: url,
      });
      setShortUrl(data.short_url);
    } catch (error) {
      console.error("Error creating short URL:", error);
      alert("Failed to shorten URL.");
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${API_BASE_URL}/${shortUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="relative">
          <input
            type="url"
            placeholder="https://example.com/your-long-url"
            className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <span className="absolute top-3.5 left-4 text-gray-400">🔗</span>
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium py-3 rounded-xl hover:scale-105 transform transition-all"
        >
          Shorten It!
        </button>
      </div>

      {shortUrl && (
        <div className="mt-6 bg-gray-100 p-4 rounded-xl flex items-center justify-between gap-3">
          <a
            href={`${API_BASE_URL}/${shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium break-all hover:underline"
          >
            {`${API_BASE_URL}/${shortUrl}`}
          </a>
          <button
            onClick={copyToClipboard}
            className={`p-2 rounded-full transition ${
              copied ? "bg-green-500 text-white" : "bg-white hover:bg-gray-200"
            }`}
            title="Copy"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </div>
      )}
    </>
  );
}

export default ShortenForm;
