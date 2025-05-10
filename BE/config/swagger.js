const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { PORT } = require("./config");

// Cấu hình Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: "API quản lý với Node.js, Express và Sequelize",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`, // Thay đổi nếu cần
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Sử dụng JWT token
        },
      },
      schemas: {
        // DanhMuc: {
        //   type: "object",
        //   required: ["tenDM"],
        //   properties: {
        //     
        //     tenDM: {
        //       type: "string",
        //       description: "Tên của DanhMuc",
        //     },
        //     CTDanhMucs: {
        //       type: "array",
        //       items: {
        //         $ref: "#/components/schemas/CTDanhMuc",
        //       },
        //     },
        //   },
        // },
        CTDanhMuc: {
          type: "object",
          required: ["tenCTDM", "maDM"],
          properties: {
            ma_CTDM: {
              type: "string",
              description: "ID của CTDanhMuc",
            },
            tenCTDM: {
              type: "string",
              description: "Tên của CTDanhMuc",
            },
            SanPhams: {
              type: "array",
              items: {
                $ref: "#/components/schemas/SanPham",
              },
            },
          },
        },
        SanPham: {
          type: "object",
          required: ["tenSP", "soLuong", "giaTien"],
          properties: {
            maSP: {
              type: "string",
              description: "ID của SanPham",
            },
            ma_CTDM: {
              type: "string",
              description: "ID của CTDanhMuc",
            },
                       tenSP: {
              type: "string",
              description: "Tên của SanPham",
            },
            Thuonghieu: {
              type: "string",
              description: "Thương hiệu của sản phẩm",
            },
            Xuatxu: {
              type: "string",
              description: "Xuất xứ của sản phẩm",
            },
            Kieudang: {
              type: "string",
              description: "Kiểu dáng của sản phẩm",
            },
            Loaimay: {
              type: "string",
              description: "Loại máy của sản phẩm",
            },
            Duongkinh: {
              type: "string",
              description: "Đường kính của sản phẩm",
            },
            Chatlieu: {
              type: "string",
              description: "Chất liệu của sản phẩm",
            },
            Sizeday: {
              type: "string",
              description: "Size dây của sản phẩm",
            },
            Chongnuoc: {
              type: "string",
              description: "Khả năng chống nước của sản phẩm",
            },
            soLuong: {
              type: "integer",
              description: "Số lượng của SanPham",
            },
            giaTien: {
              type: "number",
              description: "Giá tiền của SanPham",
            },
            giamGia: {
              type: "number",
              description: "Giảm giá của sản phẩm (nếu có)",
            },
            anhSP: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Danh sách ảnh của sản phẩm",
            },
          },
        },
        VaiTro: {
          type: "object",
          required: ["tenVT"],
          properties: {
            maVT: {
              type: "string",
              description: "ID của VaiTro",
            },
            tenVT: {
              type: "string",
              description: "Tên của VaiTro",
            },
          },
        },
        NguoiDung: {
          type: "object",
          required: [
            "tenND",
            "diaChi",
            "ngaySinh",
            "sdt",
            "email",
            "taiKhoan",
            "matKhau",
            "maVT",
          ],
          properties: {
            maND: {
              type: "string",
              description: "ID của NguoiDung",
            },
            tenND: {
              type: "string",
              description: "Tên của NguoiDung",
            },
            diaChi: {
              type: "string",
              description: "Địa chỉ của NguoiDung",
            },
            ngaySinh: {
              type: "string",
              format: "date",
              description: "Ngày sinh của NguoiDung",
            },
            sdt: {
              type: "string",
              description: "Số điện thoại của NguoiDung",
            },
            email: {
              type: "string",
              description: "Email của NguoiDung",
            },
            taiKhoan: {
              type: "string",
              description: "Tài khoản của NguoiDung",
            },
            matKhau: {
              type: "string",
              description: "Mật khẩu của NguoiDung",
            },
            anhThe: {
              type: "string",
              description: "Ảnh thẻ của NguoiDung",
            },
            maVT: {
              type: "string",
              description: "ID của VaiTro",
            },
          },
        },
        NhaCungCap: {
          type: "object",
          required: ["tenNCC", "diaChi", "sdt", "email"],
          properties: {
            maNCC: {
              type: "string",
              description: "ID của NhaCungCap",
            },
            tenNCC: {
              type: "string",
              description: "Tên của NhaCungCap",
            },
            diaChi: {
              type: "string",
              description: "Địa chỉ của NhaCungCap",
            },
            sdt: {
              type: "string",
              description: "Số điện thoại của NhaCungCap",
            },
            email: {
              type: "string",
              description: "Email của NhaCungCap",
            },
          },
        },
        HoaDonNhap: {
          type: "object",
          required: ["ngayNhap", "maNCC"],
          properties: {
            maHDN: {
              type: "string",
              description: "ID của HoaDonNhap",
            },
            ngayNhap: {
              type: "string",
              format: "date",
              description: "Ngày nhập của HoaDonNhap",
            },
            maNCC: {
              type: "string",
              description: "ID của NhaCungCap",
            },
            CTHoaDonNhaps: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  maSP: {
                    type: "string",
                    description: "ID của SanPham",
                  },
                  soLuong: {
                    type: "integer",
                    description: "Số lượng của SanPham",
                  },
                  giaTien: {
                    type: "number",
                    description: "Giá tiền của SanPham",
                  },
                },
              },
            },
          },
        },
        // Thêm các schema khác ở đây
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // Định nghĩa các API trong thư mục routes
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
