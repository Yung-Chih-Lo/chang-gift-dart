'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Gift {
  code: string;
  giftName: string;
  isRevealed: boolean;
}

export default function VotePage() {
  const [voterCode, setVoterCode] = useState('');
  const [selectedGift, setSelectedGift] = useState('');
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // 載入所有禮物清單
    fetch('/api/gifts')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setGifts(data.gifts);
        } else {
          setError('載入禮物清單失敗');
        }
      })
      .catch(error => {
        console.error('載入禮物清單失敗:', error);
        setError('網路錯誤，無法載入禮物清單');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleVote = async () => {
    if (!voterCode.trim()) {
      setError('請輸入您的序號');
      return;
    }

    if (!selectedGift) {
      setError('請選擇要投票的禮物');
      return;
    }

    setIsVoting(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voterCode: voterCode.trim(),
          targetGiftName: selectedGift
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage('🗳️ 投票成功！感謝您的參與。');
      } else {
        setError(data.error || '投票失敗');
      }
    } catch (error) {
      setError('網路錯誤，請檢查網路連線後再試');
    } finally {
      setIsVoting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">🗳️</div>
          <p className="text-xl">載入禮物清單中...</p>
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
            <h1 className="text-3xl font-bold text-yellow-400 mb-2">🗳️ 最終投票</h1>
            <p className="text-gray-300">投出「最實用禮物」的一票，決定誰要接受懲罰！</p>
          </div>

          {message && (
            <div className="mb-6 p-4 rounded-lg bg-green-900 bg-opacity-50 border border-green-500">
              <p className="text-green-300 font-bold">{message}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-900 bg-opacity-50 border border-red-500">
              <p className="text-red-300 font-bold">❌ {error}</p>
            </div>
          )}

          {!isSuccess && (
            <div className="space-y-6">
              <div>
                <label htmlFor="voterCode" className="block text-sm font-bold text-gray-300 mb-2">
                  🎫 您的序號 *
                </label>
                <input
                  type="text"
                  id="voterCode"
                  value={voterCode}
                  onChange={(e) => setVoterCode(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                  placeholder="請輸入您的號碼牌號碼"
                />
                <p className="text-xs text-gray-500 mt-1">用於確認您的投票資格，每人只能投一次</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  🎁 選擇最實用的禮物 *
                </label>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {gifts.map((gift) => (
                    <div
                      key={gift.code}
                      onClick={() => setSelectedGift(gift.giftName)}
                      className={`p-3 rounded-lg border cursor-pointer transition ${
                        selectedGift === gift.giftName
                          ? 'border-yellow-500 bg-yellow-900 bg-opacity-30'
                          : 'border-gray-600 bg-gray-700 hover:bg-gray-650'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{gift.giftName}</span>
                        {gift.isRevealed && (
                          <span className="text-xs bg-blue-600 px-2 py-1 rounded text-white">
                            已揭露
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {gifts.length === 0 && (
                  <p className="text-gray-500 text-center py-4">目前沒有可投票的禮物</p>
                )}
              </div>

              <div className="bg-red-900 bg-opacity-30 border border-red-500 rounded-lg p-4">
                <h4 className="font-bold text-red-300 mb-2">⚠️ 投票規則</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• 序號僅用來控制投票資格，每個序號只能投一票</li>
                  <li>• 遊戲過程中禮物會被交換，序號和禮物已無關聯</li>
                  <li>• 得票最高的禮物將決定最終懲罰的接受者</li>
                  <li>• 請謹慎投票，決定權在您手中！</li>
                </ul>
              </div>

              <button
                onClick={handleVote}
                disabled={isVoting || !voterCode.trim() || !selectedGift}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg transition disabled:cursor-not-allowed text-lg"
              >
                {isVoting ? '🗳️ 投票中...' : '🎯 確認投票'}
              </button>
            </div>
          )}

          {isSuccess && (
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">✅</div>
              <p className="text-lg text-green-300 mb-4">
                您的投票已經成功提交！<br />
                得票最高的禮物持有者將接受最終懲罰。
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/results"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
                >
                  📊 查看結果
                </Link>
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
