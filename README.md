# ビンゴパーティ

日常の場面から遊べるビンゴを選ぶ、静的 HTML / CSS / JavaScript の入口サイトです。

## 公開先と作品

- サイト: https://b-w-hiroki.github.io/bingo-party/
- お散歩ビンゴ: https://b-w-hiroki.github.io/osanpo-bingo/
- 呑み助ビンゴ: https://b-w-hiroki.github.io/nomisuke-bingo/

入口にある 5 テーマのうち、現在リンク先のある作品は 2 件です。残る 3 件は準備中の表示で、まだ遊べません。配信先が開くことと、各作品の通信・保存機能が正常なことは別に確認します。

## ローカル起動

ビルドやパッケージのインストールは不要です。Service Worker を確認する場合は HTTP サーバーを使います。

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

http://127.0.0.1:8000/ を開いてください。

## 検証

Node.js 22 で、ネットワーク接続や追加依存なしに実行できます。

```sh
node --test tests/*.cjs
```

公開済み作品へのリンク、準備中カード、モバイルメニューの開閉・Escape・フォーカス循環・幅変更、PWA キャッシュ契約を検証します。PR と `main` への push で同じ回帰を実行し、手動実行もできます。Pages の成功だけで回帰成功と判断しないでください。

## 画面確認の範囲

過去の画面確認は [MOBILE_MENU_QA.md](MOBILE_MENU_QA.md)、設計は [DESIGN_REVIEW.md](DESIGN_REVIEW.md) と [PLATFORM_SPEC.md](PLATFORM_SPEC.md) を参照してください。

次の確認は別途必要です。

- 短い画面でメニューを開き、リンク選択・戻る操作・繰り返し開閉をする。
- オフラインや画像読み込み失敗時も作品選択と説明が読めるか確認する。
- iOS / Safari の実端末でスクロールとフォーカスを確認する。

Node の回帰成功は、これらの実ブラウザ・実端末確認が済んだことを意味しません。
