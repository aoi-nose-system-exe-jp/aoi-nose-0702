import { openDB, DBSchema, IDBPDatabase } from 'idb';

// データベーススキーマの定義
export interface MisoSoupECDB extends DBSchema {
  users: {
    key: string;
    value: {
      id: string;
      email: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    };
    indexes: { 'by-email': string };
  };
  products: {
    key: string;
    value: {
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
    };
    indexes: { 'by-category': string; 'by-active': string };
  };
  orders: {
    key: string;
    value: {
      id: string;
      userId: string;
      items: Array<{
        productId: string;
        quantity: number;
        price: number;
      }>;
      totalAmount: number;
      status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
      shippingAddress: {
        name: string;
        address: string;
        city: string;
        postalCode: string;
        phone: string;
      };
      createdAt: Date;
      updatedAt: Date;
    };
    indexes: { 'by-user': string; 'by-status': string };
  };
  cart: {
    key: string;
    value: {
      id: string;
      userId: string;
      productId: string;
      quantity: number;
      createdAt: Date;
    };
    indexes: { 'by-user': string };
  };
}

// データベース接続
let dbInstance: IDBPDatabase<MisoSoupECDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<MisoSoupECDB>> {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await openDB<MisoSoupECDB>('miso-soup-ec', 1, {
    upgrade(db) {
      // ユーザーテーブル
      const userStore = db.createObjectStore('users', { keyPath: 'id' });
      userStore.createIndex('by-email', 'email', { unique: true });

      // 商品テーブル
      const productStore = db.createObjectStore('products', { keyPath: 'id' });
      productStore.createIndex('by-category', 'category');
      productStore.createIndex('by-active', 'isActive');

      // 注文テーブル
      const orderStore = db.createObjectStore('orders', { keyPath: 'id' });
      orderStore.createIndex('by-user', 'userId');
      orderStore.createIndex('by-status', 'status');

      // カートテーブル
      const cartStore = db.createObjectStore('cart', { keyPath: 'id' });
      cartStore.createIndex('by-user', 'userId');
    },
  });

  return dbInstance;
}

// データベース操作のヘルパー関数
export class DatabaseService {
  private static async getDatabase() {
    return await getDB();
  }

  // ユーザー操作
  static async createUser(user: Omit<MisoSoupECDB['users']['value'], 'createdAt' | 'updatedAt'>) {
    const db = await this.getDatabase();
    const now = new Date();
    return await db.add('users', {
      ...user,
      createdAt: now,
      updatedAt: now,
    });
  }

  static async getUserByEmail(email: string) {
    const db = await this.getDatabase();
    return await db.getFromIndex('users', 'by-email', email);
  }

  // 商品操作
  static async getAllProducts() {
    const db = await this.getDatabase();
    return await db.getAll('products');
  }

  static async getActiveProducts() {
    const db = await this.getDatabase();
    return await db.getAllFromIndex('products', 'by-active', 'true');
  }

  static async getProductsByCategory(category: string) {
    const db = await this.getDatabase();
    return await db.getAllFromIndex('products', 'by-category', category);
  }

  // カート操作
  static async addToCart(item: Omit<MisoSoupECDB['cart']['value'], 'createdAt'>) {
    const db = await this.getDatabase();
    return await db.add('cart', {
      ...item,
      createdAt: new Date(),
    });
  }

  static async updateCartItem(itemId: string, quantity: number) {
    const db = await this.getDatabase();
    const item = await db.get('cart', itemId);
    if (item) {
      item.quantity = quantity;
      return await db.put('cart', item);
    }
  }

  static async removeCartItem(itemId: string) {
    const db = await this.getDatabase();
    return await db.delete('cart', itemId);
  }

  static async getCartByUser(userId: string) {
    const db = await this.getDatabase();
    return await db.getAllFromIndex('cart', 'by-user', userId);
  }

  static async clearCart(userId: string) {
    const db = await this.getDatabase();
    const cartItems = await this.getCartByUser(userId);
    const tx = db.transaction('cart', 'readwrite');
    await Promise.all(cartItems.map(item => tx.store.delete(item.id)));
    await tx.done;
  }

  // 注文操作
  static async createOrder(order: Omit<MisoSoupECDB['orders']['value'], 'createdAt' | 'updatedAt'>) {
    const db = await this.getDatabase();
    const now = new Date();
    return await db.add('orders', {
      ...order,
      createdAt: now,
      updatedAt: now,
    });
  }

  static async getOrdersByUser(userId: string) {
    const db = await this.getDatabase();
    return await db.getAllFromIndex('orders', 'by-user', userId);
  }
}

// データ初期化用のヘルパー関数
export class DataInitializer {
  static async initializeSampleData() {
    const db = await getDB();
    
    // 既存のデータをチェック
    const existingProducts = await db.getAll('products');
    if (existingProducts.length > 0) {
      console.log('サンプルデータは既に初期化されています');
      return;
    }

    // サンプル商品データを動的インポート
    const { sampleProducts } = await import('@/data/sampleData');
    
    // 商品データを追加
    const tx = db.transaction('products', 'readwrite');
    await Promise.all(
      sampleProducts.map(product => tx.store.add(product))
    );
    await tx.done;
    
    console.log('サンプルデータの初期化が完了しました');
  }

  static async clearAllData() {
    const db = await getDB();
    
    // すべてのストアをクリア
    const stores = ['products', 'users', 'orders', 'cart'] as const;
    
    for (const storeName of stores) {
      const tx = db.transaction(storeName, 'readwrite');
      await tx.objectStore(storeName).clear();
      await tx.done;
    }
    
    console.log('すべてのデータがクリアされました');
  }
}