import { Quiz } from "@/components/quiz"
import { vocabularyData } from "@/data/vocabulary"
import { InfoIcon } from "@/components/info-icon"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-400 to-pink-200 flex items-center justify-center p-3">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-5 text-white relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="25" cy="25" r="1" fill="white" opacity="0.3" />
                  <circle cx="75" cy="75" r="1" fill="white" opacity="0.3" />
                  <circle cx="50" cy="10" r="0.5" fill="white" opacity="0.3" />
                  <circle cx="10" cy="60" r="0.5" fill="white" opacity="0.3" />
                  <circle cx="90" cy="40" r="0.5" fill="white" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grain)" />
            </svg>
          </div>

          {/* Header content with info icon */}
          <div className="flex items-center justify-between relative z-10">
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold mb-1">✨ Vocabulary Master</h1>
              <p className="text-indigo-100 text-sm">Enhance your English vocabulary with style</p>
            </div>

            {/* Info icon in header */}
            <InfoIcon />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <Quiz vocabularyData={vocabularyData} />
        </div>
      </div>
    </div>
  )
}
