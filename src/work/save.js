import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function Save({ attributes }) {
	const { workTitle, workDescription } = attributes;

	return (
		<div {...useBlockProps.save()}>
			<RichText.Content tagName="h3" value={workTitle} />
			<RichText.Content tagName="p" value={workDescription} />
		</div>
	);
}
