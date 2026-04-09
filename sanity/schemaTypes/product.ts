import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "商品",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "商品名稱",
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
      options: { source: "name.en" },
    }),
    defineField({
      name: "description",
      title: "描述",
      type: "object",
      fields: [
        { name: "zhTW", title: "中文", type: "text" },
        { name: "en", title: "English", type: "text" },
      ],
    }),
    defineField({
      name: "material",
      title: "材質",
      type: "object",
      fields: [
        { name: "zhTW", title: "中文", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "price",
      title: "價格 (TWD)",
      type: "number",
    }),
    defineField({
      name: "images",
      title: "商品照片",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "inventory",
      title: "庫存數量",
      type: "number",
      initialValue: 1,
    }),
    defineField({
      name: "status",
      title: "狀態",
      type: "string",
      options: {
        list: [
          { title: "販售中", value: "available" },
          { title: "已售完", value: "sold_out" },
          { title: "即將上市", value: "coming_soon" },
        ],
      },
      initialValue: "available",
    }),
    defineField({
      name: "featured",
      title: "首頁精選",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name.zhTW",
      media: "images.0",
      status: "status",
    },
    prepare({ title, media, status }) {
      return {
        title: title ?? "未命名商品",
        subtitle: status,
        media,
      };
    },
  },
});
