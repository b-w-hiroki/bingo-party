# ビンゴパーティ プラットフォーム仕様書

## 概要

**ビンゴパーティ（BINGO PARTY）** は、さまざまなシーンに合わせたビンゴゲームを展開するためのプラットフォームです。ユーザーの日常的な行動（散歩、飲み歩き、旅行など）をゲーム化し、体験をより楽しくすることを目的としています。

---

## 1. ディレクトリ構成

```
AITEST/
├── bingo-platform/          # プラットフォーム（本体）
│   ├── index.html           # トップページ（ポータル）
│   ├── styles.css           # プラットフォーム用CSS
│   ├── manifest.json        # PWAマニフェスト
│   ├── icon-192.png         # アプリアイコン 192x192
│   ├── icon-512.png         # アプリアイコン 512x512
│   ├── PLATFORM_SPEC.md     # 本仕様書
│   └── assets/              # 共通アセット（将来）
│       ├── shared.css       # 共通コンポーネントCSS
│       └── shared.js        # 共通ユーティリティJS
│
├── osanpo bingo/            # お散歩ビンゴ（公開中）
│   ├── index.html
│   ├── styles.css
│   └── ...
│
├── nomisuke bingo/          # 呑み助ビンゴ（公開中）
│   ├── index.html
│   ├── styles.css
│   └── ...
│
├── tabi-bingo/              # 旅ビンゴ（予定）
├── gourmet-bingo/           # グルメビンゴ（予定）
└── cafe-bingo/              # カフェビンゴ（予定）
```

### 将来的なディレクトリ構成（統合版）

サブディレクトリ構成に移行する場合：

```
bingo-party/
├── index.html               # ポータルページ
├── styles.css
├── manifest.json
├── assets/
│   ├── shared.css           # 共通CSS
│   ├── shared.js            # 共通JS
│   └── icons/
├── games/
│   ├── osanpo/              # お散歩ビンゴ
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── game.js
│   ├── nomisuke/            # 呑み助ビンゴ
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── game.js
│   ├── tabi/                # 旅ビンゴ
│   ├── gourmet/             # グルメビンゴ
│   └── cafe/                # カフェビンゴ
└── docs/
    └── PLATFORM_SPEC.md
```

---

## 2. 共通コンポーネント設計

### 2.1 共通CSS変数

各ビンゴゲームで統一するCSS変数を定義します。

```css
/* shared.css */
:root {
    /* Platform Brand */
    --platform-primary: #5B6ABF;
    --platform-primary-light: #7B88CF;
    --platform-primary-dark: #4A5AA0;
    --platform-accent: #FFB347;

    /* Typography */
    --font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans",
                   "Noto Sans JP", sans-serif;

    /* Common Spacing */
    --space-unit: 8px;

    /* Safe Area */
    --safe-top: env(safe-area-inset-top, 0px);
    --safe-bottom: env(safe-area-inset-bottom, 0px);
}
```

### 2.2 共通UIコンポーネント

将来的に共通化を検討するコンポーネント：

| コンポーネント | 説明 | 優先度 |
|---|---|---|
| ヘッダー | 「ビンゴパーティに戻る」リンク付き | 高 |
| ビンゴカード | 3x3 / 4x4 / 5x5 対応のグリッド | 高 |
| セル | タップ可能なビンゴセル | 高 |
| シェアボタン | SNS/合言葉共有 | 中 |
| 達成エフェクト | ビンゴ達成時のアニメーション | 中 |
| 設定モーダル | テーマ設定、サウンド等 | 低 |
| 統計ダッシュボード | 達成率、プレイ履歴 | 低 |

### 2.3 ゲーム固有の変数

各ゲームでオーバーライドする変数：

```css
/* 例: お散歩ビンゴ */
:root {
    --game-primary: #7eb89a;
    --game-primary-light: #a8d4bc;
    --game-primary-dark: #5a9a7a;
    --game-emoji: "🚶";
    --game-name: "お散歩ビンゴ";
}
```

---

## 3. 新しいビンゴの追加手順

### Step 1: 企画・テーマ設定

1. テーマを決定する（例: 旅行、グルメ、カフェ）
2. テーマカラーを選定する
3. ビンゴのお題リストを作成する（最低25個）
4. ターゲットユーザーとプレイシーンを定義する

### Step 2: ディレクトリ作成

```bash
mkdir games/[game-name]
```

### Step 3: テンプレートファイルの複製

既存のビンゴゲーム（お散歩ビンゴを推奨）をテンプレートとして複製し、以下を変更：

1. **テーマカラー** - CSS変数を新テーマカラーに変更
2. **お題データ** - ゲーム固有のお題リストに差し替え
3. **テキスト** - ゲーム名、説明文、UIテキスト
4. **アイコン** - テーマに合わせたemoji/アイコン

### Step 4: プラットフォームへの登録

1. `bingo-platform/index.html` のゲーム一覧セクションにカードを追加
2. フッターのゲームリンクを更新
3. ステータスバッジを「公開中」に変更

### Step 5: テスト・公開

1. モバイル表示の確認
2. ビンゴロジックの動作確認
3. 合言葉共有機能の確認
4. プラットフォームからのリンク確認

### ゲーム追加チェックリスト

```
[ ] テーマカラー決定
[ ] お題リスト作成（25個以上）
[ ] ディレクトリ作成
[ ] HTML/CSS/JS 実装
[ ] テーマカラーのCSS変数設定
[ ] レスポンシブ確認（モバイル / タブレット / PC）
[ ] ビンゴロジック動作確認
[ ] プラットフォームのindex.htmlにカード追加
[ ] フッターリンク追加
[ ] manifest.json の更新（必要に応じて）
[ ] 本番環境デプロイ
```

---

## 4. ブランドガイドライン

### 4.1 プラットフォームカラー

| 名前 | カラーコード | 用途 |
|---|---|---|
| Primary | `#5B6ABF` | メインブランドカラー |
| Primary Light | `#7B88CF` | ホバー、サブ要素 |
| Primary Dark | `#4A5AA0` | アクティブ状態、強調 |
| Accent | `#FFB347` | CTA、注目要素 |
| Background | `#FAFBFE` | ページ背景 |
| Surface | `#FFFFFF` | カード、コンテンツ領域 |
| Text | `#2C2E3A` | 本文テキスト |
| Text Secondary | `#6B6E82` | 補足テキスト |

### 4.2 ゲーム別テーマカラー

| ゲーム名 | テーマカラー | イメージ |
|---|---|---|
| お散歩ビンゴ | `#7eb89a` ミントグリーン | 自然、爽やかさ |
| 呑み助ビンゴ | `#d4a574` 琥珀色 | 温かみ、居酒屋 |
| 旅ビンゴ | `#6BB5E0` スカイブルー | 空、旅立ち |
| グルメビンゴ | `#E07B6B` コーラルレッド | 食欲、情熱 |
| カフェビンゴ | `#8B6B4A` コーヒーブラウン | 落ち着き、香り |

### 4.3 タイポグラフィ

- **フォントファミリー**: システムフォントスタック
  ```
  -apple-system, BlinkMacSystemFont, "Hiragino Sans",
  "Hiragino Kaku Gothic ProN", "Noto Sans JP",
  "Yu Gothic", "Meiryo", sans-serif
  ```
- **見出し**: font-weight: 800
- **本文**: font-weight: 400, line-height: 1.7
- **ボタン**: font-weight: 700

### 4.4 ロゴ

- ブランド名: **BINGO PARTY** / **ビンゴパーティ**
- アイコン: 🎯（ターゲットemoji）
- ロゴ表記は英語を基本とし、日本語名を併記

### 4.5 デザイン原則

1. **モバイルファースト** - スマホでの体験を最優先
2. **アクセシブル** - コントラスト比、フォントサイズに配慮
3. **パフォーマンス** - 外部ライブラリ最小限、軽量
4. **統一と個性** - プラットフォームの統一感 + 各ゲームの個性
5. **遊び心** - プロフェッショナルだが堅すぎない

---

## 5. URL設計案

### 現在（ローカル開発時）

```
AITEST/
├── bingo-platform/index.html   → プラットフォームトップ
├── osanpo bingo/index.html     → お散歩ビンゴ
└── nomisuke bingo/index.html   → 呑み助ビンゴ
```

### 本番環境（予定）

```
https://bingo-party.example.com/                → プラットフォームトップ
https://bingo-party.example.com/osanpo/         → お散歩ビンゴ
https://bingo-party.example.com/nomisuke/       → 呑み助ビンゴ
https://bingo-party.example.com/tabi/           → 旅ビンゴ
https://bingo-party.example.com/gourmet/        → グルメビンゴ
https://bingo-party.example.com/cafe/           → カフェビンゴ
```

### API（将来構想）

```
/api/v1/games                → ゲーム一覧
/api/v1/games/:id            → ゲーム詳細
/api/v1/games/:id/card       → ビンゴカード生成
/api/v1/rooms                → ルーム作成（合言葉共有）
/api/v1/rooms/:code          → ルーム参加
```

---

## 6. 技術仕様

### 6.1 フロントエンド

- **HTML5 + CSS3 + Vanilla JavaScript**
- 外部CDN依存なし（完全自己完結）
- PWA対応（manifest.json, Service Worker）
- レスポンシブデザイン（モバイルファースト）
- CSS Custom Properties によるテーマ管理

### 6.2 データ管理

- **現在**: localStorage によるクライアントサイド保存
- **将来**: 
  - Firebase / Supabase 等のBaaS導入検討
  - 合言葉によるルーム共有機能
  - ユーザーアカウント（オプション）

### 6.3 ホスティング

- **現在**: ローカル / 静的ホスティング
- **将来候補**:
  - GitHub Pages（無料、静的サイト向け）
  - Cloudflare Pages（高速CDN）
  - Vercel / Netlify（サーバーレス機能対応）

### 6.4 ブラウザ対応

- Chrome / Edge: 最新2バージョン
- Safari: 最新2バージョン（iOS含む）
- Firefox: 最新2バージョン
- Samsung Internet: 最新バージョン

---

## 7. ロードマップ

### Phase 1: 基盤構築（現在）
- [x] プラットフォームページ作成
- [x] お散歩ビンゴ公開
- [x] 呑み助ビンゴ公開
- [ ] プラットフォームからの各ゲームリンク設定
- [ ] アイコン作成・PWA設定完了

### Phase 2: コンテンツ拡充（2026 Q2）
- [ ] 旅ビンゴ制作・公開
- [ ] グルメビンゴ制作・公開
- [ ] カフェビンゴ制作・公開
- [ ] 共通コンポーネントの抽出・共通化

### Phase 3: 機能強化（2026 Q3）
- [ ] 合言葉によるルーム共有機能
- [ ] ビンゴ達成の統計・履歴機能
- [ ] Service Worker によるオフライン対応
- [ ] SNSシェア機能の強化

### Phase 4: 成長（2026 Q4〜）
- [ ] ユーザーアカウント機能（オプション）
- [ ] コラボビンゴの仕組み構築
- [ ] 企業タイアップ用管理画面
- [ ] ビンゴ作成ツール（ユーザー生成コンテンツ）
- [ ] ランキング・リーダーボード

---

## 8. ゲーム共通仕様

### 8.1 ビンゴカード

| 項目 | 仕様 |
|---|---|
| グリッドサイズ | 3x3（デフォルト）、4x4、5x5 から選択可能 |
| 中央セル | FREE（自動達成） |
| お題選出 | お題プールからランダム選出 |
| 判定方法 | ユーザー自己申告（タップ） |

### 8.2 ビンゴ判定

- 縦・横・斜めの1ライン完成でビンゴ
- 複数ライン達成可能
- 全マス達成で「パーフェクト」

### 8.3 データ保存

```javascript
// localStorage キー設計
{
    "bingo-party-[game-id]-card": {
        "grid": [...],
        "completed": [...],
        "createdAt": "ISO8601",
        "seed": "合言葉文字列"
    },
    "bingo-party-[game-id]-stats": {
        "totalGames": 0,
        "totalBingos": 0,
        "perfectCount": 0
    }
}
```

---

## 更新履歴

| 日付 | 内容 |
|---|---|
| 2026-02-12 | 初版作成 |
