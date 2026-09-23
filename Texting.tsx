export interface ValidationResult {
  test: string;
  passed: boolean;
  message: string;
  executionTimeMs?: number;
}

export interface Milestone3ValidationReport {
  milestone: string;
  timestamp: string;
  passed: number;
  failed: number;
  results: ValidationResult[];
}

async function testSemanticSearch(): Promise<ValidationResult> {
  const start = Date.now();

  try {
    const response = await fetch('http://localhost:3000/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'Which meeting discussed the database migration?',
        topK: 6,
      }),
    });

    const data = await response.json();
    const executionTimeMs = Date.now() - start;

    if (!response.ok) {
      return {
        test: 'Semantic Search',
        passed: false,
        message: data.error || 'Search API failed',
        executionTimeMs,
      };
    }

    return {
      test: 'Semantic Search',
      passed: Array.isArray(data.results),
      message: Array.isArray(data.results)
        ? 'Semantic search returned results successfully'
        : 'Search response does not contain results',
      executionTimeMs,
    };
  } catch (error) {
    return {
      test: 'Semantic Search',
      passed: false,
      message: error instanceof Error ? error.message : 'Search failed',
      executionTimeMs: Date.now() - start,
    };
  }
}

async function testRAG(): Promise<ValidationResult> {
  const start = Date.now();

  try {
    const response = await fetch('http://localhost:3000/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: 'What deadline was decided for the mobile application?',
        topK: 4,
      }),
    });

    const data = await response.json();
    const executionTimeMs = Date.now() - start;

    if (!response.ok) {
      return {
        test: 'RAG Question Answering',
        passed: false,
        message: data.error || 'RAG API failed',
        executionTimeMs,
      };
    }

    const passed =
      typeof data.answer === 'string' &&
      data.answer.length > 0;

    return {
      test: 'RAG Question Answering',
      passed,
      message: passed
        ? 'RAG generated an answer successfully'
        : 'RAG response does not contain a valid answer',
      executionTimeMs,
    };
  } catch (error) {
    return {
      test: 'RAG Question Answering',
      passed: false,
      message: error instanceof Error ? error.message : 'RAG failed',
      executionTimeMs: Date.now() - start,
    };
  }
}

async function testHistoricalMeetings(): Promise<ValidationResult> {
  const start = Date.now();

  try {
    const response = await fetch('http://localhost:3000/api/meetings');

    const data = await response.json();
    const executionTimeMs = Date.now() - start;

    const meetings = Array.isArray(data)
      ? data
      : data.meetings;

    const passed =
      Array.isArray(meetings) &&
      meetings.length > 0;

    return {
      test: 'Historical Meeting Retrieval',
      passed,
      message: passed
        ? `${meetings.length} historical meeting(s) retrieved`
        : 'No historical meetings were retrieved',
      executionTimeMs,
    };
  } catch (error) {
    return {
      test: 'Historical Meeting Retrieval',
      passed: false,
      message:
        error instanceof Error
          ? error.message
          : 'Meeting retrieval failed',
      executionTimeMs: Date.now() - start,
    };
  }
}

async function testAPIIntegration(): Promise<ValidationResult> {
  const start = Date.now();

  try {
    const endpoints = [
      '/api/meetings',
      '/api/search',
      '/api/ask',
    ];

    const results = await Promise.all(
      endpoints.map(async (endpoint) => {
        const response = await fetch(
          `http://localhost:3000${endpoint}`,
          endpoint === '/api/meetings'
            ? { method: 'GET' }
            : { method: 'POST' }
        );

        return {
          endpoint,
          status: response.status,
        };
      })
    );

    const failed = results.filter(
      (item) => item.status >= 500
    );

    return {
      test: 'API Integration',
      passed: failed.length === 0,
      message:
        failed.length === 0
          ? 'Existing API endpoints are responding'
          : `${failed.length} API endpoint(s) returned server errors`,
      executionTimeMs: Date.now() - start,
    };
  } catch (error) {
    return {
      test: 'API Integration',
      passed: false,
      message:
        error instanceof Error
          ? error.message
          : 'API integration test failed',
      executionTimeMs: Date.now() - start,
    };
  }
}

async function testSearchPerformance(): Promise<ValidationResult> {
  const start = Date.now();

  try {
    const response = await fetch(
      'http://localhost:3000/api/search',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'database migration',
          topK: 6,
        }),
      }
    );

    const executionTimeMs = Date.now() - start;

    return {
      test: 'Search Performance',
      passed: response.ok && executionTimeMs < 3000,
      message:
        response.ok && executionTimeMs < 3000
          ? `Search completed within 3 seconds (${executionTimeMs}ms)`
          : `Search exceeded 3 seconds (${executionTimeMs}ms)`,
      executionTimeMs,
    };
  } catch (error) {
    return {
      test: 'Search Performance',
      passed: false,
      message:
        error instanceof Error
          ? error.message
          : 'Performance test failed',
      executionTimeMs: Date.now() - start,
    };
  }
}

export async function runMilestone3Validation(): Promise<Milestone3ValidationReport> {
  const results: ValidationResult[] = [];

  results.push(await testSemanticSearch());
  results.push(await testRAG());
  results.push(await testHistoricalMeetings());
  results.push(await testAPIIntegration());
  results.push(await testSearchPerformance());

  const passed = results.filter(
    (result) => result.passed
  ).length;

  const failed = results.length - passed;

  return {
    milestone: 'Milestone 3',
    timestamp: new Date().toISOString(),
    passed,
    failed,
    results,
  };
}
