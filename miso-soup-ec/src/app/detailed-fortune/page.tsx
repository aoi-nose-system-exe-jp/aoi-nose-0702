'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const zodiacSigns = [
  { id: 'aries', name: '牡羊座', period: '3/21-4/19', symbol: '♈', color: '#FF6B6B', element: '火' },
  { id: 'taurus', name: '牡牛座', period: '4/20-5/20', symbol: '♉', color: '#4ECDC4', element: '土' },
  { id: 'gemini', name: '双子座', period: '5/21-6/21', symbol: '♊', color: '#45B7D1', element: '風' },
  { id: 'cancer', name: '蟹座', period: '6/22-7/22', symbol: '♋', color: '#96CEB4', element: '水' },
  { id: 'leo', name: '獅子座', period: '7/23-8/22', symbol: '♌', color: '#FFEAA7', element: '火' },
  { id: 'virgo', name: '乙女座', period: '8/23-9/22', symbol: '♍', color: '#DDA0DD', element: '土' },
  { id: 'libra', name: '天秤座', period: '9/23-10/23', symbol: '♎', color: '#FFB6C1', element: '風' },
  { id: 'scorpio', name: '蠍座', period: '10/24-11/22', symbol: '♏', color: '#FF7675', element: '水' },
  { id: 'sagittarius', name: '射手座', period: '11/23-12/21', symbol: '♐', color: '#A29BFE', element: '火' },
  { id: 'capricorn', name: '山羊座', period: '12/22-1/19', symbol: '♑', color: '#6C5CE7', element: '土' },
  { id: 'aquarius', name: '水瓶座', period: '1/20-2/18', symbol: '♒', color: '#74B9FF', element: '風' },
  { id: 'pisces', name: '魚座', period: '2/19-3/20', symbol: '♓', color: '#81ECEC', element: '水' },
];

const detailedFortunes = {
  aries: {
    overall: { score: 85, message: '積極的な行動が幸運を呼び込む日。新しいチャレンジに最適です。' },
    love: { score: 90, message: '恋愛運絶好調！告白やプロポーズに最適な日。' },
    work: { score: 80, message: 'リーダーシップを発揮できる時。チームを引っ張って。' },
    money: { score: 75, message: '投資や新しい収入源を検討するのに良い日。' },
    health: { score: 85, message: '体力充実。スポーツや運動を始めるのに最適。' },
    luckyColor: '赤',
    luckyNumber: 7,
    luckyItem: 'スポーツウェア',
  },
  taurus: {
    overall: { score: 70, message: '安定を求める気持ちが強い日。焦らずじっくりと。' },
    love: { score: 75, message: '安定した関係を築くのに良い日。長期的な視点で。' },
    work: { score: 80, message: '着実な努力が評価される。継続は力なり。' },
    money: { score: 85, message: '貯蓄や資産運用に関して良いアドバイスが得られそう。' },
    health: { score: 70, message: '規則正しい生活を心がけて。食事に気を配って。' },
    luckyColor: '緑',
    luckyNumber: 2,
    luckyItem: '観葉植物',
  },
  gemini: {
    overall: { score: 88, message: 'コミュニケーション運抜群。多くの人との交流を楽しんで。' },
    love: { score: 85, message: '会話が弾む日。相手との距離が縮まりそう。' },
    work: { score: 90, message: '情報収集能力が冴える。ネットワークを活用して。' },
    money: { score: 70, message: '情報を活用した投資が吉。ただし慎重に。' },
    health: { score: 75, message: '頭の回転が良い日。脳トレや読書がおすすめ。' },
    luckyColor: '黄色',
    luckyNumber: 3,
    luckyItem: 'スマートフォン',
  },
  cancer: {
    overall: { score: 78, message: '家族や親しい人との時間を大切にする日。' },
    love: { score: 80, message: '家庭的な魅力が光る。料理を作ってあげると◎' },
    work: { score: 75, message: 'チームワークを重視した働き方が成功の鍵。' },
    money: { score: 70, message: '家計管理を見直すのに良い日。節約を心がけて。' },
    health: { score: 80, message: '心の安定が体調にも良い影響。リラックスを。' },
    luckyColor: '銀色',
    luckyNumber: 4,
    luckyItem: 'キャンドル',
  },
  leo: {
    overall: { score: 92, message: '注目を浴びる日。自信を持って行動しましょう。' },
    love: { score: 95, message: '魅力全開！アプローチされることが多そう。' },
    work: { score: 90, message: 'プレゼンや発表で実力を発揮。堂々と。' },
    money: { score: 80, message: '大胆な投資が功を奏するかも。ただし計画的に。' },
    health: { score: 85, message: '体調良好。美容にも気を配ると更に◎' },
    luckyColor: '金色',
    luckyNumber: 5,
    luckyItem: 'アクセサリー',
  },
  virgo: {
    overall: { score: 82, message: '細かい作業や分析が得意な日。完璧主義が活かされる。' },
    love: { score: 75, message: '相手への気遣いが評価される。小さな優しさを。' },
    work: { score: 90, message: '品質管理や改善提案で評価アップ。' },
    money: { score: 85, message: '家計簿や資産管理を見直すのに最適。' },
    health: { score: 80, message: '健康管理に意識が向く。検診を受けるのも◎' },
    luckyColor: '紺色',
    luckyNumber: 6,
    luckyItem: '手帳',
  },
  libra: {
    overall: { score: 86, message: 'バランス感覚が冴える日。調和を大切に。' },
    love: { score: 90, message: '美的センスが恋愛運をアップ。おしゃれに気を配って。' },
    work: { score: 80, message: '調整役として活躍。みんなの意見をまとめて。' },
    money: { score: 75, message: '美容や芸術関連の出費は吉。自分への投資を。' },
    health: { score: 85, message: 'バランスの良い食事と適度な運動を心がけて。' },
    luckyColor: 'ピンク',
    luckyNumber: 7,
    luckyItem: '香水',
  },
  scorpio: {
    overall: { score: 79, message: '直感力が冴える日。第六感を信じて行動を。' },
    love: { score: 85, message: '深い絆を求める気持ちが強い。真剣な交際に発展も。' },
    work: { score: 80, message: '集中力抜群。研究や調査で成果を上げられそう。' },
    money: { score: 90, message: '投資の嗅覚が鋭い日。隠れた優良株を見つけるかも。' },
    health: { score: 75, message: 'ストレス発散を心がけて。瞑想やヨガがおすすめ。' },
    luckyColor: '深紅',
    luckyNumber: 8,
    luckyItem: 'パワーストーン',
  },
  sagittarius: {
    overall: { score: 91, message: '冒険心旺盛な日。新しい場所や体験を求めて。' },
    love: { score: 80, message: '遠距離恋愛や国際的な出会いに縁がありそう。' },
    work: { score: 85, message: '海外展開や新規事業で力を発揮。視野を広く。' },
    money: { score: 75, message: '旅行や学習への投資が将来の利益につながる。' },
    health: { score: 90, message: 'アウトドア活動で心身ともにリフレッシュ。' },
    luckyColor: '紫',
    luckyNumber: 9,
    luckyItem: '地図',
  },
  capricorn: {
    overall: { score: 84, message: '責任感が評価される日。リーダーとしての資質を発揮。' },
    love: { score: 70, message: '真面目な交際を望む気持ちが強い。将来を見据えて。' },
    work: { score: 95, message: '昇進や昇格のチャンス。実績をアピールして。' },
    money: { score: 90, message: '長期投資や不動産に関して良い情報が。' },
    health: { score: 75, message: '規則正しい生活が体調安定の鍵。早寝早起きを。' },
    luckyColor: '茶色',
    luckyNumber: 10,
    luckyItem: 'スーツ',
  },
  aquarius: {
    overall: { score: 87, message: '独創性が光る日。ユニークなアイデアで注目を。' },
    love: { score: 75, message: '友達から恋人への発展が期待できる。' },
    work: { score: 90, message: '革新的な提案で職場に新風を。IT関連が特に◎' },
    money: { score: 80, message: '仮想通貨や新しい投資商品に注目。情報収集を。' },
    health: { score: 85, message: '最新の健康法やフィットネスを試してみて。' },
    luckyColor: '水色',
    luckyNumber: 11,
    luckyItem: 'タブレット',
  },
  pisces: {
    overall: { score: 83, message: '直感と感性が冴える日。芸術的な活動に最適。' },
    love: { score: 95, message: 'ロマンチックな出会いや展開が期待できる。' },
    work: { score: 75, message: 'クリエイティブな仕事で才能を発揮。感性を活かして。' },
    money: { score: 70, message: '芸術品や美容関連への投資が吉。直感を信じて。' },
    health: { score: 80, message: '水に関する活動が◎。入浴やスイミングでリラックス。' },
    luckyColor: '海色',
    luckyNumber: 12,
    luckyItem: 'アロマオイル',
  },
};

export default function DetailedFortune() {
  const [selectedSign, setSelectedSign] = useState<string | null>(null);

  return (
    <div className="fortune-container">
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5)); }
          50% { filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.8)); }
        }
      `}</style>

      {/* 背景の星 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(2px 2px at 20px 30px, #eee, transparent),
          radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
          radial-gradient(1px 1px at 90px 40px, #fff, transparent),
          radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
          radial-gradient(2px 2px at 160px 30px, #ddd, transparent)
        `,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 100px',
        animation: 'twinkle 4s ease-in-out infinite alternate',
        zIndex: 1
      }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* ヘッダー */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Link href="/" className="back-link">
            ← トップページに戻る
          </Link>
          <h1 className="fortune-title" style={{
            background: 'linear-gradient(45deg, #FFD700, #FFA500, #FF69B4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🌟 星座別詳細運勢 🌟
          </h1>
          <p className="fortune-subtitle">
            あなたの星座を選んで詳しい運勢をチェック
          </p>
        </div>

        {!selectedSign ? (
          /* 星座選択画面 */
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="fortune-grid" style={{ gap: '1.5rem', padding: '2rem' }}>
              {zodiacSigns.map((sign) => (
                <button
                  key={sign.id}
                  onClick={() => setSelectedSign(sign.id)}
                  className="fortune-button"
                  style={{
                    background: `linear-gradient(135deg, ${sign.color}20, ${sign.color}40)`,
                    border: `2px solid ${sign.color}60`,
                    boxShadow: `0 8px 32px ${sign.color}30`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-50%',
                    width: '200%',
                    height: '200%',
                    background: `conic-gradient(from 0deg, transparent, ${sign.color}20, transparent)`,
                    animation: 'rotate 8s linear infinite',
                    zIndex: 1
                  }} />
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{sign.symbol}</div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                      {sign.name}
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>
                      {sign.period}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      background: `${sign.color}40`,
                      padding: '0.25rem 0.5rem',
                      borderRadius: '1rem',
                      display: 'inline-block'
                    }}>
                      {sign.element}の星座
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* 詳細運勢表示 */
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="fortune-card" style={{
              borderRadius: '2rem',
              padding: '3rem',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* 装飾的な背景要素 */}
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                background: `radial-gradient(circle, ${zodiacSigns.find(s => s.id === selectedSign)?.color}30, transparent)`,
                borderRadius: '50%',
                animation: 'float 6s ease-in-out infinite'
              }} />

              <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 2 }}>
                <div style={{
                  fontSize: '6rem',
                  marginBottom: '1rem',
                  animation: 'glow 3s ease-in-out infinite alternate'
                }}>
                  {zodiacSigns.find(s => s.id === selectedSign)?.symbol}
                </div>
                <h2 style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '0.5rem',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                }}>
                  {zodiacSigns.find(s => s.id === selectedSign)?.name}
                </h2>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1.1rem'
                }}>
                  {zodiacSigns.find(s => s.id === selectedSign)?.period}
                </p>
              </div>

              {/* 総合運 */}
              <div style={{ marginBottom: '3rem', position: 'relative', zIndex: 2 }}>
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  ⭐ 総合運: {detailedFortunes[selectedSign as keyof typeof detailedFortunes].overall.score}点
                </h3>
                <p style={{
                  color: 'white',
                  fontSize: '1.2rem',
                  lineHeight: '1.8',
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  {detailedFortunes[selectedSign as keyof typeof detailedFortunes].overall.message}
                </p>
              </div>

              {/* 各運勢 */}
              <div className="fortune-grid" style={{ marginBottom: '3rem', position: 'relative', zIndex: 2 }}>
                {[
                  { key: 'love', name: '恋愛運', icon: '💕', color: '#FF69B4' },
                  { key: 'work', name: '仕事運', icon: '💼', color: '#4169E1' },
                  { key: 'money', name: '金運', icon: '💰', color: '#FFD700' },
                  { key: 'health', name: '健康運', icon: '🍀', color: '#32CD32' },
                ].map((category) => {
                  const fortune = detailedFortunes[selectedSign as keyof typeof detailedFortunes];
                  const categoryData = fortune[category.key as keyof typeof fortune] as { score: number; message: string };
                  
                  return (
                    <div key={category.key} style={{
                      background: `linear-gradient(135deg, ${category.color}20, rgba(255, 255, 255, 0.1))`,
                      borderRadius: '1.5rem',
                      padding: '2rem',
                      border: `1px solid ${category.color}40`,
                      boxShadow: `0 10px 30px ${category.color}20`
                    }}>
                      <h4 style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: 'white',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <span>{category.icon} {category.name}</span>
                        <span style={{ color: category.color }}>{categoryData.score}点</span>
                      </h4>
                      <div className="progress-bar" style={{ marginBottom: '1rem' }}>
                        <div style={{
                          width: `${categoryData.score}%`,
                          background: `linear-gradient(90deg, ${category.color}, ${category.color}80)`,
                          height: '100%',
                          borderRadius: '1rem',
                          boxShadow: `0 0 10px ${category.color}60`
                        }} />
                      </div>
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '0.95rem',
                        lineHeight: '1.6'
                      }}>
                        {categoryData.message}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* ラッキーアイテム */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 105, 180, 0.3))',
                borderRadius: '2rem',
                padding: '2.5rem',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 15px 45px rgba(255, 215, 0, 0.2)',
                position: 'relative',
                zIndex: 2,
                marginBottom: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  🍀 今日のラッキーアイテム
                </h3>
                <div className="fortune-grid">
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎨</div>
                    <div style={{ color: 'white', fontWeight: 'bold', marginBottom: '0.5rem' }}>ラッキーカラー</div>
                    <div style={{ color: zodiacSigns.find(s => s.id === selectedSign)?.color, fontSize: '1.1rem', fontWeight: 'bold' }}>
                      {detailedFortunes[selectedSign as keyof typeof detailedFortunes].luckyColor}
                    </div>
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔢</div>
                    <div style={{ color: 'white', fontWeight: 'bold', marginBottom: '0.5rem' }}>ラッキーナンバー</div>
                    <div style={{ color: zodiacSigns.find(s => s.id === selectedSign)?.color, fontSize: '1.5rem', fontWeight: 'bold' }}>
                      {detailedFortunes[selectedSign as keyof typeof detailedFortunes].luckyNumber}
                    </div>
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✨</div>
                    <div style={{ color: 'white', fontWeight: 'bold', marginBottom: '0.5rem' }}>ラッキーアイテム</div>
                    <div style={{ color: zodiacSigns.find(s => s.id === selectedSign)?.color, fontSize: '1.1rem', fontWeight: 'bold' }}>
                      {detailedFortunes[selectedSign as keyof typeof detailedFortunes].luckyItem}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => setSelectedSign(null)}
                  className="fortune-button purple"
                  style={{ marginRight: '1rem' }}
                >
                  他の星座を見る
                </button>
                <Link href="/" className="link-button">
                  トップページに戻る
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}