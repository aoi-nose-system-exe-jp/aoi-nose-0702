'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProducts } from '@/hooks/useIndexedDB';
import { Button } from '@/components/ui/Button';
import { RecommendationQuestion, RecommendationAnswer, Product } from '@/types';
import { recommendationQuestions } from '@/data/sampleData';

export default function RecommendationPage() {
  const { products } = useProducts();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<RecommendationAnswer[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');

  const currentQuestion = recommendationQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / recommendationQuestions.length) * 100;

  const handleAnswerSelect = (optionId: string) => {
    setSelectedOptionId(optionId);
  };

  const handleNext = () => {
    if (!selectedOptionId) return;

    const newAnswer: RecommendationAnswer = {
      questionId: currentQuestion.id,
      optionId: selectedOptionId,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < recommendationQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionId('');
    } else {
      // 推薦ロジックを実行
      calculateRecommendations(updatedAnswers);
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // 前の回答を復元
      const prevAnswer = answers[currentQuestionIndex - 1];
      setSelectedOptionId(prevAnswer?.optionId || '');
      // 現在の回答を削除
      setAnswers(answers.slice(0, currentQuestionIndex - 1));
    }
  };

  const calculateRecommendations = (userAnswers: RecommendationAnswer[]) => {
    // カテゴリごとのスコアを計算
    const categoryScores: Record<string, number> = {};

    userAnswers.forEach(answer => {
      const question = recommendationQuestions.find(q => q.id === answer.questionId);
      const option = question?.options.find(o => o.id === answer.optionId);
      
      if (option) {
        Object.entries(option.weight).forEach(([category, weight]) => {
          categoryScores[category] = (categoryScores[category] || 0) + weight;
        });
      }
    });

    // 商品をスコア順にソートして推薦
    const scoredProducts = products.map(product => ({
      product,
      score: categoryScores[product.category] || 0,
    }));

    // スコアが高い順にソート、同スコアの場合は価格順
    scoredProducts.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.product.price - b.product.price;
    });

    // 上位6商品を推薦
    const recommended = scoredProducts
      .filter(item => item.score > 0)
      .slice(0, 6)
      .map(item => item.product);

    setRecommendedProducts(recommended);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setRecommendedProducts([]);
    setIsCompleted(false);
    setSelectedOptionId('');
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              診断完了！
            </h1>
            <p className="text-lg text-gray-600">
              あなたにおすすめの味噌汁をご紹介します
            </p>
          </div>

          {recommendedProducts.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                あなたにぴったりの味噌汁
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative"
                  >
                    {index === 0 && (
                      <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                        最適
                      </div>
                    )}
                    <div className="h-40 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                      <div className="text-5xl">🍲</div>
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
                      <Link href={`/products/${product.id}`}>
                        <Button size="sm" className="w-full">
                          詳細を見る
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
              <div className="text-4xl mb-4">🤔</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                おすすめ商品が見つかりませんでした
              </h2>
              <p className="text-gray-600 mb-4">
                すべての商品をご覧いただくか、診断をやり直してみてください
              </p>
              <Link href="/products">
                <Button>すべての商品を見る</Button>
              </Link>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            <Button onClick={handleRestart} variant="outline">
              もう一度診断する
            </Button>
            <Link href="/products">
              <Button>商品一覧を見る</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            味噌汁診断
          </h1>
          <p className="text-gray-600">
            10個の質問に答えて、あなたにぴったりの味噌汁を見つけましょう
          </p>
        </div>

        {/* プログレスバー */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              質問 {currentQuestionIndex + 1} / {recommendationQuestions.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 質問カード */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQuestion.question}
          </h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <label
                key={option.id}
                className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedOptionId === option.id
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="option"
                  value={option.id}
                  checked={selectedOptionId === option.id}
                  onChange={() => handleAnswerSelect(option.id)}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedOptionId === option.id
                        ? 'border-orange-500 bg-orange-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedOptionId === option.id && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-900">{option.text}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* ナビゲーションボタン */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            前の質問
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!selectedOptionId}
          >
            {currentQuestionIndex === recommendationQuestions.length - 1
              ? '診断結果を見る'
              : '次の質問'}
          </Button>
        </div>

        {/* 診断をスキップ */}
        <div className="text-center mt-8">
          <Link href="/products" className="text-sm text-gray-500 hover:text-gray-700">
            診断をスキップして商品一覧を見る
          </Link>
        </div>
      </div>
    </div>
  );
}