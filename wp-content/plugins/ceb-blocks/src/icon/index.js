import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __, _n, sprintf } from '@wordpress/i18n';
import metadata from './block.json';
import icons from './icons';
import Icon from './icon';
import './style.scss';
import './editor.scss';

/** Choose an icon and describe its meaning only when surrounding text does not. */
function EditIcon( { attributes, setAttributes } ) {
	const { icon, label } = attributes;
	const [ query, setQuery ] = useState( '' );
	const search = query.trim().toLowerCase();
	const iconOptions = Object.entries( icons ).map( ( [ value, entry ] ) => ( {
		value,
		label: entry.label,
	} ) );
	const matchingIcons = iconOptions.filter( ( option ) => (
		`${ option.value } ${ option.label }`.toLowerCase().includes( search )
	) );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Icon settings', 'ceb-blocks' ) }>
					<SelectControl
						label={ __( 'Selected icon', 'ceb-blocks' ) }
						value={ icon }
						options={ iconOptions }
						onChange={ ( value ) => setAttributes( { icon: value } ) }
					/>
					<TextControl
						label={ __( 'Search icons', 'ceb-blocks' ) }
						value={ query }
						onChange={ setQuery }
					/>
					{ /* Keep the status region mounted so filtering announces results without moving focus. */ }
					<p role="status" aria-atomic="true">
						{ sprintf(
							_n( '%d icon found.', '%d icons found.', matchingIcons.length, 'ceb-blocks' ),
							matchingIcons.length
						) }
					</p>
					<div className="ceb-icon__picker">
						{ matchingIcons.map( ( option ) => (
							<Button
								key={ option.value }
								className="ceb-icon__option"
								variant={ icon === option.value ? 'secondary' : 'tertiary' }
								aria-pressed={ icon === option.value }
								onClick={ () => setAttributes( { icon: option.value } ) }
							>
								<Icon name={ option.value } />
								<span>{ option.label }</span>
							</Button>
						) ) }
					</div>
					<TextControl
						label={ __( 'Accessible label', 'ceb-blocks' ) }
						value={ label }
						onChange={ ( value ) => setAttributes( { label: value } ) }
						help={ __(
							'Leave blank for a decorative icon. Add a label only when the icon communicates information not already in the surrounding text.',
							'ceb-blocks'
						) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps( { className: 'ceb-icon' } ) }>
				<Icon name={ icon } label={ label } />
			</div>
		</>
	);
}

/** Save the same accessible graphic shown in the editor, with no frontend script. */
function SaveIcon( { attributes } ) {
	return (
		<div { ...useBlockProps.save( { className: 'ceb-icon' } ) }>
			<Icon name={ attributes.icon } label={ attributes.label } />
		</div>
	);
}

registerBlockType( metadata, {
	edit: EditIcon,
	save: SaveIcon,
} );
