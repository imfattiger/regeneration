import { defineField, defineType } from "sanity";

export const lookbookEntry = defineType({
  name: "lookbookEntry",
  title: "Lookbook 作品",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "作品名稱",
      type: "object",
      fields: [
        { name: "zhTW", title: "中文", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title.en" },
    }),
    defineField({
      name: "materialStory",
      title: "布料故事",
      type: "object",
      fields: [
        { name: "zhTW", title: "中文", type: "text" },
        { name: "en", title: "English", type: "text" },
      ],
    }),
    defineField({
      name: "images",
      title: "作品照片",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "relatedProduct",
      title: "對應商品",
      type: "reference",
      to: [{ type: "product" }],
    }),
    defineField({
      name: "publishedAt",
      title: "發布日期",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "title.zhTW",
      media: "images.0",
    },
    prepare({ title, media }) {
      return { title: title ?? "未命名作品", media };
    },
  },
});
