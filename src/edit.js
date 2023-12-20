import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, InnerBlocks } from "@wordpress/block-editor";
import "./work";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const { sectionTitle } = attributes;

	const handleSectionTitle = (newTitle) => {
		setAttributes({ sectionTitle: newTitle });
	};

	return (
		<div {...useBlockProps()}>
			<RichText
				placeholder={__("Work Section Title", "work-section")}
				tagName="h2"
				value={sectionTitle}
				onChange={handleSectionTitle}
				allowedFormats={[]}
			/>
			<InnerBlocks
				allowedBlocks={["create-block/work"]}
				template={[["create-block/work"], ["create-block/work"]]}
			/>
		</div>
	);
}
