// ../../config/tsup.base.config.ts
import { defineConfig } from "tsup";
var createBaseConfig = (options = {}) => {
  const isProduction = process.env.NODE_ENV === "production";
  return defineConfig({
    // Entry points
    entry: ["src/index.ts"],
    // Output formats
    format: ["cjs", "esm"],
    // TypeScript declarations
    dts: {
      resolve: true,
      compilerOptions: {
        composite: false,
        incremental: false
      }
    },
    // Source maps for debugging
    sourcemap: true,
    // Clean output directory before build
    clean: true,
    // Minification in production
    minify: isProduction,
    // Tree shaking for smaller bundles
    treeshake: isProduction ? {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      tryCatchDeoptimization: false
    } : false,
    // Code splitting
    splitting: false,
    // Skip node_modules bundling
    skipNodeModulesBundle: true,
    // External dependencies (to be resolved by consumer)
    external: [
      "react",
      "react-dom",
      "react/jsx-runtime"
    ],
    // Target environment
    target: "es2022",
    // Keep names for better debugging
    keepNames: true,
    // Shims
    shims: true,
    // Banner for license/metadata
    banner: {
      js: `/**
 * @brepflow
 * (c) ${(/* @__PURE__ */ new Date()).getFullYear()} BrepFlow - MIT License
 */`
    },
    // Merge with custom options
    ...options
  });
};
var createLibraryConfig = (options = {}) => {
  return createBaseConfig({
    dts: {
      resolve: true,
      entry: ["src/index.ts"]
    },
    external: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      /^@brepflow\//
    ],
    ...options
  });
};
var createWorkerConfig = (options = {}) => {
  return createBaseConfig({
    format: ["esm"],
    platform: "browser",
    target: "es2022",
    external: [],
    ...options
  });
};

// tsup.config.ts
import { defineConfig as defineConfig2 } from "tsup";
var tsup_config_default = defineConfig2([
  {
    // Main entry - Library configuration for ESM
    ...createLibraryConfig({
      entry: ["src/index.ts"],
      format: ["esm"],
      // ESM only for import.meta
      dts: false,
      // TODO: Re-enable after fixing branded type issues
      shims: false
      // Disable ESM shims to avoid Node.js module imports
    })
  },
  {
    // Worker entry - Worker-specific configuration
    ...createWorkerConfig({
      entry: ["src/worker.ts"],
      dts: false,
      // Workers don't need type definitions
      shims: false
      // Disable ESM shims to avoid Node.js module imports
    }),
    clean: false
    // Don't clean since we run after main build
  }
]);
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vY29uZmlnL3RzdXAuYmFzZS5jb25maWcudHMiLCAidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL1VzZXJzL2FsZG9ydWl6bHVuYS9sYWJzcGFjZS9icmVwZmxvdy9jb25maWcvdHN1cC5iYXNlLmNvbmZpZy50c1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCIvVXNlcnMvYWxkb3J1aXpsdW5hL2xhYnNwYWNlL2JyZXBmbG93L2NvbmZpZ1wiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vVXNlcnMvYWxkb3J1aXpsdW5hL2xhYnNwYWNlL2JyZXBmbG93L2NvbmZpZy90c3VwLmJhc2UuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBPcHRpb25zIH0gZnJvbSAndHN1cCc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5cbi8qKlxuICogQmFzZSB0c3VwIGNvbmZpZ3VyYXRpb24gZm9yIGFsbCBwYWNrYWdlc1xuICogUHJvdmlkZXMgY29uc2lzdGVudCBidWlsZCBzZXR0aW5ncyBhY3Jvc3MgdGhlIG1vbm9yZXBvXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVCYXNlQ29uZmlnID0gKG9wdGlvbnM6IFBhcnRpYWw8T3B0aW9ucz4gPSB7fSk6IE9wdGlvbnMgPT4ge1xuICBjb25zdCBpc1Byb2R1Y3Rpb24gPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nO1xuXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xuICAgIC8vIEVudHJ5IHBvaW50c1xuICAgIGVudHJ5OiBbJ3NyYy9pbmRleC50cyddLFxuXG4gICAgLy8gT3V0cHV0IGZvcm1hdHNcbiAgICBmb3JtYXQ6IFsnY2pzJywgJ2VzbSddLFxuXG4gICAgLy8gVHlwZVNjcmlwdCBkZWNsYXJhdGlvbnNcbiAgICBkdHM6IHtcbiAgICAgIHJlc29sdmU6IHRydWUsXG4gICAgICBjb21waWxlck9wdGlvbnM6IHtcbiAgICAgICAgY29tcG9zaXRlOiBmYWxzZSxcbiAgICAgICAgaW5jcmVtZW50YWw6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gU291cmNlIG1hcHMgZm9yIGRlYnVnZ2luZ1xuICAgIHNvdXJjZW1hcDogdHJ1ZSxcblxuICAgIC8vIENsZWFuIG91dHB1dCBkaXJlY3RvcnkgYmVmb3JlIGJ1aWxkXG4gICAgY2xlYW46IHRydWUsXG5cbiAgICAvLyBNaW5pZmljYXRpb24gaW4gcHJvZHVjdGlvblxuICAgIG1pbmlmeTogaXNQcm9kdWN0aW9uLFxuXG4gICAgLy8gVHJlZSBzaGFraW5nIGZvciBzbWFsbGVyIGJ1bmRsZXNcbiAgICB0cmVlc2hha2U6IGlzUHJvZHVjdGlvbiA/IHtcbiAgICAgIG1vZHVsZVNpZGVFZmZlY3RzOiBmYWxzZSxcbiAgICAgIHByb3BlcnR5UmVhZFNpZGVFZmZlY3RzOiBmYWxzZSxcbiAgICAgIHRyeUNhdGNoRGVvcHRpbWl6YXRpb246IGZhbHNlLFxuICAgIH0gOiBmYWxzZSxcblxuICAgIC8vIENvZGUgc3BsaXR0aW5nXG4gICAgc3BsaXR0aW5nOiBmYWxzZSxcblxuICAgIC8vIFNraXAgbm9kZV9tb2R1bGVzIGJ1bmRsaW5nXG4gICAgc2tpcE5vZGVNb2R1bGVzQnVuZGxlOiB0cnVlLFxuXG4gICAgLy8gRXh0ZXJuYWwgZGVwZW5kZW5jaWVzICh0byBiZSByZXNvbHZlZCBieSBjb25zdW1lcilcbiAgICBleHRlcm5hbDogW1xuICAgICAgJ3JlYWN0JyxcbiAgICAgICdyZWFjdC1kb20nLFxuICAgICAgJ3JlYWN0L2pzeC1ydW50aW1lJyxcbiAgICBdLFxuXG4gICAgLy8gVGFyZ2V0IGVudmlyb25tZW50XG4gICAgdGFyZ2V0OiAnZXMyMDIyJyxcblxuICAgIC8vIEtlZXAgbmFtZXMgZm9yIGJldHRlciBkZWJ1Z2dpbmdcbiAgICBrZWVwTmFtZXM6IHRydWUsXG5cbiAgICAvLyBTaGltc1xuICAgIHNoaW1zOiB0cnVlLFxuXG4gICAgLy8gQmFubmVyIGZvciBsaWNlbnNlL21ldGFkYXRhXG4gICAgYmFubmVyOiB7XG4gICAgICBqczogYC8qKlxuICogQGJyZXBmbG93XG4gKiAoYykgJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IEJyZXBGbG93IC0gTUlUIExpY2Vuc2VcbiAqL2AsXG4gICAgfSxcblxuICAgIC8vIE1lcmdlIHdpdGggY3VzdG9tIG9wdGlvbnNcbiAgICAuLi5vcHRpb25zLFxuICB9IGFzIE9wdGlvbnMpO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgY29uZmlndXJhdGlvbiBmb3IgbGlicmFyeSBwYWNrYWdlc1xuICovXG5leHBvcnQgY29uc3QgY3JlYXRlTGlicmFyeUNvbmZpZyA9IChvcHRpb25zOiBQYXJ0aWFsPE9wdGlvbnM+ID0ge30pOiBPcHRpb25zID0+IHtcbiAgcmV0dXJuIGNyZWF0ZUJhc2VDb25maWcoe1xuICAgIGR0czoge1xuICAgICAgcmVzb2x2ZTogdHJ1ZSxcbiAgICAgIGVudHJ5OiBbJ3NyYy9pbmRleC50cyddLFxuICAgIH0sXG4gICAgZXh0ZXJuYWw6IFtcbiAgICAgICdyZWFjdCcsXG4gICAgICAncmVhY3QtZG9tJyxcbiAgICAgICdyZWFjdC9qc3gtcnVudGltZScsXG4gICAgICAvXkBicmVwZmxvd1xcLy8sXG4gICAgXSxcbiAgICAuLi5vcHRpb25zLFxuICB9KTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGNvbmZpZ3VyYXRpb24gZm9yIGFwcGxpY2F0aW9uIHBhY2thZ2VzXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVBcHBDb25maWcgPSAob3B0aW9uczogUGFydGlhbDxPcHRpb25zPiA9IHt9KTogT3B0aW9ucyA9PiB7XG4gIHJldHVybiBjcmVhdGVCYXNlQ29uZmlnKHtcbiAgICBzcGxpdHRpbmc6IHRydWUsXG4gICAgbWluaWZ5OiB0cnVlLFxuICAgIGV4dGVybmFsOiBbXG4gICAgICAncmVhY3QnLFxuICAgICAgJ3JlYWN0LWRvbScsXG4gICAgICAncmVhY3QvanN4LXJ1bnRpbWUnLFxuICAgIF0sXG4gICAgLi4ub3B0aW9ucyxcbiAgfSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBjb25maWd1cmF0aW9uIGZvciB3b3JrZXIgcGFja2FnZXNcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVdvcmtlckNvbmZpZyA9IChvcHRpb25zOiBQYXJ0aWFsPE9wdGlvbnM+ID0ge30pOiBPcHRpb25zID0+IHtcbiAgcmV0dXJuIGNyZWF0ZUJhc2VDb25maWcoe1xuICAgIGZvcm1hdDogWydlc20nXSxcbiAgICBwbGF0Zm9ybTogJ2Jyb3dzZXInLFxuICAgIHRhcmdldDogJ2VzMjAyMicsXG4gICAgZXh0ZXJuYWw6IFtdLFxuICAgIC4uLm9wdGlvbnMsXG4gIH0pO1xufTsiLCAiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCIvVXNlcnMvYWxkb3J1aXpsdW5hL2xhYnNwYWNlL2JyZXBmbG93L3BhY2thZ2VzL2VuZ2luZS1vY2N0L3RzdXAuY29uZmlnLnRzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9Vc2Vycy9hbGRvcnVpemx1bmEvbGFic3BhY2UvYnJlcGZsb3cvcGFja2FnZXMvZW5naW5lLW9jY3RcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL1VzZXJzL2FsZG9ydWl6bHVuYS9sYWJzcGFjZS9icmVwZmxvdy9wYWNrYWdlcy9lbmdpbmUtb2NjdC90c3VwLmNvbmZpZy50c1wiO2ltcG9ydCB7IGNyZWF0ZVdvcmtlckNvbmZpZywgY3JlYXRlTGlicmFyeUNvbmZpZyB9IGZyb20gJy4uLy4uL2NvbmZpZy90c3VwLmJhc2UuY29uZmlnJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3RzdXAnO1xuXG4vKipcbiAqIEVuZ2luZSBPQ0NUIGJ1aWxkIGNvbmZpZ3VyYXRpb25cbiAqIFdBU00gZ2VvbWV0cnkgZW5naW5lIHdpdGggd29ya2VyLWJhc2VkIGV4ZWN1dGlvblxuICovXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoW1xuICB7XG4gICAgLy8gTWFpbiBlbnRyeSAtIExpYnJhcnkgY29uZmlndXJhdGlvbiBmb3IgRVNNXG4gICAgLi4uY3JlYXRlTGlicmFyeUNvbmZpZyh7XG4gICAgICBlbnRyeTogWydzcmMvaW5kZXgudHMnXSxcbiAgICAgIGZvcm1hdDogWydlc20nXSwgLy8gRVNNIG9ubHkgZm9yIGltcG9ydC5tZXRhXG4gICAgICBkdHM6IGZhbHNlLCAvLyBUT0RPOiBSZS1lbmFibGUgYWZ0ZXIgZml4aW5nIGJyYW5kZWQgdHlwZSBpc3N1ZXNcbiAgICAgIHNoaW1zOiBmYWxzZSwgLy8gRGlzYWJsZSBFU00gc2hpbXMgdG8gYXZvaWQgTm9kZS5qcyBtb2R1bGUgaW1wb3J0c1xuICAgIH0pLFxuICB9LFxuICB7XG4gICAgLy8gV29ya2VyIGVudHJ5IC0gV29ya2VyLXNwZWNpZmljIGNvbmZpZ3VyYXRpb25cbiAgICAuLi5jcmVhdGVXb3JrZXJDb25maWcoe1xuICAgICAgZW50cnk6IFsnc3JjL3dvcmtlci50cyddLFxuICAgICAgZHRzOiBmYWxzZSwgLy8gV29ya2VycyBkb24ndCBuZWVkIHR5cGUgZGVmaW5pdGlvbnNcbiAgICAgIHNoaW1zOiBmYWxzZSwgLy8gRGlzYWJsZSBFU00gc2hpbXMgdG8gYXZvaWQgTm9kZS5qcyBtb2R1bGUgaW1wb3J0c1xuICAgIH0pLFxuICAgIGNsZWFuOiBmYWxzZSwgLy8gRG9uJ3QgY2xlYW4gc2luY2Ugd2UgcnVuIGFmdGVyIG1haW4gYnVpbGRcbiAgfVxuXSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUE0UixTQUFTLG9CQUE2QjtBQU8zVCxJQUFNLG1CQUFtQixDQUFDLFVBQTRCLENBQUMsTUFBZTtBQUMzRSxRQUFNLGVBQWUsUUFBUSxJQUFJLGFBQWE7QUFFOUMsU0FBTyxhQUFhO0FBQUE7QUFBQSxJQUVsQixPQUFPLENBQUMsY0FBYztBQUFBO0FBQUEsSUFHdEIsUUFBUSxDQUFDLE9BQU8sS0FBSztBQUFBO0FBQUEsSUFHckIsS0FBSztBQUFBLE1BQ0gsU0FBUztBQUFBLE1BQ1QsaUJBQWlCO0FBQUEsUUFDZixXQUFXO0FBQUEsUUFDWCxhQUFhO0FBQUEsTUFDZjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBR0EsV0FBVztBQUFBO0FBQUEsSUFHWCxPQUFPO0FBQUE7QUFBQSxJQUdQLFFBQVE7QUFBQTtBQUFBLElBR1IsV0FBVyxlQUFlO0FBQUEsTUFDeEIsbUJBQW1CO0FBQUEsTUFDbkIseUJBQXlCO0FBQUEsTUFDekIsd0JBQXdCO0FBQUEsSUFDMUIsSUFBSTtBQUFBO0FBQUEsSUFHSixXQUFXO0FBQUE7QUFBQSxJQUdYLHVCQUF1QjtBQUFBO0FBQUEsSUFHdkIsVUFBVTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBR0EsUUFBUTtBQUFBO0FBQUEsSUFHUixXQUFXO0FBQUE7QUFBQSxJQUdYLE9BQU87QUFBQTtBQUFBLElBR1AsUUFBUTtBQUFBLE1BQ04sSUFBSTtBQUFBO0FBQUEsVUFFRCxvQkFBSSxLQUFLLEdBQUUsWUFBWSxDQUFDO0FBQUE7QUFBQSxJQUU3QjtBQUFBO0FBQUEsSUFHQSxHQUFHO0FBQUEsRUFDTCxDQUFZO0FBQ2Q7QUFLTyxJQUFNLHNCQUFzQixDQUFDLFVBQTRCLENBQUMsTUFBZTtBQUM5RSxTQUFPLGlCQUFpQjtBQUFBLElBQ3RCLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQSxNQUNULE9BQU8sQ0FBQyxjQUFjO0FBQUEsSUFDeEI7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsR0FBRztBQUFBLEVBQ0wsQ0FBQztBQUNIO0FBcUJPLElBQU0scUJBQXFCLENBQUMsVUFBNEIsQ0FBQyxNQUFlO0FBQzdFLFNBQU8saUJBQWlCO0FBQUEsSUFDdEIsUUFBUSxDQUFDLEtBQUs7QUFBQSxJQUNkLFVBQVU7QUFBQSxJQUNWLFFBQVE7QUFBQSxJQUNSLFVBQVUsQ0FBQztBQUFBLElBQ1gsR0FBRztBQUFBLEVBQ0wsQ0FBQztBQUNIOzs7QUMxSEEsU0FBUyxnQkFBQUEscUJBQW9CO0FBTTdCLElBQU8sc0JBQVFDLGNBQWE7QUFBQSxFQUMxQjtBQUFBO0FBQUEsSUFFRSxHQUFHLG9CQUFvQjtBQUFBLE1BQ3JCLE9BQU8sQ0FBQyxjQUFjO0FBQUEsTUFDdEIsUUFBUSxDQUFDLEtBQUs7QUFBQTtBQUFBLE1BQ2QsS0FBSztBQUFBO0FBQUEsTUFDTCxPQUFPO0FBQUE7QUFBQSxJQUNULENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQTtBQUFBO0FBQUEsSUFFRSxHQUFHLG1CQUFtQjtBQUFBLE1BQ3BCLE9BQU8sQ0FBQyxlQUFlO0FBQUEsTUFDdkIsS0FBSztBQUFBO0FBQUEsTUFDTCxPQUFPO0FBQUE7QUFBQSxJQUNULENBQUM7QUFBQSxJQUNELE9BQU87QUFBQTtBQUFBLEVBQ1Q7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJkZWZpbmVDb25maWciLCAiZGVmaW5lQ29uZmlnIl0KfQo=
