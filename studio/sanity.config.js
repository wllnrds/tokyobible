import { defineConfig } from "sanity"
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'

import schemas from './schemas/schema'
import deskStructure from './layout/deskStructure'

export default defineConfig({
    title: "Tokyo Bible",
    projectId: "t8yrrrlj",
    dataset: "production",
    plugins: [ 
        deskTool({
            structure: deskStructure
        }),
        visionTool(),
        vercelDeployTool()
    ],
    tools: (prev) => {
        if (import.meta.env.DEV) {
          return prev
        }
        return prev.filter((tool) => tool.name !== 'vision')
    },    
    schema: {
        types: schemas
    },
});