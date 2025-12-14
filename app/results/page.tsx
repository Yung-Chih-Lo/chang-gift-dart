'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Result {
  giftName: string;
  votes: number;
}

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [winner, setWinner] = useState<Result | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadResults();
    const interval = setInterval(loadResults, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadResults = async () => {
    try {
      const response = await fetch('/api/results');
      const data = await response.json();

      if (data.success) {
        setResults(data.results);
        setTotalVotes(data.totalVotes);
        setWinner(data.winner);
      } else {
        setError('載入結果失敗');
      }
    } catch (error) {
      setError('網路錯誤，無法載入結果');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">📊</div>
          <p className="text-xl">計算結果中...</p>
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

      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-700">

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-900 bg-opacity-50 border border-red-500">
              <p className="text-red-300 font-bold">❌ {error}</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-12">
              {/* Podium Display - Top 3 */}
              <div className="space-y-8">
                <div className="text-center relative z-10">
                  <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wider uppercase transform -skew-x-6 inline-block border-b-4 border-yellow-500 pb-2">
                    🏆 榮耀頒獎台 🏆
                  </h3>
                  <p className="text-gray-400 mt-4 font-bold tracking-widest uppercase text-sm">The Hall of Fame</p>
                </div>

                {/* Podium Base */}
                <div className="relative flex justify-center items-end space-x-4 h-[28rem] mt-12 mb-8 px-4">
                  {/* 2nd Place - Silver */}
                  <div className="flex flex-col items-center w-1/3 max-w-[240px] z-10">
                    {results[1] ? (
                      <>
                        <div className="relative w-full aspect-square bg-gradient-to-b from-gray-200 to-gray-400 rounded-t-xl shadow-[0_0_20px_rgba(156,163,175,0.3)] border-t-4 border-l-4 border-r-4 border-gray-100 flex flex-col items-center justify-center p-4 transform hover:scale-105 transition-transform duration-300">
                          <div className="text-4xl md:text-5xl mb-3 drop-shadow-lg">🥈</div>
                          <div className="text-center w-full">
                            <h3 className="text-gray-900 font-black text-lg md:text-xl line-clamp-2 leading-tight mb-2">
                              {results[1].giftName}
                            </h3>
                            <div className="inline-block bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                              {results[1].votes} 票
                            </div>
                          </div>
                        </div>
                        <div className="w-full h-32 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b-lg shadow-lg flex items-center justify-center border-b-4 border-gray-700 relative overflow-hidden group">
                          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                          <span className="text-4xl md:text-6xl font-black text-gray-200 opacity-50 drop-shadow-md">2</span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-end justify-center opacity-30">
                        <div className="text-gray-500 font-bold">無人上榜</div>
                      </div>
                    )}
                  </div>

                  {/* 1st Place - Gold */}
                  <div className="flex flex-col items-center w-1/3 max-w-[280px] z-20 -mb-4">
                    {results[0] ? (
                      <>
                        <div className="relative w-full aspect-square bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-t-xl shadow-[0_0_30px_rgba(234,179,8,0.5)] border-t-4 border-l-4 border-r-4 border-yellow-200 flex flex-col items-center justify-center p-4 transform hover:scale-110 transition-transform duration-300">
                          <div className="absolute -top-12 animate-bounce">
                            <span className="text-6xl drop-shadow-lg">👑</span>
                          </div>
                          <div className="text-5xl md:text-6xl mb-3 drop-shadow-lg">🥇</div>
                          <div className="text-center w-full">
                            <h3 className="text-yellow-950 font-black text-xl md:text-2xl line-clamp-2 leading-tight mb-2">
                              {results[0].giftName}
                            </h3>
                            <div className="inline-block bg-yellow-900 text-yellow-100 px-4 py-1 rounded-full text-base font-bold shadow-md">
                              {results[0].votes} 票
                            </div>
                          </div>
                        </div>
                        <div className="w-full h-44 bg-gradient-to-b from-yellow-500 to-yellow-700 rounded-b-lg shadow-xl flex items-center justify-center border-b-4 border-yellow-800 relative overflow-hidden group">
                          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20"></div>
                          <span className="text-6xl md:text-8xl font-black text-yellow-200 opacity-50 drop-shadow-md">1</span>
                        </div>
                      </>
                    ) : null}
                  </div>

                  {/* 3rd Place - Bronze */}
                  <div className="flex flex-col items-center w-1/3 max-w-[240px] z-10">
                    {results[2] ? (
                      <>
                        <div className="relative w-full aspect-square bg-gradient-to-b from-orange-300 to-orange-500 rounded-t-xl shadow-[0_0_20px_rgba(249,115,22,0.3)] border-t-4 border-l-4 border-r-4 border-orange-200 flex flex-col items-center justify-center p-4 transform hover:scale-105 transition-transform duration-300">
                          <div className="text-4xl md:text-5xl mb-3 drop-shadow-lg">🥉</div>
                          <div className="text-center w-full">
                            <h3 className="text-orange-950 font-black text-lg md:text-xl line-clamp-2 leading-tight mb-2">
                              {results[2].giftName}
                            </h3>
                            <div className="inline-block bg-orange-900 text-orange-100 px-3 py-1 rounded-full text-sm font-bold shadow-md">
                              {results[2].votes} 票
                            </div>
                          </div>
                        </div>
                        <div className="w-full h-24 bg-gradient-to-b from-orange-500 to-orange-700 rounded-b-lg shadow-lg flex items-center justify-center border-b-4 border-orange-800 relative overflow-hidden group">
                          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                          <span className="text-4xl md:text-6xl font-black text-orange-200 opacity-50 drop-shadow-md">3</span>
                        </div>
                      </>
                    ) : (
                       <div className="w-full h-full flex items-end justify-center opacity-30">
                        <div className="text-gray-500 font-bold">無人上榜</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Winner Special Message */}
                {winner && (
                  <div className="max-w-3xl mx-auto bg-gradient-to-r from-red-900 via-red-800 to-red-900 p-1 rounded-2xl shadow-[0_0_40px_rgba(220,38,38,0.3)] transform hover:scale-105 transition-transform duration-500">
                    <div className="bg-black bg-opacity-80 rounded-xl p-8 text-center border border-red-500/30 backdrop-blur-sm">
                      <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 animate-pulse">
                        Punishment Time
                      </div>
                      <h4 className="text-2xl md:text-4xl font-black text-white mb-4">
                        🎉 恭喜優勝者 🎉
                      </h4>
                      <p className="text-xl md:text-2xl text-gray-200 mb-6 leading-relaxed">
                        <span className="text-yellow-400 font-bold text-3xl block mb-2">{winner.giftName}</span>
                        榮獲「最實用禮物」殊榮！
                      </p>
                      <p className="text-red-400 font-bold animate-bounce">
                        ⬇️ 請準備接受最終懲罰 ⬇️
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">{totalVotes}</div>
                  <div className="text-lg text-gray-300 font-medium">總投票數</div>
                </div>
                <div className="bg-green-900 bg-opacity-30 border border-green-500 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">{results.length}</div>
                  <div className="text-lg text-gray-300 font-medium">參賽禮物</div>
                </div>
                <div className="bg-purple-900 bg-opacity-30 border border-purple-500 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">
                    {totalVotes > 0 ? Math.round((winner?.votes || 0) / totalVotes * 100) : 0}%
                  </div>
                  <div className="text-lg text-gray-300 font-medium">優勝者得票率</div>
                </div>
              </div>

              {/* Full Rankings (All participants) */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-center text-gray-300">📊 完整排行榜</h3>
                <div className="grid gap-4">
                  {results.map((result, index) => {
                    const isPodium = index < 3;
                    const rankColor = index === 0 ? 'bg-yellow-500 text-black' : 
                                     index === 1 ? 'bg-gray-300 text-black' : 
                                     index === 2 ? 'bg-orange-600 text-white' : 
                                     'bg-gray-600 text-white';
                    
                    return (
                      <div
                        key={result.giftName}
                        className={`p-4 rounded-lg border transition ${
                          isPodium 
                            ? 'bg-gray-800 border-yellow-500/50 hover:border-yellow-500' 
                            : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`${rankColor} w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg`}>
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-white">
                                {result.giftName}
                                {index === 0 && <span className="ml-2 text-sm text-yellow-400">👑</span>}
                              </h4>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${isPodium ? 'text-yellow-400' : 'text-blue-400'}`}>
                              {result.votes}
                            </div>
                            <div className="text-sm text-gray-400">票</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Final Message */}
              <div className="bg-green-900 bg-opacity-30 border border-green-500 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold text-green-300 mb-4">🎉 遊戲結束</h3>
                <p className="text-gray-300 mb-4">
                  感謝所有參與者的熱情投入！<br />
                  這是一個充滿歡笑和驚喜的夜晚。
                </p>
                <div className="flex gap-4 justify-center">
                  <Link
                    href="/"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition"
                  >
                    🏠 返回首頁
                  </Link>
                </div>
              </div>
            </div>
          )}

          {results.length === 0 && !error && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-gray-400 mb-2">還沒有投票結果</h3>
              <p className="text-gray-500 mb-6">等大家投完票後再來查看吧！</p>
              <Link
                href="/vote"
                className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-2 px-6 rounded-lg transition"
              >
                🗳️ 去投票
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
