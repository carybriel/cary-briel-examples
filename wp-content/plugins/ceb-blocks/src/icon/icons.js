import { __ } from '@wordpress/i18n';

/** Keep selectable SVG paths local; saved names never supply arbitrary markup. */
const icons = {
	'search': {
		label: __( 'Search', 'ceb-blocks' ),
		path: 'M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM17 17l4 4',
	},
	'sparkles': {
		label: __( 'Sparkles', 'ceb-blocks' ),
		path: 'm10 3 2.5 6.5L19 12l-6.5 2.5L10 21l-2.5-6.5L1 12l6.5-2.5L10 3ZM20 2v4m-2-2h4m-1 13v4m-2-2h4',
	},
	'arrow-up-right': {
		label: __( 'Arrow up right', 'ceb-blocks' ),
		path: 'M3 21 21 3M3 3h18v18',
	},
	'arrow-right': {
		label: __( 'Arrow right', 'ceb-blocks' ),
		path: 'M3 12h18m-9-9 9 9-9 9',
	},
	'check': {
		label: __( 'Check', 'ceb-blocks' ),
		path: 'm3 12 6 9L21 3',
	},
	'circle-check': {
		label: __( 'Check in circle', 'ceb-blocks' ),
		path: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM7 12l3 3 7-7',
	},
	'star': {
		label: __( 'Star', 'ceb-blocks' ),
		path: 'm12 3 2.8 5.9 6.5 1-4.7 4.6 1.1 6.5-5.7-3.1L6.3 21l1.1-6.5-4.7-4.6 6.5-1L12 3Z',
	},
	'heart': {
		label: __( 'Heart', 'ceb-blocks' ),
		path: 'M12 21 4 13C-2 7 6-1 12 6c6-7 14 1 8 7l-8 8Z',
	},
	'shield': {
		label: __( 'Shield', 'ceb-blocks' ),
		path: 'm12 3 9 4v5c0 5-5 8-9 9-4-1-9-4-9-9V7l9-4Zm-5 9 3 3 7-7',
	},
	'lock': {
		label: __( 'Lock', 'ceb-blocks' ),
		path: 'M7 10V8a5 5 0 0 1 10 0v2M5 10h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Zm7 4v3',
	},
	'bolt': {
		label: __( 'Lightning bolt', 'ceb-blocks' ),
		path: 'M14 3 4 14h7l-1 7L20 10h-7l1-7Z',
	},
	'chart-bar': {
		label: __( 'Bar chart', 'ceb-blocks' ),
		path: 'M3 3v18h18M7 17v-5m5 5V8m5 9V3',
	},
	'chart-line': {
		label: __( 'Line chart', 'ceb-blocks' ),
		path: 'M3 3v18h18M6 15l5-6 4 3 6-9',
	},
	'globe': {
		label: __( 'Globe', 'ceb-blocks' ),
		path: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z',
	},
	'lightbulb': {
		label: __( 'Light bulb', 'ceb-blocks' ),
		path: 'M8 16c0-3-3-3-3-6a7 7 0 0 1 14 0c0 3-3 3-3 6H8Zm0 3h8m-6 2h4m-2-5v-5m-3-1 3 2 3-2',
	},
	'users': {
		label: __( 'People', 'ceb-blocks' ),
		path: 'M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM1 21v-2a8 8 0 0 1 16 0v2M17 3a4 4 0 0 1 0 8m2 3a7 7 0 0 1 4 7',
	},
	'chat': {
		label: __( 'Chat', 'ceb-blocks' ),
		path: 'M21 12a9 9 0 0 1-9 9 10 10 0 0 1-4-1l-5 1 1-5a10 10 0 0 1-1-4 9 9 0 0 1 18 0ZM7 10h10M7 14h6',
	},
	'document': {
		label: __( 'Document', 'ceb-blocks' ),
		path: 'M5 3h9l5 5v13H5V3Zm9 0v5h5M8 12h8m-8 4h8',
	},
	'settings': {
		label: __( 'Settings', 'ceb-blocks' ),
		path: 'm9 3-1 3-3 1-2 3 2 2-2 2 2 3 3 1 1 3h6l1-3 3-1 2-3-2-2 2-2-2-3-3-1-1-3H9Zm7 9a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
	},
	'link': {
		label: __( 'Link', 'ceb-blocks' ),
		path: 'm9 8 3-3a5 5 0 0 1 7 7l-3 3m-1 1-3 3a5 5 0 0 1-7-7l3-3m0 7 8-8',
	},
	'target': {
		label: __( 'Target', 'ceb-blocks' ),
		path: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-4 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Zm-4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z',
	},
	'clock': {
		label: __( 'Clock', 'ceb-blocks' ),
		path: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 6v6l4 2',
	},
	'mail': {
		label: __( 'Email', 'ceb-blocks' ),
		path: 'M3 3h18v18H3V3Zm0 1 9 9 9-9',
	},
	'code': {
		label: __( 'Code', 'ceb-blocks' ),
		path: 'm7 5-6 7 6 7m10-14 6 7-6 7M14 3l-4 18',
	},
};

export default icons;
