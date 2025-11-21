import { useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-red-900/20 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Title */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-black text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-400">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl bg-red-600/30 -z-10"></div>
        </div>

        {/* Skull Icon or Message */}
        <div className="mb-8">
          <p className="text-2xl md:text-4xl font-bold text-white mb-4">
            No Gains Found Here
          </p>
          <p className="text-gray-400 text-lg">
            هذه الصفحة تخطّت يوم تمارين الساق واختفت. لنعد إلى المسار الصحيح.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 border border-gray-700 min-w-[200px]"
          >
            ← ارجع للخلف
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-red-600/50 min-w-[200px]"
          >
            🏠 الصفحة الرئيسية
          </button>
        </div>

        {/* Decorative Element */}
        <div className="mt-16 text-gray-600">
          <p className="text-sm">💀 💪 رمز الخطأ: SKIP_DAY_404</p>
        </div>
      </div>
    </div>
  );
}
