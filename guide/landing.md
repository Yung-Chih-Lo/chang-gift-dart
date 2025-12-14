<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>聖誕廢物輪盤：最終規則</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700;900&display=swap');
        body {
            font-family: 'Noto Sans TC', sans-serif;
            background-color: #1a1a1a;
            color: #e5e5e5;
        }
        .bullseye-gradient {
            background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
        }
        .glass-panel {
            background: rgba(40, 40, 40, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .highlight-text {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
    </style>
</head>
<body class="min-h-screen pb-12">

    <!-- Header -->
    <header class="bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white p-6 shadow-lg border-b-4 border-yellow-500 sticky top-0 z-50">
        <div class="max-w-3xl mx-auto flex justify-between items-center">
            <div>
                <h1 class="text-2xl md:text-3xl font-black uppercase tracking-wider highlight-text">
                    <i class="fa-solid fa-bullseye text-yellow-400 mr-2"></i>聖誕廢物輪盤
                </h1>
                <p class="text-xs md:text-sm text-red-200 mt-1 font-bold">最終規則 (修正版)</p>
            </div>
            <div class="hidden md:block text-right">
                <span class="text-xs bg-black bg-opacity-30 px-2 py-1 rounded border border-yellow-500/30">行動即命運</span>
            </div>
        </div>
    </header>

    <main class="max-w-3xl mx-auto p-4 space-y-6">

        <!-- Quick Calc Utility -->
        <section class="glass-panel p-4 rounded-xl shadow-lg border-l-4 border-blue-500">
            <h3 class="font-bold text-blue-400 mb-2 flex items-center">
                <i class="fa-solid fa-calculator mr-2"></i> 快速設定
            </h3>
            <div class="flex gap-4 items-end">
                <div class="flex-1">
                    <label class="text-xs text-gray-400 block mb-1">參與人數</label>
                    <input type="number" id="playerCount" value="10" class="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white focus:outline-none focus:border-blue-500 transition">
                </div>
                <div class="flex-1">
                    <label class="text-xs text-gray-400 block mb-1">建議回合數</label>
                    <div id="roundResult" class="text-xl font-bold text-yellow-400">4 輪</div>
                </div>
            </div>
            <p class="text-xs text-gray-500 mt-2">*計算公式：人數 × 40% (最少 3 輪)</p>
        </section>

        <!-- Section 1: Prep -->
        <section class="space-y-4">
            <div class="flex items-center space-x-2 mb-2">
                <span class="bg-yellow-500 text-black font-bold px-2 py-0.5 rounded text-sm">STEP 1</span>
                <h2 class="text-xl font-bold text-white">準備與目標</h2>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="glass-panel p-4 rounded-lg flex items-start space-x-3">
                    <div class="bg-gray-700 p-2 rounded-full shrink-0"><i class="fa-solid fa-gift text-pink-400"></i></div>
                    <div>
                        <h4 class="font-bold text-pink-400">廢物禮物</h4>
                        <p class="text-sm text-gray-300">每人準備一份已包裝的「廢物」，初始隨機分配，<span class="text-white font-bold underline decoration-red-500">不可拆開</span>。</p>
                    </div>
                </div>
                <div class="glass-panel p-4 rounded-lg flex items-start space-x-3">
                    <div class="bg-gray-700 p-2 rounded-full shrink-0"><i class="fa-solid fa-beer-mug-empty text-yellow-400"></i></div>
                    <div>
                        <h4 class="font-bold text-yellow-400">懲罰準備</h4>
                        <p class="text-sm text-gray-300">準備足夠的啤酒或指定飲品，專治「射空/掉鏢」者。</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 2: Action Table -->
        <section class="space-y-4">
            <div class="flex items-center space-x-2 mb-2">
                <span class="bg-red-600 text-white font-bold px-2 py-0.5 rounded text-sm">CORE</span>
                <h2 class="text-xl font-bold text-white">核心行動表</h2>
            </div>

            <div class="overflow-hidden rounded-xl border border-gray-700 shadow-2xl">
                <!-- Bullseye -->
                <div class="bullseye-gradient p-5 text-white relative overflow-hidden group">
                    <div class="absolute -right-4 -top-4 text-9xl text-white opacity-10 rotate-12"><i class="fa-solid fa-crosshairs"></i></div>
                    <div class="flex justify-between items-center mb-2 relative z-10">
                        <span class="text-2xl font-black">紅心 (Bullseye)</span>
                        <span class="bg-white text-red-900 text-xs font-bold px-2 py-1 rounded uppercase">最高權限</span>
                    </div>
                    <div class="relative z-10">
                        <p class="font-bold mb-2 text-lg">🎯 命運決定者 (二選一)</p>
                        <ul class="list-disc list-inside space-y-1 text-sm bg-black bg-opacity-20 p-3 rounded-lg">
                            <li><strong class="text-yellow-300">指定偷竊：</strong>搶奪任意一位持有者的禮物並交換。</li>
                            <li><strong class="text-yellow-300">雙人互換：</strong>指定除自己外的兩位參與者 (A 和 B) 交換禮物。</li>
                        </ul>
                    </div>
                </div>

                <!-- 51+ -->
                <div class="bg-gray-800 p-4 border-b border-gray-700 hover:bg-gray-750 transition">
                    <div class="flex items-center justify-between mb-1">
                        <span class="text-lg font-bold text-green-400">51 分以上</span>
                        <span class="text-xs text-gray-500">情報戰</span>
                    </div>
                    <p class="text-white font-medium">🧠 <span class="text-green-300">偷看情報</span></p>
                    <p class="text-sm text-gray-400 mt-1">單獨偷看任意一人禮物內容，<span class="text-red-400">不得洩露</span>。</p>
                </div>

                <!-- 30-50 -->
                <div class="bg-gray-800 p-4 border-b border-gray-700 hover:bg-gray-750 transition">
                    <div class="flex items-center justify-between mb-1">
                        <span class="text-lg font-bold text-blue-400">30 - 50 分</span>
                        <span class="text-xs text-gray-500">改變機會</span>
                    </div>
                    <p class="text-white font-medium">🤝 <span class="text-blue-300">自主交換</span></p>
                    <p class="text-sm text-gray-400 mt-1">可選擇與任一位參與者交換手中的禮物。</p>
                </div>

                <!-- 1-29 -->
                <div class="bg-gray-800 p-4 border-b border-gray-700 hover:bg-gray-750 transition opacity-75">
                    <div class="flex items-center justify-between mb-1">
                        <span class="text-lg font-bold text-gray-400">1 - 29 分</span>
                        <span class="text-xs text-gray-500">平安</span>
                    </div>
                    <p class="text-white font-medium">🚫 <span class="text-gray-300">無事發生</span></p>
                    <p class="text-sm text-gray-400 mt-1">沒有任何行動，禮物維持不變。</p>
                </div>

                <!-- Miss -->
                <div class="bg-yellow-900 bg-opacity-40 p-4 border-l-4 border-yellow-500">
                    <div class="flex items-center justify-between mb-1">
                        <span class="text-lg font-bold text-yellow-500">射空 / 掉鏢</span>
                        <span class="text-xs text-yellow-500 uppercase font-bold">Punishment</span>
                    </div>
                    <p class="text-white font-bold text-lg">🍺 懲罰啤酒</p>
                    <p class="text-sm text-gray-300 mt-1">必須立刻喝下一口啤酒。</p>
                </div>
            </div>
        </section>

        <!-- Section 3: Flow -->
        <section class="space-y-4 pb-8">
            <div class="flex items-center space-x-2 mb-2">
                <span class="bg-purple-600 text-white font-bold px-2 py-0.5 rounded text-sm">FINAL</span>
                <h2 class="text-xl font-bold text-white">流程與高潮</h2>
            </div>

            <div class="glass-panel rounded-xl p-5 space-y-4 text-sm md:text-base">
                <div class="flex items-start">
                    <span class="font-bold text-purple-400 w-24 shrink-0">1. 距離規定</span>
                    <div class="text-gray-300">
                        <div><i class="fa-solid fa-person text-blue-400 w-5"></i> 男生：正常標準線 (237cm)</div>
                        <div><i class="fa-solid fa-person-dress text-pink-400 w-5"></i> 女生：可前進一格 (約30cm)</div>
                    </div>
                </div>
                
                <div class="border-t border-gray-700 my-2"></div>

                <div class="flex items-start">
                    <span class="font-bold text-purple-400 w-24 shrink-0">2. 執行順序</span>
                    <div class="text-gray-300">輪流射一支鏢 ⮕ 查表執行行動 (喝懲罰) ⮕ 下一位。</div>
                </div>

                <div class="border-t border-gray-700 my-2"></div>

                <div class="flex items-start">
                    <span class="font-bold text-purple-400 w-24 shrink-0">3. 最終結算</span>
                    <div class="text-gray-300">
                        <p class="mb-2">回合結束後，手上禮物即為最終所得。</p>
                        <div class="bg-red-900 bg-opacity-50 border border-red-500 rounded p-3 text-red-100">
                            <strong class="block mb-1"><i class="fa-solid fa-camera mr-1"></i> 廢物互動 (高潮)</strong>
                            所有人當場拆封，並依禮物性質進行 <span class="text-yellow-300 font-bold">至少 30 秒公開互動</span>。<br>
                            <span class="text-xs opacity-75">(例：喝完水、淋頭、穿戴醜物拍照)</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer class="text-center text-gray-600 text-xs mt-8">
            聖誕廢物輪盤 - 祝好運 (並沒有)
        </footer>

    </main>

    <script>
        // Simple Round Calculator
        const input = document.getElementById('playerCount');
        const output = document.getElementById('roundResult');

        function calculateRounds() {
            const count = parseInt(input.value) || 0;
            let rounds = Math.floor(count * 0.4);
            if (rounds < 3) rounds = 3;
            output.innerText = rounds + " 輪";
        }

        input.addEventListener('input', calculateRounds);
        // Initial run
        calculateRounds();
    </script>
</body>
</html>