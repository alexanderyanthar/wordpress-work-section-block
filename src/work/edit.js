import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function Edit({ attributes, setAttributes }) {
	const { workTitle, workDescription } = attributes;

	const handleWorkTitleChange = (newTitle) => {
		setAttributes({ workTitle: newTitle });
	};

	const handleWorkDescriptionChange = (newDescription) => {
		setAttributes({ workDescription: newDescription });
	};

	return (
		<div {...useBlockProps()}>
			<RichText
				tagName="h3"
				value={workTitle}
				onChange={handleWorkTitleChange}
				placeholder={__("Name of Work", "work")}
			/>
			<RichText
				tagName="p"
				value={workDescription}
				onChange={handleWorkDescriptionChange}
				placeholder={__("Description of work", "work")}
			/>
		</div>
	);
}
