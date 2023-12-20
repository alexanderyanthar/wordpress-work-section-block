import { useBlockProps, RichText, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const { sectionTitle } = attributes;
	return (
		<div {...useBlockProps.save()}>
			<RichText.Content tagName="h2" value={sectionTitle} />
			<InnerBlocks.Content />
		</div>
	);
}
