import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Tag, PassedPropsType } from "./Tag";

export default {
  title: "Tag",
  component: Tag,
} as Meta;

const Template: Story<PassedPropsType> = (args) => (
  <div className="tags" style={{ display: "flex" }}>
    <a>
      <Tag {...args} />
    </a>
  </div>
);

export const Normal = Template.bind({});
Normal.args = {
  tag: {
    name: "hoge",
    backgroundColor: "#eebbc3",
    innerColor: "#271c19",
  },
};
