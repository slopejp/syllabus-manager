// --- データ構造と初期化 ---
const STORAGE_KEY = 'syllabus_manager_v1';
let state = { inprogress: [], wishlist: [], completed: [] };

// --- masterSubjects: 事前登録科目リスト ---
const masterSubjects = [
  {id:'s1', name:'アカデミックリテラシー', code:'INT-1-A1-1030-001', teacher:'若山 正人', url:'https://syllabus.zen.ac.jp/subjects/2025/INT-1-A1-1030-001', category:'導入科目', group:'導入科目' ,subcategory:'導入', credit: 2},
  {id:'s2', name:'現代社会と数学', code:'INT-1-A1-1030-002', teacher:'若山 正人, 瀬下 大輔', url:'https://syllabus.zen.ac.jp/subjects/2025/INT-1-A1-1030-002', category:'導入科目', group:'導入科目' ,subcategory:'導入', credit: 2},
  {id:'s3', name:'ITリテラシー', code:'INT-1-A1-1030-003', teacher:'吉村 総一郎', url:'https://syllabus.zen.ac.jp/subjects/2025/INT-1-A1-1030-003', category:'導入科目', group:'導入科目' ,subcategory:'導入', credit: 2},
  {id:'s4', name:'デジタルツールの使い方', code:'INT-1-A1-0204-004', teacher:'櫻田 英樹, 津野 貴大', url:'https://syllabus.zen.ac.jp/subjects/2025/INT-1-A1-0204-004', category:'導入科目', group:'導入科目' ,subcategory:'導入', credit: 2},
  {id:'s5', name:'人工知能活用実践', code:'INT-1-A2-1234-005', teacher:'ガーバー 明菜, 瀬下 大輔', url:'https://syllabus.zen.ac.jp/subjects/2025/INT-1-A2-1234-005', category:'導入科目', group:'導入科目' ,subcategory:'導入', credit: 2},
  {id:'s6', name:'人文社会入門', code:'INT-1-A1-1030-006', teacher:'谷口 祐人, Hernández Hernández Álvaro David, 細井 浩一, 千葉 尚志, 積山 薫, 竹内 薫, 大塚 淳, 山口 真由, Pradhan Gouranga Charan, 山内 康英, 大塚 英志', url:'https://syllabus.zen.ac.jp/subjects/2025/INT-1-A1-1030-006', category:'導入科目', group:'導入科目' ,subcategory:'導入', credit: 2},
  {id:'s7', name:'経済入門', code:'INT-1-A1-0204-007', teacher:'渡邉 聡', url:'https://syllabus.zen.ac.jp/subjects/2025/INT-1-A1-0204-007', category:'導入科目', group:'導入科目' ,subcategory:'導入', credit: 2},
  {id:'s8', name:'情報セキュリティ概論', code:'BSC-1-B1-1030-001', teacher:'岡田 雅之, 津野 貴大', url:'https://syllabus.zen.ac.jp/subjects/2025/BSC-1-B1-1030-001', category:'基礎科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s9', name:'情報倫理と法', code:'BSC-1-B1-0204-002', teacher:'木野 泰伸', url:'https://syllabus.zen.ac.jp/subjects/2025/BSC-1-B1-0204-002', category:'基礎科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s10', name:'データサイエンス概論', code:'BSC-1-B1-0204-003', teacher:'瀬下 大輔', url:'https://syllabus.zen.ac.jp/subjects/2025/BSC-1-B1-0204-003', category:'基礎科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s11', name:'数学的思考とは何か', code:'MATH10BSC-1-B1-0204-004', teacher:'西郷 甲矢人', url:'https://syllabus.zen.ac.jp/subjects/2025/BSC-1-B1-0204-004', category:'基礎科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s12', name:'数学史', code:'BSC-1-B1-1030-005', teacher:'加藤 文元', url:'https://syllabus.zen.ac.jp/subjects/2025/BSC-1-B1-1030-005', category:'基礎科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s13', name:'現代社会とサイエンス', code:'BSC-1-B1-0204-006', teacher:'竹内 薫', url:'https://syllabus.zen.ac.jp/subjects/2025/BSC-1-B1-0204-006', category:'基礎科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s14', name:'日本文学Ⅰ', code:'BSC-1-B1-1030-007', teacher:'Pradhan Gouranga Charan', url:'https://syllabus.zen.ac.jp/subjects/2025/BSC-1-B1-1030-007', category:'基礎科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s15', name:'文化人類学Ⅰ', code:'BSC-1-B1-1030-008', teacher:'Hernández Álvaro David', url:'https://syllabus.zen.ac.jp/subjects/2025/BSC-1-B1-1030-008', category:'基礎科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s16', name:'心理学', code:'BSC-1-B1-0204-009', teacher:'積山 薫', url:'https://syllabus.zen.ac.jp/subjects/2025/BSC-1-B1-0204-009', category:'基礎科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s17', name:'社会学Ⅰ', code:'BSC-1-B1-1030-010', teacher:'谷口 祐人', url:'https://syllabus.zen.ac.jp/subjects/2025/BSC-1-B1-1030-010', category:'基礎科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s18', name:'法学Ⅰ', code:'BSC-1-B1-0204-011', teacher:'山口 真由', url:'https://syllabus.zen.ac.jp/subjects/2025/BSC-1-B1-0204-011', category:'基礎科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s19', name:'伝わる論理とコミュニケーション', code:'BSC-1-B1-1030-012', teacher:'千葉 尚志', url:'https://syllabus.zen.ac.jp/subjects/2025/BSC-1-B1-1030-012', category:'基礎科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s20', name:'企業経営', code:'BSC-1-B1-0204-013', teacher:'上山 信一', url:'https://syllabus.zen.ac.jp/subjects/2025/BSC-1-B1-0204-013', category:'基礎科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 2},
  {id:'s21', name:'地域アントレプレナーシップ', code:'BSC-1-B1-0204-014', teacher:'上山 信一', url:'https://syllabus.zen.ac.jp/subjects/2025/BSC-1-B1-0204-014', category:'基礎科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 2},
  {id:'s22', name:'地域課題の解決とイノベーション', code:'HIS101', teacher:'上山 信一,瀬下 翔太', url:'https://syllabus.zen.ac.jp/subjects/2025/BSC-1-B1-0204-015', category:'基礎科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 2},
  {id:'s23', name:'多言語ITコミュニケーション', code:'BSC-1-A2-1234-016', teacher:'田岡 恵,吉村 総一郎,Hernández Álvaro David,大野 元己,竹内 薫', url:'https://syllabus.zen.ac.jp/subjects/2025/BSC-1-A2-1234-016', category:'基礎科目', group:'多言語情報理解科目' ,subcategory:'多言語情報理解必修', credit: 2},
  {id:'s24', name:'ビジュアルプログラミング', code:'INF-1-C1-1030-001', teacher:'ガーバー 明菜', url:'https://syllabus.zen.ac.jp/subjects/2025/INF-1-C1-1030-001', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s25', name:'Webアプリケーション開発1', code:'INF-1-C1-1030-002', teacher:'折原 ダビデ竜', url:'https://syllabus.zen.ac.jp/subjects/2025/INF-1-C1-1030-002', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s26', name:'Webアプリケーション開発2', code:'INF-1-C1-0204-003', teacher:'折原 ダビデ竜', url:'https://syllabus.zen.ac.jp/subjects/2025/INF-1-C1-0204-003', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s27', name:'Pythonプログラミング', code:'INF-1-C1-0204-004', teacher:'ガーバー 明菜', url:'https://syllabus.zen.ac.jp/subjects/2025/INF-1-C1-0204-004', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s28', name:'Webユーザーエクスペリエンス', code:'INF-1-C1-0204-005', teacher:'折原 レオナルド賢', url:'https://syllabus.zen.ac.jp/subjects/2025/INF-1-C1-0204-005', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s29', name:'メディアアート史', code:'INF-1-C1-0204-006', teacher:'江渡 浩一郎', url:'https://syllabus.zen.ac.jp/subjects/2025/INF-1-C1-0204-006', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s30', name:'統計学入門', code:'INF-1-C1-1030-007', teacher:'川本 宗孝', url:'https://syllabus.zen.ac.jp/subjects/2025/INF-1-C1-1030-007', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s31', name:'ディープラーニング1', code:'INF-1-C1-1030-008', teacher:'河野 慎', url:'https://syllabus.zen.ac.jp/subjects/2025/INF-1-C1-1030-008', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s32', name:'インターネット概論', code:'INF-2-C1-1030-001', teacher:'岡田 雅之', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C1-1030-001', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s33', name:'プロジェクトマネジメント概論', code:'INF-2-C1-1030-002', teacher:'木野 泰伸', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C1-1030-002', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s34', name:'Webアプリケーション開発3', code:'INF-2-C1-1030-003', teacher:'折原 ダビデ竜', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C1-1030-003', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s35', name:'Linux概論', code:'INF-2-C1-1030-004', teacher:'津野 貴大', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C1-1030-004', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s36', name:'オブジェクト指向プログラミング', code:'INF-2-C1-1030-005', teacher:'吉村 総一郎', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C1-1030-005', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s37', name:'コンピューターサイエンス概論', code:'INF-2-C1-1030-006', teacher:'順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C1-1030-006', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s38', name:'JavaScriptによる自動化、効率化', code:'INF-2-C1-0204-007', teacher:'折原 ダビデ竜', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C1-0204-007', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s39', name:'情報処理概論', code:'INF-2-C1-0204-008', teacher:'折原 ダビデ竜', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C1-0204-008', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s40', name:'コンピュータ概論', code:'INF-2-C1-0204-009', teacher:'木野 泰伸', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C1-0204-009', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s41', name:'Webアプリケーション開発4', code:'INF-2-C1-0204-010', teacher:'折原 ダビデ竜', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C1-0204-010', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s42', name:'機械学習概論', code:'INF-2-C1-1030-011', teacher:'御手洗 拓真', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C1-1030-011', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s43', name:'計算機実験で学ぶ確率とモンテカルロ法', code:'INF-2-C1-1030-012', teacher:'伊庭 幸人', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C1-1030-012', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s44', name:'ディープラーニング2', code:'INF-2-C1-1030-013', teacher:'河野 慎', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C1-1030-013', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s45', name:'ビッグデータ分析概論', code:'INF-2-C1-1030-014', teacher:'塚本 圭一郎', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C1-1030-014', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s46', name:'R言語プログラミング', code:'INF-2-C1-0204-015', teacher:'川本 宗孝', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C1-0204-015', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s47', name:'クラウドコンピューティング技術', code:'INF-3-C1-1030-001', teacher:'津野 貴大', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C1-1030-001', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s48', name:'関数型プログラミング', code:'INF-3-C1-1030-002', teacher:'吉村 総一郎', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C1-1030-002', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s49', name:'オートマトンと形式言語理論', code:'INF-3-C1-1030-003', teacher:'佐藤 弘崇', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C1-1030-003', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s50', name:'暗号技術とその応用', code:'INF-3-C1-1030-004', teacher:'順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C1-1030-004', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s51', name:'データベース運用実践', code:'INF-3-C1-0204-005', teacher:'折原 ダビデ竜', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C1-0204-005', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s52', name:'並行処理プログラミング', code:'INF-3-C1-0204-006', teacher:'吉村 総一郎', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C1-0204-006', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s53', name:'画像処理論', code:'INF-3-C1-0204-007', teacher:'櫻井 快勢', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C1-0204-007', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s54', name:'論理回路概論', code:'INF-3-C1-0204-008', teacher:'佐藤 弘崇', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C1-0204-008', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s55', name:'データサイエンス実践Ⅰ（アンケート）', code:'INF-3-C1-1030-009', teacher:'赤倉 貴子', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C1-1030-009', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s56', name:'データサイエンス実践Ⅱ（モデリング）', code:'INF-3-C1-1030-010', teacher:'田沼 巌', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C1-1030-010', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s57', name:'データサイエンス実践Ⅲ（時系列）', code:'INF-3-C1-0204-011', teacher:'田沼 巌', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C1-0204-011', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s58', name:'ディープラーニング3', code:'INF-3-C1-1030-012', teacher:'河野 慎', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C1-1030-012', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s59', name:'ビッグデータ分析実践', code:'INF-3-C1-1030-013', teacher:'塚本 圭一郎', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C1-1030-013', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s60', name:'数学の方法', code:'MTH-1-C1-0204-001', teacher:'瀬下 大輔', url:'https://syllabus.zen.ac.jp/subjects/2025/MTH-1-C1-0204-001', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s61', name:'逆さ科学史', code:'MTH-1-C1-0204-002', teacher:'竹内 薫', url:'https://syllabus.zen.ac.jp/subjects/2025/MTH-1-C1-0204-002', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s62', name:'初等代数概論', code:'MTH-1-C1-1030-003', teacher:'加藤 文元', url:'https://syllabus.zen.ac.jp/subjects/2025/MTH-1-C1-1030-003', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s63', name:'線形代数1', code:'MTH-1-C1-1030-004', teacher:'梅崎 直也', url:'https://syllabus.zen.ac.jp/subjects/2025/MTH-1-C1-1030-004', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s64', name:'解析学1', code:'MTH-1-C1-0204-005', teacher:'梅崎 直也', url:'https://syllabus.zen.ac.jp/subjects/2025/MTH-1-C1-0204-005', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s65', name:'線形代数2', code:'MTH-1-C1-1030-006', teacher:'梅崎 直也', url:'https://syllabus.zen.ac.jp/subjects/2025/MTH-1-C1-1030-006', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s66', name:'解析学2', code:'MTH-1-C1-0204-007', teacher:'梅崎 直也', url:'https://syllabus.zen.ac.jp/subjects/2025/MTH-1-C1-0204-007', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s67', name:'グラフ理論', code:'MTH-1-C1-0204-008', teacher:'辻 順平', url:'https://syllabus.zen.ac.jp/subjects/2025/MTH-1-C1-0204-008', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s68', name:'数理構造の発見と活用', code:'MTH-2-C1-0204-001', teacher:'西郷 甲矢人', url:'https://syllabus.zen.ac.jp/subjects/2026/MTH-2-C1-0204-001', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s69', name:'集合と論理', code:'MTH-2-C1-1030-002', teacher:'梅崎 直也', url:'https://syllabus.zen.ac.jp/subjects/2026/MTH-2-C1-1030-002', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s70', name:'記号論理', code:'MTH-2-C1-0204-003', teacher:'湯山 孝雄', url:'https://syllabus.zen.ac.jp/subjects/2026/MTH-2-C1-0204-003', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s71', name:'解析学3', code:'MTH-2-C1-1030-004', teacher:'梅崎 直也', url:'https://syllabus.zen.ac.jp/subjects/2026/MTH-2-C1-1030-004', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s72', name:'距離空間', code:'MTH-2-C1-1030-005', teacher:'梅崎 直也', url:'https://syllabus.zen.ac.jp/subjects/2026/MTH-2-C1-1030-005', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s73', name:'複素解析', code:'MTH-2-C1-1030-006', teacher:'梅崎 直也', url:'https://syllabus.zen.ac.jp/subjects/2026/MTH-2-C1-1030-006', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s74', name:'日常に現れる物理学', code:'MTH-2-C1-0204-007', teacher:'作道 直幸', url:'https://syllabus.zen.ac.jp/subjects/2026/MTH-2-C1-0204-007', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s75', name:'力学', code:'MTH-2-C1-1030-008', teacher:'作道 直幸', url:'https://syllabus.zen.ac.jp/subjects/2026/MTH-2-C1-1030-008', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s76', name:'群論', code:'MTH-3-C1-1030-001', teacher:'順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2027/MTH-3-C1-1030-001', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s77', name:'位相空間', code:'MTH-3-C1-0204-002', teacher:'湯山 孝雄', url:'https://syllabus.zen.ac.jp/subjects/2027/MTH-3-C1-0204-002', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s78', name:'多様体', code:'MTH-3-C1-0204-003', teacher:'梅崎 直也', url:'https://syllabus.zen.ac.jp/subjects/2027/MTH-3-C1-0204-003', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s79', name:'圏論', code:'MTH-3-C1-1030-004', teacher:'梅崎 直也', url:'https://syllabus.zen.ac.jp/subjects/2027/MTH-3-C1-1030-004', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s80', name:'数理統計', code:'MTH-3-C1-0204-005', teacher:'梅崎 直也', url:'https://syllabus.zen.ac.jp/subjects/2027/MTH-3-C1-0204-005', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s81', name:'電磁気学', code:'MTH-3-C1-1030-006', teacher:'作道 直幸', url:'https://syllabus.zen.ac.jp/subjects/2027/MTH-3-C1-1030-006', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s82', name:'量子力学', code:'MTH-3-C1-0204-007', teacher:'池田 達彦', url:'https://syllabus.zen.ac.jp/subjects/2027/MTH-3-C1-0204-007', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s83', name:'熱統計力学', code:'MTH-3-C1-0204-008', teacher:'池田 達彦', url:'https://syllabus.zen.ac.jp/subjects/2027/MTH-3-C1-0204-008', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s84', name:'機械翻訳実践（英語読解・作文）', code:'LAN-1-B1-1030-001', teacher:'中久喜 匠太郎,田岡 恵', url:'https://syllabus.zen.ac.jp/subjects/2025/LAN-1-B1-1030-001', category:'展開科目', group:'多言語情報理解科目' ,subcategory:'多言語情報理解', credit: 2},
  {id:'s85', name:'機械翻訳実践（法学）', code:'LAN-2-B2-1200-001', teacher:'山口 真由', url:'https://syllabus.zen.ac.jp/subjects/2026/LAN-2-B2-1200-001', category:'展開科目', group:'多言語情報理解科目' ,subcategory:'多言語情報理解', credit: 2},
  {id:'s86', name:'機械翻訳実践（情報）', code:'LAN-2-B2-1200-002', teacher:'ガーバー 明菜', url:'https://syllabus.zen.ac.jp/subjects/2026/LAN-2-B2-1200-002', category:'展開科目', group:'多言語情報理解科目' ,subcategory:'多言語情報理解', credit: 2},
  {id:'s87', name:'機械翻訳実践（異文化理解）', code:'LAN-2-B2-0034-003', teacher:'田岡 恵', url:'https://syllabus.zen.ac.jp/subjects/2026/LAN-2-B2-0034-003', category:'展開科目', group:'多言語情報理解科目' ,subcategory:'多言語情報理解', credit: 2},
  {id:'s88', name:'機械翻訳実践（自然科学）', code:'LAN-2-B2-0034-004', teacher:'竹内 薫', url:'https://syllabus.zen.ac.jp/subjects/2026/LAN-2-B2-0034-004', category:'展開科目', group:'多言語情報理解科目' ,subcategory:'多言語情報理解', credit: 2},
  {id:'s89', name:'機械翻訳実践（日本研究）', code:'LAN-2-B2-0034-005', teacher:'Pradhan Gouranga Charan', url:'https://syllabus.zen.ac.jp/subjects/2026/LAN-2-B2-0034-005', category:'展開科目', group:'多言語情報理解科目' ,subcategory:'多言語情報理解', credit: 2},
  {id:'s90', name:'世界が変わる編集力', code:'HUM-1-C1-1030-001', teacher:'安藤 昭子', url:'https://syllabus.zen.ac.jp/subjects/2025/HUM-1-C1-1030-001', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s91', name:'リテラシーと応⽤のための物語理論', code:'HUM-1-C1-1030-002', teacher:'大塚 英志', url:'https://syllabus.zen.ac.jp/subjects/2025/HUM-1-C1-1030-002', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s92', name:'哲学概論', code:'HUM-1-C1-0204-003', teacher:'出口 康夫,順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2025/HUM-1-C1-0204-003', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s93', name:'公共哲学', code:'HUM-1-C1-0204-004', teacher:'鈴木 寛', url:'https://syllabus.zen.ac.jp/subjects/2025/HUM-1-C1-0204-004', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s94', name:'マンガ絵コンテから学ぶ視覚表現', code:'HUM-1-C1-0204-005', teacher:'浅野 龍哉', url:'https://syllabus.zen.ac.jp/subjects/2025/HUM-1-C1-0204-005', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s95', name:'近・現代アート概論', code:'HUM-1-C1-0204-006', teacher:'岩渕 潤子', url:'https://syllabus.zen.ac.jp/subjects/2025/HUM-1-C1-0204-006', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s96', name:'認知神経科学', code:'HUM-2-C1-1030-001', teacher:'積山 薫', url:'https://syllabus.zen.ac.jp/subjects/2026/HUM-2-C1-1030-001', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s97', name:'科学哲学', code:'HUM-2-C1-1030-002', teacher:'大塚 淳', url:'https://syllabus.zen.ac.jp/subjects/2026/HUM-2-C1-1030-002', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s98', name:'人新世の人類学', code:'HUM-2-C1-1030-003', teacher:'竹村 眞一', url:'https://syllabus.zen.ac.jp/subjects/2026/HUM-2-C1-1030-003', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s99', name:'日本文学Ⅱ', code:'HUM-2-C1-0204-004', teacher:'Pradhan Gouranga Charan', url:'https://syllabus.zen.ac.jp/subjects/2026/HUM-2-C1-0204-004', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s100', name:'文化人類学Ⅱ', code:'HUM-2-C1-0204-005', teacher:'Hernández Álvaro David', url:'https://syllabus.zen.ac.jp/subjects/2026/HUM-2-C1-0204-005', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s101', name:'民俗学', code:'HUM-2-C1-0204-006', teacher:'順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2026/HUM-2-C1-0204-006', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s102', name:'日本科学史', code:'HUM-2-C1-0204-007', teacher:'順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2026/HUM-2-C1-0204-007', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s103', name:'芸術と文化資本Ⅰ', code:'HUM-2-C1-0204-008', teacher:'岩渕 潤子', url:'https://syllabus.zen.ac.jp/subjects/2026/HUM-2-C1-0204-008', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s104', name:'統計学を哲学する', code:'HUM-3-C1-1030-001', teacher:'大塚 淳', url:'https://syllabus.zen.ac.jp/subjects/2027/HUM-3-C1-1030-001', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s105', name:'日本大衆文化史', code:'HUM-3-C1-1030-002', teacher:'順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2027/HUM-3-C1-1030-002', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s106', name:'AI社会の歩き方', code:'SOC-1-C2-1200-001', teacher:'江間 有沙', url:'https://syllabus.zen.ac.jp/subjects/2025/SOC-1-C2-1200-001', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s107', name:'地域研究', code:'SOC-1-C1-0204-002', teacher:'大野 元己,Hernández Álvaro David,Pradhan Gouranga Charan', url:'https://syllabus.zen.ac.jp/subjects/2025/SOC-1-C1-0204-002', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s108', name:'意思決定の能力開発', code:'SOC-1-C1-0204-003', teacher:'印南 一路', url:'https://syllabus.zen.ac.jp/subjects/2025/SOC-1-C1-0204-003', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s109', name:'共創地球論', code:'SOC-1-C1-0204-004', teacher:'竹村 眞一', url:'https://syllabus.zen.ac.jp/subjects/2025/SOC-1-C1-0204-004', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s110', name:'情報社会の総合安全保障', code:'SOC-1-C1-0204-005', teacher:'山内 康英,髙見澤 將林', url:'https://syllabus.zen.ac.jp/subjects/2025/SOC-1-C1-0204-005', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s111', name:'ネット時代の著作権', code:'SOC-2-C2-1200-001', teacher:'順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2026/SOC-2-C2-1200-001', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s112', name:'ジェンダー論', code:'SOC-2-C1-1030-002', teacher:'順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2026/SOC-2-C1-1030-002', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s113', name:'メディア論', code:'SOC-2-C1-1030-003', teacher:'塚越 健司', url:'https://syllabus.zen.ac.jp/subjects/2026/SOC-2-C1-1030-003', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s114', name:'科学技術と社会', code:'SOC-2-C1-1030-004', teacher:'順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2026/SOC-2-C1-1030-004', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s115', name:'情報社会論', code:'SOC-2-C1-1030-005', teacher:'山内 康英', url:'https://syllabus.zen.ac.jp/subjects/2026/SOC-2-C1-1030-005', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s116', name:'戦後日本史1', code:'SOC-2-C1-1030-006', teacher:'山内 康英,山内 康英', url:'https://syllabus.zen.ac.jp/subjects/2026/SOC-2-C1-1030-006', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s117', name:'異文化理解', code:'SOC-2-C1-1030-007', teacher:'田岡 恵', url:'https://syllabus.zen.ac.jp/subjects/2026/SOC-2-C1-1030-007', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s118', name:'大学とメディアの人類史', code:'SOC-2-C1-1030-008', teacher:'吉見 俊哉', url:'https://syllabus.zen.ac.jp/subjects/2026/SOC-2-C1-1030-008', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s119', name:'社会学Ⅱ', code:'SOC-2-C1-0204-009', teacher:'谷口 祐人', url:'https://syllabus.zen.ac.jp/subjects/2026/SOC-2-C1-0204-009', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s120', name:'法学Ⅱ', code:'SOC-3-C1-1030-001', teacher:'山口 真由', url:'https://syllabus.zen.ac.jp/subjects/2027/SOC-3-C1-1030-001', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s121', name:'戦後日本史2', code:'SOC-3-C1-0204-002', teacher:'順次公開予定,山内 康英', url:'https://syllabus.zen.ac.jp/subjects/2027/SOC-3-C1-0204-002', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s122', name:'経済言説史', code:'ECON-1-C1-1030-001', teacher:'市橋 勝', url:'https://syllabus.zen.ac.jp/subjects/2025/ECON-1-C1-1030-001', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 2},
  {id:'s123', name:'マルクス経済学', code:'ECON-1-C1-0204-002', teacher:'斎藤 幸平', url:'https://syllabus.zen.ac.jp/subjects/2025/ECON-1-C1-0204-002', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 2},
  {id:'s124', name:'企業経営と会計', code:'ECON-1-C1-1030-003', teacher:'田岡 恵', url:'https://syllabus.zen.ac.jp/subjects/2025/ECON-1-C1-1030-003', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 2},
  {id:'s125', name:'マクロ経済学', code:'ECON-2-C1-1030-001', teacher:'市橋 勝', url:'https://syllabus.zen.ac.jp/subjects/2026/ECON-2-C1-1030-001', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 2},
  {id:'s126', name:'ミクロ経済学', code:'ECON-2-C1-0204-002', teacher:'渡邉 聡', url:'https://syllabus.zen.ac.jp/subjects/2026/ECON-2-C1-0204-002', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 2},
  {id:'s127', name:'企業経営とファイナンス', code:'ECON-2-C1-0204-003', teacher:'村藤 功', url:'https://syllabus.zen.ac.jp/subjects/2026/ECON-2-C1-0204-003', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 2},
  {id:'s128', name:'デジタル・マーケティング', code:'ECON-2-C1-0204-004', teacher:'千葉 尚志', url:'https://syllabus.zen.ac.jp/subjects/2026/ECON-2-C1-0204-004', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 2},
  {id:'s129', name:'スタートアップ', code:'ECON-2-C1-0204-005', teacher:'順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2026/ECON-2-C1-0204-005', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 2},
  {id:'s130', name:'農業とデジタルテクノロジー', code:'ECON-2-C1-0204-006', teacher:'橋本 剛', url:'https://syllabus.zen.ac.jp/subjects/2026/ECON-2-C1-0204-006', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 2},
  {id:'s131', name:'交渉・合意形成概論', code:'ECON-2-C1-0204-007', teacher:'印南 一路', url:'https://syllabus.zen.ac.jp/subjects/2026/ECON-2-C1-0204-007', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 2},
  {id:'s132', name:'IT産業史', code:'DIGI-1-B1-1030-001', teacher:'遠藤 諭', url:'https://syllabus.zen.ac.jp/subjects/2025/DIGI-1-B1-1030-001', category:'展開科目', group:'世界理解科目' ,subcategory:'デジタル産業選択必修', credit: 2},
  {id:'s133', name:'マンガ産業史', code:'DIGI-1-B1-1030-002', teacher:'佐渡島 庸平', url:'https://syllabus.zen.ac.jp/subjects/2025/DIGI-1-B1-1030-002', category:'展開科目', group:'世界理解科目' ,subcategory:'デジタル産業選択必修', credit: 2},
  {id:'s134', name:'アニメ産業史', code:'DIGI-1-B1-0204-003', teacher:'氷川 竜介', url:'https://syllabus.zen.ac.jp/subjects/2025/DIGI-1-B1-0204-003', category:'展開科目', group:'世界理解科目' ,subcategory:'デジタル産業選択必修', credit: 2},
  {id:'s135', name:'日本のゲーム産業史', code:'DIGI-1-B1-0204-004', teacher:'細井 浩一,平 信一', url:'https://syllabus.zen.ac.jp/subjects/2025/DIGI-1-B1-0204-004', category:'展開科目', group:'世界理解科目' ,subcategory:'デジタル産業選択必修', credit: 2},
  {id:'s136', name:'二次創作の歴史から見るネット文化', code:'DIGI-1-C2-0034-005', teacher:'伴 龍一郎', url:'https://syllabus.zen.ac.jp/subjects/2025/DIGI-1-C2-0034-005', category:'展開科目', group:'世界理解科目' ,subcategory:'デジタル産業', credit: 2},
  {id:'s137', name:'コンテンツ産業論', code:'DIGI-2-C1-1030-001', teacher:'細井 浩一', url:'https://syllabus.zen.ac.jp/subjects/2026/DIGI-2-C1-1030-001', category:'展開科目', group:'世界理解科目' ,subcategory:'デジタル産業', credit: 2},
  {id:'s138', name:'ゲーム制作論基礎', code:'DIGI-2-C1-1030-002', teacher:'細井 浩一,平 信一', url:'https://syllabus.zen.ac.jp/subjects/2026/DIGI-2-C1-1030-002', category:'展開科目', group:'世界理解科目' ,subcategory:'デジタル産業', credit: 2},
  {id:'s139', name:'ゲーム制作論応用', code:'DIGI-3-C1-1030-001', teacher:'細井 浩一,平 信一', url:'https://syllabus.zen.ac.jp/subjects/2027/DIGI-3-C1-1030-001', category:'展開科目', group:'世界理解科目' ,subcategory:'デジタル産業', credit: 2},
  {id:'s140', name:'キャリアデザインⅠ（自己理解）', code:'CAR-1-C1-0204-001', teacher:'藤澤 広美', url:'https://syllabus.zen.ac.jp/subjects/2025/CAR-1-C1-0204-001', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 2},
  {id:'s141', name:'英語コミュニケーションⅠ（発音）', code:'CAR-1-C1-1030-002', teacher:'横山 カズ', url:'https://syllabus.zen.ac.jp/subjects/2025/CAR-1-C1-1030-002', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 2},
  {id:'s142', name:'英語コミュニケーションⅡ（日常会話）', code:'CAR-1-C1-0204-003', teacher:'鈴木 栄', url:'https://syllabus.zen.ac.jp/subjects/2025/CAR-1-C1-0204-003', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 2},
  {id:'s143', name:'対人コミュニケーション論', code:'CAR-1-C1-0204-004', teacher:'吉田 尚記', url:'https://syllabus.zen.ac.jp/subjects/2025/CAR-1-C1-0204-004', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 2},
  {id:'s144', name:'クリエイティブ現場論', code:'CAR-1-C2-1200-005', teacher:'吉田 尚記', url:'https://syllabus.zen.ac.jp/subjects/2025/CAR-1-C2-1200-005', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 2},
  {id:'s145', name:'ソーシャルイノベーション概論', code:'CAR-1-C2-1200-006', teacher:'鈴木 寛', url:'https://syllabus.zen.ac.jp/subjects/2025/CAR-1-C2-1200-006', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 2},
  {id:'s146', name:'ネット情報発信概論', code:'CAR-1-C2-0034-007', teacher:'高橋 弘樹', url:'https://syllabus.zen.ac.jp/subjects/2025/CAR-1-C2-0034-007', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 2},
  {id:'s147', name:'デジタル画像技法論Ⅰ', code:'CAR-1-C1-1030-008', teacher:'ディープブリザード', url:'https://syllabus.zen.ac.jp/subjects/2025/CAR-1-C1-1030-008', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 1},
  {id:'s148', name:'デジタル画像技法論Ⅱ', code:'CAR-1-C1-1030-009', teacher:'下田 スケッチ', url:'https://syllabus.zen.ac.jp/subjects/2025/CAR-1-C1-1030-009', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 1},
  {id:'s149', name:'デジタル画像技法論Ⅲ', code:'CAR-1-C1-0204-010', teacher:'赤坂 アカ', url:'https://syllabus.zen.ac.jp/subjects/2025/CAR-1-C1-0204-010', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 1},
  {id:'s150', name:'キャリアデザインⅡ（仕事理解）', code:'CAR-2-C1-1030-001', teacher:'髙橋 南海子', url:'https://syllabus.zen.ac.jp/subjects/2026/CAR-2-C1-1030-001', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 2},
  {id:'s151', name:'キャリアデザインⅢ（就活実践）', code:'CAR-2-C1-0204-002', teacher:'髙橋 南海子', url:'https://syllabus.zen.ac.jp/subjects/2026/CAR-2-C1-0204-002', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 2},
  {id:'s152', name:'人生設計とお金の管理', code:'CAR-2-C1-0204-003', teacher:'田岡 恵', url:'https://syllabus.zen.ac.jp/subjects/2026/CAR-2-C1-0204-003', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 2},
  {id:'s153', name:'ネットワーク産業論', code:'CAR-2-C2-1200-004', teacher:'夏野 剛', url:'https://syllabus.zen.ac.jp/subjects/2026/CAR-2-C2-1200-004', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 2},
  {id:'s154', name:'デジタル画像創作論Ⅰ', code:'CAR-2-C1-1030-005', teacher:'有馬 トモユキ', url:'https://syllabus.zen.ac.jp/subjects/2026/CAR-2-C1-1030-005', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 1},
  {id:'s155', name:'デジタル画像創作論Ⅱ', code:'CAR-2-C1-0204-006', teacher:'順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2026/CAR-2-C1-0204-006', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 1},
  {id:'s156', name:'デジタル画像創作論Ⅲ', code:'CAR-2-C1-0204-007', teacher:'ディープブリザード', url:'https://syllabus.zen.ac.jp/subjects/2026/CAR-2-C1-0204-007', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 1},
  {id:'s157', name:'デジタル画像活用Ⅰ', code:'CAR-3-C1-1030-001', teacher:'下田 スケッチ', url:'https://syllabus.zen.ac.jp/subjects/2027/CAR-3-C1-1030-001', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 1},
  {id:'s158', name:'デジタル画像活用Ⅱ', code:'CAR-3-C1-0204-002', teacher:'大塚 勇', url:'https://syllabus.zen.ac.jp/subjects/2027/CAR-3-C1-0204-002', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 1},
  {id:'s159', name:'情報収集と伝達技術', code:'INF-1-C3-0034-009', teacher:'深津 貴之', url:'https://syllabus.zen.ac.jp/subjects/2025/INF-1-C3-0034-009', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s160', name:'3Dモデリング技術演習', code:'INF-2-C3-1200-016', teacher:'順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C3-1200-016', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s161', name:'ジェネラティブアート演習', code:'INF-2-C3-1200-017', teacher:'江渡 浩一郎', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C3-1200-017', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s162', name:'インターネットのしくみ', code:'INF-2-C3-0034-018', teacher:'岡田 雅之', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C3-0034-018', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s163', name:'Javaプログラミング演習', code:'INF-2-C3-0034-019', teacher:'吉村 総一郎', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C3-0034-019', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s164', name:'Webセキュリティ演習', code:'INF-2-C3-0034-020', teacher:'順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C3-0034-020', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s165', name:'デジタルイラスト演習基礎', code:'INF-2-C3-0034-021', teacher:'濵田 順教', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C3-0034-021', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s166', name:'AIアルゴリズム実践', code:'INF-2-C3-0034-022', teacher:'葛木 美紀', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C3-0034-022', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s167', name:'統計学展望', code:'INF-2-C3-1200-023', teacher:'伊庭 幸人', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C3-1200-023', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s168', name:'マーケティング × データサイエンス', code:'INF-2-C3-0034-024', teacher:'千葉 尚志', url:'https://syllabus.zen.ac.jp/subjects/2026/INF-2-C3-0034-024', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s169', name:'ゲームプログラミング演習', code:'INF-3-C3-1200-014', teacher:'荒川 巧也', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C3-1200-014', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s170', name:'チームプログラミング演習', code:'INF-3-C3-1200-015', teacher:'吉村 総一郎', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C3-1200-015', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s171', name:'プロジェクトマネジメント応用', code:'INF-3-C3-1200-016', teacher:'木野 泰伸', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C3-1200-016', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s172', name:'Webアプリケーション開発演習', code:'INF-3-C3-0034-017', teacher:'津野 貴大', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C3-0034-017', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s173', name:'動画クリエイター技術演習', code:'INF-3-C3-1200-018', teacher:'順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C3-1200-018', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s174', name:'Webデザイン演習', code:'INF-3-C3-1200-019', teacher:'小島 芳樹', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C3-1200-019', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s175', name:'デジタルイラスト演習発展', code:'INF-3-C3-1200-020', teacher:'濵田 順教', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C3-1200-020', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s176', name:'共創場デザイン演習', code:'INF-3-C3-0034-021', teacher:'江渡 浩一郎', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C3-0034-021', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s177', name:'統計数理の方法', code:'INF-3-C3-0034-022', teacher:'伊庭 幸人', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C3-0034-022', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s178', name:'自然言語処理の方法', code:'INF-3-C3-1200-023', teacher:'赤倉 貴子', url:'', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 2},
  {id:'s179', name:'ゼミ（インターネットのしくみ（応用））', code:'INF-3-C4-1234-024', teacher:'岡田 雅之', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C4-1234-024', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 4},
  {id:'s180', name:'ゼミ（質的データ分析&エージェントシミュレーション）', code:'INF-3-C4-1234-025', teacher:'木野 泰伸', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C4-1234-025', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 4},
  {id:'s181', name:'ゼミ（情報セキュリティ）', code:'INF-3-C4-1234-026', teacher:'順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C4-1234-026', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 4},
  {id:'s182', name:'ゼミ（AIデータサイエンス価値創造ゼミⅠ）', code:'INF-3-C4-1234-027', teacher:'河野 慎', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C4-1234-027', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 4},
  {id:'s183', name:'ゼミ（AIデータサイエンス価値創造ゼミⅡ）', code:'INF-3-C4-1234-028', teacher:'千葉 尚志', url:'https://syllabus.zen.ac.jp/subjects/2027/INF-3-C4-1234-028', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 4},
  {id:'s184', name:'ゼミ（メディアアート）', code:'INF-4-C4-1234-001', teacher:'江渡 浩一郎', url:'https://syllabus.zen.ac.jp/subjects/2028/INF-4-C4-1234-001', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'情報', credit: 4},
  {id:'s185', name:'数理科学発展演習Ⅰ', code:'MTH-1-C3-0034-009', teacher:'湯山 孝雄', url:'https://syllabus.zen.ac.jp/subjects/2025/MTH-1-C3-0034-009', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s186', name:'Inter-universal Teichmüller Theory 1（宇宙際タイヒミューラー理論 1）', code:'MTH-1-C3-0034-010', teacher:'Ivan Fesenko', url:'https://syllabus.zen.ac.jp/subjects/2025/MTH-1-C3-0034-010', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s187', name:'数理科学発展演習Ⅱ', code:'MTH-2-C3-1200-009', teacher:'湯山 孝雄', url:'https://syllabus.zen.ac.jp/subjects/2026/MTH-2-C3-1200-009', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s188', name:'Inter-universal Teichmüller Theory 2（宇宙際タイヒミューラー理論 2）', code:'MTH-2-C3-1200-010', teacher:'Ivan Fesenko', url:'https://syllabus.zen.ac.jp/subjects/2026/MTH-2-C3-1200-010', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s189', name:'Inter-universal Teichmüller Theory 3（宇宙際タイヒミューラー理論 3）', code:'MTH-2-C3-0034-011', teacher:'Ivan Fesenko', url:'https://syllabus.zen.ac.jp/subjects/2026/MTH-2-C3-0034-011', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s190', name:'環論', code:'MTH-3-C3-0034-009', teacher:'加藤 文元', url:'https://syllabus.zen.ac.jp/subjects/2027/MTH-3-C3-0034-009', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s191', name:'組合せ論', code:'MTH-3-C3-1200-010', teacher:'前野 俊昭', url:'https://syllabus.zen.ac.jp/subjects/2027/MTH-3-C3-1200-010', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s192', name:'トポロジー', code:'MTH-3-C3-0034-011', teacher:'前野 俊昭', url:'https://syllabus.zen.ac.jp/subjects/2027/MTH-3-C3-0034-011', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s193', name:'積分と測度', code:'MTH-3-C3-1200-012', teacher:'西郷 甲矢人', url:'https://syllabus.zen.ac.jp/subjects/2027/MTH-3-C3-1200-012', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s194', name:'Inter-universal Teichmüller Theory 4（宇宙際タイヒミューラー理論 4）', code:'MTH-3-C3-1200-013', teacher:'Ivan Fesenko', url:'https://syllabus.zen.ac.jp/subjects/2027/MTH-3-C3-1200-013', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s195', name:'量子コンピュータ演習', code:'MTH-3-C3-0034-014', teacher:'池田 達彦', url:'https://syllabus.zen.ac.jp/subjects/2027/MTH-3-C3-0034-014', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s196', name:'Wolfram言語で学ぶ科学計算', code:'MTH-3-C3-1200-015', teacher:'竹内 薫', url:'https://syllabus.zen.ac.jp/subjects/2027/MTH-3-C3-1200-015', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s197', name:'ガロア理論', code:'MTH-4-C3-1200-001', teacher:'加藤 文元', url:'https://syllabus.zen.ac.jp/subjects/2028/MTH-4-C3-1200-001', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s198', name:'数理論理学', code:'MTH-4-C3-1200-002', teacher:'湯山 孝雄', url:'https://syllabus.zen.ac.jp/subjects/2028/MTH-4-C3-1200-002', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s199', name:'量子からはじまる確率論', code:'MTH-4-C3-0034-003', teacher:'西郷 甲矢人', url:'https://syllabus.zen.ac.jp/subjects/2028/MTH-4-C3-0034-003', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 2},
  {id:'s200', name:'ゼミ（数理科学特論ゼミⅠ）', code:'MTH-4-C4-1234-004', teacher:'加藤 文元', url:'https://syllabus.zen.ac.jp/subjects/2028/MTH-4-C4-1234-004', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 4},
  {id:'s201', name:'ゼミ（数理科学特論ゼミⅡ）', code:'MTH-4-C4-1234-005', teacher:'西郷 甲矢人', url:'https://syllabus.zen.ac.jp/subjects/2028/MTH-4-C4-1234-005', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 4},
  {id:'s202', name:'ゼミ（数理科学特論ゼミⅢ）', code:'MTH-4-C4-1234-006', teacher:'作道 直幸', url:'https://syllabus.zen.ac.jp/subjects/2028/MTH-4-C4-1234-006', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 4},
  {id:'s203', name:'ゼミ（数理科学特論ゼミⅣ）', code:'MTH-4-C4-1234-007', teacher:'Ivan Fesenko', url:'https://syllabus.zen.ac.jp/subjects/2028/MTH-4-C4-1234-007', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 4},
  {id:'s204', name:'ゼミ（量子科学技術）', code:'MTH-4-C4-1234-008', teacher:'池田 達彦', url:'https://syllabus.zen.ac.jp/subjects/2028/MTH-4-C4-1234-008', category:'展開科目', group:'基盤リテラシー科目' ,subcategory:'数理', credit: 4},
  {id:'s205', name:'生きてゆくための禅', code:'HUM-1-C3-0034-007', teacher:'細川 晋輔', url:'https://syllabus.zen.ac.jp/subjects/2025/HUM-1-C3-0034-007', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s206', name:'政治を超える哲学Ⅰ', code:'HUM-1-C3-0034-008', teacher:'東 浩紀', url:'https://syllabus.zen.ac.jp/subjects/2025/HUM-1-C3-0034-008', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s207', name:'政治を超える哲学Ⅱ', code:'HUM-2-C3-1200-009', teacher:'東 浩紀', url:'https://syllabus.zen.ac.jp/subjects/2026/HUM-2-C3-1200-009', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s208', name:'社会で活きる囲碁論', code:'HUM-2-C3-1200-010', teacher:'藤澤 一就', url:'https://syllabus.zen.ac.jp/subjects/2026/HUM-2-C3-1200-010', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s209', name:'心理学実験・調査演習', code:'HUM-2-C3-1200-011', teacher:'積山 薫', url:'https://syllabus.zen.ac.jp/subjects/2026/HUM-2-C3-1200-011', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s210', name:'WEBコミック演習', code:'HUM-2-C3-0034-012', teacher:'浅野 龍哉', url:'https://syllabus.zen.ac.jp/subjects/2026/HUM-2-C3-0034-012', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s211', name:'こころの成り立ちとメンタルヘルス', code:'HUM-2-C3-0034-013', teacher:'濱田 庸子', url:'https://syllabus.zen.ac.jp/subjects/2026/HUM-2-C3-0034-013', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s212', name:'ウェルビーイングをデザインする', code:'HUM-2-C3-0034-014', teacher:'三戸 麻子', url:'https://syllabus.zen.ac.jp/subjects/2026/HUM-2-C3-0034-014', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s213', name:'芸術と文化資本Ⅱ', code:'HUM-3-C3-1200-003', teacher:'岩渕 潤子', url:'https://syllabus.zen.ac.jp/subjects/2027/HUM-3-C3-1200-003', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s214', name:'日本文学Ⅲ', code:'HUM-3-C3-1200-004', teacher:'Pradhan Gouranga Charan', url:'https://syllabus.zen.ac.jp/subjects/2027/HUM-3-C3-1200-004', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s215', name:'文化人類学Ⅲ', code:'HUM-3-C3-0034-005', teacher:'Hernández Álvaro David', url:'https://syllabus.zen.ac.jp/subjects/2027/HUM-3-C3-0034-005', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s216', name:'AI時代の科学と哲学', code:'HUM-3-C3-0034-006', teacher:'大塚 淳', url:'https://syllabus.zen.ac.jp/subjects/2027/HUM-3-C3-0034-006', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s217', name:'フィールドワークで学ぶ宗教思想史', code:'HUM-3-C3-0034-007', teacher:'茂木 誠', url:'https://syllabus.zen.ac.jp/subjects/2027/HUM-3-C3-0034-007', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 2},
  {id:'s218', name:'ゼミ（心の科学）', code:'HUM-3-C4-1234-008', teacher:'積山 薫', url:'https://syllabus.zen.ac.jp/subjects/2027/HUM-3-C4-1234-008', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 4},
  {id:'s219', name:'ゼミ（物語創作と物語の構造分析）', code:'HUM-3-C4-1234-009', teacher:'順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2027/HUM-3-C4-1234-009', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 4},
  {id:'s220', name:'ゼミ（トークイベントをつくる）', code:'HUM-3-C4-1234-010', teacher:'東 浩紀', url:'https://syllabus.zen.ac.jp/subjects/2027/HUM-3-C4-1234-010', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 4},
  {id:'s221', name:'ゼミ（展覧会のつくりかた）', code:'HUM-4-C4-1234-001', teacher:'岩渕 潤子', url:'https://syllabus.zen.ac.jp/subjects/2028/HUM-4-C4-1234-001', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 4},
  {id:'s222', name:'ゼミ（文芸批評論）', code:'HUM-4-C4-1234-002', teacher:'Pradhan Gouranga Charan', url:'https://syllabus.zen.ac.jp/subjects/2028/HUM-4-C4-1234-002', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 4},
  {id:'s223', name:'ゼミ（ファン文化論を捉えなおすための参加型文化論）', code:'HUM-4-C4-1234-003', teacher:'Hernández Álvaro David', url:'https://syllabus.zen.ac.jp/subjects/2028/HUM-4-C4-1234-003', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 4},
  {id:'s224', name:'ゼミ（数理哲学）', code:'HUM-4-C4-1234-004', teacher:'大塚 淳', url:'https://syllabus.zen.ac.jp/subjects/2028/HUM-4-C4-1234-004', category:'展開科目', group:'世界理解科目' ,subcategory:'文化・思想', credit: 4},
  {id:'s225', name:'社会学Ⅲ', code:'SOC-2-C3-1200-010', teacher:'谷口 祐人', url:'https://syllabus.zen.ac.jp/subjects/2026/SOC-2-C3-1200-010', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s226', name:'現代スポーツ構造分析', code:'SOC-2-C3-1200-011', teacher:'戸塚 隆', url:'https://syllabus.zen.ac.jp/subjects/2026/SOC-2-C3-1200-011', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s227', name:'SFから考える未来ビジョン', code:'SOC-2-C3-1200-012', teacher:'宮本 道人', url:'https://syllabus.zen.ac.jp/subjects/2026/SOC-2-C3-1200-012', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s228', name:'現代社会理論', code:'SOC-2-C3-0034-013', teacher:'小熊 英二', url:'https://syllabus.zen.ac.jp/subjects/2026/SOC-2-C3-0034-013', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s229', name:'未来社会デザイン論', code:'SOC-2-C3-0034-014', teacher:'竹村 眞一', url:'https://syllabus.zen.ac.jp/subjects/2026/SOC-2-C3-0034-014', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s230', name:'音楽と社会', code:'SOC-2-C3-0034-015', teacher:'木許 裕介', url:'https://syllabus.zen.ac.jp/subjects/2026/SOC-2-C3-0034-015', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s231', name:'子どもと地域づくり', code:'SOC-2-C3-0034-016', teacher:'中村 圭子', url:'https://syllabus.zen.ac.jp/subjects/2026/SOC-2-C3-0034-016', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s232', name:'コラボレーション・クリエイティブ', code:'SOC-2-C3-0034-017', teacher:'順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2026/SOC-2-C3-0034-017', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s233', name:'スマート田舎のススメ', code:'SOC-3-C3-0034-003', teacher:'橋本 剛', url:'https://syllabus.zen.ac.jp/subjects/2027/SOC-3-C3-0034-003', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s234', name:'課題解決と改革のリーダーシップ', code:'SOC-3-C3-0034-004', teacher:'上山 信一', url:'https://syllabus.zen.ac.jp/subjects/2027/SOC-3-C3-0034-004', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s235', name:'民主主義論', code:'SOC-3-C3-0034-005', teacher:'山内 康英', url:'https://syllabus.zen.ac.jp/subjects/2027/SOC-3-C3-0034-005', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s236', name:'国際関係論', code:'SOC-4-C3-1200-001', teacher:'山内 康英', url:'https://syllabus.zen.ac.jp/subjects/2028/SOC-4-C3-1200-001', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 2},
  {id:'s237', name:'ゼミ（多様化する家族）', code:'SOC-3-C4-1234-006', teacher:'山口 真由', url:'https://syllabus.zen.ac.jp/subjects/2027/SOC-3-C4-1234-006', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 4},
  {id:'s238', name:'ゼミ（情報社会の政治学）', code:'SOC-3-C4-1234-007', teacher:'山内 康英,順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2027/SOC-3-C4-1234-007', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 4},
  {id:'s239', name:'ゼミ（社会学）', code:'SOC-4-C4-1234-002', teacher:'谷口 祐人', url:'https://syllabus.zen.ac.jp/subjects/2028/SOC-4-C4-1234-002', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 4},
  {id:'s240', name:'ゼミ（意思決定研究と実践）', code:'SOC-4-C4-1234-003', teacher:'印南 一路', url:'https://syllabus.zen.ac.jp/subjects/2028/SOC-4-C4-1234-003', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 4},
  {id:'s241', name:'ゼミ（異文化理解）', code:'SOC-4-C4-1234-004', teacher:'田岡 恵', url:'https://syllabus.zen.ac.jp/subjects/2028/SOC-4-C4-1234-004', category:'展開科目', group:'世界理解科目' ,subcategory:'社会・ネットワーク', credit: 4},
  {id:'s242', name:'現代資本主義論', code:'ECON-2-C3-0034-008', teacher:'順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2026/ECON-2-C3-0034-008', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 2},
  {id:'s243', name:'マクロ経済分析演習', code:'ECON-3-C3-0034-001', teacher:'市橋 勝', url:'https://syllabus.zen.ac.jp/subjects/2027/ECON-3-C3-0034-001', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 2},
  {id:'s244', name:'課題解決のための計量経済分析', code:'ECON-3-C3-0034-002', teacher:'順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2027/ECON-3-C3-0034-002', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 2},
  {id:'s245', name:'事例から学ぶ統計学', code:'ECON-3-C3-1200-003', teacher:'渡邉 聡', url:'https://syllabus.zen.ac.jp/subjects/2027/ECON-3-C3-1200-003', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 2},
  {id:'s246', name:'財務分析演習', code:'ECON-3-C3-1200-004', teacher:'村藤 功', url:'https://syllabus.zen.ac.jp/subjects/2027/ECON-3-C3-1200-004', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 2},
  {id:'s247', name:'企業価値創造とM＆A', code:'ECON-3-C3-0034-005', teacher:'村藤 功', url:'https://syllabus.zen.ac.jp/subjects/2027/ECON-3-C3-0034-005', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 2},
  {id:'s248', name:'交渉・合意形成演習', code:'ECON-3-C3-0034-006', teacher:'印南 一路', url:'https://syllabus.zen.ac.jp/subjects/2027/ECON-3-C3-0034-006', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 2},
  {id:'s249', name:'スタートアップ実践', code:'ECON-4-C3-0034-001', teacher:'順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2028/ECON-4-C3-0034-001', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 2},
  {id:'s250', name:'ゼミ（地域づくり新事業ワークショップ）', code:'ECON-3-C4-1234-007', teacher:'中村 圭子', url:'https://syllabus.zen.ac.jp/subjects/2027/ECON-3-C4-1234-007', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 4},
  {id:'s251', name:'ゼミ（ビジネスモデル分析）', code:'ECON-4-C4-1234-002', teacher:'上山 信一', url:'https://syllabus.zen.ac.jp/subjects/2028/ECON-4-C4-1234-002', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 4},
  {id:'s252', name:'ゼミ（経済発展を考える）', code:'ECON-4-C4-1234-003', teacher:'市橋 勝', url:'https://syllabus.zen.ac.jp/subjects/2028/ECON-4-C4-1234-003', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 4},
  {id:'s253', name:'ゼミ（計量経済）', code:'ECON-4-C4-1234-004', teacher:'渡邉 聡', url:'https://syllabus.zen.ac.jp/subjects/2028/ECON-4-C4-1234-004', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 4},
  {id:'s254', name:'ゼミ（幸福曲線）', code:'ECON-4-C4-1234-005', teacher:'村藤 功', url:'https://syllabus.zen.ac.jp/subjects/2028/ECON-4-C4-1234-005', category:'展開科目', group:'世界理解科目' ,subcategory:'経済・マーケット', credit: 4},
  {id:'s255', name:'メディアで検証する未来の作り方', code:'DIGI-2-C3-1200-003', teacher:'遠藤 諭', url:'https://syllabus.zen.ac.jp/subjects/2026/DIGI-2-C3-1200-003', category:'展開科目', group:'世界理解科目' ,subcategory:'デジタル産業', credit: 2},
  {id:'s256', name:'アニメのクオリティー管理と商品性', code:'DIGI-2-C3-1200-004', teacher:'氷川 竜介', url:'https://syllabus.zen.ac.jp/subjects/2026/DIGI-2-C3-1200-004', category:'展開科目', group:'世界理解科目' ,subcategory:'デジタル産業', credit: 2},
  {id:'s257', name:'マンガの企画立案とプロデュース論', code:'DIGI-2-C3-0034-005', teacher:'佐渡島 庸平', url:'https://syllabus.zen.ac.jp/subjects/2026/DIGI-2-C3-0034-005', category:'展開科目', group:'世界理解科目' ,subcategory:'デジタル産業', credit: 2},
  {id:'s258', name:'文化資源とメタバース', code:'DIGI-2-C3-1200-006', teacher:'細井 浩一', url:'https://syllabus.zen.ac.jp/subjects/2026/DIGI-2-C3-1200-006', category:'展開科目', group:'世界理解科目' ,subcategory:'デジタル産業', credit: 2},
  {id:'s259', name:'文化資源のデジタルアーカイブ', code:'DIGI-2-C3-0034-007', teacher:'細井 浩一', url:'https://syllabus.zen.ac.jp/subjects/2026/DIGI-2-C3-0034-007', category:'展開科目', group:'世界理解科目' ,subcategory:'デジタル産業', credit: 2},
  {id:'s260', name:'ゼミ（文化資源アーカイブとメタバース）', code:'DIGI-3-C4-1234-002', teacher:'細井 浩一', url:'https://syllabus.zen.ac.jp/subjects/2027/DIGI-3-C4-1234-002', category:'展開科目', group:'世界理解科目' ,subcategory:'デジタル産業', credit: 4},
  {id:'s261', name:'ゼミ（アニメ作品の分析メソッド）', code:'DIGI-3-C4-1234-003', teacher:'氷川 竜介', url:'https://syllabus.zen.ac.jp/subjects/2027/DIGI-3-C4-1234-003', category:'展開科目', group:'世界理解科目' ,subcategory:'デジタル産業', credit: 4},
  {id:'s262', name:'英語コミュニケーションⅢ（プレゼンテーション）', code:'CAR-2-C3-1234-008', teacher:'鈴木 栄', url:'https://syllabus.zen.ac.jp/subjects/2026/CAR-2-C3-1234-008', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 2},
  {id:'s263', name:'英語コミュニケーションⅣ（ビジネス会話）', code:'CAR-2-C3-1234-009', teacher:'横山 カズ', url:'https://syllabus.zen.ac.jp/subjects/2026/CAR-2-C3-1234-009', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 2},
  {id:'s264', name:'デジタルトランスフォーメーション時代の働き方', code:'CAR-2-C3-1200-010', teacher:'順次公開予定', url:'https://syllabus.zen.ac.jp/subjects/2026/CAR-2-C3-1200-010', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 2},
  {id:'s265', name:'映像プロデューサー論', code:'CAR-2-C3-0034-011', teacher:'吉川 圭三', url:'', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 2},
  {id:'s266', name:'アニメ産業に関わる仕事', code:'CAR-3-C3-0034-003', teacher:'氷川 竜介', url:'https://syllabus.zen.ac.jp/subjects/2027/CAR-3-C3-0034-003', category:'展開科目', group:'社会接続科目' ,subcategory:'社会接続', credit: 2},
  {id:'s267', name:'プロジェクト実践', code:'PRJ-4-A3-1234-001', teacher:'田岡 恵,Hernández Álvaro David,大野 元己,吉村 総一郎,瀬下 大輔,若山 正人,上山 信一,渡邉 聡,大塚 淳,加藤 文元,木野 泰伸,西郷 甲矢人,順次公開予定,積山 薫,竹内 薫,氷川 竜介,細井 浩一,山口 真由,山内 康英,千葉 尚志,順次公開予定,Pradhan Gouranga Charan,Ivan Fesenko,市橋 勝,岩渕 潤子,印南 一路,江渡 浩一郎,竹村 眞一,村藤 功,池田 達彦,作道 直幸,河野 慎,湯山 孝雄,梅崎 直也,折原 ダビデ竜,ガーバー 明菜,谷口 祐人', url:'https://syllabus.zen.ac.jp/subjects/2028/PRJ-4-A3-1234-001', category:'展開科目', group:'卒業プロジェクト科目' ,subcategory:'卒業プロジェクト', credit: 4},
  {id:'s268', name:'イラストとエンタテインメントA', code:'OPT-1-D1-1030-001', teacher:'たいら あきら', url:'https://syllabus.zen.ac.jp/subjects/2025/OPT-1-D1-1030-001', category:'自由科目', group:'自由科目' ,subcategory:'自由科目', credit: 1},
  {id:'s269', name:'イラストとエンタテインメントB', code:'OPT-1-D1-1030-002', teacher:'六番', url:'https://syllabus.zen.ac.jp/subjects/2025/OPT-1-D1-1030-002', category:'自由科目', group:'自由科目' ,subcategory:'自由科目', credit: 1},
  {id:'s270', name:'イラストとエンタテインメントC', code:'OPT-1-D1-0204-003', teacher:'早川 涼太', url:'https://syllabus.zen.ac.jp/subjects/2025/OPT-1-D1-0204-003', category:'自由科目', group:'自由科目' ,subcategory:'自由科目', credit: 1},
  {id:'s271', name:'イラストとエンタテインメントD', code:'OPT-1-D1-0204-004', teacher:'たいら あきら', url:'https://syllabus.zen.ac.jp/subjects/2025/OPT-1-D1-0204-004', category:'自由科目', group:'自由科目' ,subcategory:'自由科目', credit: 1},
  {id:'s272', name:'イラストとデザインA', code:'OPT-2-D1-1030-001', teacher:'ふるり', url:'https://syllabus.zen.ac.jp/subjects/2026/OPT-2-D1-1030-001', category:'自由科目', group:'自由科目' ,subcategory:'自由科目', credit: 1},
  {id:'s273', name:'イラストとデザインB', code:'OPT-2-D1-1030-002', teacher:'早川 涼太', url:'https://syllabus.zen.ac.jp/subjects/2026/OPT-2-D1-1030-002', category:'自由科目', group:'自由科目' ,subcategory:'自由科目', credit: 1},
  {id:'s274', name:'イラストとデザインC', code:'OPT-2-D1-1030-003', teacher:'早川 涼太', url:'https://syllabus.zen.ac.jp/subjects/2026/OPT-2-D1-1030-003', category:'自由科目', group:'自由科目' ,subcategory:'自由科目', credit: 1},
  {id:'s275', name:'イラストとデザインD', code:'OPT-2-D1-0204-004', teacher:'ふるり', url:'https://syllabus.zen.ac.jp/subjects/2026/OPT-2-D1-0204-004', category:'自由科目', group:'自由科目' ,subcategory:'自由科目', credit: 1},
  {id:'s276', name:'イラストとその活用A', code:'OPT-3-D1-1030-001', teacher:'早川 涼太', url:'https://syllabus.zen.ac.jp/subjects/2027/OPT-3-D1-1030-001', category:'自由科目', group:'自由科目' ,subcategory:'自由科目', credit: 1},
  {id:'s277', name:'イラストとその活用B', code:'OPT-3-D1-1030-002', teacher:'たいら あきら', url:'https://syllabus.zen.ac.jp/subjects/2027/OPT-3-D1-1030-002', category:'自由科目', group:'自由科目' ,subcategory:'自由科目', credit: 1},
  {id:'s278', name:'イラストとその活用C', code:'OPT-3-D1-0204-003', teacher:'六番', url:'https://syllabus.zen.ac.jp/subjects/2027/OPT-3-D1-0204-003', category:'自由科目', group:'自由科目' ,subcategory:'自由科目', credit: 1},
  {id:'s279', name:'イラストとその活用D', code:'OPT-3-D1-0204-004', teacher:'浅川 りか', url:'https://syllabus.zen.ac.jp/subjects/2027/OPT-3-D1-0204-004', category:'自由科目', group:'自由科目' ,subcategory:'自由科目', credit: 1},
];

// --- ヘルパー ---
function genId(){return 'id-'+Math.random().toString(36).slice(2,9)}
function save(){localStorage.setItem(STORAGE_KEY, JSON.stringify(state));}
function load(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(raw) state = JSON.parse(raw);
  else initializeDemoData();
}

// --- DOM参照 ---
const inList = document.getElementById('inprogress-list');
const wlList = document.getElementById('wishlist-list');
const compList = document.getElementById('completed-list');
const search = document.getElementById('search');
const modalBack = document.getElementById('modalBack');
const addBtn = document.getElementById('addBtn');
const itemForm = document.getElementById('itemForm');
const fileInput = document.getElementById('fileInput');

// form fields
const fId = document.getElementById('itemId');
const fSubject = document.getElementById('field-subject'); // ← 修正済み
const fNote = document.getElementById('field-note');
const fStatus = document.getElementById('field-status');

// counts
const cIn = document.getElementById('count-in');
const cWl = document.getElementById('count-wl');
const cComp = document.getElementById('count-comp');

// --- デモ用初期化 ---
function initializeDemoData() {
  state.inprogress = [{id:genId(), subjectId:'s1', note:''}];
  state.wishlist = [{id:genId(), subjectId:'s2', note:'月曜3限'}];
  state.completed = [{id:genId(), subjectId:'s3', note:'A'}];
  save();
}

// --- 科目選択リストを作成 ---
function populateSubjectSelect() {
  if (!fSubject) { console.error('field-subject 要素が存在しません'); return; }
  fSubject.innerHTML = '<option value="">選択してください</option>';
  masterSubjects.forEach(sub => {
    const opt = document.createElement('option');
    opt.value = sub.id;
    opt.textContent = `${sub.name} (${sub.code})`;
    fSubject.appendChild(opt);
  });
}

// --- 描画 ---
function render(){
  renderList(inList, state.inprogress, 'inprogress');
  renderList(wlList, state.wishlist, 'wishlist');
  renderList(compList, state.completed, 'completed');
  cIn.textContent = state.inprogress.length;
  cWl.textContent = state.wishlist.length;
  cComp.textContent = state.completed.length;
}

function renderList(container, items, status){
  container.innerHTML = '';
  const q = search.value.trim().toLowerCase();
  const filtered = items.filter(it => {
    const subject = masterSubjects.find(s=>s.id===it.subjectId) || {};
    return !q || (subject.name||'').toLowerCase().includes(q) || (subject.code||'').toLowerCase().includes(q) || (subject.teacher||'').toLowerCase().includes(q);
  });

  if(filtered.length===0){
    const li = document.createElement('li'); li.className='item'; li.innerHTML='<div class="meta">— 空です —</div>'; container.appendChild(li); return;
  }

  filtered.forEach(it=>{
    const subject = masterSubjects.find(s=>s.id===it.subjectId) || {};
    const li = document.createElement('li'); li.className='item';
    const left = document.createElement('div'); left.style.flex='1';
    const title = document.createElement('div'); 
    title.innerHTML = `<strong>${escapeHtml(subject.name||'')}</strong> <span class="meta">${escapeHtml(subject.code||'')}</span>`;
    const meta = document.createElement('div'); 
    meta.className='meta'; 
    meta.textContent = (subject.teacher?subject.teacher+' • ':'') + (it.note||'');
    left.appendChild(title); left.appendChild(meta);

    const actions = document.createElement('div'); actions.className='actions';
    const open = document.createElement('button'); open.className='muted-btn small'; open.textContent='開く▶';
    open.onclick = ()=>{ if(subject.url) window.open(subject.url,'_blank'); else alert('URLが未設定です'); };

    const edit = document.createElement('button'); edit.className='muted-btn small'; edit.textContent='編集';
    edit.onclick = ()=>{ openModalForEdit(it,status); };

    const del = document.createElement('button'); del.className='muted-btn small'; del.textContent='削除';
    del.onclick = ()=>{ if(confirm('削除しますか？')) removeItem(it.id,status); };

    const moveBtn = document.createElement('button'); moveBtn.className='small';
    if(status==='inprogress') { moveBtn.textContent='✓ 履修済みに'; moveBtn.onclick = ()=> moveItem(it.id,'inprogress','completed'); }
    else if(status==='wishlist') { moveBtn.textContent='→ 履修中に'; moveBtn.onclick = ()=> moveItem(it.id,'wishlist','inprogress'); }
    else if(status==='completed') { moveBtn.textContent='↺ 再履修'; moveBtn.onclick = ()=> moveItem(it.id,'completed','inprogress'); }

    actions.appendChild(open); actions.appendChild(edit); actions.appendChild(del); actions.appendChild(moveBtn);

    li.appendChild(left); li.appendChild(actions);
    container.appendChild(li);
  });
}

function escapeHtml(s){ return String(s||'').replace(/[&<>]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;'})[c]); }

// --- CRUD ---
function addItem(obj){ obj.id = genId(); state[obj.status].push(obj); save(); render(); }
function updateItem(id, status, data){
  ['inprogress','wishlist','completed'].forEach(list=> state[list] = state[list].filter(i=> i.id!==id));
  state[data.status].push(Object.assign({id},data));
  save(); render();
}
function removeItem(id, status){ state[status] = state[status].filter(i=> i.id!==id); save(); render(); }
function moveItem(id, from, to){
  const idx = state[from].findIndex(i=>i.id===id); if(idx===-1) return; const it = state[from].splice(idx,1)[0]; it.status = to; state[to].push(it); save(); render();
}

// --- modal ---
function openModalForNew(){ 
  populateSubjectSelect();
  document.getElementById('modalTitle').textContent='科目を追加'; 
  fId.value=''; fSubject.value=''; fNote.value=''; fStatus.value='inprogress';
  modalBack.style.display='flex'; 
}

function openModalForEdit(item,status){ 
  populateSubjectSelect();
  const subject = masterSubjects.find(s=>s.id===item.subjectId);
  document.getElementById('modalTitle').textContent='科目を編集'; 
  fId.value=item.id; 
  fSubject.value=subject ? subject.id : ''; 
  fNote.value=item.note||''; 
  fStatus.value=status; 
  modalBack.style.display='flex'; 
}

function closeModal(){ modalBack.style.display='none'; itemForm.reset(); }

itemForm.addEventListener('submit', e=>{
  e.preventDefault();
  const id=fId.value;
  const data={subjectId:fSubject.value, status:fStatus.value, note:fNote.value};
  if(!data.subjectId){ alert('科目を選択してください'); return; }
  if(id){ updateItem(id,fStatus.value,data); } else { addItem(data); }
  closeModal();
});

document.getElementById('cancelBtn').addEventListener('click', closeModal);

// --- 検索イベント ---
search.addEventListener('input', ()=> render());

// --- buttons ---
addBtn.addEventListener('click', openModalForNew);
document.getElementById('clearAll').addEventListener('click', ()=>{
  if(confirm('全データを消します。よろしいですか？')){ state={inprogress:[],wishlist:[],completed:[]}; save(); render(); }
});

// --- export / import ---
document.getElementById('exportBtn').addEventListener('click', ()=>{
  const a = document.createElement('a'); 
  const blob = new Blob([JSON.stringify(state, null, 2)],{type:'application/json'}); 
  a.href = URL.createObjectURL(blob); a.download = 'syllabus-data.json'; a.click();
});
document.getElementById('importBtn').addEventListener('click', ()=> fileInput.click());
fileInput.addEventListener('change', e=>{
  const f = e.target.files[0]; if(!f) return; 
  const reader = new FileReader(); 
  reader.onload = ()=>{
    try{ 
      const parsed = JSON.parse(reader.result); 
      state = parsed; save(); render(); alert('インポートしました'); 
    }catch(err){ alert('読み込み失敗: JSONではありません'); }
  }; 
  reader.readAsText(f);
});

// --- load & render ---
load(); render();

// === 集計処理を分離 ===
function collectCredits(allItems) {
  const categoryCredit = {};
  const groupCredit = {};
  const subCredit = {};
  const groupRaw = {};
  const subRaw = {};

  function addCreditWithLimit(groupName, credit, targetObj) {
    const max = groupName === '社会接続科目' ? 10 : null;
    if (!max) {
      targetObj[groupName] = (targetObj[groupName] || 0) + credit;
      return credit;
    } else {
      const current = targetObj[groupName] || 0;
      const add = Math.min(credit, max - current);
      targetObj[groupName] = current + add;
      return add > 0 ? add : 0;
    }
  }

  allItems.forEach(it => {
    const subjectInfo = masterSubjects.find(subject => subject.id === it.subjectId);
    if (!subjectInfo) return;

    const categoryName    = subjectInfo.category || '未分類';
    const groupName       = subjectInfo.group || '未分類';
    const subcategoryName = subjectInfo.subcategory || '未分類';
    const creditValue     = subjectInfo.credit || 0;

    // 実単位（上限なし）
    groupRaw[groupName] = (groupRaw[groupName] || 0) + creditValue;
    subRaw[subcategoryName] = (subRaw[subcategoryName] || 0) + creditValue;

    // 上限適用後
    const appliedCredit = addCreditWithLimit(groupName, creditValue, groupCredit);
    categoryCredit[categoryName] = (categoryCredit[categoryName] || 0) + appliedCredit;

    if (categoryName === '基礎科目') {
      subCredit[subcategoryName] = (subCredit[subcategoryName] || 0) + appliedCredit;
    }
  });

  return { categoryCredit, groupCredit, subCredit, groupRaw, subRaw };
}

// === 判定処理 ===
function openCheckModal() {
  const results = document.getElementById('checkResults');
  results.innerHTML = '';

  const allItems = [...state.inprogress, ...state.completed];
  const { categoryCredit, groupCredit, subCredit, groupRaw } = collectCredits(allItems);

  const messages = [];

  // メッセージ生成
  function makeMessage(ok, label, val, required, extra = '') {
    return ok
      ? `<div class="pass">✅ ${label}: ${val}/${required} 単位${extra}</div>`
      : `<div class="fail">❌ ${label}: ${val}/${required} 単位${extra}</div>`;
  }

  // === 判定ルール + 見出し ===
  const checks = [
    { type: 'heading', label: '🎓 卒業要件' },

    { type: 'total', key: 'totalCredits', min: 124, label: '総取得単位数' },

    { type: 'heading', label: '導入科目' },
    { type: 'category', key: '導入科目', min: 14 },

    { type: 'heading', label: '基礎科目' },
    { type: 'category', key: '基礎科目', min: 12 },
    { type: 'subcategory', key: '数理', min: 2 },
    { type: 'subcategory', key: '情報', min: 2 },
    { type: 'subcategory', key: '文化・思想', min: 2 },
    { type: 'subcategory', key: '社会・ネットワーク', min: 2 },
    { type: 'subcategory', key: '経済・マーケット', min: 2 },
    { type: 'subcategory', key: '多言語情報理解必修', min: 2, label: '多言語ITコミュニケーション' },

    { type: 'heading', label: '展開科目' },
    { type: 'category', key: '展開科目', min: 74 },
    { type: 'group', key: '基盤リテラシー科目', min: 8 },
    { type: 'group', key: '多言語情報理解科目', min: 8 },
    { type: 'group', key: '世界理解科目', min: 26 },
    { type: 'group', key: '社会接続科目', max: 10 },

    { type: 'subcategory', key: 'デジタル産業選択必修', min: 2, label: 'デジタル産業選択必修' },

    { type: 'heading', label: '卒業プロジェクト科目' },
    { type: 'group', key: '卒業プロジェクト科目', min: 4 },

    { type: 'heading', label: '📈 進級要件（4年次）' },
    { type: 'total', key: 'totalCredits', min: 90, label: '総取得単位数' },
  ];

  // === 判定処理ループ ===
  checks.forEach(rule => {
    if (rule.type === 'heading') {
      messages.push(`<h3>${rule.label}</h3>`);
      return;
    }

    let val = 0;
    if (rule.type === 'total') {
      val = Object.values(categoryCredit).reduce((a, b) => a + b, 0);
    }
    if (rule.type === 'category') {
      val = categoryCredit[rule.key] || 0;
    }
    if (rule.type === 'group') {
      val = groupCredit[rule.key] || 0;
    }
    if (rule.type === 'subcategory') {
      val = subCredit[rule.key] || 0;
    }

    if (rule.min !== undefined) {
      messages.push(makeMessage(val >= rule.min, rule.label || rule.key, val, rule.min));
    }
    if (rule.max !== undefined) {
      const raw = groupRaw[rule.key] || 0;
      const ok = val <= rule.max;
      const extra = ok ? ` (上限 ${rule.max} 単位)` : ' 上限超過';
      messages.push(makeMessage(ok, rule.label || rule.key, raw, rule.max, extra));
    }
  });

  results.innerHTML = messages.join('');
  document.getElementById('checkModal').style.display = 'flex';
}

// === モーダル制御 ===
function closeCheckModal() {
  document.getElementById('checkModal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('checkBtn').addEventListener('click', openCheckModal);
  document.getElementById('closeCheckBtn').addEventListener('click', closeCheckModal);
});