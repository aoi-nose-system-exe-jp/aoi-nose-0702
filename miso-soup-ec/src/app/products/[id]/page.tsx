'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProducts, useCart, useAuth } from '@/hooks/useIndexedDB';
import { Button } from '@/components/ui/Button';
import { Product, Review } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { products, loading } = useProducts();
  const { user } = useAuth();
  const { addToCart } = useCart(user?.id || null);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews] = useState<Review[]>([]); // 実際の実装では、レビューデータを取得
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const productId = params.id as string;

  useEffect(() => {
    if (products.length > 0 && productId) {
      const foundProduct = products.find(p => p.id === productId);
      setProduct(foundProduct || null);
      
      if (foundProduct) {
        // 関連商品を取得（同じカテゴリの他の商品）
        const related = products
          .filter(p => p.id !== foundProduct.id && p.category === foundProduct.category)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [products, productId]);

  const handleAddToCart = async () => {
    if (!product || !user) {
      router.push('/auth/login');
      return;
    }

    setIsAddingToCart(true);
    try {
      await addToCart(product.id, quantity);
      alert('カートに追加しました！');
    } catch (error) {
      alert('カートへの追加に失敗しました');
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">読み込み中...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">商品が見つかりません</h1>
          <p className="text-gray-600 mb-4">指定された商品は存在しないか、削除された可能性があります。</p>
          <Link href="/products">
            <Button>商品一覧に戻る</Button>
          </Link>
        </div>
      </div>
    );
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* パンくずナビ */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-gray-700">ホーム</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/products" className="hover:text-gray-700">商品一覧</Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-gray-700">
                {product.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* 商品画像 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
              <div className="text-8xl">🍲</div>
            </div>
          </div>

          {/* 商品情報 */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-4">
              <span className="inline-block bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <span className="text-3xl font-bold text-orange-600">
                ¥{product.price}
              </span>
              <span className="text-gray-500 ml-2">（税込）</span>
            </div>

            {/* レビュー評価 */}
            {reviews.length > 0 && (
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-lg ${
                        star <= averageRating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  ({reviews.length}件のレビュー)
                </span>
              </div>
            )}

            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* 在庫状況 */}
            <div className="mb-6">
              <span className={`text-sm font-medium ${
                product.stock > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {product.stock > 0 ? `在庫あり（${product.stock}個）` : '在庫切れ'}
              </span>
            </div>

            {/* 数量選択とカート追加 */}
            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">数量:</label>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-x border-gray-300 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="flex-1"
                    size="lg"
                  >
                    {isAddingToCart ? 'カートに追加中...' : 'カートに追加'}
                  </Button>
                  {user && (
                    <Link href="/cart" className="flex-1">
                      <Button variant="outline" size="lg" className="w-full">
                        カートを見る
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {!user && (
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">
                  商品を購入するにはログインが必要です
                </p>
                <Link href="/auth/login">
                  <Button size="sm">ログイン</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* 商品詳細情報 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">商品詳細</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">商品情報</h3>
              <dl className="space-y-2">
                <div className="flex">
                  <dt className="text-sm text-gray-600 w-24">商品名:</dt>
                  <dd className="text-sm text-gray-900">{product.name}</dd>
                </div>
                <div className="flex">
                  <dt className="text-sm text-gray-600 w-24">カテゴリ:</dt>
                  <dd className="text-sm text-gray-900">{product.category}</dd>
                </div>
                <div className="flex">
                  <dt className="text-sm text-gray-600 w-24">価格:</dt>
                  <dd className="text-sm text-gray-900">¥{product.price}（税込）</dd>
                </div>
                <div className="flex">
                  <dt className="text-sm text-gray-600 w-24">在庫:</dt>
                  <dd className="text-sm text-gray-900">{product.stock}個</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">お召し上がり方</h3>
              <ol className="text-sm text-gray-700 space-y-1">
                <li>1. カップに本品を入れます</li>
                <li>2. 熱湯160mlを注ぎます</li>
                <li>3. よくかき混ぜてお召し上がりください</li>
              </ol>
            </div>
          </div>
        </div>

        {/* レビューセクション */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            カスタマーレビュー
            {reviews.length > 0 && (
              <span className="text-lg text-gray-600 ml-2">({reviews.length}件)</span>
            )}
          </h2>
          
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">{review.userName}</span>
                      <div className="flex items-center ml-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-sm ${
                              star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500 mb-4">
                <div className="text-4xl mb-2">💬</div>
                <p>まだレビューがありません</p>
                <p className="text-sm">最初のレビューを投稿してみませんか？</p>
              </div>
            </div>
          )}
        </div>

        {/* 関連商品 */}
        {relatedProducts.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">関連商品</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-32 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                      <div className="text-4xl">🍲</div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors mb-1">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {relatedProduct.category}
                      </p>
                      <span className="text-lg font-bold text-orange-600">
                        ¥{relatedProduct.price}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}