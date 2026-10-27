<?php
/**
 * Plugin Name: CEB Menu ARIA
 * Description: Adds an ARIA label field to WordPress menu items and applies it as an attribute in the rendered menu.
 * Version: 0.1
 * Text Domain: ceb-menu-aria
 * Author: Cary Briel
 * License: MIT
 * License URI: https://opensource.org/licenses/MIT
 */

defined( 'ABSPATH' ) || exit;

/**
 * Display the optional label and usage guidance in the classic menu editor.
 *
 * @param int $item_id Menu item post ID.
 */
function ceb_menu_aria_render_field( $item_id ) {
    $value = get_post_meta( $item_id, '_menu_item_aria_label', true );
    ?>
    <p class="field-aria-label description description-wide">
        <label for="edit-menu-item-aria-label-<?php echo esc_attr( $item_id ); ?>">
            <strong><?php esc_html_e( 'ARIA Label', 'ceb-menu-aria' ); ?></strong><br>
            <input type="text"
                   id="edit-menu-item-aria-label-<?php echo esc_attr( $item_id ); ?>"
                   class="widefat code edit-menu-item-aria-label"
                   name="menu-item-aria-label[<?php echo esc_attr( $item_id ); ?>]"
                   aria-describedby="edit-menu-item-aria-label-help-<?php echo esc_attr( $item_id ); ?>"
                   value="<?php echo esc_attr( $value ); ?>">
        </label>
        <span class="description" id="edit-menu-item-aria-label-help-<?php echo esc_attr( $item_id ); ?>">
            <?php esc_html_e( 'Leave blank to use the link text. If you add a label, include the visible link text in it.', 'ceb-menu-aria' ); ?>
        </span>
    </p>
    <?php
}
add_action( 'wp_nav_menu_item_custom_fields', 'ceb_menu_aria_render_field' );

/**
 * Save an explicitly submitted label without changing labels omitted by other interfaces.
 *
 * @param int $menu_id         Menu term ID supplied by the hook; not used here.
 * @param int $menu_item_db_id Menu item post ID.
 */
function ceb_menu_aria_save_field( $menu_id, $menu_item_db_id ) {
    // Other menu interfaces and programmatic updates may omit this field.
    // Preserve the stored label unless this item explicitly submits a value.
    if (
        ! isset( $_POST['menu-item-aria-label'] ) ||
        ! is_array( $_POST['menu-item-aria-label'] ) ||
        ! isset( $_POST['menu-item-aria-label'][ $menu_item_db_id ] ) ||
        ! is_string( $_POST['menu-item-aria-label'][ $menu_item_db_id ] )
    ) {
        return;
    }

    // Only accept changes from an authorized classic menu form submission.
    // Reuse the form's nonce rather than adding one nonce per menu item.
    if (
        ! current_user_can( 'edit_theme_options' ) ||
        ! isset( $_POST['update-nav-menu-nonce'] ) ||
        ! is_string( $_POST['update-nav-menu-nonce'] ) ||
        ! wp_verify_nonce( wp_unslash( $_POST['update-nav-menu-nonce'] ), 'update-nav_menu' )
    ) {
        return;
    }

    $value = sanitize_text_field( wp_unslash( $_POST['menu-item-aria-label'][ $menu_item_db_id ] ) );

    // Clearing the field removes this plugin's custom label.
    if ( '' === $value ) {
        delete_post_meta( $menu_item_db_id, '_menu_item_aria_label' );
        return;
    }

    update_post_meta( $menu_item_db_id, '_menu_item_aria_label', wp_slash( $value ) );
}
add_action( 'wp_update_nav_menu_item', 'ceb_menu_aria_save_field', 10, 2 );

/**
 * Supply the stored label to the menu walker for attribute escaping and rendering.
 *
 * @param array   $atts Link attributes supplied by the menu walker.
 * @param WP_Post $item Menu item post.
 * @return array Link attributes with the optional accessible label.
 */
function ceb_menu_aria_filter_link_attributes( $atts, $item ) {
    $aria = get_post_meta( $item->ID, '_menu_item_aria_label', true );

    if ( '' !== $aria ) {
        // WordPress escapes these attributes when the menu walker renders them.
        $atts['aria-label'] = $aria;
    }

    return $atts;
}
add_filter( 'nav_menu_link_attributes', 'ceb_menu_aria_filter_link_attributes', 10, 2 );
