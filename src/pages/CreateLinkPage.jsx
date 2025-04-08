import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLink, resetCreateStatus } from "../features/links/linkSlice";

export default function CreateLinkPage() {
  const dispatch = useDispatch();
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [expiry, setExpiry] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { createStatus, error } = useSelector((state) => state.links);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createLink({ url, alias, expiresAt: expiry }));
    setUrl("");
    setAlias("");
    setExpiry("");
  };

  useEffect(() => {
    if (createStatus === "succeeded") {
      setSuccessMessage("Short link created successfully!");
      const timer = setTimeout(() => {
        setSuccessMessage("");
        dispatch(resetCreateStatus());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [createStatus, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl font-extrabold text-white mb-6 text-center">
          🔗 Create a Short Link
        </h2>

        {successMessage && (
          <div className="mb-4 p-3 rounded-lg bg-green-600 text-white text-sm text-center font-medium">
            {successMessage}
          </div>
        )}

        {error && createStatus === "failed" && (
          <div className="mb-4 p-3 rounded-lg bg-red-600 text-white text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Long URL
            </label>
            <input
              type="url"
              placeholder="https://example.com/very/long/url"
              className="w-full bg-white/10 text-white border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Custom Alias <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="my-custom-alias"
              className="w-full bg-white/10 text-white border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Expiry Date
            </label>
            <input
              type="date"
              className="w-full bg-white/10 text-white border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            disabled={createStatus === "loading"}
          >
            {createStatus === "loading" ? "Creating..." : "Create Link"}
          </button>
        </form>
      </div>
    </div>
  );
}