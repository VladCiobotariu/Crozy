module.exports = {
	stories: [
		"../src/components/stories/**/*.stories.mdx",
		"../src/components/stories/**/*.stories.@(js|jsx|ts|tsx)",
	],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"@storybook/addon-storysource",
	],
	framework: "@storybook/react",
	core: {
		builder: "@storybook/builder-webpack5",
	},
};
