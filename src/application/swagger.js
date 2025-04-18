import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Reusemart Restful API",
      version: "1.0.0",
      description: "API untuk manajemen Reusemart ",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Pegawai: {
          type: "object",
          properties: {
            id_pegawai: {
              type: "string",
              example: "P123",
            },
            email: {
              type: "string",
              format: "email",
              example: "employee@example.com",
            },
            nama: {
              type: "string",
              example: "John Doe",
            },
            nomor_telepon: {
              type: "string",
              example: "+6281234567890",
            },
            komisi: {
              type: "number",
              example: 0,
            },
            tgl_lahir: {
              type: "string",
              format: "date",
              example: "1990-01-01",
            },
            jabatan: {
              type: "object",
              properties: {
                id_jabatan: {
                  type: "integer",
                  example: 1,
                },
                nama_jabatan: {
                  type: "string",
                  example: "Kurir",
                },
              },
            },
          },
        },
        Jabatan: {
          type: "object",
          properties: {
            id_jabatan: {
              type: "integer",
              example: 1,
            },
            nama_jabatan: {
              type: "string",
              example: "Kurir",
            },
          },
        },
        Organsasi: {
          properties: {
            id_organisasi: {
              type: "integer",
              example: 1,
            },
            email: {
              type: "string",
              format: "email",
              example: "organization@example.com",
            },
            nama_organisasi: {
              type: "string",
              example: "Komunitas Peduli Kundang",
            },
            alamat: {
              type: "string",
              example: "Jl. Kecambang no 2",
            },
            nomor_telepon: {
              type: "string",
              example: "02746642721",
            },
            deskripsi: {
              type: "string",
              example: "Organisasi bantuan dan kondang",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.route.js"],
};
const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
