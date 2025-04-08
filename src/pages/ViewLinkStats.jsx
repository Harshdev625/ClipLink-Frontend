import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAnalytics, clearAnalytics } from '../features/analytics/analyticsSlice'
import { useParams } from 'react-router-dom'
import ChartCard from '../components/ChartCard'
import RecentClicksTable from '../components/RecentClicksTable'

const shortLinkDomain = import.meta.env.VITE_SHORT_LINK_DOMAIN

export default function ViewLinkStats() {
  const { shortCode } = useParams()
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => state.analytics)

  useEffect(() => {
    dispatch(fetchAnalytics(shortCode))
    return () => dispatch(clearAnalytics())
  }, [dispatch, shortCode])

  if (loading || !data)
    return <p className="p-6 text-gray-200 bg-gray-950 min-h-screen">Loading analytics...</p>

  const dailyClicksData = Object.entries(data.dailyClicks || {}).map(([date, clicks]) => ({
    date,
    clicks,
  }))

  const deviceStatsData = Object.entries(data.deviceStats || {}).map(([device, count]) => ({
    device,
    count,
  }))

  const browserStatsData = Object.entries(data.browserStats || {}).map(([browser, count]) => ({
    browser,
    count,
  }))

  const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    const date = new Date(dateStr)
    return isNaN(date.getTime()) ? '—' : date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
  }

  return (
    <div className="bg-gray-950 min-h-screen text-gray-100 px-4 sm:px-6 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg space-y-5">
          <div className="space-y-4">
            {/* Short Link with backend redirect */}
            <a
              href={`${shortLinkDomain}/${data.shortCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-2xl sm:text-3xl font-bold text-blue-400 hover:text-blue-300 hover:underline break-all"
            >
              🔗 {shortLinkDomain}/{data.shortCode}
            </a>

            {/* Original URL */}
            <div className="text-sm sm:text-base text-gray-300">
              <p className="text-gray-400 font-medium">Original URL:</p>
              <a
                href={data.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline break-words"
              >
                {data.originalUrl}
              </a>
            </div>
          </div>

          {/* Info Section */}
          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-xl font-semibold text-white mb-3">Link Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm sm:text-base text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">Custom Alias:</span>
                <span>{data.customAlias || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">Total Clicks:</span>
                <span className="text-white font-semibold">{data.totalClicks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">Created At:</span>
                <span>{formatDate(data.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">Expires At:</span>
                <span>{data.expiresAt ? formatDate(data.expiresAt) : 'Never'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clicks per day chart */}
        <ChartCard
          title="Clicks Per Day"
          data={dailyClicksData}
          dataKeys={['clicks']}
          xKey="date"
          type="line"
          className="bg-gray-800 text-white rounded-2xl shadow-md p-4"
        />

        {/* Device & Browser Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Device Breakdown"
            data={deviceStatsData}
            dataKeys={['count']}
            xKey="device"
            type="bar"
            className="bg-gray-800 text-white rounded-2xl shadow-md p-4"
          />
          <ChartCard
            title="Browser Breakdown"
            data={browserStatsData}
            dataKeys={['count']}
            xKey="browser"
            type="bar"
            className="bg-gray-800 text-white rounded-2xl shadow-md p-4"
          />
        </div>

        {/* Recent Clicks Table */}
        <div className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-md overflow-x-auto">
          <RecentClicksTable clicks={data.recentClicks || []} />
        </div>
      </div>
    </div>
  )
}
