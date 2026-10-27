# WordPress code examples

Small WordPress plugins by [Cary Briel](https://carybriel.com), collected as examples of focused extensions to existing WordPress features. Each plugin can be installed independently.

## Examples

| Plugin | Purpose | Main techniques |
| --- | --- | --- |
| [Menu ARIA](wp-content/plugins/ceb-menu-aria/README.md) | Optional accessible names for classic menu links | Menu editor hooks, post metadata, input sanitization, link attribute filters |
| [Button ARIA](wp-content/plugins/ceb-button-aria/README.md) | An accessible-name field for the core Button block | Block attributes, inspector controls, server rendering, block deprecations |
| [Classic Editor ARIA](wp-content/plugins/ceb-classic-editor-aria/README.md) | An accessible-name field in the classic link dialog | Admin script loading, DOM controls, TinyMCE integration |
| [CEB Blocks](wp-content/plugins/ceb-blocks/README.md) | A custom block bootstrap with classic menu and SVG icon blocks | Metadata registration, automatic discovery, inspector controls, scoped styling, accessible graphics |

## Installation

The examples live under `wp-content/plugins/`. Copy an individual plugin directory into your site's matching directory, then activate it under **Plugins** in WordPress. The three ARIA plugins require no build step. CEB Blocks must be built first; see its README for instructions and block settings.

