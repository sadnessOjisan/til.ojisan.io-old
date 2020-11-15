import Link from "next/link";
import styled from "styled-components";
import { Color } from "../const/color";
import { HTMLContentType, PostViewType } from "../entity/Post";

type PassedPropsType = {
  content: HTMLContentType;
};

interface Props extends PassedPropsType {
  className?: string;
}

const Component = (props: Props) => (
  <div
    className={props.className}
    dangerouslySetInnerHTML={{ __html: props.content }}
  ></div>
);

const StyledComponent = styled(Component)`
  * {
    color: ${Color.paragraph};
  }
  h1,
  h2,
  h3,
  h4 {
    font-weight: 400;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-bottom: 24px;
    padding: 0;
    color: ${Color.main};
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    margin-bottom: 24px;
    padding: 0;
    line-height: 2;
  }
  h1 {
    font-size: 48px;
  }
  h2 {
    font-size: 36px;
    margin: 24px 0 6px;
  }
  h3 {
    font-size: 24px;
  }
  h4 {
    font-size: 21px;
  }
  h5 {
    font-size: 18px;
  }
  a {
    color: ${Color.link};
    margin: 0;
    padding: 0;
    text-decoration: none;
    vertical-align: baseline;
  }
  strong {
    color: ${Color.highlight};
  }
  a:hover {
    text-decoration: underline;
  }
  a:visited {
    color: ${Color.link};
  }
  ul,
  ol {
    padding: 0;
    margin: 0;
  }
  li {
    line-height: 2;
  }
  li ul,
  li ul {
    margin-left: 24px;
  }
  p,
  ul,
  ol {
    font-size: 16px;
    line-height: 2;
  }
  pre {
    font-size: 16px;
    padding: 12px 24px;
    border-radius: 8px;
    max-width: 800px;
    white-space: pre-wrap;
    margin-bottom: 24px;
    background-color: #3e3e3e;
  }
  code {
    font-family: Consolas, Monaco, Andale Mono, monospace;
    line-height: 1.5;
    font-size: 13px;
    color: white;
  }
  aside {
    display: block;
    float: right;
    width: 390px;
  }
  blockquote {
    border-left: 0.5em solid #eee;
    padding: 0 2em;
    margin-left: 0;
    max-width: 476px;
  }
  blockquote cite {
    font-size: 14px;
    line-height: 20px;
    color: #bfbfbf;
  }

  blockquote p {
    color: #666;
    max-width: 460px;
  }
  hr {
    width: 100%;
    text-align: left;
    margin: 0 auto 0 0;
    color: #999;
  }
  img {
    width: 100%;
  }
`;

export const PostBody = StyledComponent;
