import {
  VaderSentiment,
  SentimentClassificationReport,
  EmotionScore
} from '../../src/types.js';

export const VADER_LEXICON: Record<string, number> = {
  'great': 3.1,
  'excellent': 3.4,
  'good': 1.9,
  'best': 3.2,
  'better': 1.5,
  'awesome': 3.1,
  'fantastic': 3.3,
  'wonderful': 3.2,
  'amazing': 3.3,
  'love': 3.2,
  'loved': 3.0,
  'happy': 2.7,
  'glad': 2.1,
  'joy': 2.8,
  'success': 2.8,
  'successful': 2.9,
  'proud': 2.2,
  'congrats': 2.5,
  'congratulations': 2.8,
  'innovative': 2.4,
  'progress': 1.8,
  'promising': 2.0,
  'valuable': 2.1,
  'win': 2.8,
  'winner': 2.9,
  'winning': 2.7,
  'perfect': 3.0,
  'superb': 3.1,
  'thrilled': 3.0,
  'excited': 2.6,
  'brilliant': 3.0,
  'fabulous': 2.9,
  'efficient': 2.2,
  'productive': 2.4,
  'delight': 2.9,
  'delighted': 2.9,
  'helpful': 2.1,
  'supportive': 2.0,
  'admire': 2.3,
  'accomplish': 2.4,
  'achieve': 2.3,
  'achievement': 2.7,
  'benefit': 2.0,
  'beneficial': 2.2,
  'collaborative': 2.1,
  'reliable': 2.3,
  'growth': 2.0,
  'improve': 2.0,
  'improvement': 2.1,
  'positive': 2.1,
  'solid': 1.6,
  'smooth': 1.8,
  'launch': 1.7,
  'celebrate': 2.7,
  'opportunity': 1.9,
  'inspire': 2.6,

  'bad': -2.5,
  'terrible': -3.4,
  'horrible': -3.4,
  'awful': -3.2,
  'poor': -1.9,
  'fail': -2.5,
  'failed': -2.6,
  'failure': -2.8,
  'failing': -2.4,
  'bug': -1.8,
  'bugs': -1.9,
  'defect': -2.1,
  'defects': -2.2,
  'delay': -1.7,
  'delayed': -1.9,
  'delays': -1.8,
  'error': -1.7,
  'errors': -1.8,
  'crash': -2.4,
  'crashed': -2.5,
  'blocker': -2.3,
  'blockers': -2.4,
  'blocked': -2.0,
  'risk': -1.8,
  'risks': -1.9,
  'concern': -1.6,
  'concerns': -1.7,
  'worried': -2.1,
  'worry': -2.0,
  'stress': -2.2,
  'stressed': -2.3,
  'frustrated': -2.4,
  'frustration': -2.5,
  'disappointed': -2.6,
  'disappointing': -2.5,
  'angry': -2.6,
  'hate': -3.2,
  'hated': -3.1,
  'hurt': -2.4,
  'problem': -1.8,
  'problems': -1.9,
  'issue': -1.5,
  'issues': -1.6,
  'struggle': -2.0,
  'struggling': -2.1,
  'severe': -2.3,
  'critical': -1.8,
  'broken': -2.1,
  'slow': -1.3,
  'mess': -2.2,
  'crisis': -3.1,
  'disaster': -3.3,
  'chaos': -2.7,
  'negative': -2.0,
  'conflict': -2.1,
  'loss': -2.3,
  'lost': -2.1,
  'bottleneck': -2.0
};

export const BOOSTER_DICT: Record<string, number> = {
  'absolutely': 0.293,
  'amazingly': 0.293,
  'awfully': 0.273,
  'completely': 0.293,
  'considerably': 0.293,
  'decidedly': 0.293,
  'deeply': 0.293,
  'effing': 0.293,
  'enormously': 0.293,
  'entirely': 0.293,
  'especially': 0.293,
  'exceptionally': 0.293,
  'extremely': 0.393,
  'fabulously': 0.293,
  'flipping': 0.293,
  'flippin': 0.293,
  'fricking': 0.293,
  'frickin': 0.293,
  'fully': 0.293,
  'greatly': 0.293,
  'highly': 0.333,
  'hugely': 0.293,
  'incredibly': 0.353,
  'intensely': 0.293,
  'majorly': 0.293,
  'more': 0.150,
  'most': 0.250,
  'particularly': 0.293,
  'purely': 0.293,
  'quite': 0.150,
  'really': 0.280,
  'remarkably': 0.293,
  'so': 0.250,
  'substantially': 0.293,
  'thoroughly': 0.293,
  'totally': 0.293,
  'tremendously': 0.293,
  'uber': 0.293,
  'unbelievably': 0.333,
  'unusually': 0.293,
  'utterly': 0.293,
  'very': 0.313,

  'almost': -0.15,
  'barely': -0.25,
  'hardly': -0.25,
  'just': -0.10,
  'kinda': -0.15,
  'kindof': -0.15,
  'kind of': -0.15,
  'partly': -0.15,
  'scarcely': -0.20,
  'slightly': -0.20,
  'somewhat': -0.15,
  'sortof': -0.15,
  'sort of': -0.15
};

export const NEGATE_WORDS = new Set([
  'not',
  'no',
  'never',
  'hardly',
  'scarcely',
  'barely',
  'without',
  'rarely',
  'seldom',
  'despite',
  'neither',
  'nor',
  'nowhere',
  'nothing',
  'cannot',
  'cant',
  'can\'t',
  'don\'t',
  'dont',
  'didn\'t',
  'didnt',
  'won\'t',
  'wont',
  'wouldn\'t',
  'wouldnt',
  'shouldn\'t',
  'shouldnt',
  'isn\'t',
  'isnt',
  'aren\'t',
  'arent',
  'wasn\'t',
  'wasnt',
  'weren\'t',
  'werent',
  'hasn\'t',
  'hasnt',
  'haven\'t',
  'havent'
]);

export function normalize(
  score: number,
  alpha: number = 15
): number {
  const norm =
    score / Math.sqrt((score * score) + alpha);

  return Number(
    Math.max(-1.0, Math.min(1.0, norm))
      .toFixed(4)
  );
}

export function analyzeVader(
  text: string
): VaderSentiment {

  if (!text || !text.trim()) {
    return {
      compound: 0,
      pos: 0,
      neu: 1,
      neg: 0,
      label: 'Neutral',
      explanation: ['Empty text']
    };
  }

  const explanations: string[] = [];
  const words = text.split(/\s+/);
  const sentiments: number[] = [];

  const butIndex =
    words.findIndex(
      w => w.toLowerCase() === 'but'
    );

  const hasBut = butIndex !== -1;

  for (let i = 0; i < words.length; i++) {

    const rawWord = words[i];

    const cleanWord =
      rawWord
        .toLowerCase()
        .replace(/^[^\w]+|[^\w]+$/g, '');

    if (!cleanWord) continue;

    let valence =
      VADER_LEXICON[cleanWord] || 0;

    if (valence !== 0) {

      const isAllCap =
        rawWord === rawWord.toUpperCase() &&
        rawWord.length > 1;

      if (isAllCap) {
        if (valence > 0)
          valence += 0.733;
        else
          valence -= 0.733;

        explanations.push(
          `ALL-CAPS boost on "${rawWord}"`
        );
      }

      for (
        let lookback = 1;
        lookback <= 3;
        lookback++
      ) {

        if (i - lookback >= 0) {

          const prevWord =
            words[i - lookback]
              .toLowerCase()
              .replace(/^[^\w]+|[^\w]+$/g, '');

          if (BOOSTER_DICT[prevWord]) {

            let b =
              BOOSTER_DICT[prevWord];

            if (valence < 0)
              b = -b;

            valence += b;

            explanations.push(
              `Booster "${prevWord}" modified "${cleanWord}" by ${b.toFixed(2)}`
            );
          }
        }
      }

      let isNegated = false;

      for (
        let lookback = 1;
        lookback <= 3;
        lookback++
      ) {

        if (i - lookback >= 0) {

          const prevWord =
            words[i - lookback]
              .toLowerCase()
              .replace(/^[^\w]+|[^\w]+$/g, '');

          if (NEGATE_WORDS.has(prevWord)) {
            isNegated = true;
            break;
          }
        }
      }

      if (isNegated) {

        valence = valence * -0.74;

        explanations.push(
          `Negation detected before "${cleanWord}", flipped valence`
        );
      }

      if (hasBut) {

        if (i < butIndex)
          valence *= 0.5;
        else if (i > butIndex)
          valence *= 1.5;
      }

      sentiments.push(valence);
    }
  }

  const exclamationCount =
    (text.match(/!/g) || []).length;

  const punctAmplifier =
    Math.min(
      exclamationCount * 0.292,
      0.876
    );

  let sum =
    sentiments.reduce(
      (acc, val) => acc + val,
      0
    );

  if (sum > 0)
    sum += punctAmplifier;
  else if (sum < 0)
    sum -= punctAmplifier;

  const compound = normalize(sum);

  let posSum = 0;
  let negSum = 0;
  let neuCount = 0;

  for (const s of sentiments) {

    if (s > 0.05)
      posSum += s + 1;

    else if (s < -0.05)
      negSum += Math.abs(s - 1);

    else
      neuCount += 1;
  }

  const nonValenceWords =
    Math.max(
      0,
      words.length - sentiments.length
    );

  neuCount += nonValenceWords;

  const total =
    posSum + negSum + neuCount;

  let pos =
    total > 0
      ? Number((posSum / total).toFixed(3))
      : 0;

  let neg =
    total > 0
      ? Number((negSum / total).toFixed(3))
      : 0;

  let neu =
    total > 0
      ? Number((neuCount / total).toFixed(3))
      : 1;

  const sumScores =
    pos + neg + neu;

  if (sumScores > 0) {

    pos =
      Number(
        (pos / sumScores).toFixed(3)
      );

    neg =
      Number(
        (neg / sumScores).toFixed(3)
      );

    neu =
      Number(
        Math.max(
          0,
          1 - (pos + neg)
        ).toFixed(3)
      );
  }

  let label:
    'Positive' |
    'Neutral' |
    'Negative' = 'Neutral';

  if (compound >= 0.05)
    label = 'Positive';

  else if (compound <= -0.05)
    label = 'Negative';

  return {
    compound,
    pos,
    neu,
    neg,
    label,
    explanation:
      explanations.slice(0, 5)
  };
}

export function extractEmotions(
  text: string,
  vader: VaderSentiment
): EmotionScore {

  const lower =
    text.toLowerCase();

  const joyWords = [
    'happy',
    'delight',
    'glad',
    'celebrate',
    'love',
    'success',
    'thrilled',
    'proud',
    'excellent',
    'great'
  ];

  const trustWords = [
    'reliable',
    'collaborative',
    'support',
    'promise',
    'solid',
    'agree',
    'decided',
    'responsible',
    'confident'
  ];

  const anticipationWords = [
    'plan',
    'launch',
    'prepare',
    'deadline',
    'scheduled',
    'upcoming',
    'friday',
    'next',
    'expect'
  ];

  const surpriseWords = [
    'sudden',
    'unexpected',
    'amazing',
    'unbelievable',
    'breakthrough',
    'astonish',
    'wow'
  ];

  const sadnessWords = [
    'disappointed',
    'failed',
    'loss',
    'missed',
    'regret',
    'unfortunate',
    'down'
  ];

  const angerWords = [
    'frustrated',
    'conflict',
    'terrible',
    'annoyed',
    'furious',
    'blocked',
    'hate'
  ];

  const fearWords = [
    'risk',
    'critical',
    'danger',
    'concern',
    'worried',
    'stress',
    'crisis',
    'threat'
  ];

  const disgustWords = [
    'awful',
    'horrible',
    'mess',
    'broken',
    'defect',
    'poor',
    'garbage'
  ];

  const countMatches =
    (list: string[]) =>
      list.reduce(
        (acc, word) =>
          acc +
          (lower.includes(word) ? 1 : 0),
        0
      );

  const rawJoy =
    countMatches(joyWords) +
    (vader.compound > 0.4
      ? 2
      : vader.compound > 0
        ? 1
        : 0);

  const rawTrust =
    countMatches(trustWords) +
    (vader.pos > 0.2 ? 1 : 0);

  const rawAnticipation =
    countMatches(anticipationWords) + 1;

  const rawSurprise =
    countMatches(surpriseWords);

  const rawSadness =
    countMatches(sadnessWords) +
    (vader.compound < -0.3 ? 2 : 0);

  const rawAnger =
    countMatches(angerWords) +
    (vader.compound < -0.5 ? 2 : 0);

  const rawFear =
    countMatches(fearWords) +
    (lower.includes('risk') ? 1 : 0);

  const rawDisgust =
    countMatches(disgustWords);

  const total =
    rawJoy +
    rawTrust +
    rawAnticipation +
    rawSurprise +
    rawSadness +
    rawAnger +
    rawFear +
    rawDisgust || 1;

  return {
    joy: Number((rawJoy / total).toFixed(2)),
    trust: Number((rawTrust / total).toFixed(2)),
    anticipation: Number((rawAnticipation / total).toFixed(2)),
    surprise: Number((rawSurprise / total).toFixed(2)),
    sadness: Number((rawSadness / total).toFixed(2)),
    anger: Number((rawAnger / total).toFixed(2)),
    fear: Number((rawFear / total).toFixed(2)),
    disgust: Number((rawDisgust / total).toFixed(2))
  };
}

export function generateClassificationReport(
  text: string
): SentimentClassificationReport {

  const overall =
    analyzeVader(text);

  const emotions =
    extractEmotions(text, overall);

  const sentences =
    text
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 3);

  const words =
    text
      .toLowerCase()
      .match(/\b[a-z]{2,}\b/g) || [];

  const uniqueWords =
    new Set(words);

  const lexicalDiversity =
    words.length > 0
      ? Number(
          (
            uniqueWords.size /
            words.length
          ).toFixed(3)
        )
      : 0;

  const sampleCorpusBreakdown =
    sentences
      .slice(0, 10)
      .map(sentence => {

        const sVader =
          analyzeVader(sentence);

        const sEmotions =
          extractEmotions(
            sentence,
            sVader
          );

        let dominantEmotion =
          'neutral';

        let maxVal = 0;

        (
          Object.keys(sEmotions)
          as (keyof EmotionScore)[]
        ).forEach(k => {

          if (sEmotions[k] > maxVal) {
            maxVal = sEmotions[k];
            dominantEmotion = k;
          }
        });

        return {
          sentence,
          vader: sVader,
          dominantEmotion:
            dominantEmotion.toUpperCase()
        };
      });

  const insights: string[] = [
    `Overall Sentiment: ${overall.label} (Compound: ${overall.compound >= 0 ? '+' : ''}${overall.compound})`,

    `Positive Ratio: ${(overall.pos * 100).toFixed(1)}%, Neutral Ratio: ${(overall.neu * 100).toFixed(1)}%, Negative Ratio: ${(overall.neg * 100).toFixed(1)}%`,

    `Dominant Emotional Drivers: Anticipation (${(emotions.anticipation * 100).toFixed(0)}%), Trust (${(emotions.trust * 100).toFixed(0)}%), Joy (${(emotions.joy * 100).toFixed(0)}%)`,

    `Lexical Diversity: ${lexicalDiversity} across ${words.length} tokens (${uniqueWords.size} unique terms).`
  ];

  return {
    overallSentiment: overall,

    emotions,

    tokenMetrics: {
      totalWords: words.length,
      uniqueWords: uniqueWords.size,
      lexicalDiversity
    },

    sampleCorpusBreakdown,

    summaryInsights: insights
  };
}
