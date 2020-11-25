// @FIXME: 親がflexboxじゃないと最大限まで広がってしまう

import styled from "styled-components";
import { Color } from "../const/color";
import { TagType } from "../type/model/Tag";

export type PassedPropsType = {
  tag: TagType;
};

interface Props extends PassedPropsType {
  className?: string;
}

const Component = (props: Props) => (
  <div className={props.className} key={props.tag.name}>
    #{props.tag.name}
  </div>
);

const StyledComponent = styled(Component)`
  color: ${(props) => props.tag.innerColor};
  background-color: ${(props) => props.tag.backgroundColor};
  padding: 2px 8px;
  border: solid ${Color.main} 2px;
  border-radius: 4px;
`;

const ContainerComponent = (props: PassedPropsType) => {
  return <StyledComponent {...{ ...props }}></StyledComponent>;
};

export const Tag = ContainerComponent;
