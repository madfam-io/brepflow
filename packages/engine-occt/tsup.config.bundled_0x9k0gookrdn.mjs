// ../../build/tsup.base.config.ts
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
      dts: true
      // Re-enable DTS with proper configuration
    })
  },
  {
    // Worker entry - Worker-specific configuration
    ...createWorkerConfig({
      entry: ["src/worker.ts"],
      dts: false
      // Workers don't need type definitions
    }),
    clean: false
    // Don't clean since we run after main build
  }
]);
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vYnVpbGQvdHN1cC5iYXNlLmNvbmZpZy50cyIsICJ0c3VwLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCIvVXNlcnMvYWxkb3J1aXpsdW5hL2xhYnNwYWNlL2JyZXBmbG93L2J1aWxkL3RzdXAuYmFzZS5jb25maWcudHNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL2FsZG9ydWl6bHVuYS9sYWJzcGFjZS9icmVwZmxvdy9idWlsZFwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vVXNlcnMvYWxkb3J1aXpsdW5hL2xhYnNwYWNlL2JyZXBmbG93L2J1aWxkL3RzdXAuYmFzZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIE9wdGlvbnMgfSBmcm9tICd0c3VwJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcblxuLyoqXG4gKiBCYXNlIHRzdXAgY29uZmlndXJhdGlvbiBmb3IgYWxsIHBhY2thZ2VzXG4gKiBQcm92aWRlcyBjb25zaXN0ZW50IGJ1aWxkIHNldHRpbmdzIGFjcm9zcyB0aGUgbW9ub3JlcG9cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUJhc2VDb25maWcgPSAob3B0aW9uczogUGFydGlhbDxPcHRpb25zPiA9IHt9KTogT3B0aW9ucyA9PiB7XG4gIGNvbnN0IGlzUHJvZHVjdGlvbiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbic7XG5cbiAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XG4gICAgLy8gRW50cnkgcG9pbnRzXG4gICAgZW50cnk6IFsnc3JjL2luZGV4LnRzJ10sXG5cbiAgICAvLyBPdXRwdXQgZm9ybWF0c1xuICAgIGZvcm1hdDogWydjanMnLCAnZXNtJ10sXG5cbiAgICAvLyBUeXBlU2NyaXB0IGRlY2xhcmF0aW9uc1xuICAgIGR0czoge1xuICAgICAgcmVzb2x2ZTogdHJ1ZSxcbiAgICAgIGNvbXBpbGVyT3B0aW9uczoge1xuICAgICAgICBjb21wb3NpdGU6IGZhbHNlLFxuICAgICAgICBpbmNyZW1lbnRhbDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICAvLyBTb3VyY2UgbWFwcyBmb3IgZGVidWdnaW5nXG4gICAgc291cmNlbWFwOiB0cnVlLFxuXG4gICAgLy8gQ2xlYW4gb3V0cHV0IGRpcmVjdG9yeSBiZWZvcmUgYnVpbGRcbiAgICBjbGVhbjogdHJ1ZSxcblxuICAgIC8vIE1pbmlmaWNhdGlvbiBpbiBwcm9kdWN0aW9uXG4gICAgbWluaWZ5OiBpc1Byb2R1Y3Rpb24sXG5cbiAgICAvLyBUcmVlIHNoYWtpbmcgZm9yIHNtYWxsZXIgYnVuZGxlc1xuICAgIHRyZWVzaGFrZTogaXNQcm9kdWN0aW9uID8ge1xuICAgICAgbW9kdWxlU2lkZUVmZmVjdHM6IGZhbHNlLFxuICAgICAgcHJvcGVydHlSZWFkU2lkZUVmZmVjdHM6IGZhbHNlLFxuICAgICAgdHJ5Q2F0Y2hEZW9wdGltaXphdGlvbjogZmFsc2UsXG4gICAgfSA6IGZhbHNlLFxuXG4gICAgLy8gQ29kZSBzcGxpdHRpbmdcbiAgICBzcGxpdHRpbmc6IGZhbHNlLFxuXG4gICAgLy8gU2tpcCBub2RlX21vZHVsZXMgYnVuZGxpbmdcbiAgICBza2lwTm9kZU1vZHVsZXNCdW5kbGU6IHRydWUsXG5cbiAgICAvLyBFeHRlcm5hbCBkZXBlbmRlbmNpZXMgKHRvIGJlIHJlc29sdmVkIGJ5IGNvbnN1bWVyKVxuICAgIGV4dGVybmFsOiBbXG4gICAgICAncmVhY3QnLFxuICAgICAgJ3JlYWN0LWRvbScsXG4gICAgICAncmVhY3QvanN4LXJ1bnRpbWUnLFxuICAgIF0sXG5cbiAgICAvLyBUYXJnZXQgZW52aXJvbm1lbnRcbiAgICB0YXJnZXQ6ICdlczIwMjInLFxuXG4gICAgLy8gS2VlcCBuYW1lcyBmb3IgYmV0dGVyIGRlYnVnZ2luZ1xuICAgIGtlZXBOYW1lczogdHJ1ZSxcblxuICAgIC8vIFNoaW1zXG4gICAgc2hpbXM6IHRydWUsXG5cbiAgICAvLyBCYW5uZXIgZm9yIGxpY2Vuc2UvbWV0YWRhdGFcbiAgICBiYW5uZXI6IHtcbiAgICAgIGpzOiBgLyoqXG4gKiBAYnJlcGZsb3dcbiAqIChjKSAke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX0gQnJlcEZsb3cgLSBNSVQgTGljZW5zZVxuICovYCxcbiAgICB9LFxuXG4gICAgLy8gTWVyZ2Ugd2l0aCBjdXN0b20gb3B0aW9uc1xuICAgIC4uLm9wdGlvbnMsXG4gIH0gYXMgT3B0aW9ucyk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBjb25maWd1cmF0aW9uIGZvciBsaWJyYXJ5IHBhY2thZ2VzXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVMaWJyYXJ5Q29uZmlnID0gKG9wdGlvbnM6IFBhcnRpYWw8T3B0aW9ucz4gPSB7fSk6IE9wdGlvbnMgPT4ge1xuICByZXR1cm4gY3JlYXRlQmFzZUNvbmZpZyh7XG4gICAgZHRzOiB7XG4gICAgICByZXNvbHZlOiB0cnVlLFxuICAgICAgZW50cnk6IFsnc3JjL2luZGV4LnRzJ10sXG4gICAgfSxcbiAgICBleHRlcm5hbDogW1xuICAgICAgJ3JlYWN0JyxcbiAgICAgICdyZWFjdC1kb20nLFxuICAgICAgJ3JlYWN0L2pzeC1ydW50aW1lJyxcbiAgICAgIC9eQGJyZXBmbG93XFwvLyxcbiAgICBdLFxuICAgIC4uLm9wdGlvbnMsXG4gIH0pO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgY29uZmlndXJhdGlvbiBmb3IgYXBwbGljYXRpb24gcGFja2FnZXNcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUFwcENvbmZpZyA9IChvcHRpb25zOiBQYXJ0aWFsPE9wdGlvbnM+ID0ge30pOiBPcHRpb25zID0+IHtcbiAgcmV0dXJuIGNyZWF0ZUJhc2VDb25maWcoe1xuICAgIHNwbGl0dGluZzogdHJ1ZSxcbiAgICBtaW5pZnk6IHRydWUsXG4gICAgZXh0ZXJuYWw6IFtcbiAgICAgICdyZWFjdCcsXG4gICAgICAncmVhY3QtZG9tJyxcbiAgICAgICdyZWFjdC9qc3gtcnVudGltZScsXG4gICAgXSxcbiAgICAuLi5vcHRpb25zLFxuICB9KTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGNvbmZpZ3VyYXRpb24gZm9yIHdvcmtlciBwYWNrYWdlc1xuICovXG5leHBvcnQgY29uc3QgY3JlYXRlV29ya2VyQ29uZmlnID0gKG9wdGlvbnM6IFBhcnRpYWw8T3B0aW9ucz4gPSB7fSk6IE9wdGlvbnMgPT4ge1xuICByZXR1cm4gY3JlYXRlQmFzZUNvbmZpZyh7XG4gICAgZm9ybWF0OiBbJ2VzbSddLFxuICAgIHBsYXRmb3JtOiAnYnJvd3NlcicsXG4gICAgdGFyZ2V0OiAnZXMyMDIyJyxcbiAgICBleHRlcm5hbDogW10sXG4gICAgLi4ub3B0aW9ucyxcbiAgfSk7XG59OyIsICJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIi9Vc2Vycy9hbGRvcnVpemx1bmEvbGFic3BhY2UvYnJlcGZsb3cvcGFja2FnZXMvZW5naW5lLW9jY3QvdHN1cC5jb25maWcudHNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL2FsZG9ydWl6bHVuYS9sYWJzcGFjZS9icmVwZmxvdy9wYWNrYWdlcy9lbmdpbmUtb2NjdFwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vVXNlcnMvYWxkb3J1aXpsdW5hL2xhYnNwYWNlL2JyZXBmbG93L3BhY2thZ2VzL2VuZ2luZS1vY2N0L3RzdXAuY29uZmlnLnRzXCI7aW1wb3J0IHsgY3JlYXRlV29ya2VyQ29uZmlnLCBjcmVhdGVMaWJyYXJ5Q29uZmlnIH0gZnJvbSAnLi4vLi4vYnVpbGQvdHN1cC5iYXNlLmNvbmZpZyc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd0c3VwJztcblxuLyoqXG4gKiBFbmdpbmUgT0NDVCBidWlsZCBjb25maWd1cmF0aW9uXG4gKiBXQVNNIGdlb21ldHJ5IGVuZ2luZSB3aXRoIHdvcmtlci1iYXNlZCBleGVjdXRpb25cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKFtcbiAge1xuICAgIC8vIE1haW4gZW50cnkgLSBMaWJyYXJ5IGNvbmZpZ3VyYXRpb24gZm9yIEVTTVxuICAgIC4uLmNyZWF0ZUxpYnJhcnlDb25maWcoe1xuICAgICAgZW50cnk6IFsnc3JjL2luZGV4LnRzJ10sXG4gICAgICBmb3JtYXQ6IFsnZXNtJ10sIC8vIEVTTSBvbmx5IGZvciBpbXBvcnQubWV0YVxuICAgICAgZHRzOiB0cnVlLCAvLyBSZS1lbmFibGUgRFRTIHdpdGggcHJvcGVyIGNvbmZpZ3VyYXRpb25cbiAgICB9KSxcbiAgfSxcbiAge1xuICAgIC8vIFdvcmtlciBlbnRyeSAtIFdvcmtlci1zcGVjaWZpYyBjb25maWd1cmF0aW9uXG4gICAgLi4uY3JlYXRlV29ya2VyQ29uZmlnKHtcbiAgICAgIGVudHJ5OiBbJ3NyYy93b3JrZXIudHMnXSxcbiAgICAgIGR0czogZmFsc2UsIC8vIFdvcmtlcnMgZG9uJ3QgbmVlZCB0eXBlIGRlZmluaXRpb25zXG4gICAgfSksXG4gICAgY2xlYW46IGZhbHNlLCAvLyBEb24ndCBjbGVhbiBzaW5jZSB3ZSBydW4gYWZ0ZXIgbWFpbiBidWlsZFxuICB9XG5dKTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQXlSLFNBQVMsb0JBQTZCO0FBT3hULElBQU0sbUJBQW1CLENBQUMsVUFBNEIsQ0FBQyxNQUFlO0FBQzNFLFFBQU0sZUFBZSxRQUFRLElBQUksYUFBYTtBQUU5QyxTQUFPLGFBQWE7QUFBQTtBQUFBLElBRWxCLE9BQU8sQ0FBQyxjQUFjO0FBQUE7QUFBQSxJQUd0QixRQUFRLENBQUMsT0FBTyxLQUFLO0FBQUE7QUFBQSxJQUdyQixLQUFLO0FBQUEsTUFDSCxTQUFTO0FBQUEsTUFDVCxpQkFBaUI7QUFBQSxRQUNmLFdBQVc7QUFBQSxRQUNYLGFBQWE7QUFBQSxNQUNmO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFHQSxXQUFXO0FBQUE7QUFBQSxJQUdYLE9BQU87QUFBQTtBQUFBLElBR1AsUUFBUTtBQUFBO0FBQUEsSUFHUixXQUFXLGVBQWU7QUFBQSxNQUN4QixtQkFBbUI7QUFBQSxNQUNuQix5QkFBeUI7QUFBQSxNQUN6Qix3QkFBd0I7QUFBQSxJQUMxQixJQUFJO0FBQUE7QUFBQSxJQUdKLFdBQVc7QUFBQTtBQUFBLElBR1gsdUJBQXVCO0FBQUE7QUFBQSxJQUd2QixVQUFVO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFHQSxRQUFRO0FBQUE7QUFBQSxJQUdSLFdBQVc7QUFBQTtBQUFBLElBR1gsT0FBTztBQUFBO0FBQUEsSUFHUCxRQUFRO0FBQUEsTUFDTixJQUFJO0FBQUE7QUFBQSxVQUVELG9CQUFJLEtBQUssR0FBRSxZQUFZLENBQUM7QUFBQTtBQUFBLElBRTdCO0FBQUE7QUFBQSxJQUdBLEdBQUc7QUFBQSxFQUNMLENBQVk7QUFDZDtBQUtPLElBQU0sc0JBQXNCLENBQUMsVUFBNEIsQ0FBQyxNQUFlO0FBQzlFLFNBQU8saUJBQWlCO0FBQUEsSUFDdEIsS0FBSztBQUFBLE1BQ0gsU0FBUztBQUFBLE1BQ1QsT0FBTyxDQUFDLGNBQWM7QUFBQSxJQUN4QjtBQUFBLElBQ0EsVUFBVTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxHQUFHO0FBQUEsRUFDTCxDQUFDO0FBQ0g7QUFxQk8sSUFBTSxxQkFBcUIsQ0FBQyxVQUE0QixDQUFDLE1BQWU7QUFDN0UsU0FBTyxpQkFBaUI7QUFBQSxJQUN0QixRQUFRLENBQUMsS0FBSztBQUFBLElBQ2QsVUFBVTtBQUFBLElBQ1YsUUFBUTtBQUFBLElBQ1IsVUFBVSxDQUFDO0FBQUEsSUFDWCxHQUFHO0FBQUEsRUFDTCxDQUFDO0FBQ0g7OztBQzFIQSxTQUFTLGdCQUFBQSxxQkFBb0I7QUFNN0IsSUFBTyxzQkFBUUMsY0FBYTtBQUFBLEVBQzFCO0FBQUE7QUFBQSxJQUVFLEdBQUcsb0JBQW9CO0FBQUEsTUFDckIsT0FBTyxDQUFDLGNBQWM7QUFBQSxNQUN0QixRQUFRLENBQUMsS0FBSztBQUFBO0FBQUEsTUFDZCxLQUFLO0FBQUE7QUFBQSxJQUNQLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQTtBQUFBO0FBQUEsSUFFRSxHQUFHLG1CQUFtQjtBQUFBLE1BQ3BCLE9BQU8sQ0FBQyxlQUFlO0FBQUEsTUFDdkIsS0FBSztBQUFBO0FBQUEsSUFDUCxDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUE7QUFBQSxFQUNUO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsiZGVmaW5lQ29uZmlnIiwgImRlZmluZUNvbmZpZyJdCn0K
