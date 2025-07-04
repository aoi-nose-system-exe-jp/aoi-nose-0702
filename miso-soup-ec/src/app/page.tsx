'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const fortuneTypes = [
  { id: 'love', name: '恋愛運', icon: '💕' },
  { id: 'work', name: '仕事運', icon: '💼' },
  { id: 'money', name: '金運', icon: '💰' },
  { id: 'health', name: '健康運', icon: '🍀' },
  { id: 'study', name: '学業運', icon: '📚' },
  { id: 'general', name: '総合運', icon: '⭐' },
];

const fortuneResults = {
  love: [
    { result: '大吉', message: '素敵な出会いが待っています。積極的に行動しましょう！', score: 95 },
    { result: '吉', message: '恋愛運は上昇中。相手の気持ちを大切にして。', score: 80 },
    { result: '中吉', message: '安定した関係が築けそう。焦らずゆっくりと。', score: 70 },
    { result: '小吉', message: '小さな幸せを見つけられる日。感謝の気持ちを忘れずに。', score: 60 },
    { result: '末吉', message: '今は準備の時期。自分磨きに時間をかけて。', score: 45 },
    { result: '凶', message: '誤解が生じやすい時期。コミュニケーションを大切に。', score: 30 },
  ],
  work: [
    { result: '大吉', message: '新しいプロジェクトで大成功！チャンスを逃さないで。', score: 95 },
    { result: '吉', message: '努力が実を結ぶ時。周りからの評価も上がりそう。', score: 80 },
    { result: '中吉', message: '着実に前進できる日。計画的に行動しましょう。', score: 70 },
    { result: '小吉', message: '小さな成果が得られそう。継続が大切です。', score: 60 },
    { result: '末吉', message: '基礎固めの時期。スキルアップに励んで。', score: 45 },
    { result: '凶', message: 'ミスに注意。慎重に行動することが大切です。', score: 30 },
  ],
  money: [
    { result: '大吉', message: '思わぬ臨時収入があるかも！投資のチャンスも。', score: 95 },
    { result: '吉', message: '節約の成果が現れそう。計画的な支出を心がけて。', score: 80 },
    { result: '中吉', message: '安定した金運。無駄遣いを控えめに。', score: 70 },
    { result: '小吉', message: '小さな節約が積み重なる日。コツコツと。', score: 60 },
    { result: '末吉', message: '出費が多めの時期。家計簿をつけて管理を。', score: 45 },
    { result: '凶', message: '無駄遣いに注意。衝動買いは控えましょう。', score: 30 },
  ],
  health: [
    { result: '大吉', message: '体調絶好調！新しい運動を始めるのに最適。', score: 95 },
    { result: '吉', message: '健康運上昇中。バランスの良い食事を心がけて。', score: 80 },
    { result: '中吉', message: '安定した体調。規則正しい生活を続けて。', score: 70 },
    { result: '小吉', message: '軽い運動で体調改善。散歩から始めてみて。', score: 60 },
    { result: '末吉', message: '疲れが溜まりがち。十分な休息を取って。', score: 45 },
    { result: '凶', message: '体調管理に注意。無理は禁物です。', score: 30 },
  ],
  study: [
    { result: '大吉', message: '集中力抜群！難しい課題にも挑戦してみて。', score: 95 },
    { result: '吉', message: '学習効率が上がる時期。新しい分野に挑戦を。', score: 80 },
    { result: '中吉', message: '着実に知識が身につく日。復習を大切に。', score: 70 },
    { result: '小吉', message: '基礎固めに最適。基本から丁寧に学んで。', score: 60 },
    { result: '末吉', message: '集中力が散漫になりがち。環境を整えて。', score: 45 },
    { result: '凶', message: 'やる気が出にくい時期。無理せず休憩も大切。', score: 30 },
  ],
  general: [
    { result: '大吉', message: '全てが順調に進む最高の一日！積極的に行動を。', score: 95 },
    { result: '吉', message: '運気上昇中。新しいことにチャレンジしてみて。', score: 80 },
    { result: '中吉', message: '安定した運気。計画的に物事を進めましょう。', score: 70 },
    { result: '小吉', message: '小さな幸運が舞い込みそう。感謝の気持ちを大切に。', score: 60 },
    { result: '末吉', message: '準備期間として活用を。基盤作りに専念して。', score: 45 },
    { result: '凶', message: '慎重な行動が吉。急がず焦らず進みましょう。', score: 30 },
  ],
};

export default function FortuneSite() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [fortune, setFortune] = useState<any>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [userName, setUserName] = useState('');

  const drawFortune = (type: string) => {
    if (!userName.trim()) {
      alert('お名前を入力してください');
      return;
    }

    setIsDrawing(true);
    setSelectedType(type);
    
    setTimeout(() => {
      const results = fortuneResults[type as keyof typeof fortuneResults];
      const randomIndex = Math.floor(Math.random() * results.length);
      setFortune(results[randomIndex]);
      setIsDrawing(false);
    }, 2000);
  };

  const resetFortune = () => {
    setSelectedType(null);
    setFortune(null);
    setIsDrawing(false);
  };

  const getScoreClass = (score: number) => {
    if (score >= 90) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 50) return 'average';
    return 'poor';
  };

  return (
    <div className="fortune-container">
      <div className="fortune-card">
        <h1 className="fortune-title">✨ 今日の運勢占い ✨</h1>
        <p className="fortune-subtitle">あなたの今日の運勢を占います</p>

        {/* 名前入力 */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', color: 'white', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            お名前を入力してください
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="fortune-input"
            placeholder="山田太郎"
          />
        </div>

        {!selectedType ? (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: '2rem' }}>
              占いたい運勢を選んでください
            </h2>
            <div className="fortune-grid">
              {fortuneTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => drawFortune(type.id)}
                  className="fortune-button"
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{type.icon}</div>
                  <div>{type.name}</div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div>
            {isDrawing ? (
              <div className="loading-animation">
                <div className="loading-spinner">🔮</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  {userName}さんの{fortuneTypes.find(t => t.id === selectedType)?.name}を占っています...
                </h3>
                <div className="loading-dots">
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                </div>
              </div>
            ) : fortune ? (
              <div className="fortune-result">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {fortuneTypes.find(t => t.id === selectedType)?.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  {userName}さんの{fortuneTypes.find(t => t.id === selectedType)?.name}
                </h3>
                <div className={`fortune-score ${getScoreClass(fortune.score)}`}>
                  {fortune.result}
                </div>
                <div className="fortune-result-message">
                  {fortune.message}
                </div>
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ color: 'white', marginBottom: '0.5rem' }}>運勢スコア</div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${fortune.score}%` }}
                    ></div>
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '0.5rem', fontWeight: 'bold' }} className={`fortune-score ${getScoreClass(fortune.score)}`}>
                    {fortune.score}点
                  </div>
                </div>
                <button
                  onClick={resetFortune}
                  className="fortune-button purple"
                >
                  もう一度占う
                </button>
              </div>
            ) : null}
          </div>
        )}

        {/* 追加コンテンツ */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link href="/detailed-fortune" className="link-button">
              🌟 星座別詳細運勢を見る 🌟
            </Link>
          </div>
          <div>
            <Link href="/tarot" className="link-button">
              🔮 タロット占いを試す 🔮
            </Link>
          </div>
        </div>

        {/* フッター */}
        <div style={{ textAlign: 'center', marginTop: '3rem', color: 'rgba(255, 255, 255, 0.7)' }}>
          <p>※ この占いは娯楽目的です。結果は参考程度にお楽しみください。</p>
        </div>
      </div>
    </div>
  );
}