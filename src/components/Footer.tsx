import styled from "styled-components";

export interface Props {
  className?: string;
}

const Component = (props: Props) => {
  return (
    <footer className={props.className}>
      <a href="https://twitter.com/sadnessOjisan">©︎ sadnessOjisan</a>
    </footer>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  & a {
    color: white;
  }
`;

export const Footer = StyledComponent;
