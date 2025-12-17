'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RevealPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [revealedGift, setRevealedGift] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const handlePasswordSubmit = async () => {
    if (!password) {
      setAuthError('請輸入密碼');
      return;
    }

    setIsAuthLoading(true);
    setAuthError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthenticated(true);
        setAuthError('');
      } else {
        setAuthError(data.error || '密碼錯誤，請重新輸入');
      }
    } catch (error) {
      setAuthError('網路錯誤，請檢查網路連線後再試');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleReveal = async () => {
    setIsLoading(true);
    setError('');
    setMessage('');
    setRevealedGift(null);

    try {
      const response = await fetch('/api/reveal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // 不需要輸入任何參數
      });

      const data = await response.json();

      if (response.ok) {
        setRevealedGift(data.giftName);
        setMessage('🎉 揭露成功！');
      } else {
        setError(data.error || '揭露失敗');
      }
    } catch (error) {
      setError('網路錯誤，請檢查網路連線後再試');
    } finally {
      setIsLoading(false);
    }
  };

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
            <h1 className="text-3xl font-bold text-yellow-400 mb-2">👀 隨機揭露</h1>
            <p className="text-gray-300">查看已登記的廢物禮物情報</p>
          </div>

          <div className="space-y-6">
            {!isAuthenticated && (
              <div className="bg-gray-700 border border-gray-600 rounded-lg p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">🔒 密碼驗證</h3>
                <p className="text-gray-300 mb-4">
                  請輸入主持人密碼，不要亂搞，Flag 不在 Sources 裡面。
                </p>
                <div className="space-y-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                    placeholder="輸入密碼"
                  />
                  {authError && (
                    <p className="text-red-400 text-sm">{authError}</p>
                  )}
                  <button
                    onClick={handlePasswordSubmit}
                    disabled={isAuthLoading}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-black font-bold py-3 px-4 rounded-lg transition disabled:cursor-not-allowed"
                  >
                    {isAuthLoading ? '驗證中...' : '驗證密碼'}
                  </button>
                </div>
              </div>
            )}

            {isAuthenticated && error && (
              <div className="bg-red-900 bg-opacity-50 border border-red-500 rounded-lg p-4">
                <p className="text-red-300 font-bold">❌ {error}</p>
              </div>
            )}

            {isAuthenticated && message && (
              <div className="bg-green-900 bg-opacity-50 border border-green-500 rounded-lg p-4">
                <p className="text-green-300 font-bold">{message}</p>
              </div>
            )}

            {isAuthenticated && revealedGift && (
              <div className="bg-yellow-900 bg-opacity-50 border border-yellow-500 rounded-lg p-6 text-center">
                <div className="text-6xl mb-4">🎁</div>
                <h3 className="text-2xl font-bold text-yellow-300 mb-2">揭露結果</h3>
                <p className="text-xl text-white font-bold mb-4">
                  揭露了一個禮物：{revealedGift}
                </p>
                <p className="text-sm text-gray-400">
                  記住這個情報，在飛鏢競賽中好好利用吧！
                </p>
              </div>
            )}

            {isAuthenticated && !revealedGift && (
              <div className="bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🎲</div>
                <h3 className="text-xl font-bold text-blue-300 mb-2">準備揭露情報？</h3>
                <p className="text-gray-300 mb-4">
                  點擊下方按鈕隨機查看一個尚未揭露的禮物<br />
                  揭露後該禮物將被標記為已揭露，不會再被重複揭露！
                </p>
              </div>
            )}

            {isAuthenticated && (
              <div className="bg-purple-900 bg-opacity-30 border border-purple-500 rounded-lg p-4">
                <h4 className="font-bold text-purple-300 mb-2">📋 遊戲規則說明</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• 遊戲過程中會交換手中的號碼牌，序號和禮物已無關聯</li>
                  <li>• 這是遊戲中的情報收集環節，幫助你了解尚未揭露的禮物</li>
                  <li>• 系統只會從未揭露的禮物中隨機選擇，避免重複揭露</li>
                  <li>• 揭露後該禮物將被永久標記為已揭露</li>
                </ul>
              </div>
            )}

            {isAuthenticated && (
              <button
                onClick={handleReveal}
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg transition disabled:cursor-not-allowed text-lg"
              >
                {isLoading ? '🔄 揭露中...' : '🎯 隨機揭露一個禮物'}
              </button>
            )}

            {isAuthenticated && (
              <div className="text-center">
                <Link
                  href="/vote"
                  className="text-gray-400 hover:text-yellow-400 transition"
                >
                  已經玩夠了？去投票吧 →
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
