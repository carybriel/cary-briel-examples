( function () {
	'use strict';

	const { addFilter } = wp.hooks;
	const { createHigherOrderComponent } = wp.compose;
	const { InspectorControls } = wp.blockEditor;
	const { PanelBody, TextControl } = wp.components;
	const { createElement, cloneElement, isValidElement, Fragment } = wp.element;
	const { __ } = wp.i18n;
	const labelAttribute = { type: 'string', default: '' };

	/** Accept markup saved by the earlier sample, then migrate it to core's normal save output. */
	function cebButtonAriaLegacyVersion( version ) {
		return {
			...version,
			attributes: { ...version.attributes, ariaLabel: labelAttribute },
			save: function cebButtonAriaLegacySave( props ) {
				const element = version.save( props );
				if ( ! props.attributes.ariaLabel || ! isValidElement( element ) || ! isValidElement( element.props.children ) ) {
					return element;
				}

				// Reproduce the earlier sample's format only during legacy block validation.
				return cloneElement( element, {}, cloneElement( element.props.children, {
					'aria-label': props.attributes.ariaLabel,
				} ) );
			},
			migrate: function cebButtonAriaMigrateLabel( attributes, innerBlocks ) {
				const migrated = version.migrate ? version.migrate( attributes, innerBlocks ) : attributes;
				const [ nextAttributes, nextInnerBlocks ] = Array.isArray( migrated ) ? migrated : [ migrated, innerBlocks ];
				return [ { ...nextAttributes, ariaLabel: attributes.ariaLabel }, nextInnerBlocks ];
			},
		};
	}

	/** Keep the attribute available to the editor and to core's deprecated block definitions. */
	function cebButtonAriaRegisterAttribute( settings, name, deprecatedSettings ) {
		if ( name !== 'core/button' ) {
			return settings;
		}

		const extended = { ...settings, attributes: { ...settings.attributes, ariaLabel: labelAttribute } };
		if ( deprecatedSettings ) {
			return extended;
		}

		const deprecated = settings.deprecated || [];
		return {
			...extended,
			deprecated: [ settings, ...deprecated ].map( cebButtonAriaLegacyVersion ).concat( deprecated ),
		};
	}
	addFilter( 'blocks.registerBlockType', 'ceb-button-aria/attribute', cebButtonAriaRegisterAttribute );

	/** Add label guidance to the selected Button block without altering other blocks. */
	function cebButtonAriaWithControl( BlockEdit ) {
		return function CebButtonAriaEdit( props ) {
			if ( props.name !== 'core/button' || ! props.isSelected ) {
				return createElement( BlockEdit, props );
			}

			return createElement(
				Fragment,
				null,
				createElement( BlockEdit, props ),
				createElement( InspectorControls, null,
					createElement( PanelBody, { title: __( 'Accessibility', 'ceb-button-aria' ), initialOpen: true },
						createElement( TextControl, {
							label: __( 'ARIA Label', 'ceb-button-aria' ),
							help: __( 'Leave blank to use the button text. If you add a label, include the visible button text in it.', 'ceb-button-aria' ),
							value: props.attributes.ariaLabel || '',
							onChange: ( value ) => props.setAttributes( { ariaLabel: value } ),
						} )
					)
				)
			);
		};
	}
	addFilter( 'editor.BlockEdit', 'ceb-button-aria/control',
		createHigherOrderComponent( cebButtonAriaWithControl, 'withCebButtonAriaControl' )
	);
} )();
