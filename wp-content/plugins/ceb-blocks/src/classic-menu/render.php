<?php
/**
 * Render the selected classic menu, with optional styles scoped to this instance.
 */
$menu_object = wp_get_nav_menu_object( absint( $attributes['menuId'] ?? 0 ) );

if ( ! $menu_object ) {
	return;
}

$menu = wp_nav_menu(
	[
		'menu'        => $menu_object->term_id,
		'echo'        => false,
		'fallback_cb' => false,
		'container'   => false,
		'depth'       => absint( $attributes['depth'] ?? 0 ),
		'menu_class'  => 'ceb-classic-menu__list',
	]
);

if ( ! $menu ) {
	return;
}

$use_basic_styles = $attributes['useBasicStyles'] ?? true;

if ( $use_basic_styles ) {
	// Enqueue only when a rendered menu opts in; metadata loads the editor copy.
	wp_enqueue_style(
		'ceb-classic-menu-basic',
		plugins_url( 'style-index.css', __FILE__ ),
		[],
		filemtime( __DIR__ . '/style-index.css' )
	);
}

$label = sanitize_text_field( $attributes['navigationLabel'] ?? '' );
$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class'      => 'ceb-classic-menu' . ( $use_basic_styles ? ' ceb-classic-menu--styled' : '' ),
		'aria-label' => '' !== $label ? $label : $menu_object->name,
	]
);
?>
<nav <?php echo $wrapper_attributes; ?>>
	<?php echo $menu; ?>
</nav>
