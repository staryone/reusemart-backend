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
        Organisasi: {
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
            transaksi: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id_transaksi: {
                    type: "integer",
                    example: 1,
                  },
                },
              },
            },
          },
        },
        Pembeli: {
          properties: {
            id_pembeli: {
              type: "integer",
              example: 1,
            },
            email: {
              type: "string",
              format: "email",
              example: "pembeli@example.com",
            },
            nama: {
              type: "string",
              example: "Joko Waluyo",
            },
            nomor_telepon: {
              type: "string",
              example: "02746642721",
            },
            poin_loyalitas: {
              type: "integer",
              example: 240,
            },
            alamat: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id_alamat: {
                    type: "integer",
                    example: 1,
                  },
                },
              },
            },
            transaksi: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id_transaksi: {
                    type: "integer",
                    example: 1,
                  },
                },
              },
            },
          },
        },
        Alamat: {
          properties: {
            id_alamat: {
              type: "integer",
              example: 1,
            },
            nama_alamat: {
              type: "string",
              example: "Rumah",
            },
            detail_alamat: {
              type: "string",
              example: "Jl. kaliurang no 2",
            },
            status_default: {
              type: "boolean",
              example: false,
            },
          },
        },
        Diskusi: {
          properties: {
            id_diskusi: {
              type: "integer",
              example: 1,
            },
            tanggal_diskusi: {
              type: "string",
              example: "2025-05-07T10:00:00Z",
            },
            pesan: {
              type: "string",
              example: "Apa kabar barang ini?",
            },
            id_barang: {
              type: "string",
              example: "M1",
            },
            id_cs: {
              type: "string",
              example: "T1",
            },
            id_pembeli: {
              type: "integer",
              example: 1,
            },
            nama: {
              type: "string",
              example: "John Doe",
            },
            role: {
              type: "string",
              example: "CS",
            },
          },
        },
        RequestDonasi: {
          properties: {
            id_request: {
              type: "integer",
              example: 1,
            },
            deskripsi: {
              type: "string",
              example: "Rumah",
            },
            tanggal_request: {
              type: "string",
              example: "2025-05-07T10:00:00Z",
            },
            status: {
              type: "string",
              example: "MENUNGGU",
            },
            id_organisasi: {
              type: "string",
              example: "ORG1",
            },
          },
        },
        Donasi: {
          properties: {
            id_donasi: {
              type: "integer",
              example: 1,
            },
            tanggal_donasi: {
              type: "string",
              example: "2025-05-07T10:00:00Z",
            },
            nama_penerima: {
              type: "string",
              example: "Joko",
            },
            poin_penitip: {
              type: "integer",
              example: 20,
            },
            id_barang: {
              type: "string",
              example: "M1",
            },
            id_request: {
              type: "integer",
              example: 1,
            },
          },
        },
        Barang: {
          type: "object",
          properties: {
            id_barang: {
              type: "string",
              example: "M1",
            },
            nama_barang: {
              type: "string",
              example: "Baju Bekas",
            },
            deskripsi: {
              type: "string",
              example: "Baju bekas dalam kondisi baik",
            },
            harga: {
              type: "number",
              format: "float",
              example: 50000,
            },
            status: {
              type: "string",
              example: "TERSEDIA",
            },
            garansi: {
              type: "string",
              nullable: true,
              example: "1 minggu",
            },
            berat: {
              type: "number",
              format: "float",
              example: 0.5,
            },
            kategori: {
              type: "object",
              properties: {
                id_kategori: {
                  type: "integer",
                  example: 1,
                },
                nama_kategori: {
                  type: "string",
                  example: "Pakaian",
                },
              },
            },
            gambar: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id_gambar: {
                    type: "integer",
                    example: 1,
                  },
                  url_gambar: {
                    type: "string",
                    example: "gambar/barang1.png",
                  },
                  is_primary: {
                    type: "boolean",
                    example: true,
                  },
                  order_number: {
                    type: "integer",
                    example: 0,
                  },
                  id_barang: {
                    type: "string",
                    example: "M1",
                  },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    example: "2025-05-07T10:00:00Z",
                  },
                  updatedAt: {
                    type: "string",
                    format: "date-time",
                    example: "2025-05-07T10:00:00Z",
                  },
                },
              },
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-05-07T10:00:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2025-05-07T10:00:00Z",
            },
            penitip: {
              type: "object",
              properties: {
                id_penitip: {
                  type: "string",
                  example: "T1",
                },
                nama: {
                  type: "string",
                  example: "Joko Waluyo",
                },
                is_top_seller: {
                  type: "boolean",
                  example: false,
                },
                nomor_telepon: {
                  type: "string",
                  example: "02746642721",
                },
                alamat: {
                  type: "string",
                  example: "Jl. Kecambang no 2",
                },
                rating: {
                  type: "number",
                  format: "float",
                  example: 4.8,
                },
              },
            },
            diskusi: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id_diskusi: {
                    type: "integer",
                    example: 1,
                  },
                  tanggal_d: {
                    type: "string",
                    format: "date-time",
                    example: "2025-05-07T10:00:00Z",
                  },
                  pesan: {
                    type: "string",
                    example: "Apa kabar barang ini?",
                  },
                  id_barang: {
                    type: "string",
                    example: "M1",
                  },
                  id_cs: {
                    type: "string",
                    nullable: true,
                    example: "P123",
                  },
                  id_pembeli: {
                    type: "integer",
                    nullable: true,
                    example: 1,
                  },
                  nama: {
                    type: "string",
                    example: "John Doe",
                  },
                  role: {
                    type: "string",
                    example: "CS",
                  },
                },
              },
              example: [],
            },
          },
        },
        Keranjang: {
          type: "object",
          properties: {
            id_keranjang: {
              type: "integer",
              example: 1,
            },
            id_barang: {
              type: "string",
              example: "M1",
            },
            id_pembeli: {
              type: "integer",
              example: 12,
            },
            id_penitip: {
              type: "integer",
              example: 1,
            },
            is_selected: {
              type: "boolean",
              example: false,
            },
            nama_penitip: {
              type: "string",
              example: "Joko",
            },
            nama_barang: {
              type: "string",
              example: "Baju Bekas",
            },
            harga_barang: {
              type: "number",
              format: "float",
              example: 50000,
            },
            gambar_barang: {
              type: "string",
              example: "https://aaa.com/contoh/gambar",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-05-07T10:00:00Z",
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
