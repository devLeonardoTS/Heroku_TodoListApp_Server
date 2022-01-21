import { Components, Options, SecurityScheme } from "swagger-jsdoc";

const swaggerSecuritySchemes: SecurityScheme = {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
};

const swaggerComponents: Components = {
    securitySchemes: {
        bearerAuth: swaggerSecuritySchemes
    }
};

export const swaggerOptions: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "devLeonardoTS's ToDoList API",
            description: "devLeonardoTS's ToDoList API Documentation",
            version: "1.0.0",
            contact: {
                name: "devLeonardoTS",
                url: "https://www.linkedin.com/in/devleonardots/"
            },
            servers: [`https://todolistappserver.herokuapp.com`, `http://localhost:${process.env.PORT}`]
        },
        components: swaggerComponents,
        security: [
            {
                bearerAuth: [
                    "write:TodoList API - USER END-POINTS",
                    "read:TodoList API - USER END-POINTS"
                ],
            }
        ],
        tags: [
            {
                name: "TodoList API - PUBLIC END-POINTS",
                description: "devLeonardoTS's ToDoList Public End-Points"
            },
            {
                name: "TodoList API - USER END-POINTS",
                description: "devLeonardoTS's ToDoList End-Points that are strict to users."
            }
        ],
    },
    apis: [
        "./src/routers/**/*.ts",
        "./src/models/**/*.ts",
        "./src/classes/**/*.ts",
        "./src/swaggerSpecs/*.yaml"
    ]
}