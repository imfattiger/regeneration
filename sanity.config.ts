import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "regeneration-studio",
  title: "Regeneration Studio",
  projectId: "0qnheos2",
  dataset: "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("內容")
          .items([
            orderableDocumentListDeskItem({
              type: "product",
              title: "商品",
              id: "orderable-product",
              S,
              context,
            }),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== "product"
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
