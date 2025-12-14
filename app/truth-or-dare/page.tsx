'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: string;
  type: 'truth' | 'dare' | 'special';
  question: string;
  difficulty: 'easy' | 'medium' | 'hard';
  effect?: string;
}

export default function TruthOrDarePage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 載入題目資料
    fetch('/truth-questions.json')
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('載入題目失敗:', error);
        setIsLoading(false);
      });
  }, []);

  const drawQuestion = () => {
    if (questions.length === 0) return;

    setIsDrawing(true);
    setShowResult(false);
    setCurrentIndex(0);

    // 打亂題目順序並創建一個循環列表
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);

    // 選中最終題目
    const finalIndex = Math.floor(Math.random() * questions.length);
    const finalQuestion = questions[finalIndex];
    
    // 確保最終題目在打亂後的列表中
    const finalShuffledIndex = shuffled.findIndex(q => q.id === finalQuestion.id);
    const targetIndex = finalShuffledIndex >= 0 ? finalShuffledIndex : 0;

    // 計算動畫步驟（快速開始，逐漸減速）
    const totalSteps = 25; // 顯示25個題目
    let step = 0;
    const initialDelay = 30; // 初始速度（毫秒）
    const maxDelay = 200; // 最終速度（毫秒）

    const animate = () => {
      if (step < totalSteps) {
        // 使用緩動函數讓速度逐漸變慢
        const progress = step / totalSteps;
        const easeOut = 1 - Math.pow(1 - progress, 3); // 三次緩動
        const delay = initialDelay + (maxDelay - initialDelay) * easeOut;
        
        // 在最後幾步時，逐漸靠近目標題目
        let index;
        if (step < totalSteps - 5) {
          // 前20步：隨機顯示
          index = step % shuffled.length;
        } else {
          // 最後5步：逐漸靠近目標
          const remainingSteps = totalSteps - step;
          const randomOffset = Math.floor(Math.random() * Math.min(remainingSteps, shuffled.length));
          index = (targetIndex + randomOffset) % shuffled.length;
        }
        
        setCurrentIndex(index);
        step++;
        setTimeout(animate, Math.round(delay));
      } else {
        // 最後停在目標題目
        setCurrentIndex(targetIndex);
        setTimeout(() => {
          setCurrentQuestion(finalQuestion);
          setIsDrawing(false);
          setShowResult(true);
        }, 300);
      }
    };

    animate();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-900';
      case 'medium': return 'text-yellow-400 bg-yellow-900';
      case 'hard': return 'text-red-400 bg-red-900';
      default: return 'text-gray-400 bg-gray-900';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'truth': return '🤔';
      case 'dare': return '🎯';
      case 'special': return '⭐';
      default: return '❓';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'truth': return '真心話';
      case 'dare': return '大冒險';
      case 'special': return '特殊任務';
      default: return '未知';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">🎲</div>
          <p className="text-xl">載入題目中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white p-6 shadow-lg border-b-4 border-yellow-500">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <Link href="/" className="text-2xl md:text-3xl font-black uppercase tracking-wider hover:text-yellow-300 transition">
              🎯 聖誕廢物輪盤
            </Link>
          </div>
          <Link href="/" className="bg-black bg-opacity-30 px-4 py-2 rounded border border-yellow-500/30 hover:bg-opacity-50 transition">
            返回首頁
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-6">
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-yellow-400 mb-2">🎲 真心話大冒險</h1>
            <p className="text-gray-300">射空或掉鏢的懲罰時刻！抽一張卡片接受挑戰</p>
          </div>

          {!currentQuestion && !isDrawing && (
            <div className="text-center space-y-6">
              <div className="text-8xl mb-4">🎴</div>
              <p className="text-lg text-gray-300 mb-6">
                準備好面對挑戰了嗎？<br />
                點擊下方按鈕開始抽卡！
              </p>
              <button
                onClick={drawQuestion}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition transform hover:scale-105"
              >
                🎯 抽卡！
              </button>
            </div>
          )}

          {isDrawing && shuffledQuestions.length > 0 && (
            <div className="text-center space-y-6">
              <div className="relative h-80 flex items-center justify-center overflow-hidden">
                {/* 卡片快速閃過效果 */}
                <div className="relative w-full max-w-lg h-80">
                  {shuffledQuestions[currentIndex] && (
                    <div 
                      key={currentIndex}
                      className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-2xl shadow-2xl border-4 border-yellow-400 flex flex-col items-center justify-center p-8 transform transition-all duration-75 ease-out"
                      style={{
                        transform: 'scale(1)',
                        opacity: 1,
                        zIndex: 10,
                        animation: 'flip 0.1s ease-in-out'
                      }}
                    >
                      {/* 卡片內容 */}
                      <div className="text-6xl mb-4">
                        {getTypeIcon(shuffledQuestions[currentIndex].type)}
                      </div>
                      <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${getDifficultyColor(shuffledQuestions[currentIndex].difficulty)}`}>
                        {getTypeName(shuffledQuestions[currentIndex].type)}
                      </div>
                      <div className="bg-black bg-opacity-30 rounded-lg p-4 w-full min-h-[80px] flex items-center justify-center">
                        <p className="text-white text-lg font-bold text-center line-clamp-3">
                          {shuffledQuestions[currentIndex].question}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* 背景光暈效果 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-400/20 to-purple-400/20 rounded-2xl blur-xl animate-pulse"></div>
                </div>
              </div>
              
              {/* 進度指示 */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent animate-shimmer h-1 rounded"></div>
                <p className="text-xl text-yellow-400 font-bold relative z-10 mb-2">
                  🎴 抽卡中...
                </p>
                <div className="text-gray-400 text-sm">
                  題目正在快速閃過，即將揭曉...
                </div>
              </div>
            </div>
          )}

          {showResult && currentQuestion && (
            <div className="space-y-6">
              {/* 最終卡片 */}
              <div className="relative h-80 flex items-center justify-center">
                <div className="relative w-full max-w-lg h-80">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-2xl shadow-2xl border-4 border-yellow-400 flex flex-col items-center justify-center p-8">
                    {/* 卡片內容 */}
                    <div className="text-6xl mb-4">
                      {getTypeIcon(currentQuestion.type)}
                    </div>
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${getDifficultyColor(currentQuestion.difficulty)}`}>
                      {getTypeName(currentQuestion.type)} • {currentQuestion.difficulty === 'easy' ? '簡單' : currentQuestion.difficulty === 'medium' ? '中等' : '困難'}
                    </div>
                    <div className="bg-black bg-opacity-30 rounded-lg p-4 w-full min-h-[80px] flex items-center justify-center">
                      <p className="text-white text-lg font-bold text-center">
                        {currentQuestion.question}
                      </p>
                    </div>
                  </div>
                  
                  {/* 背景光暈效果 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-400/20 to-purple-400/20 rounded-2xl blur-xl"></div>
                </div>
              </div>

              {/* 特殊效果提示 */}
              {currentQuestion.type === 'special' && currentQuestion.effect === 'reveal_random_gift' && (
                <div className="bg-purple-900 bg-opacity-50 border border-purple-500 rounded-lg p-4">
                  <h4 className="font-bold text-purple-300 mb-2">🎁 特殊效果</h4>
                  <p className="text-sm text-gray-300">
                    執行此任務時，將會隨機揭露一位參與者的禮物內容！
                  </p>
                </div>
              )}

              {/* 執行規則 */}
              <div className="bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg p-4">
                <h4 className="font-bold text-blue-300 mb-2">💡 執行規則</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• 如果不想執行此挑戰，可以選擇喝一杯啤酒作為替代</li>
                  <li>• 特殊任務的禮物揭露效果將立即執行</li>
                  <li>• 請大聲宣讀你的挑戰內容，讓大家知道你的命運</li>
                </ul>
              </div>

              {/* 操作按鈕 */}
              <div className="flex gap-4">
                <button
                  onClick={drawQuestion}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-3 px-6 rounded-lg transition"
                >
                  🎲 再抽一張
                </button>
                <Link
                  href="/"
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition text-center"
                >
                  返回首頁
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
