import { ArgTypes, Args, Meta } from "@storybook/react";
import { ComponentType } from "react";

// ComponentType<any> as declared in storybook docs
type IProps = {
  title: string;
  component?: ComponentType<any>;
  subcomponents?: Record<string, ComponentType<any>>;
  args?: Partial<Args>;
  argTypes?: ArgTypes;
};

const createStory = (props: IProps): Meta => ({
  parameters: { docs: { page: null } },
  ...props,
});

export { createStory };
