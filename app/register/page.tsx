'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [code, setCode] = useState('');
  const [giftName, setGiftName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, giftName }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage('🎉 登記成功！廢物禮物已經準備就緒。');
      } else {
        setMessage(data.error || '登記失敗，請稍後再試');
      }
    } catch (error) {
      setMessage('網路錯誤，請檢查網路連線後再試');
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
            <h1 className="text-3xl font-bold text-yellow-400 mb-2">📝 禮物登記</h1>
            <p className="text-gray-300">請輸入序號和帶來的廢物禮物名稱</p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${isSuccess ? 'bg-green-900 bg-opacity-50 border border-green-500' : 'bg-red-900 bg-opacity-50 border border-red-500'}`}>
              <p className={`font-bold ${isSuccess ? 'text-green-300' : 'text-red-300'}`}>
                {message}
              </p>
            </div>
          )}

          {!isSuccess && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="code" className="block text-sm font-bold text-gray-300 mb-2">
                  🎫 序號 *
                </label>
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                  placeholder="請輸入號碼牌號碼"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">請輸入您獲得的號碼牌序號</p>
              </div>

              <div>
                <label htmlFor="giftName" className="block text-sm font-bold text-gray-300 mb-2">
                  🎁 禮物名稱 *
                </label>
                <input
                  type="text"
                  id="giftName"
                  value={giftName}
                  onChange={(e) => setGiftName(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                  placeholder="例如：三角錐..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">請描述廢物禮物，越具體越好！</p>
              </div>

              <div className="bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg p-4">
                <h3 className="font-bold text-blue-300 mb-2">📋 登記須知</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• 序號在號碼牌背後</li>
                  <li>• 每個序號只能登記一次禮物，不要鑽漏洞！</li>
                  <li>• 禮物名稱將用於投票和揭露，請詳細描述</li>
                  <li>• 請確保禮物已經包裝好且不可拆開</li>
                  <li>• 遊戲過程中禮物會被交換，但名稱將保持不變</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-black font-bold py-3 px-6 rounded-lg transition disabled:cursor-not-allowed"
              >
                {isLoading ? '🔄 登記中...' : '🎯 確認登記'}
              </button>
            </form>
          )}

          {isSuccess && (
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-lg text-green-300 mb-4">
                登記完成！序號 <span className="font-bold text-yellow-400">{code}</span> 已經準備好加入遊戲了。
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/"
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition"
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
