# 🎯 聖誕廢物輪盤 Christmas Waste Roulette

一個結合廢物交換與飛鏢競賽的聖誕節趣味遊戲網站！🎄

## 🎮 遊戲介紹

**聖誕廢物輪盤**是一個充滿惡趣味和刺激感的聖誕交換禮物遊戲。玩家們準備「廢物」禮物，通過飛鏢競賽來決定禮物交換規則，最終投票選出「最實用禮物」的持有者接受懲罰。

### 🎯 遊戲特色

- 🎁 **廢物禮物交換**：每人準備一份包裝好的「廢物」，越廢越好笑！
- 🎯 **飛鏢競賽**：根據飛鏢得分決定不同的交換行動
- 🎲 **真心話大冒險**：射空掉鏢時抽取挑戰任務
- 👀 **情報收集**：隨機揭露其他玩家的禮物內容
- 🗳️ **最終投票**：選出「最實用禮物」的優勝者

## 📋 遊戲規則

### 準備階段
1. 每位參與者準備一份已包裝的「廢物」禮物
2. 遊戲開始前隨機分配禮物（不得拆開）
3. 準備啤酒作為懲罰飲品

### 飛鏢競賽
根據得分區間執行不同行動：

| 得分區間 | 行動 | 說明 |
|---------|-----|-----|
| 🎯 紅心 | **命運決定者 (三選一)** | 1. 指定偷竊 2. 雙人互換 3. 偷看情報 |
| 30 分以上 | **二選一** | 偷看情報 or 自主交換 |
| 10-29 分 | **無事發生** | 可暗示禮物內容 |
| 1-10 分 or 射空 | **懲罰** | 抽真心話大冒險卡片 |

### 最終決賽
- 遊戲結束後所有人拆開禮物
- 投票選出「最實用禮物」的持有者
- 得票最高者接受最終懲罰

## 🚀 功能特色

### 🎴 真心話大冒險系統
- **動畫抽卡**：題目快速閃過的視覺效果
- **豐富題目**：67 真心話 + 41 大冒險題目
- **即時顯示**：動畫結束後以卡片形式展示結果

### 🎁 禮物管理系統
- **身份驗證**：預先安排序號，防止作弊
- **隨機揭露**：每次揭露都會標記為已揭露
- **情報收集**：幫助玩家做出交換策略

### 🗳️ 投票系統
- **公平投票**：每個序號只能投一票
- **即時結果**：每秒自動更新投票結果
- **頒獎台**：前三名以階梯式 podium 展示

## 🛠️ 技術棧

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PocketBase 0.23
- **Deployment**: Vercel

## 📁 專案結構

```
├── app/
│   ├── api/              # API 路由
│   │   ├── register/     # 禮物登記 API
│   │   ├── reveal/       # 隨機揭露 API
│   │   ├── vote/         # 投票 API
│   │   ├── results/      # 結果 API
│   │   └── pb_client.js  # PocketBase 客戶端
│   ├── page.tsx          # 首頁
│   ├── register/         # 禮物登記頁面
│   ├── truth-or-dare/    # 真心話大冒險頁面
│   ├── reveal/           # 隨機揭露頁面
│   ├── vote/             # 投票頁面
│   ├── results/          # 結果頁面
│   └── globals.css       # 全域樣式
├── public/
│   └── truth-questions.json  # 題目資料
├── guide/               # 遊戲規則說明
│   ├── game.md          # 詳細遊戲規則
│   ├── api_endpoint.md  # API 說明
│   └── db_schema.md     # 資料庫結構
├── .example.env.local   # 環境變數範例
└── README.md            # 專案說明
```

## 🔧 安裝與設定

### 環境需求
- Node.js 18+
- npm/yarn/pnpm

### 1. 安裝依賴
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 2. 設定 PocketBase 0.23
1. 下載並安裝 PocketBase 0.23
2. 啟動 PocketBase 服務
3. 在 PocketBase 管理介面中建立以下 collections：

#### Collection: `participants` (身份驗證與禮物登記)
| 欄位名稱 | 類型 | 設定 | 說明 |
|---------|-----|-----|-----|
| `code` | Text | Unique | 參與者輸入的序號 (號碼牌號碼) |
| `is_revealed` | Boolean | 預設 false | 是否已揭露該禮物 |
| `initial_gift_name` | Text | - | 此序號持有者一開始帶來的禮物名稱 |

#### Collection: `votes` (投票紀錄)
| 欄位名稱 | 類型 | 設定 | 說明 |
|---------|-----|-----|-----|
| `voter_code` | Text | Unique | 投票者的序號 ID |
| `voted_gift_name` | Text | - | 被投的禮物名稱 |

> **注意**: `participants` collection 中的序號是預先由管理員建立的，每個序號對應一位參與者。`votes` collection 的 `voter_code` 欄位設定為 Unique，可防止重複投票。

### 3. 環境變數
參考 `.example.env.local` 檔案，建立 `.env.local` 檔案：
```env
POCKETBASE_URL=https://your-pocketbase-instance.pockethost.io
POCKETBASE_TOKEN=your_pocketbase_token
NODE_ENV=production
```

> **PocketBase 設定**: 確保 PocketBase 服務運行在指定 URL，並且 token 有足夠的權限存取上述 collections。

### 4. 啟動開發伺服器
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

開啟 [http://localhost:3000](http://localhost:3000) 查看網站。

## 🎯 使用指南

### 遊戲流程
1. **準備階段**：所有玩家到 `/register` 輸入序號登記禮物
2. **遊戲進行**：
   - 飛鏢競賽根據得分決定行動
   - 獲得懲罰時使用 `/truth-or-dare` 抽卡
   - 需要情報時使用 `/reveal` 隨機揭露禮物
3. **最終決賽**：
   - 使用 `/vote` 投票選出最實用禮物
   - 到 `/results` 查看即時投票結果

### 管理員操作
1. 預先在 PocketBase 建立參與者記錄（只有 `code` 欄位）
2. 將序號分配給玩家
3. 監控遊戲進程和投票結果

## 📚 API 說明

### POST /api/register
登記禮物
```json
{
  "code": "P001",
  "giftName": "破舊的拖鞋"
}
```

### POST /api/reveal
隨機揭露禮物（無需參數）

### POST /api/vote
提交投票
```json
{
  "voterCode": "P001",
  "targetGiftName": "破舊的拖鞋"
}
```

### GET /api/results
獲取投票結果

## 🎨 設計特色

- **響應式設計**：支援桌面和手機裝置
- **動畫效果**：抽卡動畫、即時更新、懸停效果
- **遊戲化體驗**：頒獎台、卡片動畫、聲音提示
- **即時更新**：投票結果每秒自動更新

## 💾 資料庫結構

詳細的資料庫結構說明請參考 [`guide/db_schema.md`](guide/db_schema.md)，包含：

- `participants` collection：參與者身份驗證與禮物登記
- `votes` collection：投票記錄管理

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request！

1. Fork 此專案
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權條款

此專案僅供娛樂和學習用途。

## 🙏 致謝

感謝所有參與測試和提供建議的朋友們！🎉

---

**祝各位在聖誕廢物輪盤中玩得開心！** 🎄🎁

