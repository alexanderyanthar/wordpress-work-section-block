import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import Edit from "./edit";
import Save from "./save";

registerBlockType("create-block/work", {
	title: __("Work", "work-section"),
	description: __("Individual work", "work-section"),
	icon: "plus",
	parent: ["create-block/work-section"],
	supports: {
		reusable: false,
		html: false,
	},
	attributes: {
		workTitle: {
			type: "string",
			source: "html",
			selector: "h3",
		},
		skill: {
			type: "string",
			default: "",
		},
		skillList: {
			type: "array",
			default: [],
		},
		workDescription: {
			type: "string",
			source: "html",
			selector: "p",
		},
		id: {
			type: "number",
		},
		alt: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "alt",
			default: "",
		},
		url: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "src",
		},
		liveLink: {
			type: "string",
			source: "attribute",
			selector: "a",
			attribute: "href",
			default: "",
		},
		codeLink: {
			type: "string",
			source: "attribute",
			selector: "a",
			attribute: "href",
			default: "",
		},
	},
	edit: Edit,
	save: Save,
});
