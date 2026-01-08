import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CinéTanger API",
      version: "1.0.0",
      description: "API for CinéTanger cinema reservation system",
    },
    servers: [
      {
        url: "http://localhost:5000", // ✅ FIXED (NO /api)
      },
    ],
  },

  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
