import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const colorThemes = {
  blue: {
    gradient: 'from-blue-500 to-blue-600',
    color: '#3b82f6',
  },
  emerald: {
    gradient: 'from-emerald-500 to-emerald-600',
    color: '#10b981',
  },
  purple: {
    gradient: 'from-purple-500 to-purple-600',
    color: '#8b5cf6',
  },
  amber: {
    gradient: 'from-amber-500 to-amber-600',
    color: '#f59e0b',
  },
  pink: {
    gradient: 'from-pink-500 to-pink-600',
    color: '#ec4899',
  },
}

const themeKeys = Object.keys(colorThemes)

let chartInstanceId = 0

const ChartCard = ({
  title = 'Link Clicks Over Time',
  data = [],
  type = 'line',
  dataKeys = ['clicks'],
  xKey = 'date',
}) => {
  // Rotate colors based on instance count
  const currentThemeIndex = chartInstanceId++ % themeKeys.length
  const currentTheme = colorThemes[themeKeys[currentThemeIndex]]

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden w-full">
      <div className={`bg-gradient-to-r ${currentTheme.gradient} px-6 py-4`}>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>

      <div className="p-6">
        {data.length === 0 ? (
          <div className="text-gray-500 text-sm text-center py-10">
            No data available to display.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            {type === 'line' ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                {dataKeys.map((key, index) => {
                  const theme =
                    colorThemes[themeKeys[(currentThemeIndex + index) % themeKeys.length]]
                  return (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={theme.color}
                      strokeWidth={3}
                      activeDot={{ r: 6 }}
                    />
                  )
                })}
              </LineChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                {dataKeys.map((key, index) => {
                  const theme =
                    colorThemes[themeKeys[(currentThemeIndex + index) % themeKeys.length]]
                  return (
                    <Bar
                      key={key}
                      dataKey={key}
                      fill={theme.color}
                      radius={[6, 6, 0, 0]}
                      barSize={35}
                    />
                  )
                })}
              </BarChart>
            )}
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

export default ChartCard
