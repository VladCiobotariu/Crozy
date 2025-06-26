import React from "react";
import { createStory } from "./Storybook";

export const Main = () => <h1>Hello world</h1>;

const storyConfig = createStory({
  title: "HelloWorld",
});

export default storyConfig;
