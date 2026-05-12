import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig } from 'vitest/config';
import sharedConfig from '../../vitest.shared.mts';
import { getTestName } from '../../scripts/getTestName.mts';

export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      name: getTestName(import.meta.url),
      setupFiles: [fileURLToPath(new URL('../../test/utils/setupPickers.js', import.meta.url))],
      exclude: [
        // Already excluded everywhere
        '**/materialVersion.test.tsx',
        // Conformance tests (themeDefaultProps, ref forwarding, className, …) and
        // validation tests (min/max/disabled props rendered with open={true}) do
        // not rely on real browser APIs — they use fireEvent and attribute checks
        // that work identically in jsdom. Running them in a Chromium page wastes
        // ~50–100 MB of RAM per file (with isolate:true each file gets its own
        // page). They continue to run in the jsdom job via vitest.config.jsdom.mts.
        //
        // Tests inside these files that truly require a browser are already
        // gated with it.skipIf(isJsdom()) and will keep running there.
        '**/describeConformance.*.test.tsx',
        '**/describeValidation.*.test.tsx',
        // Pure utility — no DOM at all
        '**/date-range-manager.test.ts',
      ],
      browser: {
        enabled: true,
        // Re-enable per-file page isolation (overrides the shared isolate:false).
        // pickers-pro has 55 test files; without isolation they all share one
        // browser page, accumulating DOM/JS heap across the entire run and
        // causing OOM on CI. The speed cost (~100ms per file) is acceptable
        // compared to a crashed runner.
        isolate: true,
        instances: [{ browser: 'chromium' }],
      },
      sequence: { groupOrder: 1 },
    },
  }),
);
