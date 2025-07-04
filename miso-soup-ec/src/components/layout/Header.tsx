'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useIndexedDB';
import { Button } from '@/components/ui/Button';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              味噌汁専門店
            </Link>
          </div>

          {/* ナビゲーション */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              ホーム
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              商品一覧
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  href="/cart"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  カート
                </Link>
                <Link
                  href="/orders"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  注文履歴
                </Link>
              </>
            )}
          </nav>

          {/* ユーザーメニュー */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  こんにちは、{user?.name}さん
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                >
                  ログアウト
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    ログイン
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="primary" size="sm">
                    新規登録
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* モバイルメニュー */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
          <Link
            href="/"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
          >
            ホーム
          </Link>
          <Link
            href="/products"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
          >
            商品一覧
          </Link>
          {isAuthenticated && (
            <>
              <Link
                href="/cart"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                カート
              </Link>
              <Link
                href="/orders"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                注文履歴
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}