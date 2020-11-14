import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";

type Props = {
  className?: string;
};

const Component = (props: Props) => (
  <div className={props.className}>hello world!!</div>
);

const StyledComponent = styled(Component)`
  color: red;
`;

const ContainerComponent = () => {
  return <StyledComponent></StyledComponent>;
};

export default ContainerComponent;
