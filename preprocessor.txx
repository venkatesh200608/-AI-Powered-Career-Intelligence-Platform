import { PreprocessingResult } from '../../src/types.js';

// Comprehensive standard stop words list
export const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as',
  'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can\'t', 'cannot',
  'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each',
  'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d',
  'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i',
  'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s',
  'me', 'more', 'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or',
  'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll',
  'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve',
  'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll',
  'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while',
  'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll',
  'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'
]);

export function lemmatizeWord(word: string): string {
  const w = word.toLowerCase();

  if (w.length <= 3) return w;

  const irregulars: Record<string, string> = {
    'ran': 'run',
    'running': 'run',
    'runs': 'run',
    'went': 'go',
    'going': 'go',
    'goes': 'go',
    'gone': 'go',
    'saw': 'see',
    'seen': 'see',
    'seeing': 'see',
    'sees': 'see',
    'met': 'meet',
    'meeting': 'meet',
    'meetings': 'meet',
    'discussed': 'discuss',
    'discussing': 'discuss',
    'discussion': 'discuss',
    'launched': 'launch',
    'launching': 'launch',
    'integrated': 'integrate',
    'integrating': 'integrate',
    'integration': 'integrate',
    'tested': 'test',
    'testing': 'test',
    'tests': 'test',
    'decided': 'decide',
    'deciding': 'decide',
    'decision': 'decide',
    'assigned': 'assign',
    'assigning': 'assign',
    'assignment': 'assign',
    'built': 'build',
    'building': 'build',
    'buildings': 'build',
    'migrated': 'migrate',
    'migrating': 'migrate',
    'migration': 'migrate',
    'prepared': 'prepare',
    'preparing': 'prepare',
    'better': 'good',
    'best': 'good',
    'worse': 'bad',
    'worst': 'bad',
  };

  if (irregulars[w]) return irregulars[w];

  if (w.endsWith('ies') && w.length > 4)
    return w.slice(0, -3) + 'y';

  if (w.endsWith('ing') && w.length > 5) {
    const base = w.slice(0, -3);

    if (
      base.endsWith('t') ||
      base.endsWith('p') ||
      base.endsWith('m')
    ) {
      if (base[base.length - 1] === base[base.length - 2])
        return base.slice(0, -1);
    }

    return base;
  }

  if (w.endsWith('ed') && w.length > 4) {
    const base = w.slice(0, -2);

    if (
      base.endsWith('t') ||
      base.endsWith('p') ||
      base.endsWith('d')
    ) {
      if (base[base.length - 1] === base[base.length - 2])
        return base.slice(0, -1);
    }

    return base;
  }

  if (w.endsWith('s') && !w.endsWith('ss') && w.length > 3) {
    if (w.endsWith('es')) return w.slice(0, -2);

    return w.slice(0, -1);
  }

  if (w.endsWith('ly') && w.length > 4)
    return w.slice(0, -2);

  return w;
}

export function parseIngestedData(
  data: string,
  format: 'text' | 'txt' | 'csv'
): {
  text: string;
  rowCount?: number;
  warnings: string[];
} {
  const warnings: string[] = [];

  if (
    !data ||
    typeof data !== 'string' ||
    data.trim().length === 0
  ) {
    return {
      text: '',
      warnings: ['Input data is empty or invalid']
    };
  }

  if (format === 'csv') {
    const lines = data
      .split(/\r?\n/)
      .filter(line => line.trim().length > 0);

    if (lines.length === 0) {
      warnings.push('CSV file contains no rows');

      return {
        text: '',
        warnings
      };
    }

    const rows: string[] = [];

    for (const line of lines) {
      const matches = line.match(/(?:\"([^\"]*)\"|([^,]+))/g);

      if (matches && matches.length > 0) {
        const cleanedCols = matches
          .map(c => c.replace(/^\"|\"$/g, '').trim())
          .filter(Boolean);

        rows.push(cleanedCols.join(' '));
      } else {
        rows.push(line.replace(/,/g, ' '));
      }
    }

    return {
      text: rows.join('\n'),
      rowCount: lines.length,
      warnings
    };
  }

  return {
    text: data.trim(),
    warnings
  };
}

export function preprocessText(
  inputText: string
): PreprocessingResult {

  const original = inputText || '';
  const originalLength = original.length;

  if (!original.trim()) {
    return {
      originalText: original,
      cleanedText: '',
      tokens: [],
      stopWordsRemoved: [],
      lemmatizedTokens: [],

      filteredNoise: {
        specialCharsRemoved: 0,
        extraSpacesCollapsed: 0,
        punctuationCleaned: 0,
      },

      metrics: {
        originalLength: 0,
        cleanedLength: 0,
        tokenCount: 0,
        uniqueTokens: 0,
        reductionPercent: 0,
      }
    };
  }

  const specialCharsMatches =
    original.match(/[^\w\s.,!?'"-\/]/g) || [];

  const punctuationMatches =
    original.match(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g) || [];

  const extraSpacesMatches =
    original.match(/\s{2,}/g) || [];

  let cleaned = original
    .replace(/[^\x20-\x7E\t\r\n]/g, ' ')
    .replace(/[^\w\s.,!?'"-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const rawTokens = cleaned
    .toLowerCase()
    .split(/[^a-zA-Z0-9_\'-]+/)
    .map(t => t.replace(/^['"]+|['"]+$/g, ''))
    .filter(t => t.length > 0);

  const stopWordsRemoved =
    rawTokens.filter(token => !STOP_WORDS.has(token));

  const lemmatizedTokens =
    stopWordsRemoved.map(lemmatizeWord);

  const uniqueTokensSet =
    new Set(lemmatizedTokens);

  const reduction =
    originalLength > 0
      ? Math.max(
          0,
          Math.round(
            ((originalLength - cleaned.length) /
              originalLength) *
              100
          )
        )
      : 0;

  return {
    originalText: original,
    cleanedText: cleaned,
    tokens: rawTokens,
    stopWordsRemoved,
    lemmatizedTokens,

    filteredNoise: {
      specialCharsRemoved:
        specialCharsMatches.length,

      extraSpacesCollapsed:
        extraSpacesMatches.length,

      punctuationCleaned:
        punctuationMatches.length,
    },

    metrics: {
      originalLength,
      cleanedLength: cleaned.length,
      tokenCount: rawTokens.length,
      uniqueTokens: uniqueTokensSet.size,
      reductionPercent: reduction,
    }
  };
}
