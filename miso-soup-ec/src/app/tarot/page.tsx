'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const tarotCards = [
  { id: 0, name: '愚者', meaning: '新しい始まり、冒険心、自由', reversed: '軽率、無責任、混乱' },
  { id: 1, name: '魔術師', meaning: '意志力、創造性、技術', reversed: '操作、詐欺、能力不足' },
  { id: 2, name: '女教皇', meaning: '直感、神秘、内なる知恵', reversed: '秘密、隠蔽、直感の欠如' },
  { id: 3, name: '女帝', meaning: '豊穣、母性、創造', reversed: '依存、過保護、創造性の欠如' },
  { id: 4, name: '皇帝', meaning: '権威、安定、統制', reversed: '独裁、頑固、権力の乱用' },
  { id: 5, name: '教皇', meaning: '伝統、教育、精神的指導', reversed: '独断、偏見、精神的混乱' },
  { id: 6, name: '恋人', meaning: '愛、調和、選択', reversed: '不調和、誘惑、間違った選択' },
  { id: 7, name: '戦車', meaning: '勝利、意志力、前進', reversed: '敗北、方向性の欠如、暴走' },
  { id: 8, name: '力', meaning: '内なる力、勇気、忍耐', reversed: '弱さ、自信の欠如、暴力' },
  { id: 9, name: '隠者', meaning: '内省、導き、孤独', reversed: '孤立、頑固、導きの拒否' },
  { id: 10, name: '運命の輪', meaning: '運命、変化、サイクル', reversed: '不運、停滞、悪循環' },
  { id: 11, name: '正義', meaning: '公正、バランス、真実', reversed: '不公正、偏見、不誠実' },
  { id: 12, name: '吊られた男', meaning: '犠牲、忍耐、新しい視点', reversed: '無駄な犠牲、頑固、停滞' },
  { id: 13, name: '死神', meaning: '変化、終了、再生', reversed: '停滞、変化への抵抗、腐敗' },
  { id: 14, name: '節制', meaning: 'バランス、調和、節度', reversed: '不調和、過度、不節制' },
  { id: 15, name: '悪魔', meaning: '誘惑、束縛、物質主義', reversed: '解放、自由、精神的成長' },
  { id: 16, name: '塔', meaning: '破壊、啓示、突然の変化', reversed: '内なる混乱、変化への抵抗、災難の回避' },
  { id: 17, name: '星', meaning: '希望、インスピレーション、癒し', reversed: '絶望、失望、方向性の欠如' },
  { id: 18, name: '月', meaning: '幻想、不安、潜在意識', reversed: '真実の発見、不安の解消、明晰さ' },
  { id: 19, name: '太陽', meaning: '成功、喜び、活力', reversed: '失敗、悲しみ、エネルギー不足' },
  { id: 20, name: '審判', meaning: '復活、許し、新生', reversed: '自己批判、許しの欠如、過去への執着' },
  { id: 21, name: '世界', meaning: '完成、達成、統合', reversed: '未完成、停滞、目標の欠如' },
];

export default function TarotPage() {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isReading, setIsReading] = useState(false);
  const [reading, setReading] = useState<any>(null);
  const [question, setQuestion] = useState('');

  const selectCard = (cardIndex: number) => {
    if (selectedCards.length < 3 && !selectedCards.includes(cardIndex)) {
      setSelectedCards([...selectedCards, cardIndex]);
    }
  };

  const performReading = () => {
    if (selectedCards.length !== 3 || !question.trim()) {
      alert('質問を入力し、3枚のカードを選んでください');
      return;
    }

    setIsReading(true);
    
    setTimeout(() => {
      const cards = selectedCards.map((index, position) => {
        const card = tarotCards[index];
        const isReversed = Math.random() > 0.5;
        return {
          ...card,
          position: ['過去', '現在', '未来'][position],
          isReversed,
          interpretation: generateInterpretation(card, isReversed, position),
        };
      });

      setReading({
        cards,
        overallMessage: generateOverallMessage(cards),
      });
      setIsReading(false);
    }, 3000);
  };

  const generateInterpretation = (card: any, isReversed: boolean, position: number) => {
    const meanings = isReversed ? card.reversed : card.meaning;
    const positionTexts = [
      `過去において、${meanings.toLowerCase()}の影響がありました。`,
      `現在、あなたは${meanings.toLowerCase()}の状況にあります。`,
      `未来には、${meanings.toLowerCase()}の展開が待っています。`,
    ];
    return positionTexts[position];
  };

  const generateOverallMessage = (cards: any[]) => {
    const messages = [
      'カードが示すように、過去の経験を活かして現在の課題に取り組み、明るい未来を築いていけるでしょう。',
      '過去から現在、そして未来へと続く流れの中で、重要な変化の時期を迎えています。',
      'カードのメッセージを心に留めて、自分の直感を信じて行動することが大切です。',
      '過去の学びと現在の状況を踏まえ、未来に向けて積極的に歩んでいきましょう。',
      'カードが教えてくれる智恵を日常生活に活かし、より良い選択をしていけるはずです。',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const resetReading = () => {
    setSelectedCards([]);
    setReading(null);
    setIsReading(false);
    setQuestion('');
  };

  return (
    <div className="fortune-container" style={{
      background: 'linear-gradient(135deg, #2c1810 0%, #8b4513 25%, #4b0082 50%, #191970 75%, #000080 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style jsx>{`
        @keyframes mysticalGlow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(138, 43, 226, 0.5), 0 0 40px rgba(75, 0, 130, 0.3);
          }
          50% { 
            box-shadow: 0 0 30px rgba(138, 43, 226, 0.8), 0 0 60px rgba(75, 0, 130, 0.5);
          }
        }
        @keyframes cardFlip {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(90deg); }
          100% { transform: rotateY(0deg); }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(2deg); }
          50% { transform: translateY(-5px) rotate(0deg); }
          75% { transform: translateY(-15px) rotate(-2deg); }
        }
        @keyframes crystalBall {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            filter: hue-rotate(0deg);
          }
          50% { 
            transform: scale(1.1) rotate(180deg);
            filter: hue-rotate(180deg);
          }
        }
        .tarot-card {
          background: linear-gradient(145deg, #2c1810, #8b4513);
          border: 2px solid #daa520;
          border-radius: 15px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .tarot-card:hover {
          transform: translateY(-10px) scale(1.05);
          animation: mysticalGlow 2s ease-in-out infinite;
        }
        .tarot-card.selected {
          background: linear-gradient(145deg, #4b0082, #8a2be2);
          border-color: #ffd700;
          animation: mysticalGlow 2s ease-in-out infinite;
        }
      `}</style>

      {/* 神秘的な背景パーティクル */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: '4px',
            height: '4px',
            background: 'radial-gradient(circle, #ffd700, transparent)',
            borderRadius: '50%',
            animation: `mysticalParticles ${8 + Math.random() * 4}s linear infinite`,
            animationDelay: `${Math.random() * 8}s`,
            zIndex: 1
          }}
        />
      ))}

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* ヘッダー */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Link href="/" className="back-link">
            ← トップページに戻る
          </Link>
          <h1 className="fortune-title" style={{
            background: 'linear-gradient(45deg, #ffd700, #ff69b4, #8a2be2, #4169e1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🔮 タロット占い 🔮
          </h1>
          <p className="fortune-subtitle">
            3枚のカードで過去・現在・未来を占います
          </p>
        </div>

        {!reading ? (
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* 質問入力 */}
            <div className="fortune-card" style={{
              background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.3), rgba(75, 0, 130, 0.3))',
              border: '2px solid rgba(218, 165, 32, 0.5)',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: 'bold',
                color: '#ffd700',
                marginBottom: '1rem',
                textAlign: 'center',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
              }}>
                🌟 質問を入力してください 🌟
              </h2>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="fortune-input"
                style={{
                  background: 'linear-gradient(135deg, rgba(44, 24, 16, 0.8), rgba(75, 0, 130, 0.8))',
                  border: '2px solid rgba(218, 165, 32, 0.5)',
                  color: '#ffd700',
                  fontSize: '1.1rem',
                  minHeight: '100px',
                  resize: 'vertical'
                }}
                rows={3}
                placeholder="例：今の恋愛はうまくいくでしょうか？"
              />
            </div>

            {isReading ? (
              /* 占い中アニメーション */
              <div className="fortune-card" style={{
                background: 'linear-gradient(135deg, rgba(75, 0, 130, 0.4), rgba(138, 43, 226, 0.4))',
                border: '2px solid rgba(255, 215, 0, 0.6)',
                textAlign: 'center',
                padding: '4rem'
              }}>
                <div style={{
                  fontSize: '6rem',
                  marginBottom: '2rem',
                  animation: 'crystalBall 3s ease-in-out infinite'
                }}>🔮</div>
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#ffd700',
                  marginBottom: '2rem',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}>
                  カードを読み取っています...
                </h3>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem',
                  marginTop: '2rem'
                }}>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: '80px',
                        height: '120px',
                        background: 'linear-gradient(145deg, #2c1810, #8b4513)',
                        borderRadius: '15px',
                        border: '2px solid #daa520',
                        animation: `floatCard 2s ease-in-out infinite`,
                        animationDelay: `${i * 0.3}s`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem'
                      }}
                    >
                      🎴
                    </div>
                  ))}
                </div>
                <div className="loading-dots" style={{ marginTop: '2rem' }}>
                  <div className="loading-dot" style={{ background: '#ffd700' }}></div>
                  <div className="loading-dot" style={{ background: '#ff69b4' }}></div>
                  <div className="loading-dot" style={{ background: '#8a2be2' }}></div>
                </div>
              </div>
            ) : (
              <>
                {/* カード選択 */}
                <div className="fortune-card" style={{
                  background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.3), rgba(75, 0, 130, 0.3))',
                  border: '2px solid rgba(218, 165, 32, 0.5)',
                  marginBottom: '2rem'
                }}>
                  <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: 'bold',
                    color: '#ffd700',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                  }}>
                    ✨ 3枚のカードを選んでください ({selectedCards.length}/3) ✨
                  </h2>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                    gap: '1rem',
                    maxHeight: '400px',
                    overflowY: 'auto',
                    padding: '1rem'
                  }}>
                    {Array.from({ length: 22 }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => selectCard(i)}
                        disabled={selectedCards.includes(i) || selectedCards.length >= 3}
                        className={`tarot-card ${selectedCards.includes(i) ? 'selected' : ''}`}
                        style={{
                          aspectRatio: '2/3',
                          cursor: selectedCards.includes(i) || selectedCards.length >= 3 ? 'not-allowed' : 'pointer',
                          opacity: selectedCards.length >= 3 && !selectedCards.includes(i) ? 0.5 : 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '0.5rem'
                        }}
                      >
                        {selectedCards.includes(i) ? (
                          <div style={{ textAlign: 'center', color: '#ffd700' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✨</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                              {selectedCards.indexOf(i) + 1}
                            </div>
                          </div>
                        ) : (
                          <div style={{ textAlign: 'center', color: '#daa520' }}>
                            <div style={{ fontSize: '2rem' }}>🎴</div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 選択されたカード表示 */}
                {selectedCards.length > 0 && (
                  <div className="fortune-card" style={{
                    background: 'linear-gradient(135deg, rgba(75, 0, 130, 0.3), rgba(138, 43, 226, 0.3))',
                    border: '2px solid rgba(255, 215, 0, 0.5)',
                    marginBottom: '2rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#ffd700',
                      marginBottom: '2rem',
                      textAlign: 'center'
                    }}>
                      🌟 選択されたカード 🌟
                    </h3>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '2rem',
                      flexWrap: 'wrap'
                    }}>
                      {selectedCards.map((cardIndex, position) => (
                        <div key={position} style={{ textAlign: 'center' }}>
                          <div style={{
                            width: '100px',
                            height: '150px',
                            background: 'linear-gradient(145deg, #4b0082, #8a2be2)',
                            borderRadius: '15px',
                            border: '3px solid #ffd700',
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)'
                          }}>
                            <span style={{ fontSize: '3rem', color: '#ffd700' }}>🎴</span>
                          </div>
                          <div style={{
                            color: '#ffd700',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
                          }}>
                            {['過去', '現在', '未来'][position]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 占い実行ボタン */}
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={performReading}
                    disabled={selectedCards.length !== 3 || !question.trim()}
                    className="fortune-button"
                    style={{
                      background: selectedCards.length === 3 && question.trim() 
                        ? 'linear-gradient(45deg, #8a2be2, #4b0082, #191970)' 
                        : 'linear-gradient(45deg, #666, #444)',
                      border: '3px solid #ffd700',
                      fontSize: '1.25rem',
                      padding: '1.5rem 3rem',
                      boxShadow: selectedCards.length === 3 && question.trim() 
                        ? '0 10px 30px rgba(138, 43, 226, 0.5)' 
                        : 'none'
                    }}
                  >
                    🔮 タロット占いを開始 🔮
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          /* 結果表示 */
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="fortune-card" style={{
              background: 'linear-gradient(135deg, rgba(44, 24, 16, 0.4), rgba(75, 0, 130, 0.4))',
              border: '3px solid rgba(255, 215, 0, 0.8)',
              padding: '3rem',
              boxShadow: '0 20px 60px rgba(138, 43, 226, 0.4)'
            }}>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#ffd700',
                textAlign: 'center',
                marginBottom: '2rem',
                textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)'
              }}>
                🔮 占い結果 🔮
              </h2>
              
              <div style={{
                background: 'rgba(255, 215, 0, 0.1)',
                padding: '2rem',
                borderRadius: '1rem',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                marginBottom: '3rem'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#ffd700',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  💫 あなたの質問 💫
                </h3>
                <p style={{
                  color: '#fff',
                  fontSize: '1.2rem',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  lineHeight: '1.6'
                }}>
                  "{question}"
                </p>
              </div>

              {/* カード結果 */}
              <div className="fortune-grid" style={{ marginBottom: '3rem' }}>
                {reading.cards.map((card: any, index: number) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.4), rgba(75, 0, 130, 0.4))',
                    borderRadius: '2rem',
                    padding: '2rem',
                    textAlign: 'center',
                    border: '2px solid rgba(218, 165, 32, 0.6)',
                    boxShadow: '0 15px 45px rgba(138, 43, 226, 0.3)'
                  }}>
                    <h4 style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#ffd700',
                      marginBottom: '1rem',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                    }}>
                      {card.position}
                    </h4>
                    <div style={{
                      width: '120px',
                      height: '180px',
                      background: card.isReversed 
                        ? 'linear-gradient(145deg, #8b0000, #dc143c)' 
                        : 'linear-gradient(145deg, #4b0082, #8a2be2)',
                      borderRadius: '15px',
                      margin: '0 auto 2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '3px solid #ffd700',
                      boxShadow: '0 10px 30px rgba(255, 215, 0, 0.4)',
                      transform: card.isReversed ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}>
                      <div style={{
                        color: '#ffd700',
                        fontSize: '2.5rem',
                        marginBottom: '0.5rem'
                      }}>
                        🎴
                      </div>
                      <div style={{
                        color: '#ffd700',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        transform: card.isReversed ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}>
                        {card.name}
                      </div>
                    </div>
                    <h5 style={{
                      color: '#ffd700',
                      fontWeight: 'bold',
                      marginBottom: '1rem',
                      fontSize: '1.2rem'
                    }}>
                      {card.name} {card.isReversed ? '(逆位置)' : ''}
                    </h5>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '1rem',
                      lineHeight: '1.6',
                      background: 'rgba(0, 0, 0, 0.3)',
                      padding: '1rem',
                      borderRadius: '0.5rem'
                    }}>
                      {card.interpretation}
                    </p>
                  </div>
                ))}
              </div>

              {/* 総合メッセージ */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 105, 180, 0.2))',
                borderRadius: '2rem',
                padding: '3rem',
                border: '2px solid rgba(255, 215, 0, 0.6)',
                boxShadow: '0 20px 60px rgba(255, 215, 0, 0.3)',
                marginBottom: '3rem'
              }}>
                <h3 style={{
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  color: '#ffd700',
                  marginBottom: '2rem',
                  textAlign: 'center',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}>
                  ✨ 総合メッセージ ✨
                </h3>
                <p style={{
                  color: 'white',
                  fontSize: '1.2rem',
                  lineHeight: '1.8',
                  textAlign: 'center',
                  background: 'rgba(0, 0, 0, 0.2)',
                  padding: '2rem',
                  borderRadius: '1rem'
                }}>
                  {reading.overallMessage}
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={resetReading}
                  className="fortune-button purple"
                  style={{
                    background: 'linear-gradient(45deg, #8a2be2, #4b0082)',
                    border: '2px solid #ffd700',
                    marginRight: '1rem'
                  }}
                >
                  もう一度占う
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