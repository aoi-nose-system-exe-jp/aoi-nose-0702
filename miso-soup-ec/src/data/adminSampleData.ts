import { Admin, DashboardStats, SalesStats, AdminOrder, AdminUser, ProductAnalytics, RecommendationAnalytics } from '@/types';
import { sampleProducts } from './sampleData';

// 管理者サンプルデータ
export const sampleAdmins: Admin[] = [
  {
    id: 'admin_001',
    email: 'admin@misosoup-ec.com',
    name: '管理者太郎',
    role: 'super_admin',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'admin_002',
    email: 'moderator@misosoup-ec.com',
    name: '管理者花子',
    role: 'admin',
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
];

// ダッシュボード統計データ
export const dashboardStats: DashboardStats = {
  totalUsers: 1247,
  totalProducts: 15,
  totalOrders: 3456,
  totalRevenue: 1234567,
  pendingOrders: 23,
  lowStockProducts: 3,
  newUsersToday: 12,
  ordersToday: 45,
};

// 売上統計データ
export const salesStats: SalesStats = {
  totalSales: 1234567,
  totalOrders: 3456,
  averageOrderValue: 357,
  topSellingProducts: [
    {
      productId: 'product_001',
      productName: '定番赤だし味噌汁',
      totalSold: 456,
      revenue: 127680,
    },
    {
      productId: 'product_008',
      productName: 'わかめ味噌汁',
      totalSold: 389,
      revenue: 116700,
    },
    {
      productId: 'product_003',
      productName: 'しじみ味噌汁',
      totalSold: 234,
      revenue: 105300,
    },
    {
      productId: 'product_015',
      productName: 'プレミアム合わせ味噌汁',
      totalSold: 156,
      revenue: 90480,
    },
    {
      productId: 'product_004',
      productName: 'なめこ味噌汁',
      totalSold: 198,
      revenue: 75240,
    },
  ],
  salesByCategory: [
    { category: '定番', sales: 345600, percentage: 28.0 },
    { category: '具材系', sales: 296400, percentage: 24.0 },
    { category: '健康志向', sales: 222300, percentage: 18.0 },
    { category: '赤だし', sales: 185400, percentage: 15.0 },
    { category: '高級', sales: 123450, percentage: 10.0 },
    { category: '白味噌', sales: 49380, percentage: 4.0 },
    { category: '麦味噌', sales: 12345, percentage: 1.0 },
  ],
  dailySales: Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split('T')[0],
      sales: Math.floor(Math.random() * 50000) + 20000,
      orders: Math.floor(Math.random() * 100) + 50,
    };
  }),
};

// 管理者用注文データ
export const adminOrders: AdminOrder[] = [
  {
    id: 'order_001',
    userId: 'user_001',
    user: {
      id: 'user_001',
      name: '田中太郎',
      email: 'tanaka@example.com',
    },
    items: [
      { productId: 'product_001', quantity: 2, price: 280 },
      { productId: 'product_003', quantity: 1, price: 450 },
    ],
    itemsWithProducts: [
      {
        product: sampleProducts[0],
        quantity: 2,
        price: 280,
      },
      {
        product: sampleProducts[2],
        quantity: 1,
        price: 450,
      },
    ],
    totalAmount: 1010,
    status: 'pending',
    shippingAddress: {
      name: '田中太郎',
      address: '東京都渋谷区1-1-1',
      city: '渋谷区',
      postalCode: '150-0001',
      phone: '090-1234-5678',
    },
    createdAt: new Date('2024-01-20T10:30:00'),
    updatedAt: new Date('2024-01-20T10:30:00'),
  },
  {
    id: 'order_002',
    userId: 'user_002',
    user: {
      id: 'user_002',
      name: '佐藤花子',
      email: 'sato@example.com',
    },
    items: [
      { productId: 'product_008', quantity: 3, price: 300 },
      { productId: 'product_015', quantity: 1, price: 580 },
    ],
    itemsWithProducts: [
      {
        product: sampleProducts[7],
        quantity: 3,
        price: 300,
      },
      {
        product: sampleProducts[14],
        quantity: 1,
        price: 580,
      },
    ],
    totalAmount: 1480,
    status: 'confirmed',
    shippingAddress: {
      name: '佐藤花子',
      address: '大阪府大阪市北区2-2-2',
      city: '大阪市北区',
      postalCode: '530-0001',
      phone: '090-2345-6789',
    },
    createdAt: new Date('2024-01-19T14:15:00'),
    updatedAt: new Date('2024-01-19T16:20:00'),
  },
  {
    id: 'order_003',
    userId: 'user_003',
    user: {
      id: 'user_003',
      name: '鈴木一郎',
      email: 'suzuki@example.com',
    },
    items: [
      { productId: 'product_004', quantity: 2, price: 380 },
      { productId: 'product_006', quantity: 2, price: 350 },
    ],
    itemsWithProducts: [
      {
        product: sampleProducts[3],
        quantity: 2,
        price: 380,
      },
      {
        product: sampleProducts[5],
        quantity: 2,
        price: 350,
      },
    ],
    totalAmount: 1460,
    status: 'shipped',
    shippingAddress: {
      name: '鈴木一郎',
      address: '愛知県名古屋市中区3-3-3',
      city: '名古屋市中区',
      postalCode: '460-0001',
      phone: '090-3456-7890',
    },
    createdAt: new Date('2024-01-18T09:45:00'),
    updatedAt: new Date('2024-01-19T11:30:00'),
  },
];

// 管理者用ユーザーデータ
export const adminUsers: AdminUser[] = [
  {
    id: 'user_001',
    email: 'tanaka@example.com',
    name: '田中太郎',
    totalOrders: 5,
    totalSpent: 4250,
    lastOrderDate: new Date('2024-01-20'),
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: 'user_002',
    email: 'sato@example.com',
    name: '佐藤花子',
    totalOrders: 8,
    totalSpent: 6780,
    lastOrderDate: new Date('2024-01-19'),
    isActive: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-19'),
  },
  {
    id: 'user_003',
    email: 'suzuki@example.com',
    name: '鈴木一郎',
    totalOrders: 3,
    totalSpent: 2340,
    lastOrderDate: new Date('2024-01-18'),
    isActive: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: 'user_004',
    email: 'yamada@example.com',
    name: '山田次郎',
    totalOrders: 12,
    totalSpent: 8950,
    lastOrderDate: new Date('2024-01-15'),
    isActive: false,
    createdAt: new Date('2023-12-15'),
    updatedAt: new Date('2024-01-15'),
  },
];

// 商品分析データ
export const productAnalytics: ProductAnalytics[] = sampleProducts.map((product, index) => ({
  productId: product.id,
  productName: product.name,
  views: Math.floor(Math.random() * 1000) + 100,
  addToCart: Math.floor(Math.random() * 200) + 20,
  purchases: Math.floor(Math.random() * 100) + 10,
  conversionRate: Math.random() * 0.1 + 0.02,
  revenue: Math.floor(Math.random() * 50000) + 10000,
  averageRating: Math.random() * 2 + 3,
  reviewCount: Math.floor(Math.random() * 50) + 5,
}));

// 推薦システム分析データ
export const recommendationAnalytics: RecommendationAnalytics[] = [
  {
    questionId: 'q1',
    question: '普段どのくらいの頻度で味噌汁を飲みますか？',
    responses: [
      { optionId: 'q1_1', optionText: '毎日', count: 456, percentage: 38.2 },
      { optionId: 'q1_2', optionText: '週に3-4回', count: 389, percentage: 32.6 },
      { optionId: 'q1_3', optionText: '週に1-2回', count: 234, percentage: 19.6 },
      { optionId: 'q1_4', optionText: 'たまに', count: 115, percentage: 9.6 },
    ],
    effectivenessScore: 0.85,
  },
  {
    questionId: 'q2',
    question: 'どのような味の味噌汁がお好みですか？',
    responses: [
      { optionId: 'q2_1', optionText: 'あっさりとした味', count: 345, percentage: 28.9 },
      { optionId: 'q2_2', optionText: 'コクのある濃い味', count: 298, percentage: 25.0 },
      { optionId: 'q2_3', optionText: '甘みのある味', count: 287, percentage: 24.1 },
      { optionId: 'q2_4', optionText: 'バランスの取れた味', count: 264, percentage: 22.1 },
    ],
    effectivenessScore: 0.78,
  },
];

// 注文ステータスの日本語マッピング
export const orderStatusMap = {
  pending: '未処理',
  confirmed: '処理中',
  shipped: '発送済み',
  delivered: '完了',
  cancelled: 'キャンセル',
} as const;

// 管理者権限の日本語マッピング
export const adminRoleMap = {
  super_admin: 'スーパー管理者',
  admin: '管理者',
  moderator: 'モデレーター',
} as const;