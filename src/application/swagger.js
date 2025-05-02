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
              type: "string",
              example: "ORG1",
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
        Penitip: {
          properties: {
            id_penitip: {
              type: "string",
              example: "T1",
            },
            email: {
              type: "string",
              format: "email",
              example: "organization@example.com",
            },
            nomor_ktp: {
              type: "string",
              example: "340211....",
            },
            foto_ktp: {
              type: "string",
              example: "foto_ktp/nomor_ktp.png",
            },
            nama: {
              type: "string",
              example: "Joko Waluyo",
            },
            alamat: {
              type: "string",
              example: "Jl. Kecambang no 2",
            },
            nomor_telepon: {
              type: "string",
              example: "02746642721",
            },
            saldo: {
              type: "integer",
              example: 10000,
            },
            rating: {
              type: "float",
              example: 4.8,
            },
            total_review: {
              type: "integer",
              example: 5,
            },
            jumlah_review: {
              type: "float",
              example: 24,
            },
            is_top_seller: {
              type: "boolean",
              example: false,
            },
            total_per_bulan: {
              type: "integer",
              example: 24000,
            },
            poin: {
              type: "integer",
              example: 240,
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
