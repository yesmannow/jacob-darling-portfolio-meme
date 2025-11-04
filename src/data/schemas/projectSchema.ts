export const projectSchema = {
  type: "object",
  properties: {
    slug: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    longDescription: { type: "string" },
    image: { type: "string" },
    gallery: {
      type: "array",
      items: { type: "string" }
    },
    tags: {
      type: "array",
      items: { type: "string" }
    },
    link: { type: "string", format: "uri" },
    github: { type: "string", format: "uri" },
    featured: { type: "boolean" }
  },
  required: ["slug", "title", "description", "longDescription", "image", "tags"]
};