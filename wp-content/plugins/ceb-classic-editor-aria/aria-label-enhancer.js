( function ( $ ) {
	'use strict';

	const { __ } = wp.i18n;
	const fieldId = 'ceb-classic-editor-aria-label';
	let field;
	let wrapper;
	let dialogEditorId;
	let originalGetAttrs;

	/** Get the visual editor used by the dialog, rather than TinyMCE's last active editor. */
	function cebClassicEditorAriaGetEditor() {
		if ( ! window.tinymce || ! wpLink.isMCE() || ! wpLink.textarea ) {
			return null;
		}

		return window.tinymce.get( wpLink.textarea.id );
	}

	/** Create the labeled input once, when the shared link dialog is available. */
	function cebClassicEditorAriaCreateField() {
		if ( field ) {
			return;
		}

		const linkOptions = document.getElementById( 'link-options' );
		if ( ! linkOptions ) {
			return;
		}

		wrapper = document.createElement( 'div' );
		wrapper.className = 'ceb-classic-editor-aria-field';

		const label = document.createElement( 'label' );
		label.htmlFor = fieldId;
		const caption = document.createElement( 'span' );
		caption.textContent = __( 'ARIA Label', 'ceb-classic-editor-aria' );

		field = document.createElement( 'input' );
		field.id = fieldId;
		field.type = 'text';
		field.setAttribute( 'aria-describedby', fieldId + '-help' );

		const help = document.createElement( 'p' );
		help.id = fieldId + '-help';
		help.className = 'howto';
		help.textContent = __(
			'Leave blank to use the link text. If you add a label, include the visible link text in it.',
			'ceb-classic-editor-aria'
		);

		label.appendChild( caption );
		label.appendChild( field );
		wrapper.appendChild( label );
		wrapper.appendChild( help );
		linkOptions.appendChild( wrapper );
	}

	/** Refresh the field for every opening, including new links and different editors. */
	function cebClassicEditorAriaOpen() {
		cebClassicEditorAriaCreateField();
		if ( ! field ) {
			return;
		}

		const editor = cebClassicEditorAriaGetEditor();
		dialogEditorId = editor ? editor.id : null;
		wrapper.hidden = ! editor;
		field.disabled = ! editor;
		field.value = '';

		if ( editor ) {
			// Use the same marked link as WordPress's update operation, including nested selections.
			const link = editor.dom.select( 'a[data-wplink-edit="true"]' )[ 0 ];
			field.value = link ? link.getAttribute( 'aria-label' ) || '' : '';
		}
	}

	/** Include the label in WordPress's submitted attributes and its existing undo transaction. */
	function cebClassicEditorAriaGetAttrs() {
		const attributes = originalGetAttrs.apply( this, arguments );
		const editor = cebClassicEditorAriaGetEditor();

		if ( wpLink.modalOpen && editor && editor.id === dialogEditorId && field && ! field.disabled ) {
			// WordPress applies attributes only on submission; Cancel and Escape leave content alone.
			// A null value removes this plugin's custom label when the field is cleared.
			attributes[ 'aria-label' ] = field.value.trim() || null;
		}

		return attributes;
	}

	/** Register the dialog event and extend the attribute collector after its dependencies load. */
	function cebClassicEditorAriaInitialize() {
		if ( ! window.wpLink ) {
			return;
		}

		// Core has an open event but no attribute filter; preserve its collector and extend the result.
		originalGetAttrs = wpLink.getAttrs;
		wpLink.getAttrs = cebClassicEditorAriaGetAttrs;
		$( document ).on( 'wplink-open.cebClassicEditorAria', cebClassicEditorAriaOpen );
	}

	$( cebClassicEditorAriaInitialize );
} )( jQuery );
