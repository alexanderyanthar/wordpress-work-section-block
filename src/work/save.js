import { useBlockProps, RichText } from "@wordpress/block-editor";
import { Tooltip } from "@wordpress/components";

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
				{liveLink !== "" && (
					<a
						className="wp-block-work-section-button wp-block-work-section-button1"
						href={liveLink}
						target="_blank"
					>
						View Live
					</a>
				)}
				{codeLink !== "" && (
					<a
						className="wp-block-work-section-button"
						href={codeLink}
						target="_blank"
					>
						View Code
					</a>
				)}

				{liveLink === "" && codeLink === "" && (
					<span className="wp-block-work-section-button-span">Coming soon</span>
				)}
			</div>
		</div>
	);
}
