export default function SkeletonCard() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="h-4 w-32 bg-gray-800 rounded mb-2" />
          <div className="h-3 w-24 bg-gray-800 rounded" />
        </div>
        <div className="h-6 w-16 bg-gray-800 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="h-3 w-20 bg-gray-700 rounded mb-2" />
          <div className="h-4 w-12 bg-gray-700 rounded" />
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="h-3 w-12 bg-gray-700 rounded mb-2" />
          <div className="h-4 w-16 bg-gray-700 rounded" />
        </div>
      </div>
      <div className="h-3 w-40 bg-gray-800 rounded mt-3" />
    </div>
  );
}