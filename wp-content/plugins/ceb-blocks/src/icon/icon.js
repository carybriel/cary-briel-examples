import icons from './icons';

/** Name meaningful graphics; hide decorative SVGs from assistive technology. */
export default function Icon( { name, label = '' } ) {
	// Unknown saved names use the default; only paths in the local catalog are rendered.
	const icon = Object.hasOwn( icons, name ) ? icons[ name ] : icons.search;
	const accessibleLabel = label.trim();

	return (
		<svg
			className="ceb-icon__svg"
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			role={ accessibleLabel ? 'img' : undefined }
			aria-label={ accessibleLabel || undefined }
			aria-hidden={ accessibleLabel ? undefined : true }
			focusable="false"
		>
			<path d={ icon.path } />
		</svg>
	);
}
