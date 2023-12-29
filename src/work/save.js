import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function Save({ attributes }) {
	const { workTitle, workDescription, skillList, url, alt, id } = attributes;

	return (
		<div {...useBlockProps.save()}>
			{url && (
				<div>
					<img src={url} alt={alt} className={id ? `wp-image-${id}` : null} />
				</div>
			)}
			<div className="wp-block-work-text-container">
				<RichText.Content tagName="h3" value={workTitle} />
				{skillList && (
					<div>
						<ul className="wp-blocks-work-skill-list">
							{skillList.map((skill, index) => (
								<li key={index}>{skill}</li>
							))}
						</ul>
					</div>
				)}
				<RichText.Content tagName="p" value={workDescription} />
			</div>
		</div>
	);
}
