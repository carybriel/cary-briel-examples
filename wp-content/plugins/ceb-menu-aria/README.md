# CEB Menu ARIA

Adds an optional **ARIA Label** field to items in WordPress's classic menu editor. The label is stored as menu item metadata and applied to the rendered link.

## Usage

1. Copy `ceb-menu-aria` into `wp-content/plugins/` and activate **CEB Menu ARIA**.
2. Open **Appearance → Menus** and expand a menu item.
3. Enter an optional label and select **Save Menu**.

Usually the visible link text is sufficient. If you add a label, include that text in it; for example, “Read more about our services” for a link displaying “Read more.” Clearing the field removes this plugin's custom label.

## Scope and requirements

- Requires access to WordPress's classic menu editor and permission to edit menus.
- Supports classic menus rendered through `wp_nav_menu()`. Custom walkers must apply the `nav_menu_link_attributes` filter.
- Does not add controls to the Navigation block or Customizer.
- Must remain active to apply stored labels to frontend output.

## Implementation

Named PHP callbacks add the field through `wp_nav_menu_item_custom_fields` and save sanitized text in `_menu_item_aria_label` metadata through `wp_update_nav_menu_item`. Saving requires the appropriate capability and a valid menu form nonce.

A cleared field removes the metadata; an omitted field preserves it. The `nav_menu_link_attributes` filter supplies the label to the menu walker, which escapes it during rendering. No build step is required.

## License

[MIT](LICENSE).
