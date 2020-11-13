import styled from "styled-components";

type Props = {
  className?: string;
};

const Component = (props: Props) => (
  <div className={props.className}>hello world!!</div>
);

const StyledComponent = styled(Component)`
  color: red;
`;

export default StyledComponent;
