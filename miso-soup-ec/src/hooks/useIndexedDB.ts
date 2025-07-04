import { useState, useEffect, useCallback } from 'react';
import { DatabaseService } from '@/lib/indexeddb';
import { Product, CartItem, Order, User } from '@/types';

// 商品データを管理するフック
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await DatabaseService.getActiveProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error, refetch: () => setLoading(true) };
}

// カートデータを管理するフック
export function useCart(userId: string | null) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const data = await DatabaseService.getCartByUser(userId);
      setCartItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const addToCart = async (productId: string, quantity: number) => {
    if (!userId) return;

    try {
      await DatabaseService.addToCart({
        id: `cart_${Date.now()}_${Math.random()}`,
        userId,
        productId,
        quantity,
      });
      await fetchCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'カートへの追加に失敗しました');
    }
  };

  const updateCartItem = async (itemId: string, quantity: number) => {
    if (!userId) return;

    try {
      await DatabaseService.updateCartItem(itemId, quantity);
      await fetchCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'カートの更新に失敗しました');
    }
  };

  const removeCartItem = async (itemId: string) => {
    if (!userId) return;

    try {
      await DatabaseService.removeCartItem(itemId);
      await fetchCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'カートからの削除に失敗しました');
    }
  };

  const clearCart = async () => {
    if (!userId) return;

    try {
      await DatabaseService.clearCart(userId);
      setCartItems([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'カートのクリアに失敗しました');
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId, fetchCart]);

  return {
    cartItems,
    loading,
    error,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    refetch: fetchCart,
  };
}

// 注文履歴を管理するフック
export function useOrders(userId: string | null) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const data = await DatabaseService.getOrdersByUser(userId);
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const createOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await DatabaseService.createOrder({
        ...order,
        id: `order_${Date.now()}_${Math.random()}`,
      });
      await fetchOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : '注文の作成に失敗しました');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userId, fetchOrders]);

  return {
    orders,
    loading,
    error,
    createOrder,
    refetch: fetchOrders,
  };
}

// ユーザー認証を管理するフック（簡易版）
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ローカルストレージからユーザー情報を取得
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('ユーザー情報の読み込みに失敗しました:', err);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string) => {
    try {
      const userData = await DatabaseService.getUserByEmail(email);
      if (userData) {
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (err) {
      console.error('ログインに失敗しました:', err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = async (userData: Omit<User, 'createdAt' | 'updatedAt'>) => {
    try {
      await DatabaseService.createUser(userData);
      await login(userData.email);
      return true;
    } catch (err) {
      console.error('ユーザー登録に失敗しました:', err);
      return false;
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };
}