import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function Save({ attributes }) {
	const {
		workTitle,
		workDescription,
		skillList,
		url,
		alt,
		id,
		liveLink,
		codeLink,
	} = attributes;

	return (
		<div {...useBlockProps.save()}>
			{url && (
				<div className="wp-block-work-section-image-container">
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
				{liveLink === "" && (
					<a
						className="wp-block-work-section-button wp-block-work-section-button1"
						href={liveLink}
					>
						View Live
					</a>
				)}
				{codeLink === "" && (
					<a className="wp-block-work-section-button" href={codeLink}>
						View Code
					</a>
				)}
			</div>
		</div>
	);
}
