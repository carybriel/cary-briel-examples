<?php
/**
 * Plugin Name: CEB Classic Editor ARIA
 * Plugin URI: https://carybriel.com
 * Description: Adds an optional accessible-name field to WordPress's classic Visual editor link dialog.
 * Version: 0.1
 * Text Domain: ceb-classic-editor-aria
 * Author: Cary Briel
 * Author URI: https://carybriel.com
 * License: MIT
 * License URI: https://opensource.org/licenses/MIT
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load the classic link dialog extension on post editing screens.
 *
 * @param string $hook Current admin page hook suffix.
 */
function ceb_classic_editor_aria_enqueue_script( $hook ) {
    if ( ! in_array( $hook, [ 'post.php', 'post-new.php' ], true ) ) {
        return;
    }

    wp_enqueue_script(
        'ceb-classic-editor-aria',
        plugin_dir_url( __FILE__ ) . 'aria-label-enhancer.js',
        [ 'jquery', 'wplink', 'wp-i18n' ],
        filemtime( plugin_dir_path( __FILE__ ) . 'aria-label-enhancer.js' ),
        true
    );
    wp_set_script_translations( 'ceb-classic-editor-aria', 'ceb-classic-editor-aria' );
}

add_action( 'admin_enqueue_scripts', 'ceb_classic_editor_aria_enqueue_script' );
