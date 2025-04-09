import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLinks } from "../features/links/linkSlice";
import LinkCard from "../components/LinkCard";
import { Link } from 'react-router-dom' 

export default function Dashboard() {
  const dispatch = useDispatch();
  const { links, loading } = useSelector((state) => state.links);

  useEffect(() => {
    dispatch(fetchLinks());
  }, [dispatch]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-white">
            Your Shortened Links
          </h1>
          <p className="text-gray-300 text-base">
            Track, manage and analyze your links with ease.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-300">Fetching your links...</p>
          </div>
        ) : links.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              You haven’t created any links yet.
            </p>
            <p className="mt-4">
              <Link
                to="/create"
                className="text-blue-400 hover:text-white hover:underline font-semibold"
              >
                Create your first link →
              </Link>
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {links.map((link) => (
              <LinkCard key={link._id} link={link} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
