import { performanceMonitor } from './performanceMonitor';

/**
 * Performance testing utilities for measuring optimization improvements
 */

export interface PerformanceTestResult {
  testName: string;
  timestamp: number;
  metrics: {
    pageLoadTime: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    cumulativeLayoutShift: number;
    firstInputDelay: number;
    imageLoadTimes: Array<{
      src: string;
      loadTime: number;
      wasOptimized: boolean;
    }>;
  };
  score: number;
}

export class PerformanceTestSuite {
  private results: PerformanceTestResult[] = [];

  /**
   * Run a comprehensive performance test
   */
  async runTest(testName: string): Promise<PerformanceTestResult> {
    const startTime = performance.now();
    
    // Wait for page to fully load
    await this.waitForPageLoad();
    
    // Generate performance report
    const pageMetrics = performanceMonitor.getPageMetrics();
    const imageStats = performanceMonitor.getImageStats();
    
    const result: PerformanceTestResult = {
      testName,
      timestamp: Date.now(),
      metrics: {
        pageLoadTime: performance.now() - startTime,
        firstContentfulPaint: pageMetrics.firstContentfulPaint || 0,
        largestContentfulPaint: pageMetrics.largestContentfulPaint || 0,
        cumulativeLayoutShift: pageMetrics.cumulativeLayoutShift || 0,
        firstInputDelay: pageMetrics.firstInputDelay || 0,
        imageLoadTimes: [] // Will be populated from performanceMonitor if needed
      },
      score: this.calculatePerformanceScore(pageMetrics)
    };

    this.results.push(result);
    return result;
  }

  /**
   * Compare performance between two test runs
   */
  compareTests(baseline: string, optimized: string): {
    improvement: number;
    details: Record<string, { before: number; after: number; improvement: number }>;
  } {
    const baselineResult = this.results.find(r => r.testName === baseline);
    const optimizedResult = this.results.find(r => r.testName === optimized);

    if (!baselineResult || !optimizedResult) {
      throw new Error('Test results not found for comparison');
    }

    const details = {
      pageLoadTime: {
        before: baselineResult.metrics.pageLoadTime,
        after: optimizedResult.metrics.pageLoadTime,
        improvement: ((baselineResult.metrics.pageLoadTime - optimizedResult.metrics.pageLoadTime) / baselineResult.metrics.pageLoadTime) * 100
      },
      firstContentfulPaint: {
        before: baselineResult.metrics.firstContentfulPaint,
        after: optimizedResult.metrics.firstContentfulPaint,
        improvement: ((baselineResult.metrics.firstContentfulPaint - optimizedResult.metrics.firstContentfulPaint) / baselineResult.metrics.firstContentfulPaint) * 100
      },
      largestContentfulPaint: {
        before: baselineResult.metrics.largestContentfulPaint,
        after: optimizedResult.metrics.largestContentfulPaint,
        improvement: ((baselineResult.metrics.largestContentfulPaint - optimizedResult.metrics.largestContentfulPaint) / baselineResult.metrics.largestContentfulPaint) * 100
      },
      overallScore: {
        before: baselineResult.score,
        after: optimizedResult.score,
        improvement: ((optimizedResult.score - baselineResult.score) / baselineResult.score) * 100
      }
    };

    const overallImprovement = details.overallScore.improvement;

    return { improvement: overallImprovement, details };
  }

  /**
   * Get all test results
   */
  getResults(): PerformanceTestResult[] {
    return [...this.results];
  }

  /**
   * Export results to console for analysis
   */
  exportResults(): void {
    console.group('🚀 Performance Test Results');
    this.results.forEach(result => {
      console.group(`📊 ${result.testName}`);
      console.log('Timestamp:', new Date(result.timestamp).toISOString());
      console.log('Overall Score:', result.score);
      console.log('Page Load Time:', `${Number(result.metrics.pageLoadTime || 0).toFixed(2)}ms`);
      console.log('First Contentful Paint:', `${Number(result.metrics.firstContentfulPaint || 0).toFixed(2)}ms`);
      console.log('Largest Contentful Paint:', `${Number(result.metrics.largestContentfulPaint || 0).toFixed(2)}ms`);
      console.log('Cumulative Layout Shift:', Number(result.metrics.cumulativeLayoutShift || 0).toFixed(4));
      console.log('First Input Delay:', `${Number(result.metrics.firstInputDelay || 0).toFixed(2)}ms`);
      console.log('Image Load Times:', result.metrics.imageLoadTimes);
      console.groupEnd();
    });
    console.groupEnd();
  }

  private async waitForPageLoad(): Promise<void> {
    return new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', () => resolve());
      }
    });
  }

  private calculatePerformanceScore(metrics: any): number {
    // Simple scoring algorithm (0-100)
    let score = 100;

    // Penalize slow FCP (target: <1.8s)
    if (metrics.firstContentfulPaint && metrics.firstContentfulPaint > 1800) {
      score -= Math.min(30, (metrics.firstContentfulPaint - 1800) / 100);
    }

    // Penalize slow LCP (target: <2.5s)
    if (metrics.largestContentfulPaint && metrics.largestContentfulPaint > 2500) {
      score -= Math.min(30, (metrics.largestContentfulPaint - 2500) / 100);
    }

    // Penalize high CLS (target: <0.1)
    if (metrics.cumulativeLayoutShift && metrics.cumulativeLayoutShift > 0.1) {
      score -= Math.min(20, (metrics.cumulativeLayoutShift - 0.1) * 200);
    }

    // Penalize slow FID (target: <100ms)
    if (metrics.firstInputDelay && metrics.firstInputDelay > 100) {
      score -= Math.min(20, (metrics.firstInputDelay - 100) / 10);
    }

    return Math.max(0, Math.round(score));
  }
}

// Global performance test instance
export const performanceTest = new PerformanceTestSuite();

// Convenience functions for testing
export const runPerformanceTest = (testName: string) => performanceTest.runTest(testName);
export const comparePerformance = (baseline: string, optimized: string) => 
  performanceTest.compareTests(baseline, optimized);
export const exportPerformanceResults = () => performanceTest.exportResults();