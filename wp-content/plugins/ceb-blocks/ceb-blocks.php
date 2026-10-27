<?php
/**
 * Plugin Name: CEB Blocks
 * Description: Custom blocks registered from their block.json metadata.
 * Version: 0.1.0
 * Author: Cary Briel
 * Text Domain: ceb-blocks
 * Requires at least: 6.6
 * License: GPL-3.0-or-later
 */

defined( 'ABSPATH' ) || exit;

/**
 * Register each built block; WordPress handles its assets and render template.
 */
function ceb_blocks_register_blocks() {
	foreach ( glob( __DIR__ . '/build/*/block.json' ) ?: [] as $metadata ) {
		register_block_type( dirname( $metadata ) );
	}
}
add_action( 'init', 'ceb_blocks_register_blocks' );

/**
 * Group this plugin's blocks under a shared inserter category.
 */
function ceb_blocks_add_category( $categories ) {
	$categories[] = [
		'slug'  => 'ceb',
		'title' => __( 'CEB', 'ceb-blocks' ),
	];

	return $categories;
}
add_filter( 'block_categories_all', 'ceb_blocks_add_category' );
