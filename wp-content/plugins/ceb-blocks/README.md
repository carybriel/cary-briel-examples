# CEB Blocks

A small bootstrap for custom WordPress blocks. Each block declares its assets and rendering in `block.json`; the plugin registers every built block without a separate registration list.

## Usage

From this directory, install the build tools and compile the blocks:

```sh
npm ci
npm run build
```

Copy the plugin, including `build/`, into `wp-content/plugins/` and activate **CEB Blocks**. Use `npm start` to rebuild as source files change during development.

Insert **CEB Classic Menu** anywhere blocks are allowed. In its **Menu settings** panel, select an existing classic menu, choose how many levels to display, and optionally supply a navigation label. A blank label uses the menu's name.

**Basic styling** is enabled by default. Turn it off to let the theme or your own CSS control the presentation. The menu remains a normal navigation list with nested items visible in either mode.

Insert **CEB Icon** and use **Icon settings** to select or search the local SVG catalog. Leave **Accessible label** blank for a decorative icon; supply a short description when the graphic conveys information that surrounding text does not already provide. Search result counts are announced without moving focus.

## Scope and requirements

- Requires WordPress 6.6 or later for the build's [JSX runtime](https://make.wordpress.org/core/2024/06/06/jsx-in-wordpress-6-6/).
- Building requires Node.js satisfying the version range in `package.json` and npm. A supported Node.js LTS release is recommended.
- Deployment requires the generated `build/` directory; Node.js and `node_modules/` are not needed on the WordPress server.
- Blocks belong in immediate subdirectories of `src/`. Each needs its own `block.json` and editor entry point.

The `classic-menu` block requires an existing WordPress classic menu and permission to read menus through WordPress's REST API in the editor. It has no parent-block, page-placement, or theme-component dependencies.

Its optional styling adds list spacing, nested indentation, link underlines, and focus outlines. The frontend stylesheet is enqueued only when a rendered instance enables it. Every rule is scoped to `.ceb-classic-menu--styled`, so unstyled instances remain unaffected on pages containing both modes. Theme and WordPress styles may still apply.

Menu selection is saved directly in `menuId`. Existing blocks that previously inherited their menu from a parent need an explicit menu selection.

The `icon` block saves static SVG markup and requires no frontend JavaScript. It is an image, not a link or button. Meaningful icons need sufficient contrast against their background; the block inherits the surrounding text color. Set `--ceb-icon-size` to adjust its default `2rem` size.

These blocks use the `ceb/` namespace. Content saved under the source plugin's `sem/icon` name is not automatically converted to `ceb/icon`.

## Implementation

`ceb-blocks.php` registers each `build/*/block.json` on `init` and adds a CEB inserter category. WordPress reads the metadata to register scripts, styles, generated dependency files, and optional PHP render templates.

The build uses `@wordpress/scripts` defaults to discover source blocks, compile JavaScript and SCSS, and copy metadata and declared render templates into `build/`. Add another block under `src/` and rebuild; the PHP bootstrap does not need to change.

Block folders use kebab-case (`src/classic-menu/`), with `index.js` for editor registration, `render.php` for PHP rendering, and `style.scss` for styling. Blocks needing frontend behavior can add a vanilla JavaScript `view.js` and declare it in metadata. The classic menu requires no frontend JavaScript.

Block names use `ceb/name`. CSS uses BEM (`.ceb-classic-menu`, `__list`, `--styled`) and component-scoped custom properties such as `--ceb-menu-indent` and `--ceb-menu-item-gap`. PHP functions use `ceb_blocks_*` for the bootstrap and `ceb_classic_menu_*` for block-specific helpers. JavaScript uses descriptive names within each compiled module.

The menu uses WordPress's default walker and link attribute filters. Its stylesheet is declared for the editor and enqueued separately by the render template only when basic styling is enabled. No inline styles are added by the block.

The icon uses named editor and save components in `src/icon/index.js`, a shared SVG component in `icon.js`, and a local catalog with translatable names in `icons.js`. Only catalog paths are rendered; unknown icon names fall back to the search icon. A labeled SVG has `role="img"`; a decorative SVG is hidden from assistive technology. The picker uses native button behavior, visible names, and pressed states. Its layout styles load only in the editor.

The plugin does not require custom webpack configuration, a global JavaScript entry point, or a separate asset loader.

## License

GPL-3.0-or-later, matching the source plugin.
