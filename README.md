# 祕寶大作戰往期回顧

一個優雅的時間軸式展示頁面，用於展示遊戲活動「祕寶大作戰」的歷史獎勵記錄。

## 功能特色

- ✨ **雙欄時間軸布局** - 左右分佈的卡片式設計，視覺效果優美
- 🔍 **即時搜尋過濾** - 支援關鍵字快速篩選（例如：神像 / 寶石 / 4階）
- 📱 **響應式設計** - 自適應各種螢幕尺寸，移動端友好
- 🎨 **精緻 UI** - 採用柔和漸層背景與毛玻璃效果
- 💎 **純前端實現** - 無需後端服務，使用 JSON 作為數據源

## 專案結構

```
src/
  ├── index.html      # 主頁面結構
  ├── script.js       # 核心邏輯與數據渲染
  ├── styles.css      # 樣式定義
  └── data.json       # 獎勵數據（190 筆記錄）
```

## 快速開始

### 1. 本機伺服器啟動

由於使用 `fetch` API 讀取 JSON 檔案，需透過 HTTP 伺服器開啟：

**方式一：使用 VSCode Live Server**

- 安裝 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 擴充功能
- 右鍵點擊 [src/index.html](src/index.html) → 選擇「Open with Live Server」

**方式二：使用 Python**

```bash
cd src
python -m http.server 8000
# 或 Python 2
python -m SimpleHTTPServer 8000
```

然後開啟瀏覽器訪問 `http://localhost:8000`

**方式三：使用 Node.js**

```bash
npx serve src
```

### 2. 編輯數據

修改 [src/data.json](src/data.json) 來新增或調整獎勵內容：

```json
{
    "phase": 1,
    "label": "自選奇蹟古遺物・山",
    "title": "自選奇蹟古遺物・山",
    "description": "打開後可自選獲得 1 個 山之國奇蹟古遺物",
    "iconEmoji": "🧰",
    "side": "left"
}
```

#### 欄位說明

- **phase**: 期數（數字）
- **label**: 標籤文字
- **title**: 獎勵標題
- **description**: 獎勵詳細說明
- **iconEmoji**: 表情符號圖示（如不需要可改用 `iconUrl`）
- **iconUrl**: 圖片 URL（選填，優先於 `iconEmoji`）
- **side**: 卡片位置（`"left"` 或 `"right"`）

## 核心技術

- **HTML5** - 語義化標記
- **CSS3** - Grid 布局、Flexbox、漸層效果、毛玻璃特效
- **JavaScript (Vanilla)** - 原生 JS 實現，無框架依賴
    - Fetch API 讀取數據
    - 動態 DOM 操作
    - 即時搜尋過濾
    - XSS 防護（escapeHtml 函式）

## 設計亮點

### 視覺設計

- 柔和的漸層背景（黃綠色調）
- 毛玻璃效果的頂部導覽列
- 雙色徽章系統（期數 / 標籤）
- 左右交錯的時間軸呈現

### 用戶體驗

- 即時搜尋無需按下 Enter
- 搜尋欄位提供清晰的提示範例
- 響應式布局在移動端自動切換為單欄
- 載入失敗時顯示友善的錯誤提示

## 瀏覽器支援

支援所有現代瀏覽器：

- Chrome / Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)

需要支援的功能：

- CSS Grid
- Flexbox
- Fetch API
- ES6+ (箭頭函式、解構賦值等)

## 授權

本專案為個人展示用途。

## 作者

製作於 2025年

---

**提示**: 如直接以 `file://` 協議開啟會因 CORS 限制無法載入 JSON，請務必使用本機伺服器！
"# ss-prize" 
