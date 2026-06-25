import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import './editor.scss';
import metadata from './block.json';
import Edit from './Components/Backend/Edit';
import { videoBGIcon } from './utils/icons';

registerBlockType(metadata, {
	icon: videoBGIcon,

	// Build in Functions
	edit: Edit,

	save: () => <InnerBlocks.Content />
});