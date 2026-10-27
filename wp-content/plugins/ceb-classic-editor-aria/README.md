# CEB Classic Editor ARIA

Adds an optional **ARIA Label** field to WordPress's classic Insert/Edit Link dialog. The label is applied to the edited link when the dialog is submitted.

## Usage

1. Copy `ceb-classic-editor-aria` into `wp-content/plugins/` and activate **CEB Classic Editor ARIA**.
2. Open a post or page in the classic Visual editor, or edit a Classic block.
3. Select a link, choose **Insert/edit link**, and open **Link options**. You can also select text to create a new link.
4. Enter an optional label, select **Update** or **Add Link**, and save the post.

Usually the visible link text is sufficient. If you add a label, include that text in it; for example, “Read more about our services” for a link displaying “Read more.” Clearing the field removes the link's `aria-label`. Cancel, Close, and Escape discard unsaved label edits.

## Scope and requirements

- Requires a classic Visual editor or Classic block using WordPress's standard TinyMCE link dialog on a post editing screen.
- Does not extend modern block editor link controls or editors on other admin pages. Its field is hidden in Code/Text mode.
- Saves labels in link HTML, so frontend output does not require the plugin to remain active.
- Depends on WordPress's `wpLink` and TinyMCE integration, which should be rechecked on WordPress upgrades.

## Implementation

A named PHP callback loads the script on post editing screens with explicit dependencies. Scoped JavaScript refreshes the field on each `wplink-open` event using the dialog's editor and the marked link WordPress updates.

The plugin wraps `wpLink.getAttrs()`, preserving core's attributes and adding the label to the normal submit operation and undo transaction. Post authorization and content filtering use WordPress's existing save flow. No build step is required.

## License

[MIT](LICENSE).
