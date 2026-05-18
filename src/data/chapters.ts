export interface Chapter {
  id: number;
  title: string;
  path: string;
  description?: string;
}

export const chapters: Chapter[] = [
  {
    id: 1,
    title: '第一章：確率と割合の境界線',
    path: '/chapter1',
    description:
      '漫画家になれる確率と漫画家の割合——この二つの違いを理解する',
  },
  {
    id: 2,
    title: '第二章：祈りは確率を変えない',
    path: '/chapter2',
    description: '宝くじシミュレーターで、祈りが確率に影響しないことを証明',
  },
  {
    id: 3,
    title: '第三章：進化のトーナメント',
    path: '/chapter3',
    description: 'トーナメント型と自然淘汰の違い。全滅もあり得る自然の厳しさ',
  },
  {
    id: 4,
    title: '第四章：ガチャの天井と煽り文句',
    path: '/chapter4',
    description: '「今なら当たりやすい」の真実。天井の有無で何が変わるか',
  },
  {
    id: 5,
    title: '第五章：確率の森で迷う',
    path: '/chapter5',
    description: '麻雀とじゃんけん。偏りは予測できるのか？流れは存在するのか？',
  },
  {
    id: 6,
    title: '特別編：チンチロリン',
    path: '/chinchirorin',
    description:
      '3D物理シミュレーションで偏りを検証。カイ二乗検定による統計分析',
  },
  {
    id: 7,
    title: '特別編：クレーンゲームの期待値操作',
    path: '/claw-machine',
    description:
      '500円で取れる設定でも1回目では取れない。失敗するたびに握力が上がる仕組みを暴く',
  },
  {
    id: 8,
    title: '特別編：スロットの演出詐欺',
    path: '/slot-machine',
    description:
      'リーチ演出で期待が高まる。だが結果はレバーを引いた瞬間に決まっている',
  },
  {
    id: 9,
    title: '特別編：じゃんけんの後出し必勝法',
    path: '/janken',
    description:
      '人間が認識できない速度での後出し。じゃんけんの確率は本当に1/3なのか？',
  },
  {
    id: 10,
    title: '特別編：雨の中は走るべきか、歩くべきか',
    path: '/rain-walk',
    description:
      '受ける雨粒の数で決まる？嘘だ。雨がいつ止むかで決まる。グラフで比較',
  },
  {
    id: 11,
    title: '特別編：生存者バイアスと地球の突然死',
    path: '/survivor-bias',
    description:
      '太陽の寿命50億年？観測できるのは生き残った恒星だけ。突然死のリスクを暴く',
  },
  {
    id: 12,
    title: '特別編：前世と先祖の確率詐欺',
    path: '/ancestor-probability',
    description:
      '前世が有名人？先祖が桓武天皇？確率で計算すれば詐欺だとわかる',
  },
];

/** サイドバー用に短いタイトルを返す（必要に応じて将来分岐） */
export const sidebarChapters = chapters.map(c => ({
  id: c.id,
  title: c.title,
  path: c.path,
}));
