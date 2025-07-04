import { Product, RecommendationQuestion } from '@/types';

// フリーズドライ味噌汁のサンプル商品データ
export const sampleProducts: Product[] = [
  {
    id: 'product_001',
    name: '定番赤だし味噌汁',
    description: '愛知県産の豆味噌を使用した、コクのある赤だし味噌汁です。わかめとねぎ入りで、本格的な味わいをお楽しみいただけます。',
    price: 280,
    imageUrl: '/images/products/akadashi.jpg',
    category: '赤だし',
    stock: 50,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'product_002',
    name: '白味噌仕立て京風味噌汁',
    description: '京都産の白味噌を使用した上品な甘みが特徴の味噌汁です。豆腐とわかめが入っており、関西の味をお届けします。',
    price: 320,
    imageUrl: '/images/products/shiromiso.jpg',
    category: '白味噌',
    stock: 35,
    isActive: true,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
  {
    id: 'product_003',
    name: 'しじみ味噌汁',
    description: '青森県十三湖産のしじみを使用した栄養豊富な味噌汁です。肝機能をサポートするオルニチンが豊富に含まれています。',
    price: 450,
    imageUrl: '/images/products/shijimi.jpg',
    category: '具材系',
    stock: 25,
    isActive: true,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
  {
    id: 'product_004',
    name: 'なめこ味噌汁',
    description: '国産なめこをたっぷり使用した、とろみのある食感が楽しめる味噌汁です。食物繊維も豊富で健康的です。',
    price: 380,
    imageUrl: '/images/products/nameko.jpg',
    category: '具材系',
    stock: 40,
    isActive: true,
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04'),
  },
  {
    id: 'product_005',
    name: '豚汁風味噌汁',
    description: '豚肉、大根、人参、ごぼうなどの具材がたっぷり入った、食べ応えのある豚汁風味噌汁です。',
    price: 520,
    imageUrl: '/images/products/tonjiru.jpg',
    category: '具材系',
    stock: 30,
    isActive: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: 'product_006',
    name: '減塩味噌汁',
    description: '塩分を30%カットした健康志向の味噌汁です。味は変わらず、健康を気遣う方におすすめです。',
    price: 350,
    imageUrl: '/images/products/genen.jpg',
    category: '健康志向',
    stock: 45,
    isActive: true,
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-06'),
  },
  {
    id: 'product_007',
    name: '有機味噌汁',
    description: '有機栽培された大豆を使用した味噌で作られた、安心・安全な味噌汁です。化学調味料不使用。',
    price: 480,
    imageUrl: '/images/products/organic.jpg',
    category: '健康志向',
    stock: 20,
    isActive: true,
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-07'),
  },
  {
    id: 'product_008',
    name: 'わかめ味噌汁',
    description: '三陸産のわかめをたっぷり使用したシンプルな味噌汁です。ミネラル豊富で毎日の健康をサポートします。',
    price: 300,
    imageUrl: '/images/products/wakame.jpg',
    category: '定番',
    stock: 60,
    isActive: true,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
  },
  {
    id: 'product_009',
    name: '豆腐とねぎの味噌汁',
    description: '絹ごし豆腐と青ねぎを使用した、やさしい味わいの定番味噌汁です。朝食にぴったりです。',
    price: 290,
    imageUrl: '/images/products/tofu-negi.jpg',
    category: '定番',
    stock: 55,
    isActive: true,
    createdAt: new Date('2024-01-09'),
    updatedAt: new Date('2024-01-09'),
  },
  {
    id: 'product_010',
    name: 'きのこ味噌汁',
    description: 'しいたけ、えのき、しめじの3種のきのこを使用した、旨味たっぷりの味噌汁です。',
    price: 420,
    imageUrl: '/images/products/kinoko.jpg',
    category: '具材系',
    stock: 35,
    isActive: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: 'product_011',
    name: '海苔味噌汁',
    description: '有明海産の海苔を使用した風味豊かな味噌汁です。磯の香りが食欲をそそります。',
    price: 330,
    imageUrl: '/images/products/nori.jpg',
    category: '定番',
    stock: 40,
    isActive: true,
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11'),
  },
  {
    id: 'product_012',
    name: 'あさり味噌汁',
    description: '熊本県産のあさりを使用した、出汁の効いた贅沢な味噌汁です。鉄分も豊富に含まれています。',
    price: 480,
    imageUrl: '/images/products/asari.jpg',
    category: '具材系',
    stock: 25,
    isActive: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: 'product_013',
    name: '野菜たっぷり味噌汁',
    description: '大根、人参、キャベツ、玉ねぎなど7種類の野菜が入った栄養満点の味噌汁です。',
    price: 400,
    imageUrl: '/images/products/yasai.jpg',
    category: '健康志向',
    stock: 30,
    isActive: true,
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
  },
  {
    id: 'product_014',
    name: '麦味噌汁',
    description: '九州産の麦味噌を使用した、甘みとコクのバランスが絶妙な味噌汁です。',
    price: 340,
    imageUrl: '/images/products/mugi.jpg',
    category: '麦味噌',
    stock: 45,
    isActive: true,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
  },
  {
    id: 'product_015',
    name: 'プレミアム合わせ味噌汁',
    description: '3種類の味噌をブレンドした最高級の味噌汁です。深い味わいと香りをお楽しみください。',
    price: 580,
    imageUrl: '/images/products/premium.jpg',
    category: '高級',
    stock: 15,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
];

// 推薦システム用の質問データ
export const recommendationQuestions: RecommendationQuestion[] = [
  {
    id: 'q1',
    question: '普段どのくらいの頻度で味噌汁を飲みますか？',
    options: [
      {
        id: 'q1_1',
        text: '毎日',
        weight: { '定番': 3, '健康志向': 2, '具材系': 1 }
      },
      {
        id: 'q1_2',
        text: '週に3-4回',
        weight: { '定番': 2, '健康志向': 1, '具材系': 2 }
      },
      {
        id: 'q1_3',
        text: '週に1-2回',
        weight: { '具材系': 2, '高級': 1, '赤だし': 1 }
      },
      {
        id: 'q1_4',
        text: 'たまに',
        weight: { '高級': 2, '具材系': 1, '白味噌': 1 }
      }
    ]
  },
  {
    id: 'q2',
    question: 'どのような味の味噌汁がお好みですか？',
    options: [
      {
        id: 'q2_1',
        text: 'あっさりとした味',
        weight: { '白味噌': 3, '定番': 2, '健康志向': 1 }
      },
      {
        id: 'q2_2',
        text: 'コクのある濃い味',
        weight: { '赤だし': 3, '具材系': 2, '高級': 1 }
      },
      {
        id: 'q2_3',
        text: '甘みのある味',
        weight: { '白味噌': 2, '麦味噌': 3, '定番': 1 }
      },
      {
        id: 'q2_4',
        text: 'バランスの取れた味',
        weight: { '定番': 2, '高級': 2, '具材系': 1 }
      }
    ]
  },
  {
    id: 'q3',
    question: '健康面で気になることはありますか？',
    options: [
      {
        id: 'q3_1',
        text: '塩分を控えたい',
        weight: { '健康志向': 3, '定番': 1 }
      },
      {
        id: 'q3_2',
        text: '栄養バランスを重視したい',
        weight: { '健康志向': 2, '具材系': 3, '定番': 1 }
      },
      {
        id: 'q3_3',
        text: '添加物を避けたい',
        weight: { '健康志向': 3, '高級': 2 }
      },
      {
        id: 'q3_4',
        text: '特に気にしない',
        weight: { '定番': 2, '具材系': 2, '赤だし': 1, '白味噌': 1 }
      }
    ]
  },
  {
    id: 'q4',
    question: '味噌汁を飲む主なタイミングはいつですか？',
    options: [
      {
        id: 'q4_1',
        text: '朝食時',
        weight: { '定番': 3, '健康志向': 2, '白味噌': 1 }
      },
      {
        id: 'q4_2',
        text: '昼食時',
        weight: { '具材系': 2, '定番': 2, '健康志向': 1 }
      },
      {
        id: 'q4_3',
        text: '夕食時',
        weight: { '具材系': 3, '赤だし': 2, '高級': 1 }
      },
      {
        id: 'q4_4',
        text: '間食・夜食',
        weight: { '定番': 2, '健康志向': 1, '白味噌': 2 }
      }
    ]
  },
  {
    id: 'q5',
    question: 'どのような具材がお好みですか？',
    options: [
      {
        id: 'q5_1',
        text: 'わかめや海苔などの海藻類',
        weight: { '定番': 3, '健康志向': 2 }
      },
      {
        id: 'q5_2',
        text: 'しじみやあさりなどの貝類',
        weight: { '具材系': 3, '高級': 2 }
      },
      {
        id: 'q5_3',
        text: 'きのこ類',
        weight: { '具材系': 3, '健康志向': 1 }
      },
      {
        id: 'q5_4',
        text: '豆腐やねぎなどのシンプルな具材',
        weight: { '定番': 3, '白味噌': 2, '赤だし': 1 }
      }
    ]
  },
  {
    id: 'q6',
    question: '価格帯の希望はありますか？',
    options: [
      {
        id: 'q6_1',
        text: 'リーズナブル（300円以下）',
        weight: { '定番': 3, '健康志向': 1 }
      },
      {
        id: 'q6_2',
        text: '標準的（300-400円）',
        weight: { '定番': 2, '具材系': 2, '健康志向': 2, '赤だし': 1, '白味噌': 1 }
      },
      {
        id: 'q6_3',
        text: 'やや高め（400-500円）',
        weight: { '具材系': 3, '健康志向': 2, '高級': 1 }
      },
      {
        id: 'q6_4',
        text: '高級（500円以上）',
        weight: { '高級': 3, '具材系': 1 }
      }
    ]
  },
  {
    id: 'q7',
    question: '味噌の種類で好みはありますか？',
    options: [
      {
        id: 'q7_1',
        text: '赤味噌（コクがある）',
        weight: { '赤だし': 3, '具材系': 1 }
      },
      {
        id: 'q7_2',
        text: '白味噌（甘みがある）',
        weight: { '白味噌': 3, '定番': 1 }
      },
      {
        id: 'q7_3',
        text: '麦味噌（まろやか）',
        weight: { '麦味噌': 3, '定番': 1 }
      },
      {
        id: 'q7_4',
        text: '特にこだわりなし',
        weight: { '定番': 2, '具材系': 2, '健康志向': 1 }
      }
    ]
  },
  {
    id: 'q8',
    question: '食事のボリューム感はどの程度がお好みですか？',
    options: [
      {
        id: 'q8_1',
        text: 'あっさり軽め',
        weight: { '定番': 3, '白味噌': 2, '健康志向': 1 }
      },
      {
        id: 'q8_2',
        text: '標準的',
        weight: { '定番': 2, '具材系': 2, '赤だし': 1, '白味噌': 1 }
      },
      {
        id: 'q8_3',
        text: 'しっかりボリューム',
        weight: { '具材系': 3, '高級': 1 }
      },
      {
        id: 'q8_4',
        text: '食べ応え重視',
        weight: { '具材系': 3, '赤だし': 1 }
      }
    ]
  },
  {
    id: 'q9',
    question: '新しい味に挑戦することについてどう思いますか？',
    options: [
      {
        id: 'q9_1',
        text: '積極的に試したい',
        weight: { '高級': 3, '具材系': 2, '健康志向': 1 }
      },
      {
        id: 'q9_2',
        text: 'たまには試したい',
        weight: { '具材系': 2, '高級': 1, '健康志向': 2, '赤だし': 1, '白味噌': 1 }
      },
      {
        id: 'q9_3',
        text: 'あまり冒険したくない',
        weight: { '定番': 3, '赤だし': 1, '白味噌': 1 }
      },
      {
        id: 'q9_4',
        text: 'いつもの味が一番',
        weight: { '定番': 3 }
      }
    ]
  },
  {
    id: 'q10',
    question: '味噌汁に求める一番の要素は何ですか？',
    options: [
      {
        id: 'q10_1',
        text: '美味しさ',
        weight: { '高級': 3, '具材系': 2, '赤だし': 1, '白味噌': 1 }
      },
      {
        id: 'q10_2',
        text: '健康効果',
        weight: { '健康志向': 3, '具材系': 1 }
      },
      {
        id: 'q10_3',
        text: '手軽さ・便利さ',
        weight: { '定番': 3, '健康志向': 1 }
      },
      {
        id: 'q10_4',
        text: 'コストパフォーマンス',
        weight: { '定番': 3, '健康志向': 1 }
      }
    ]
  }
];

// カテゴリ一覧
export const categories = [
  '定番',
  '赤だし',
  '白味噌',
  '麦味噌',
  '具材系',
  '健康志向',
  '高級'
];