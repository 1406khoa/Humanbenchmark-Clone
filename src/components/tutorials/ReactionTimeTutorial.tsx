import React from 'react';
import { MousePointer, Clock, BarChart } from 'lucide-react';

export function ReactionTimeTutorial() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md space-y-8">
      <h2 className="text-xl font-bold text-gray-900">How to Play</h2>
      
      {/* Step 1 */}
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
          <MousePointer className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-2">1. Get Ready</h3>
          <div className="relative h-20 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-medium">Click to start</span>
            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
              <div className="animate-bounce">
                <MousePointer className="w-6 h-6 text-gray-800" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
          <Clock className="w-6 h-6 text-white animate-pulse" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-2">2. Wait for Green</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-medium">Wait...</span>
            </div>
            <div className="h-20 bg-green-500 rounded-lg flex items-center justify-center relative overflow-hidden">
              <span className="text-white font-medium">Click!</span>
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
          <BarChart className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-2">3. Complete 5 Attempts</h3>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 animate-[progress_2s_ease-in-out_infinite]" style={{ width: '60%' }} />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Attempt: 3/5</span>
              <span>Average: 245ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}