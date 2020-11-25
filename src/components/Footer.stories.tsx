import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Footer, Props } from "./Footer";
import { Layout } from "./Layout";

export default {
  title: "Example/Footer",
  component: Footer,
} as Meta;

const Template: Story<Props> = (args) => (
  <div style={{ background: "black" }}>
    <Footer {...args} />
  </div>
);

export const Normal = Template.bind({});
Normal.args = {};
