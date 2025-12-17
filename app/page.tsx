import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white p-6 shadow-lg border-b-4 border-yellow-500 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wider">
              🎯 聖誕廢物輪盤
            </h1>
            <p className="text-xs md:text-sm text-red-200 mt-1 font-bold">December 17, 2025 @ CK LAB</p>
          </div>
          <div className="text-right">
            <span className="text-xs bg-black bg-opacity-30 px-2 py-1 rounded border border-yellow-500/30">行動即命運</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-8">

        {/* Hero Section */}
        <section className="text-center py-12">
          <h2 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
            廢物交換 x 飛鏢競賽
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            結合惡趣味與刺激的聖誕交換禮物遊戲
          </p>
          <div className="bg-red-900 bg-opacity-50 border border-red-500 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-lg font-bold text-yellow-400 mb-2">🎁 遊戲金額：無限制，越廢越好笑！</p>
            <p className="text-sm text-gray-300">可以拿已經有的，也可以去買垃圾，但請包裝好且不可拆開</p>
          </div>
        </section>

        {/* Game Flow */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-center text-yellow-400">🎮 遊戲流程</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500">
              <div className="text-3xl mb-4">📝</div>
              <h4 className="text-xl font-bold mb-2 text-blue-400">1. 準備階段</h4>
              <p className="text-gray-300">每人準備一份包裝好的「廢物」禮物，遊戲開始前隨機分配</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-green-500">
              <div className="text-3xl mb-4">🎯</div>
              <h4 className="text-xl font-bold mb-2 text-green-400">2. 飛鏢競賽</h4>
              <p className="text-gray-300">輪流投擲飛鏢，根據得分執行不同行動，進行 2 輪遊戲</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-purple-500">
              <div className="text-3xl mb-4">🏆</div>
              <h4 className="text-xl font-bold mb-2 text-purple-400">3. 最終決賽</h4>
              <p className="text-gray-300">拆開禮物並進行互動，投票選出「最實用禮物」接受懲罰</p>
            </div>
          </div>
        </section>

        {/* Action Table */}
        <section className="space-y-4">
          <h3 className="text-2xl font-bold text-center text-red-400">🎯 核心行動表</h3>

          <div className="overflow-hidden rounded-xl border border-gray-700 shadow-2xl">
            {/* Bullseye */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 p-6 text-white">
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl font-black">紅心 (Bullseye)</span>
                <span className="bg-white text-red-900 text-xs font-bold px-3 py-1 rounded uppercase">最高權限</span>
              </div>
              <p className="font-bold mb-3 text-lg">命運決定者 (三選一)</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong className="text-yellow-300">指定偷竊：</strong>搶奪任意一位持有者的禮物並交換</li>
                <li><strong className="text-yellow-300">雙人互換：</strong>指定除自己外的兩位參與者 (A 和 B) 交換禮物</li>
                <li><strong className="text-yellow-300">偷看情報：</strong>單獨偷看任意一人禮物內容，<span className="text-green-400">不得洩露</span></li>
              </ul>
            </div>

            {/* 30+ */}
            <div className="bg-gray-800 p-4 border-b border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-blue-400">30 分以上</span>
                <span className="text-xs text-gray-500">改變機會</span>
              </div>
              <p className="text-white font-medium mb-2">二選一：</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-300 ml-2">
                <li><strong className="text-green-300">偷看情報：</strong>單獨偷看任意一人禮物內容，<span className="text-red-400">不得洩露</span></li>
                <li><strong className="text-blue-300">自主交換：</strong>選擇與任一位參與者交換手中的禮物</li>
              </ul>
            </div>

            {/* 10-29 */}
            <div className="bg-gray-800 p-4 border-b border-gray-700 opacity-75">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-gray-400">10 - 29 分</span>
                <span className="text-xs text-gray-500">平安</span>
              </div>
              <p className="text-white font-medium">🚫 <span className="text-gray-300">無事發生</span></p>
              <p className="text-sm text-gray-400 mt-1">沒有任何行動，禮物維持不變，可以說一句話暗示自己的禮物內容 or 誤導</p>
            </div>

            {/* 1-10 or Miss */}
            <div className="bg-yellow-900 bg-opacity-40 p-4 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-yellow-500">1 - 10 分 or 射空 / 掉鏢</span>
                <span className="text-xs text-yellow-500 uppercase font-bold">處罰</span>
              </div>
              <p className="text-white font-bold text-lg">🍺 懲罰</p>
              <p className="text-sm text-gray-300 mt-1">射鏢者需要抽一張「真心話大冒險」卡片並執行，如果題目不想做，則喝下一口啤酒作為替代懲罰</p>
            </div>
          </div>
        </section>

        {/* Distance Rules */}
        <section className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-center text-yellow-400 mb-4">📏 距離規定</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="bg-blue-900 bg-opacity-50 p-4 rounded">
              <div className="text-2xl mb-2">👨</div>
              <p className="font-bold text-blue-300">男生</p>
              <p className="text-sm text-gray-300">正常標準線 (237cm)</p>
            </div>
            <div className="bg-pink-900 bg-opacity-50 p-4 rounded">
              <div className="text-2xl mb-2">👩</div>
              <p className="font-bold text-pink-300">女生</p>
              <p className="text-sm text-gray-300">可前進一格 (約30cm)</p>
            </div>
          </div>
        </section>

        {/* Game Phases */}
        <section className="space-y-8">
          {/* Phase 1: Preparation */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 text-white font-bold px-3 py-1 rounded-full text-sm">階段一</div>
              <h3 className="text-xl font-bold text-blue-400">準備階段</h3>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500">
              <p className="text-gray-300 mb-4">所有參與者先登記自己的禮物，遊戲才能開始</p>
              <div className="flex justify-center">
                <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition text-lg">
                  📝 登記禮物
                </Link>
              </div>
            </div>
          </div>

          {/* Phase 2: Game Play */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 text-white font-bold px-3 py-1 rounded-full text-sm">階段二</div>
              <h3 className="text-xl font-bold text-green-400">遊戲進行</h3>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-green-500">
              <p className="text-gray-300 mb-4">飛鏢競賽中獲得懲罰時使用，或想收集情報時使用，遊戲一開始、一輪結束會揭露一個禮物。（視數量滾動調整）</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/truth-or-dare" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition text-center">
                  🎲 真心話大冒險
                </Link>
                <Link href="/reveal" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition text-center">
                  👀 隨機揭露
                </Link>
              </div>
            </div>
          </div>

          {/* Phase 3: Final Voting */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 text-white font-bold px-3 py-1 rounded-full text-sm">階段三</div>
              <h3 className="text-xl font-bold text-red-400">最終決賽</h3>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-red-500">
              <p className="text-gray-300 mb-4">遊戲結束後，所有人投票決定「最實用禮物」的優勝者，將獲得處罰。</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/vote" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition text-center">
                  🗳️ 投票
                </Link>
                <Link href="/results" className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition text-center">
                  📊 結果
                </Link>
              </div>
            </div>
          </div>

          {/* Phase 4: Performance */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600 text-white font-bold px-3 py-1 rounded-full text-sm">階段四</div>
              <h3 className="text-xl font-bold text-purple-400">揭曉禮物</h3>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-purple-500">
              <p className="text-gray-300 mb-4">依照序號小到大，拆開自己的禮物，和禮物主人合照。</p>
            </div>
          </div>
        </section>

        <footer className="text-center text-gray-600 text-sm mt-12 pb-8">
          聖誕廢物輪盤 - 祝各位好運 (並沒有)
        </footer>
      </main>
    </div>
  );
}
