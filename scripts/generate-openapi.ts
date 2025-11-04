import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectSchema = {
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

const openapi = {
  openapi: "3.0.0",
  info: {
    title: "Jacob Darling Portfolio API",
    version: "1.0.0"
  },
  paths: {
    "/projects": {
      get: {
        summary: "List all projects",
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: projectSchema
                }
              }
            }
          }
        }
      }
    }
  }
};

fs.writeFileSync(
  path.resolve(__dirname, '../public/api/openapi.json'),
  JSON.stringify(openapi, null, 2)
);
console.log("✅ OpenAPI schema generated");