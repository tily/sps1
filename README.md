# memo

## midi

* http://www.g200kg.com/jp/docs/tech/midi.html
* http://ja.wikipedia.org/wiki/MIDI

## tmp

* decodeAudioData で取得できる AudioBuffer は全データを取得できない？
  * なんか自分が持ってる mp3 の一部で全データを取得できないっぽかった、他はだいたい全データ取得できる
* 440Hz っていうのは 1 周期のうち、どの部分なのか？

## 20150209mic

* [Web API Interfaces | MDN](https://developer.mozilla.org/en-US/docs/Web/API)
  * mozilla の html5 っぽいクラスの目次
* [Web Audio APIでAudioビジュアリゼーションをしてみよう@Homage to Rez - ハードコイルド・ワンダーランド](http://weathercook.hatenadiary.jp/entry/20111207/1323242737)
  * 早送り/フィルター
* [Capturing Audio & Video in HTML5 - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/getusermedia/intro/)
  * getUserMedia に modernizr を使う例がある
* [Web Audio APIについて（１）「音楽を取得して出力する」 - ハードコイルド・ワンダーランド](http://weathercook.hatenadiary.jp/entry/20111121/1321892542)
* [thomasboyt/web-audio-recording-demo](https://github.com/thomasboyt/web-audio-recording-demo)
* [https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/webrtc-integration.html](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/webrtc-integration.html)
* 録音せずリアルタイムに波形表示
  * http://www.g200kg.com/jp/docs/webaudio/analyser.html AnalyzerNode とかいうやつがあるっぽいけど解析用というよりはビジュアライザーアプリ用らしい
* buffer size 4096 で 440Hz の山谷が 40 個ぐらい描画される
* context.sampleRate
* getUserMedia でコールバックが呼ばれない
  * ローカルの HTML で動かしてるからだった、http://localhost から配信したらうまくいった

## 20150209sin

* [AudioContext.createJavaScriptNode - Web API Interfaces | MDN](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext.createJavaScriptNode)
  * [AudioContext.createScriptProcessor() - Web API Interfaces | MDN](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext.createScriptProcessor)
* [AudioContext.createScriptProcessor() - Web API Interfaces | MDN](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext.createScriptProcessor)
  * サンプルがノイズを入れるやつ？
* イヤホンで聴くとノイズみたいのが入っている -【TODO】-
  * 単にデータ書き出しがバグってただけだった 7e1c3da062e75e80c86b5c5b8809c7c4525aa0f3
* ほんとにプロットこれであってる？【TODO】
* plotter の解像度が低い
  * css だけでなく canvas.width, canvas.height に window.innerWidth, window.innerHeight を設定したらうまくいった
    * http://hitode909.appspot.com/js/wav.js 

## TODO

* canvas に手書きで書いた画像を 440Hz の音として再生できるようにする
* 矩形波
* analyzer のいろいろな機能を使ってみる
* マルチブラウザ対応
* 音の録音、できればストレージへ保存
* dB (デシベル) 表示
* soundcloud みたいなマーカーで再生
* 静的な wav (あらかじめ色々な音) を用意しておいて鳴らす
  * キーボードと Web MIDI API に対応
  * 波形表示
  * 適当に身近な音を用意
* pixel synthesizer
* hitode909 さんのやつみたいに何らかのセンサーを sin 波とかに変換するやつ
* midi でピアノを弾くやつ
* ループシーケンサーを作りたい
  * 何小節かの選択
  * 録音モード
  * 再生モード
* wav の音の再生
  * 押している間なる
  * 押すと one shot
  * とか 
* サンプラーの UI を作りたい
  * 録音(敷居値設定)、波形表示、波形編集(ここからここまでトリム)
  * ピーク設定 or 手動で start/stop
  * 掲示板
  * YouTube から秒数を指定してオーディオを抜き、サンプラーにセットできるようにしたい
* mp3/wav 等をアップロードして波形表示
  * 波形だけでなく周波数特性とかも表示
* jpeg のアルゴリズムで波形つくるやつを音にしたい
* sin 波のサンプルの一部をランダムに変更してみる
* エレキギターの音を録音してみたい
* amen break を使った何か
  * それぞれのパートに分けてビート検出して鳴らす
* 声紋認識
  * 声紋認識でログイン、侵入者はものまねの練習
* 電話のピポパっていうやつ
* Raymond Scott
* スタートレックの船の中で流れてる機材の音
* やじを集めて再生できるようにしたい
  * やめろ
  * 帰れ
* 音を綺麗に終わらせる方法
* サウンドプログラミング入門の全サンプルプログラムを Web Audio API で再現
* onset detection tutorial の全サンプルプログラムをWeb Audio API で再現
* ビート検出して自動でサイドチェーンコンプレッサーをかける
* テキストエディタとか日記とかと組み合わせたい
* 物語と組み合わせたい
* プロット上のマーカーをドラッグして再生させたい
* 炭坑節
* Web Audio API の仕様、ぜんぶ読みたい
