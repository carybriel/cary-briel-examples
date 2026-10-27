# CEB Button ARIA

Adds an optional **ARIA Label** field to the core Button block's sidebar. The value is stored in block metadata and applied to the rendered link or button by PHP.

## Usage

1. Copy `ceb-button-aria` into `wp-content/plugins/` and activate **CEB Button ARIA**.
2. Select a Button block and open **Accessibility** in the block settings sidebar.
3. Enter an optional label and save the post or page.

Usually the visible button text is sufficient. If you add a label, include that text in it; for example, “Read more about our services” for a button displaying “Read more.” Clearing the field stops this plugin from adding a label.

## Scope and requirements

- Requires WordPress 6.2 or later for `WP_HTML_Tag_Processor`.
- Supports `core/button`, including its link and native button variants. Third-party button blocks are outside its scope.
- Adds the label to frontend output; the editor canvas does not preview it.
- Must remain active to render custom labels. Resaving content while the plugin is inactive can discard its label metadata.

Blocks saved by the earlier sample should be opened and resaved while the plugin is active before deactivation, so their saved HTML can migrate to the current format.

## Implementation

Named PHP callbacks register the `ariaLabel` attribute and apply it through `render_block_core/button`. The render callback sanitizes the value and uses WordPress's HTML Tag Processor to set and escape the attribute.

Scoped JavaScript adds the sidebar control through `editor.BlockEdit`. New saves retain core's normal HTML, with the label stored in block comment metadata. A block deprecation handles the earlier sample's saved HTML when recognized blocks are resaved. No build step is required.

## License

[MIT](LICENSE).
