export const authswaggerDocs = {
  tags: [
    {
      name: "Auth",
      description: "Authentication routes",
    },
  ],
  paths: {
    "/register": {
      post: {
        summary: "Register a new user",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Register",
              },
            },
          },
        },
        responses: {
          201: { description: "User created successfully" },
          400: { description: "Invalid input" },
          500: { description: "Error creating User" },
        },
      },
    },
    "/login": {
      post: {
        summary: "Login a user",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Login",
              },
            },
          },
        },
        responses: {
          200: { description: "Login successful" },
          400: { description: "Invalid credentials" },
          404: { description: "User not found" },
          500: { description: "Error logging in User" },
        },
      },
    },
    "/logout": {
      post: {
        summary: "Logout a user",
        tags: ["Auth"],
        responses: {
          200: { description: "Logout successful" },
          400: { description: "No token found" },
          500: { description: "Error logging out" },
        },
      },
    },
    "/validate": {
      post: {
        summary: "Validate a user",
        tags: ["Auth"],
        responses: {
          200: { description: "Validation successful" },
          400: { description: "No token found" },
          401: { description: "Invalid token" },
          404: { description: "User not found" },
          500: { description: "Error validating user" },
        },
      },
    },
    "/users": {
      get: {
        summary: "Get all users",
        tags: ["Auth"],
        responses: {
          200: { description: "Users retrieved successfully" },
          400: { description: "No token found" },
        }
      },
    }
  }
}

