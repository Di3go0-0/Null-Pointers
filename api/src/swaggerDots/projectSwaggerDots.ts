export const projectSwaggerDocs = {
  tags: [
    {
      name: "Project",
      description: "Project Management",
    },
  ],
  paths: {
    "/project": {
      get: {
        summary: "Get projects",
        tags: ["Project"],
        responses: {
          200: {
            description: "All projects",
          },
          500: {
            description: "Error getting projects",
          },
        },
      },
      post: {
        summary: "Create a new project",
        tags: ["Project"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Project",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Project created successfully",
          },
          400: {
            description: "Invalid input",
          },
        },
      },
    },
    "/project/{id}": {
      get: {
        summary: "Get project",
        tags: ["Project"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "number",
            },
            description: "Project ID",
          },
        ],
        responses: {
          200: {
            description: "Project found",
          },
          404: {
            description: "Project not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
      put: {
        summary: "Update project",
        tags: ["Project"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "number",
            },
            description: "Project ID",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Project",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Project updated successfully",
          },
          404: {
            description: "Project not found",
          },
        },
      },
      delete: {
        summary: "Delete project",
        tags: ["Project"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "number",
            },
            description: "Project ID",
          },
        ],
        responses: {
          201: {
            description: "Project deleted successfully",
          },
          404: {
            description: "Project not found",
          },
        },
      },
    },
    "/project/collaborator": {
      post: {
        summary: "Add a collaborator to a project",
        tags: ["Project"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  userId: {
                    type: "number",
                  },
                  projectId: {
                    type: "number",
                  },
                },
                required: ["userId", "projectId"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Collaborator added successfully",
          },
          400: {
            description: "Invalid input",
          },
          404: {
            description: "Project not found",
          },
        },
      },
    },
  },
};
