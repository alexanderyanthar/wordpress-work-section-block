import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	InspectorControls,
	store as blockEditorStore,
} from "@wordpress/block-editor";
import {
	TextControl,
	Button,
	Spinner,
	withNotices,
	Tooltip,
	ToolbarButton,
	PanelBody,
	TextareaControl,
	SelectControl,
} from "@wordpress/components";
import { isBlobURL, revokeBlobURL } from "@wordpress/blob";
import { useEffect, useState } from "@wordpress/element";
import { useSelect } from "@wordpress/data";

function Edit({ attributes, setAttributes, noticeOperations, noticeUI }) {
	const {
		workTitle,
		workDescription,
		skillList,
		skill,
		url,
		id,
		alt,
		liveLink,
		codeLink,
	} = attributes;
	const [bloblURL, setBlobURL] = useState();
	const [isEditing, setIsEditing] = useState();
	const [editedSkill, setEditedSkill] = useState("");
	const [isViewLiveSelected, setIsViewLiveSelected] = useState(false);
	const [isViewCodeSelected, setIsViewCodeSelected] = useState(false);

	const imageObject = useSelect(
		(select) => {
			const { getMedia } = select("core");
			return id ? getMedia(id) : null;
		},
		[id],
	);

	const imageSizes = useSelect((select) => {
		return select(blockEditorStore).getSettings().imageSizes;
	}, []);

	const getImageSizeOptions = () => {
		if (!imageObject) return [];

		const options = [];

		const sizes = imageObject.media_details.sizes;

		for (const key in sizes) {
			const size = sizes[key];
			const imageSize = imageSizes.find((s) => s.slug === key);
			if (imageSize) {
				options.push({
					label: imageSize.name,
					value: size.source_url,
				});
			}
		}
		return options;
	};

	const handleWorkTitleChange = (newTitle) => {
		setAttributes({ workTitle: newTitle });
	};

	const handleWorkDescriptionChange = (newDescription) => {
		setAttributes({ workDescription: newDescription });
	};

	const handleSkillInput = (newSkill) => {
		setAttributes({ skill: newSkill });
	};

	const handleAddNewSkill = () => {
		const updatedSkills = [...skillList, skill];
		setAttributes({ skillList: updatedSkills });
		setAttributes({ skill: "" });
	};

	const handleStartEdit = (index, skill) => {
		setEditedSkill(skill);
		setIsEditing(index);
	};

	const handleEditSkill = (value, index) => {
		setEditedSkill(value);
	};

	const handleSaveEdit = (index) => {
		const updatedSkills = [...skillList];

		updatedSkills[index] = editedSkill;

		setAttributes({ skillList: updatedSkills });

		setIsEditing(null);
		setEditedSkill("");
	};

	const handleRemoveSkill = (index, skill) => {
		const updatedSkills = [...skillList];

		updatedSkills.splice(index, 1);

		setAttributes({ skillList: updatedSkills });

		if (isEditing === index) {
			setIsEditing(null);
			setEditedSkill("");
		}
	};

	const onSelectImage = (image) => {
		if (!image || !image.url) {
			setAttributes({ url: undefined, id: undefined, alt: "" });
		}
		setAttributes({ url: image.url, id: image.id, alt: image.alt });
	};

	const onSelectURL = (newURL) => {
		setAttributes({ url: newURL, id: undefined, alt: "" });
	};

	const onUploadError = (message) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(message);
	};

	const handleRemoveImage = () => {
		setAttributes({ url: undefined, alt: "", id: undefined });
	};

	const onChangeAlt = (newAlt) => {
		setAttributes({ alt: newAlt });
	};

	const onChangeImageSize = (newURL) => {
		setAttributes({ url: newURL });
	};

	useEffect(() => {
		if (!id && isBlobURL(url)) {
			setAttributes({ url: undefined, alt: "" });
		}
	}, []);

	useEffect(() => {
		if (isBlobURL(url)) {
			setBlobURL(url);
		} else {
			revokeBlobURL(bloblURL);
			setBlobURL();
		}
	}, [url]);

	const handleIsViewLive = () => {
		setIsViewLiveSelected(!isViewLiveSelected);
	};

	const handleLiveLink = (newLiveLink) => {
		setAttributes({ liveLink: newLiveLink });
	};

	const handleIsCodeLive = () => {
		setIsViewCodeSelected(!isViewCodeSelected);
	};

	const handleCodeLink = (newCodeLink) => {
		setAttributes({ codeLink: newCodeLink });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Image Settings", "work")}>
					{id && (
						<SelectControl
							label={__("Image Size", "work")}
							options={getImageSizeOptions()}
							value={url}
							onChange={onChangeImageSize}
						/>
					)}
					{url && !isBlobURL(url) && (
						<TextareaControl
							label={__("Alt Text", "work")}
							value={alt}
							onChange={onChangeAlt}
							help={__(
								"Alternative text describes your image to people who can't see instanceof. Add a short description with its key details",
								"work",
							)}
						/>
					)}
				</PanelBody>
			</InspectorControls>
			{url && (
				<BlockControls group="inline">
					<MediaReplaceFlow
						name={__("Replace Image", "work")}
						onSelect={onSelectImage}
						onSelectURL={onSelectURL}
						onError={onUploadError}
						accept="image/*"
						allowedTypes={["image"]}
						mediaId={id}
						mediaURL={url}
					/>
					<ToolbarButton onClick={handleRemoveImage}>
						{__("Remove Image", "work")}
					</ToolbarButton>
				</BlockControls>
			)}
			<div {...useBlockProps()}>
				{url && (
					<div
						className={`wp-blocks-work-image${
							isBlobURL(url) ? " is-loading" : ""
						}`}
					>
						<img src={url} alt={alt} />
						{isBlobURL(url) && <Spinner />}
					</div>
				)}
				<MediaPlaceholder
					icon={"format-image"}
					onSelect={onSelectImage}
					onSelectURL={onSelectURL}
					onError={onUploadError}
					accept="image/*"
					allowedTypes={["image"]}
					disableMediaButtons={url}
					notices={noticeUI}
				/>
				<div className="wp-blocks-work-text-container">
					<RichText
						tagName="h3"
						value={workTitle}
						onChange={handleWorkTitleChange}
						placeholder={__("Name of Work", "work")}
						allowedFormats={[]}
					/>
					{skillList && (
						<ul>
							{skillList.map((skill, index) => (
								<li className="wp-block-work-skill-list-item" key={index}>
									{isEditing === index ? (
										<div>
											<TextControl
												label={__("Edit Tech Stack", "work")}
												value={editedSkill}
												onChange={(value) => handleEditSkill(value, index)}
											/>
											<Button
												onClick={() => handleSaveEdit(index)}
												variant="primary"
											>
												Save
											</Button>
										</div>
									) : (
										<div className="wp-block-work-edit-skill-div">
											{skill}
											<div className="wp-block-work-edit-skill-button-container">
												<Button
													className="wp-block-work-edit-skill-button"
													onClick={() => handleStartEdit(index, skill)}
													variant="secondary"
												>
													Edit
												</Button>
												<Tooltip text={__("Remove Skill", "work")}>
													<Button
														isDestructive={true}
														variant="secondary"
														icon="trash"
														onClick={() => handleRemoveSkill(index, skill)}
													/>
												</Tooltip>
											</div>
										</div>
									)}
								</li>
							))}
						</ul>
					)}
					<div>
						<TextControl
							label={__("Tech Stack", "work")}
							value={skill}
							onChange={handleSkillInput}
						/>
						<Button onClick={handleAddNewSkill} variant="primary">
							Add Stack
						</Button>
					</div>
					<RichText
						tagName="p"
						value={workDescription}
						onChange={handleWorkDescriptionChange}
						placeholder={__("Description of work", "work")}
						allowedFormats={[]}
					/>
					<button
						onClick={handleIsViewLive}
						className="wp-block-work-section-button wp-block-work-section-button1"
					>
						View Live
					</button>
					<button
						className="wp-block-work-section-button"
						onClick={handleIsCodeLive}
					>
						View Code
					</button>
					{isViewLiveSelected && (
						<>
							<TextControl
								label={__("Add live site link", "work")}
								value={liveLink}
								onChange={handleLiveLink}
							/>
						</>
					)}
					{isViewCodeSelected && (
						<>
							<TextControl
								label={__("Add code link", "work")}
								value={codeLink}
								onChange={handleCodeLink}
							/>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default withNotices(Edit);
