import { Story, Meta } from "@storybook/react/types-6-0";
import React from "react";

import { toHTMLContentType, toPostId } from "../type/model/Post";
import {
  HexColorType,
  toFormattedJapaneseDateType,
  ValidDateType,
} from "../type/util";
import { Layout } from "./Layout";
import { PostListItem } from "./PostListItem";

export default {
  title: "PostListItem",
  component: PostListItem,
} as Meta;

export const Normal = () => (
  <Layout>
    <PostListItem
      post={{
        id: toPostId("3"),
        title: "hoge",
        content: toHTMLContentType("## test"),
        createdAt: toFormattedJapaneseDateType("2020-12-12" as ValidDateType),
        tags: [
          {
            name: "a",
            innerColor: "#eeeeee" as HexColorType,
            backgroundColor: "#222222" as HexColorType,
          },
        ],
      }}
    ></PostListItem>
  </Layout>
);

export const LongTitle = () => (
  <Layout>
    <PostListItem
      post={{
        id: toPostId("3"),
        title: "webpackでバンドルしたコードをHTMLから呼ぶためにはwindowが必要",
        content: toHTMLContentType("## test"),
        createdAt: toFormattedJapaneseDateType("2020-12-12" as ValidDateType),
        tags: [
          {
            name: "a",
            innerColor: "#eeeeee" as HexColorType,
            backgroundColor: "#222222" as HexColorType,
          },
        ],
      }}
    ></PostListItem>
  </Layout>
);

export const ManyTags = () => (
  <Layout>
    <PostListItem
      post={{
        id: toPostId("3"),
        title: "webpackでバンドルしたコードをHTMLから呼ぶためにはwindowが必要",
        content: toHTMLContentType("## test"),
        createdAt: toFormattedJapaneseDateType("2020-12-12" as ValidDateType),
        tags: [
          {
            name: "aaaaaa",
            innerColor: "#eeeeee" as HexColorType,
            backgroundColor: "#222222" as HexColorType,
          },
          {
            name: "aaaaaa",
            innerColor: "#eeeeee" as HexColorType,
            backgroundColor: "#222222" as HexColorType,
          },
          {
            name: "aaaaaa",
            innerColor: "#eeeeee" as HexColorType,
            backgroundColor: "#222222" as HexColorType,
          },
          {
            name: "aaaaaa",
            innerColor: "#eeeeee" as HexColorType,
            backgroundColor: "#222222" as HexColorType,
          },
          {
            name: "aaaaaa",
            innerColor: "#eeeeee" as HexColorType,
            backgroundColor: "#222222" as HexColorType,
          },
        ],
      }}
    ></PostListItem>
  </Layout>
);

export const LongTag = () => (
  <Layout>
    <PostListItem
      post={{
        id: toPostId("3"),
        title: "webpackでバンドルしたコードをHTMLから呼ぶためにはwindowが必要",
        content: toHTMLContentType("## test"),
        createdAt: toFormattedJapaneseDateType("2020-12-12" as ValidDateType),
        tags: [
          {
            name:
              "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            innerColor: "#eeeeee" as HexColorType,
            backgroundColor: "#222222" as HexColorType,
          },
        ],
      }}
    ></PostListItem>
  </Layout>
);

export const Multi = () => (
  <Layout>
    <PostListItem
      post={{
        id: toPostId("3"),
        title: "webpackでバンドルしたコードをHTMLから呼ぶためにはwindowが必要",
        content: toHTMLContentType("## test"),
        createdAt: toFormattedJapaneseDateType("2020-12-12" as ValidDateType),
        tags: [
          {
            name: "a",
            innerColor: "#eeeeee" as HexColorType,
            backgroundColor: "#222222" as HexColorType,
          },
        ],
      }}
    ></PostListItem>
    <PostListItem
      post={{
        id: toPostId("3"),
        title: "webpackでバンドルしたコードをHTMLから呼ぶためにはwindowが必要",
        content: toHTMLContentType("## test"),
        createdAt: toFormattedJapaneseDateType("2020-12-12" as ValidDateType),
        tags: [
          {
            name: "a",
            innerColor: "#eeeeee" as HexColorType,
            backgroundColor: "#222222" as HexColorType,
          },
        ],
      }}
    ></PostListItem>
    <PostListItem
      post={{
        id: toPostId("3"),
        title: "webpackでバンドルしたコードをHTMLから呼ぶためにはwindowが必要",
        content: toHTMLContentType("## test"),
        createdAt: toFormattedJapaneseDateType("2020-12-12" as ValidDateType),
        tags: [
          {
            name: "a",
            innerColor: "#eeeeee" as HexColorType,
            backgroundColor: "#222222" as HexColorType,
          },
        ],
      }}
    ></PostListItem>
    <PostListItem
      post={{
        id: toPostId("3"),
        title: "webpackでバンドルしたコードをHTMLから呼ぶためにはwindowが必要",
        content: toHTMLContentType("## test"),
        createdAt: toFormattedJapaneseDateType("2020-12-12" as ValidDateType),
        tags: [
          {
            name: "a",
            innerColor: "#eeeeee" as HexColorType,
            backgroundColor: "#222222" as HexColorType,
          },
        ],
      }}
    ></PostListItem>
    <PostListItem
      post={{
        id: toPostId("3"),
        title: "webpackでバンドルしたコードをHTMLから呼ぶためにはwindowが必要",
        content: toHTMLContentType("## test"),
        createdAt: toFormattedJapaneseDateType("2020-12-12" as ValidDateType),
        tags: [
          {
            name: "a",
            innerColor: "#eeeeee" as HexColorType,
            backgroundColor: "#222222" as HexColorType,
          },
        ],
      }}
    ></PostListItem>
  </Layout>
);
