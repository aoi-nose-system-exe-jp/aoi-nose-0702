// ユーザー関連の型定義
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// 商品関連の型定義
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// カート関連の型定義
export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

// 注文関連の型定義
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: ShippingAddress;
  createdAt: Date;
  updatedAt: Date;
}

// API レスポンス関連の型定義
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// フォーム関連の型定義
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CheckoutForm {
  shippingAddress: ShippingAddress;
}

// 推薦システム関連の型定義
export interface RecommendationQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    weight: Record<string, number>; // カテゴリごとの重み
  }[];
}

export interface RecommendationAnswer {
  questionId: string;
  optionId: string;
}

export interface RecommendationResult {
  products: Product[];
  scores: Record<string, number>;
}

// 商品レビュー関連の型定義
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

// フィルタリング・ソート関連の型定義
export interface ProductFilter {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  inStock?: boolean;
}

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest';

// ページネーション関連の型定義
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// 管理者関連の型定義
export interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'moderator';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminLoginForm {
  email: string;
  password: string;
}

// 統計・分析関連の型定義
export interface SalesStats {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  topSellingProducts: {
    productId: string;
    productName: string;
    totalSold: number;
    revenue: number;
  }[];
  salesByCategory: {
    category: string;
    sales: number;
    percentage: number;
  }[];
  dailySales: {
    date: string;
    sales: number;
    orders: number;
  }[];
}

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  lowStockProducts: number;
  newUsersToday: number;
  ordersToday: number;
}

// 管理者用の拡張された注文型
export interface AdminOrder extends Order {
  user: {
    id: string;
    name: string;
    email: string;
  };
  itemsWithProducts: {
    product: Product;
    quantity: number;
    price: number;
  }[];
}

// 管理者用の拡張されたユーザー型
export interface AdminUser extends User {
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: Date;
  isActive: boolean;
}

// レポート関連の型定義
export interface SalesReport {
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
  data: {
    date: string;
    sales: number;
    orders: number;
    newUsers: number;
  }[];
}

export interface ProductAnalytics {
  productId: string;
  productName: string;
  views: number;
  addToCart: number;
  purchases: number;
  conversionRate: number;
  revenue: number;
  averageRating: number;
  reviewCount: number;
}

export interface RecommendationAnalytics {
  questionId: string;
  question: string;
  responses: {
    optionId: string;
    optionText: string;
    count: number;
    percentage: number;
  }[];
  effectivenessScore: number;
}

// 管理者用フォーム型定義
export interface ProductForm {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  isActive: boolean;
  imageFile?: File;
}

export interface QuestionForm {
  question: string;
  options: {
    text: string;
    weight: Record<string, number>;
  }[];
}

// テーブル関連の型定義
export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
}