# Dependency policy

The application targets evergreen browsers and Node.js 24 or newer. Direct dependencies are kept on current compatible releases; Node type definitions stay on 24 to match the supported LTS runtime. TypeScript stays on 6.0.3 because the current `@typescript-eslint` release does not support TypeScript 7.

## Deliberate exceptions

| Dependency or vendored library | Reason retained |
| --- | --- |
| `clipper-lib` | Specialist polygon clipping used by CAD geometry operations; replacing it risks changing topology and file results. |
| `libtess` | Specialist tessellation implementation used for CAD surfaces; no native browser API provides equivalent behavior. |
| `web/lib/numeric-1.2.6.js` | Vendored linear algebra and optimization routines used by the geometry solver; its ESM module is resolved directly so generated helpers do not depend on a global. |
| `prop-types` | Runtime validation remains in legacy JSX components that have not yet been migrated to typed interfaces. |
| `web/lib/verb.js` | Vendored NURBS implementation with CAD-specific behavior; its wrapper is ESM while the algorithm remains unchanged. |
| `web/lib/pnltri.js` | Vendored polygon triangulation algorithm used by the CAD geometry pipeline. |

Straightforward infrastructure was moved to platform APIs where practical: XML parsing uses `DOMParser`, and keyboard shortcuts use native `keydown` events instead of Mousetrap. Color picking and icons use maintained React and locally bundled Material Symbols packages.
