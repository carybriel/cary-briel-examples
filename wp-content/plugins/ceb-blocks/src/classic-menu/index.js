import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Disabled, PanelBody, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { useEntityRecords } from '@wordpress/core-data';
import { speak } from '@wordpress/a11y';
import { useEffect } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import './style.scss';

/** Configure an existing classic menu without relying on a parent block. */
function EditClassicMenu( { attributes, setAttributes, isSelected } ) {
	const { menuId, navigationLabel, depth, useBasicStyles } = attributes;
	const { records: menus, isResolving, hasResolved } = useEntityRecords(
		'root',
		'menu',
		{ per_page: -1 }
	);
	const isLoading = isResolving || ! hasResolved;
	let menuStatus = __( 'Menus loaded.', 'ceb-blocks' );

	if ( isLoading ) {
		menuStatus = __( 'Loading menus…', 'ceb-blocks' );
	} else if ( ! menus ) {
		menuStatus = __( 'Menus could not be loaded. Check your menu-editing permissions.', 'ceb-blocks' );
	} else if ( menus.length === 0 ) {
		menuStatus = __( 'Create a classic menu in WordPress first.', 'ceb-blocks' );
	}

	// Announce status changes for the selected block without moving keyboard focus.
	useEffect( () => {
		if ( isSelected ) {
			speak( menuStatus, 'polite' );
		}
	}, [ isSelected, menuStatus ] );

	const menuOptions = [
		{ label: __( 'Select a menu', 'ceb-blocks' ), value: 0 },
		...( menus || [] ).map( ( menu ) => ( {
			label: menu.name,
			value: menu.id,
		} ) ),
	];
	const depthOptions = [
		{ label: __( 'All levels', 'ceb-blocks' ), value: 0 },
		...[ 1, 2, 3, 4, 5 ].map( ( level ) => ( {
			label: String( level ),
			value: level,
		} ) ),
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Menu settings', 'ceb-blocks' ) }>
					<SelectControl
						label={ __( 'Menu', 'ceb-blocks' ) }
						value={ menuId }
						options={ menuOptions }
							disabled={ isLoading || ! menus }
						onChange={ ( value ) => setAttributes( { menuId: Number( value ) } ) }
					/>
						{ ( isLoading || ! menus || menus.length === 0 ) && <p>{ menuStatus }</p> }
					<TextControl
						label={ __( 'Navigation label', 'ceb-blocks' ) }
						help={ __( 'Optional. Defaults to the selected menu name.', 'ceb-blocks' ) }
						value={ navigationLabel }
						onChange={ ( value ) => setAttributes( { navigationLabel: value } ) }
					/>
					<SelectControl
						label={ __( 'Levels to display', 'ceb-blocks' ) }
						value={ depth }
						options={ depthOptions }
						onChange={ ( value ) => setAttributes( { depth: Number( value ) } ) }
					/>
					<ToggleControl
						label={ __( 'Basic styling', 'ceb-blocks' ) }
						help={ __( 'Apply simple list spacing, link styling, and focus outlines.', 'ceb-blocks' ) }
						checked={ useBasicStyles }
						onChange={ ( value ) => setAttributes( { useBasicStyles: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				{ menuId ? (
					<Disabled>
						<ServerSideRender block={ metadata.name } attributes={ attributes } />
					</Disabled>
				) : (
					<p>{ __( 'Select a classic menu in the block settings.', 'ceb-blocks' ) }</p>
				) }
			</div>
		</>
	);
}

registerBlockType( metadata, {
	edit: EditClassicMenu,
	save: () => null,
} );
