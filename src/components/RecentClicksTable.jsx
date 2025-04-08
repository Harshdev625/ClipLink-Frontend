import dayjs from "dayjs"

const RecentClicksTable = ({ clicks = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Clicks</h3>
      <div className="overflow-auto rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-5 py-3">IP Address</th>
              <th className="px-5 py-3">Device</th>
              <th className="px-5 py-3">Browser</th>
              <th className="px-5 py-3">OS</th>
              <th className="px-5 py-3">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {clicks.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No recent clicks available.
                </td>
              </tr>
            ) : (
              clicks.map((click, idx) => (
                <tr
                  key={click._id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition-all duration-150`}
                >
                  <td className="px-5 py-3 truncate" title={click.ip}>
                    {click.ip}
                  </td>
                  <td className="px-5 py-3 capitalize">{click.device}</td>
                  <td className="px-5 py-3 capitalize">{click.browser}</td>
                  <td className="px-5 py-3 truncate" title={click.os}>
                    {click.os || "Unknown"}
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {dayjs(click.timestamp).format("MMM D, YYYY - h:mm A")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentClicksTable
