import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "關於頁面",
  type: "document",
  // Singleton — only one document of this type
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({
      name: "brandStory",
      title: "品牌故事",
      type: "object",
      fields: [
        { name: "zhTW", title: "中文", type: "text" },
        { name: "en", title: "English", type: "text" },
      ],
    }),
    defineField({
      name: "processSteps",
      title: "製作流程步驟",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "步驟名稱",
              type: "object",
              fields: [
                { name: "zhTW", title: "中文", type: "string" },
                { name: "en", title: "English", type: "string" },
              ],
            },
            {
              name: "description",
              title: "描述",
              type: "object",
              fields: [
                { name: "zhTW", title: "中文", type: "text" },
                { name: "en", title: "English", type: "text" },
              ],
            },
            {
              name: "image",
              title: "照片",
              type: "image",
              options: { hotspot: true },
            },
          ],
          preview: {
            select: { title: "title.zhTW", media: "image" },
            prepare: ({ title, media }: { title: string; media: unknown }) => ({
              title: title ?? "未命名步驟",
              media,
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "關於頁面" }),
  },
});
