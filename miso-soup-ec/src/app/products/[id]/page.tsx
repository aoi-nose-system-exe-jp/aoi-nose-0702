import Link from 'next/link';
import { Product } from '@/types';
import ProductDetailClient from './ProductDetailClient';

// 静的パラメータを生成する関数
export async function generateStaticParams() {
  // サンプルデータから商品IDを取得
  const { sampleProducts } = await import('@/data/sampleData');
  
  return sampleProducts.map((product) => ({
    id: product.id,
  }));
}

async function getProduct(id: string): Promise<Product | null> {
  const { sampleProducts } = await import('@/data/sampleData');
  return sampleProducts.find(p => p.id === id) || null;
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">商品が見つかりません</h1>
          <p className="text-gray-600 mb-4">指定された商品は存在しないか、削除された可能性があります。</p>
          <Link href="/products" className="inline-block bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700">
            商品一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}