<?php
/**
 * Plugin Name: CEB Button ARIA
 * Plugin URI: https://carybriel.com
 * Description: Adds ARIA label support to the core/button block.
 * Version: 0.1
 * Text Domain: ceb-button-aria
 * Author: Cary Briel
 * Author URI: https://carybriel.com
 * License: MIT
 * License URI: https://opensource.org/licenses/MIT
 * Requires at least: 6.2
 */
defined( 'ABSPATH' ) || exit;

/**
 * Register the label in block metadata without changing core's saved HTML.
 *
 * @param array  $args       Block registration settings.
 * @param string $block_name Registered block name.
 * @return array Block settings with the optional label attribute.
 */
function ceb_button_aria_register_attribute( $args, $block_name ) {
    if ( 'core/button' === $block_name ) {
        $args['attributes']['ariaLabel'] = [ 'type' => 'string', 'default' => '' ];
    }

    return $args;
}
add_filter( 'register_block_type_args', 'ceb_button_aria_register_attribute', 10, 2 );

/**
 * Apply the label to the rendered control using WordPress's HTML attribute API.
 *
 * @param string $content Rendered Button block markup.
 * @param array  $block   Parsed block data, including its saved attributes.
 * @return string Markup with the optional custom label.
 */
function ceb_button_aria_render_label( $content, $block ) {
    $label = $block['attrs']['ariaLabel'] ?? '';
    if ( ! is_string( $label ) ) {
        return $content;
    }

    $label = sanitize_text_field( $label );
    if ( '' === $label ) {
        return $content;
    }

    $processor = new WP_HTML_Tag_Processor( $content );
    while ( $processor->next_tag( [ 'class_name' => 'wp-block-button__link' ] ) ) {
        if ( in_array( $processor->get_tag(), [ 'A', 'BUTTON' ], true ) ) {
            // The processor escapes the value and replaces any existing attribute.
            $processor->set_attribute( 'aria-label', $label );
            return $processor->get_updated_html();
        }
    }

    return $content;
}
add_filter( 'render_block_core/button', 'ceb_button_aria_render_label', 10, 2 );

/**
 * Load the Button block's sidebar control and legacy content migration in the editor.
 */
function ceb_button_aria_enqueue_editor_assets() {
    wp_enqueue_script(
        'ceb-button-aria',
        plugins_url( 'block-enhancer.js', __FILE__ ),
        [ 'wp-element', 'wp-components', 'wp-compose', 'wp-hooks', 'wp-block-editor', 'wp-i18n' ],
        filemtime( plugin_dir_path( __FILE__ ) . 'block-enhancer.js' ),
        true
    );
    wp_set_script_translations( 'ceb-button-aria', 'ceb-button-aria' );
}
add_action( 'enqueue_block_editor_assets', 'ceb_button_aria_enqueue_editor_assets' );
