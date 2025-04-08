import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Check } from 'lucide-react'
import { formatDate } from '../utils/formatDate'

const BASE_URL = import.meta.env.VITE_SHORT_LINK_DOMAIN

const LinkCard = ({ link }) => {
  const [copied, setCopied] = useState(false)
  const shortUrl = `${BASE_URL}/${link.shortCode}`
  const isExpired = new Date(link.expiresAt) < new Date()

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg transition hover:shadow-cyan-500/20 space-y-4">
      {/* Top: Original URL + Status */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h2 className="text-base text-white font-medium break-words w-full sm:max-w-[75%]">
          {link.originalUrl}
        </h2>
        <span
          className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
            isExpired
              ? 'bg-red-500/10 text-red-400'
              : 'bg-green-500/10 text-green-400'
          }`}
        >
          {isExpired ? 'Expired' : 'Active'}
        </span>
      </div>

      {/* Short URL + Copy Button */}
      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 text-sm hover:underline break-all pr-10 sm:pr-0"
        >
          {shortUrl}
        </a>
        <button
          onClick={handleCopy}
          className="text-cyan-300 hover:text-white p-1 rounded transition-all duration-200 self-start sm:self-center"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>

      {/* Clicks & Created Date */}
      <div className="text-xs text-gray-400 grid grid-cols-1 sm:grid-cols-2 gap-y-1 border-t border-white/10 pt-2">
        <p>
          Clicks: <span className="text-white font-semibold">{link.clicks}</span>
        </p>
        <p className="text-left sm:text-right">Created: {formatDate(link.createdAt)}</p>
      </div>

      {/* Stats Link */}
      <div>
        <Link
          to={`/analytics/${link.shortCode}`}
          className="text-cyan-400 text-sm hover:text-cyan-300 transition"
        >
          View Stats →
        </Link>
      </div>
    </div>
  )
}

export default LinkCard
