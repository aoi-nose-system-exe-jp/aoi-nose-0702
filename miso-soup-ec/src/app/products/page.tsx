'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useProducts } from '@/hooks/useIndexedDB';
import { Button } from '@/components/ui/Button';
import { Product, ProductFilter, SortOption, PaginationInfo } from '@/types';
import { categories } from '@/data/sampleData';

const ITEMS_PER_PAGE = 9;

export default function ProductsPage() {
  const { products, loading } = useProducts();
  const searchParams = useSearchParams();
  
  const [filter, setFilter] = useState<ProductFilter>({});
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [currentPage, setCurrentPage] = useState(1);

  // URLパラメータからフィルターを設定
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setFilter(prev => ({ ...prev, category: categoryParam }));
    }
  }, [searchParams]);

  // フィルタリングとソートされた商品リスト
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // カテゴリフィルター
    if (filter.category) {
      filtered = filtered.filter(product => product.category === filter.category);
    }

    // 価格帯フィルター
    if (filter.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= filter.priceRange!.min && 
        product.price <= filter.priceRange!.max
      );
    }

    // 在庫フィルター
    if (filter.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    // ソート
    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, filter, sortOption]);

  // ページネーション情報
  const paginationInfo: PaginationInfo = useMemo(() => {
    const totalItems = filteredAndSortedProducts.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
    return {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage: ITEMS_PER_PAGE,
    };
  }, [filteredAndSortedProducts.length, currentPage]);

  // 現在のページの商品
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(startIndex, endIndex);
  }, [filteredAndSortedProducts, currentPage]);

  // フィルター変更ハンドラー
  const handleCategoryChange = (category: string) => {
    setFilter(prev => ({ 
      ...prev, 
      category: category === 'all' ? undefined : category 
    }));
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setFilter(prev => ({ 
      ...prev, 
      priceRange: { min, max } 
    }));
    setCurrentPage(1);
  };

  const handleInStockChange = (inStock: boolean) => {
    setFilter(prev => ({ 
      ...prev, 
      inStock: inStock || undefined 
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilter({});
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ページヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">商品一覧</h1>
          <p className="text-gray-600">
            {paginationInfo.totalItems}件の商品が見つかりました
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* サイドバー（フィルター） */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">フィルター</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs"
                >
                  クリア
                </Button>
              </div>

              {/* カテゴリフィルター */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">カテゴリ</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={!filter.category}
                      onChange={() => handleCategoryChange('all')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">すべて</span>
                  </label>
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={filter.category === category}
                        onChange={() => handleCategoryChange(category)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 価格帯フィルター */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">価格帯</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={!filter.priceRange}
                      onChange={() => setFilter(prev => ({ ...prev, priceRange: undefined }))}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">すべて</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filter.priceRange?.min === 0 && filter.priceRange?.max === 300}
                      onChange={() => handlePriceRangeChange(0, 300)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">¥300以下</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filter.priceRange?.min === 301 && filter.priceRange?.max === 400}
                      onChange={() => handlePriceRangeChange(301, 400)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">¥301-400</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filter.priceRange?.min === 401 && filter.priceRange?.max === 500}
                      onChange={() => handlePriceRangeChange(401, 500)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">¥401-500</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filter.priceRange?.min === 501 && filter.priceRange?.max === 1000}
                      onChange={() => handlePriceRangeChange(501, 1000)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">¥501以上</span>
                  </label>
                </div>
              </div>

              {/* 在庫フィルター */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">在庫</h3>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={!!filter.inStock}
                    onChange={(e) => handleInStockChange(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">在庫ありのみ</span>
                </label>
              </div>
            </div>
          </div>

          {/* メインコンテンツ */}
          <div className="flex-1">
            {/* ソートオプション */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">並び順:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="name-asc">名前順（昇順）</option>
                  <option value="name-desc">名前順（降順）</option>
                  <option value="price-asc">価格順（安い順）</option>
                  <option value="price-desc">価格順（高い順）</option>
                  <option value="newest">新着順</option>
                </select>
              </div>
            </div>

            {/* 商品グリッド */}
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                      <div className="text-6xl">🍲</div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-orange-600 font-medium bg-orange-100 px-2 py-1 rounded">
                          {product.category}
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          ¥{product.price}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.stock > 0 ? `在庫: ${product.stock}個` : '在庫切れ'}
                        </span>
                        <Link href={`/products/${product.id}`}>
                          <Button size="sm">
                            詳細を見る
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-gray-500 mb-4">
                  <div className="text-4xl mb-2">🔍</div>
                  <p>条件に合う商品が見つかりませんでした</p>
                </div>
                <Button onClick={clearFilters} variant="outline">
                  フィルターをクリア
                </Button>
              </div>
            )}

            {/* ページネーション */}
            {paginationInfo.totalPages > 1 && (
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    {paginationInfo.totalItems}件中 {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, paginationInfo.totalItems)}件を表示
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      前へ
                    </Button>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: paginationInfo.totalPages }, (_, i) => i + 1)
                        .filter(page => 
                          page === 1 || 
                          page === paginationInfo.totalPages || 
                          Math.abs(page - currentPage) <= 2
                        )
                        .map((page, index, array) => (
                          <div key={page} className="flex items-center">
                            {index > 0 && array[index - 1] !== page - 1 && (
                              <span className="px-2 text-gray-500">...</span>
                            )}
                            <Button
                              variant={page === currentPage ? 'primary' : 'outline'}
                              size="sm"
                              onClick={() => setCurrentPage(page)}
                              className="min-w-[2rem]"
                            >
                              {page}
                            </Button>
                          </div>
                        ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(paginationInfo.totalPages, prev + 1))}
                      disabled={currentPage === paginationInfo.totalPages}
                    >
                      次へ
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}