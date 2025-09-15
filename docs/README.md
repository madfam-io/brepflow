# BrepFlow Documentation

Comprehensive documentation for BrepFlow - web-first, node-based parametric CAD.

## Quick Start

- **[Setup Guide](./development/SETUP.md)** - Get up and running in 5 minutes
- **[README](../README.md)** - Project overview and quick start
- **[Studio App](../apps/studio/README.md)** - Interactive CAD interface

## Architecture

- **[Architecture Overview](./technical/ARCHITECTURE.md)** - System design and components
- **[API Reference](./technical/API.md)** - Complete API documentation
- **[Production Readiness](./technical/PRODUCTION_READINESS_ANALYSIS.md)** - Deployment considerations

## User Guides

### Getting Started
- **[Installation](./development/SETUP.md#installation)** - Prerequisites and setup
- **[First Model](../apps/studio/README.md#first-model)** - Create your first parametric model
- **[Node Editor](../apps/studio/README.md#node-editor)** - Visual programming interface

### Modeling Workflow
- **[Sketch Operations](../packages/nodes-core/README.md#sketch-nodes)** - 2D geometry creation
- **[Solid Modeling](../packages/nodes-core/README.md#solid-nodes)** - 3D primitives and operations
- **[Boolean Operations](../packages/nodes-core/README.md#boolean-nodes)** - Combine and modify shapes
- **[Features](../packages/nodes-core/README.md#feature-nodes)** - Fillets, chamfers, and advanced features

### File Operations
- **[Import/Export](../packages/nodes-core/README.md#io-nodes)** - STEP, IGES, STL formats
- **[Graph Format](../packages/schemas/README.md)** - .bflow.json specification
- **[CLI Usage](../packages/cli/README.md)** - Headless processing and automation

## Development

### Core Packages
- **[Engine Core](../packages/engine-core/README.md)** - DAG execution and caching
- **[Engine OCCT](../packages/engine-occt/README.md)** - WebAssembly geometry kernel
- **[Nodes Core](../packages/nodes-core/README.md)** - Built-in node library
- **[CLI](../packages/cli/README.md)** - Command-line interface
- **[Studio App](../apps/studio/README.md)** - Web application

### Development Guides
- **[Contributing](./development/CONTRIBUTING.md)** - How to contribute to BrepFlow
- **[Testing](./development/TESTING.md)** - Testing strategy and coverage
- **[Build System](../claudedocs/BUILD_SYSTEM_IMPROVEMENTS.md)** - Build configuration

### API Documentation
- **[Type Definitions](../packages/types/src/index.ts)** - TypeScript interfaces
- **[Node API](../packages/nodes-core/README.md#custom-node-development)** - Creating custom nodes
- **[Worker API](../packages/engine-occt/README.md#worker-architecture)** - WASM integration

## Project Information

### Planning & Roadmap
- **[Project Requirements](./project/PRD.md)** - Product requirements document
- **[Software Specification](./project/SOFTWARE_SPEC.md)** - Technical specifications
- **[Roadmap](./project/ROADMAP.md)** - Development timeline and milestones

### Analysis & Reports
- **[Codebase Health](../claudedocs/CODEBASE_HEALTH_ANALYSIS.md)** - Code quality analysis
- **[UX Audit](../claudedocs/UI_UX_AUDIT_2025_09_15.md)** - User experience analysis
- **[Integration Status](../INTEGRATION_STATUS.md)** - Component integration status

## Technical Deep Dives

### Geometry Engine
- **[OCCT Integration](../claudedocs/OCCT_INTEGRATION_COMPLETE.md)** - OpenCASCADE integration
- **[WASM Compilation](../packages/engine-occt/README.md#building-occt-wasm)** - WebAssembly build process
- **[Performance](../packages/engine-occt/README.md#performance-optimization)** - Optimization strategies

### Graph Execution
- **[DAG Engine](../packages/engine-core/README.md#evaluation-process)** - Graph evaluation algorithm
- **[Caching Strategy](../packages/engine-core/README.md#caching-strategy)** - Content-addressed caching
- **[Dirty Propagation](../packages/engine-core/README.md#evaluation-process)** - Incremental updates

### User Interface
- **[Component Architecture](../apps/studio/README.md#component-structure)** - React component structure
- **[State Management](../apps/studio/README.md#state-management)** - Zustand state patterns
- **[3D Viewport](../apps/studio/README.md#3d-viewport)** - Three.js integration

## Examples & Tutorials

### Basic Examples
- **[Simple Box](../packages/examples/simple-box.bflow.json)** - Basic parametric box
- **[Filleted Bracket](../packages/examples/bracket.bflow.json)** - Mechanical part with fillets
- **[Boolean Assembly](../packages/examples/assembly.bflow.json)** - Multi-part assembly

### Advanced Examples
- **[Parametric Enclosure](../packages/examples/enclosure.bflow.json)** - Electronic enclosure with parameters
- **[Swept Profile](../packages/examples/sweep.bflow.json)** - Complex swept geometry
- **[Array Pattern](../packages/examples/pattern.bflow.json)** - Linear and circular arrays

### CLI Examples
- **[Batch Processing](../packages/cli/README.md#batch-processing)** - Automated model generation
- **[Parameter Sweeps](../packages/cli/README.md#sweep)** - Variant generation
- **[CI/CD Integration](../packages/cli/README.md#cicd-integration)** - Automated builds

## FAQ & Troubleshooting

### Common Issues
- **[Studio Troubleshooting](../apps/studio/README.md#troubleshooting)** - UI and rendering issues
- **[WASM Issues](../packages/engine-occt/README.md#browser-requirements)** - Browser compatibility
- **[Build Problems](../claudedocs/TROUBLESHOOTING_FIXES.md)** - Build and dependency issues

### Performance
- **[Optimization Guide](../packages/engine-occt/README.md#performance-optimization)** - Performance tuning
- **[Memory Management](../apps/studio/README.md#memory-management)** - Memory optimization
- **[Viewport Performance](../apps/studio/README.md#viewport-performance)** - 3D rendering optimization

### Development
- **[Testing Issues](./development/TESTING.md#common-issues)** - Test debugging
- **[Debug Tools](../apps/studio/README.md#debug-tools)** - Development utilities
- **[Error Handling](../packages/engine-core/README.md#error-handling)** - Error management

## Reference

### File Formats
- **[.bflow.json](../packages/schemas/README.md)** - Graph file format
- **[STEP Export](../packages/engine-occt/README.md#importexport)** - STEP file generation
- **[STL Export](../packages/engine-occt/README.md#importexport)** - STL mesh export

### Configuration
- **[CLI Config](../packages/cli/README.md#configuration)** - Command-line configuration
- **[Studio Config](../apps/studio/README.md#environment-configuration)** - Application configuration
- **[Build Config](../turbo.json)** - Monorepo build configuration

### Standards
- **[Code Style](./development/CONTRIBUTING.md#code-style)** - Coding standards
- **[Testing Standards](./development/TESTING.md#best-practices)** - Test guidelines
- **[Git Workflow](./development/CONTRIBUTING.md#git-workflow)** - Version control

## Resources

### External Documentation
- **[OpenCASCADE](https://dev.opencascade.org/doc)** - Geometry kernel documentation
- **[React Flow](https://reactflow.dev/docs)** - Node editor framework
- **[Three.js](https://threejs.org/docs)** - 3D graphics library
- **[Vitest](https://vitest.dev/)** - Testing framework

### Community
- **[GitHub Repository](https://github.com/aureolabs/brepflow)** - Source code and issues
- **[Discussions](https://github.com/aureolabs/brepflow/discussions)** - Community forum
- **[Changelog](../CHANGELOG.md)** - Release notes and changes
- **[License](../LICENSE)** - MPL-2.0 license terms

### Support
- **[Issue Tracker](https://github.com/aureolabs/brepflow/issues)** - Bug reports and feature requests
- **[Security](../SECURITY.md)** - Security policy and reporting
- **[Contributing](./development/CONTRIBUTING.md)** - How to contribute

---

## Document Status

| Document | Status | Last Updated | Coverage |
|----------|--------|--------------|----------|
| Main README | ✅ Complete | 2025-09-14 | Comprehensive |
| Architecture | ✅ Complete | 2025-09-14 | Detailed |
| API Reference | ✅ Complete | 2025-09-14 | Complete |
| Setup Guide | ✅ Complete | 2025-09-14 | Detailed |
| Testing Guide | ✅ Complete | 2025-09-14 | Comprehensive |
| Engine Core | ✅ Complete | 2025-09-14 | Complete API |
| Engine OCCT | ✅ Complete | 2025-09-14 | Complete API |
| Nodes Core | ✅ Complete | 2025-09-14 | All node types |
| CLI | ✅ Complete | 2025-09-14 | All commands |
| Studio App | ✅ Complete | 2025-09-14 | Full features |
| Contributing | ✅ Complete | 2025-09-14 | Guidelines |

**Documentation Coverage**: **100%** - All major components documented

## Navigation

- **← [Main README](../README.md)**
- **→ [Getting Started](./development/SETUP.md)**
- **📐 [Architecture](./technical/ARCHITECTURE.md)**
- **🔧 [API Reference](./technical/API.md)**
- **🧪 [Testing](./development/TESTING.md)**
- **🤝 [Contributing](./development/CONTRIBUTING.md)**