'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart, useAuth, useProducts } from '@/hooks/useIndexedDB';
import { Button } from '@/components/ui/Button';
import { CartItemWithProduct } from '@/types';

export default function CartPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { products } = useProducts();
  const { cartItems, loading, updateCartItem, removeCartItem, clearCart } = useCart(user?.id || null);
  
  const [cartWithProducts, setCartWithProducts] = useState<CartItemWithProduct[]>([]);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (cartItems.length > 0 && products.length > 0) {
      const itemsWithProducts = cartItems.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
          ...item,
          product: product!
        };
      }).filter(item => item.product); // 商品が見つからないアイテムを除外

      setCartWithProducts(itemsWithProducts);
    } else {
      setCartWithProducts([]);
    }
  }, [cartItems, products]);

  const totalAmount = cartWithProducts.reduce(
    (sum, item) => sum + (item.product.price * item.quantity),
    0
  );

  const totalItems = cartWithProducts.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleClearCart = async () => {
    if (window.confirm('カート内のすべての商品を削除しますか？')) {
      setIsClearing(true);
      try {
        await clearCart();
        alert('カートをクリアしました');
      } catch (error) {
        alert('カートのクリアに失敗しました');
      } finally {
        setIsClearing(false);
      }
    }
  };

  const handleCheckout = () => {
    if (cartWithProducts.length === 0) {
      alert('カートに商品がありません');
      return;
    }
    
    // 在庫チェック
    const outOfStockItems = cartWithProducts.filter(
      item => item.quantity > item.product.stock
    );
    
    if (outOfStockItems.length > 0) {
      alert('在庫不足の商品があります。数量を調整してください。');
      return;
    }

    router.push('/checkout');
  };

  if (!isAuthenticated) {
    return null; // リダイレクト中
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ショッピングカート</h1>
          <p className="text-gray-600">
            {totalItems > 0 ? `${totalItems}点の商品` : 'カートは空です'}
          </p>
        </div>

        {cartWithProducts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* カート商品リスト */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                      カート内商品 ({cartWithProducts.length}点)
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearCart}
                      disabled={isClearing}
                    >
                      {isClearing ? 'クリア中...' : 'すべて削除'}
                    </Button>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {cartWithProducts.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* 商品画像 */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                            <div className="text-2xl">🍲</div>
                          </div>
                        </div>

                        {/* 商品情報 */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                <Link 
                                  href={`/products/${item.product.id}`}
                                  className="hover:text-orange-600"
                                >
                                  {item.product.name}
                                </Link>
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {item.product.category}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                在庫: {item.product.stock}個
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-gray-900">
                                ¥{item.product.price}
                              </p>
                              <p className="text-sm text-gray-600">
                                単価
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-700">数量:</span>
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                  onClick={() => updateCartItem(item.id, item.quantity - 1)}
                                  className="px-2 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span className="px-3 py-1 border-x border-gray-300 min-w-[2.5rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateCartItem(item.id, item.quantity + 1)}
                                  className="px-2 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                                  disabled={item.quantity >= item.product.stock}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">
                                ¥{item.product.price * item.quantity}
                              </p>
                              <button
                                onClick={() => removeCartItem(item.id)}
                                className="text-sm text-red-600 hover:text-red-800 mt-1"
                              >
                                削除
                              </button>
                            </div>
                          </div>

                          {/* 在庫警告 */}
                          {item.quantity > item.product.stock && (
                            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                              <p className="text-sm text-red-600">
                                ⚠️ 在庫不足です。在庫数: {item.product.stock}個
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 注文サマリー */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  注文サマリー
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">商品点数</span>
                    <span className="text-gray-900">{totalItems}点</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">小計</span>
                    <span className="text-gray-900">¥{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">送料</span>
                    <span className="text-gray-900">
                      {totalAmount >= 3000 ? '無料' : '¥500'}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">合計</span>
                      <span className="text-lg font-bold text-orange-600">
                        ¥{totalAmount + (totalAmount >= 3000 ? 0 : 500)}
                      </span>
                    </div>
                  </div>
                </div>

                {totalAmount < 3000 && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-700">
                      あと¥{3000 - totalAmount}で送料無料！
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleCheckout}
                  className="w-full mb-3"
                  size="lg"
                >
                  レジに進む
                </Button>

                <Link href="/products">
                  <Button variant="outline" className="w-full" size="lg">
                    買い物を続ける
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* 空のカート */
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              カートは空です
            </h2>
            <p className="text-gray-600 mb-6">
              お気に入りの商品をカートに追加してください
            </p>
            <Link href="/products">
              <Button size="lg">
                商品を見る
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}