// const express = require("express");
// const {
//   getAll,
//   getById,
//   insert,
//   update,
//   remove,
//   search,
// } = require("../controllers/sanPhamController");
// const router = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   name: SanPham
//  *   description: API cho sản phẩm
//  */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     SanPham:
//  *       type: object
//  *       properties:
//  *         maSP:
//  *           type: string
//  *         tenSP:
//  *           type: string
//  *         ma_CTDM:
//  *           type: string

//  *         Loai:
//  *           type: string
//  *         Kieudang:
//  *           type: string
//  *         Loaimay:
//  *           type: string
//  *         Duongkinh:
//  *           type: string
//  *         Chatlieu:
//  *           type: string
//  *         Sizeday:
//  *           type: string
//  *         soLuong:
//  *           type: integer
//  *         giaTien:
//  *           type: number
//  *         giamGia:
//  *           type: number
//  *         anhSP:
//  *           type: array
//  *           items:
//  *             type: string
//  */

// // GET ALL
// /**
//  * @swagger
//  * /api/sanpham/getall:
//  *   get:
//  *     tags: [SanPham]
//  *     responses:
//  *       200:
//  *         description: Danh sách sản phẩm
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/SanPham'
//  */
// router.get("/sanpham/getall", getAll);

// // GET BY ID
// /**
//  * @swagger
//  * /api/sanpham/getbyid/{id}:
//  *   get:
//  *     tags: [SanPham]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Một sản phẩm
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/SanPham'
//  *       404:
//  *         description: Không tìm thấy sản phẩm
//  */
// router.get("/sanpham/getbyid/:id", getById);

// // INSERT
// /**
//  * @swagger
//  * /api/sanpham/insert:
//  *   post:
//  *     tags: [SanPham]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               tenSP:
//  *                 type: string
//  *               ma_CTDM:
//  *                 type: string
//  *               Loai:
//  *                 type: string
//  *               Kieudang:
//  *                 type: string
//  *               Loaimay:
//  *                 type: string
//  *               Duongkinh:
//  *                 type: string
//  *               Chatlieu:
//  *                 type: string
//  *               Sizeday:
//  *                 type: string
//  *               soLuong:
//  *                 type: integer
//  *               giaTien:
//  *                 type: number
//  *               giamGia:
//  *                 type: number
//  *               anhSP:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *     responses:
//  *       201:
//  *         description: Sản phẩm đã được tạo
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/SanPham'
//  */
// router.post("/sanpham/insert", insert);

// // UPDATE
// /**
//  * @swagger
//  * /api/sanpham/update:
//  *   put:
//  *     tags: [SanPham]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               maSP:
//  *                 type: string
//  *               tenSP:
//  *                 type: string
//  *               maDM:
//  *                 type: string
//  *               Loai:
//  *                 type: string
//  *               Kieudang:
//  *                 type: string
//  *               Loaimay:
//  *                 type: string
//  *               Duongkinh:
//  *                 type: string
//  *               Chatlieu:
//  *                 type: string
//  *               Sizeday:
//  *                 type: string
//  *               soLuong:
//  *                 type: integer
//  *               giaTien:
//  *                 type: number
//  *               giamGia:
//  *                 type: number
//  *               anhSP:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *     responses:
//  *       200:
//  *         description: Sản phẩm đã được cập nhật
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/SanPham'
//  *       404:
//  *         description: Không tìm thấy sản phẩm
//  */
// router.put("/sanpham/update", update);

// // DELETE
// /**
//  * @swagger
//  * /api/sanpham/delete/{id}:
//  *   delete:
//  *     tags: [SanPham]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Sản phẩm đã bị xóa
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/SanPham'
//  *       404:
//  *         description: Không tìm thấy sản phẩm
//  */
// router.delete("/sanpham/delete/:id", remove);

// // SEARCH
// /**
//  * @swagger
//  * /api/sanpham/search:
//  *   get:
//  *     tags: [SanPham]
//  *     parameters:
//  *       - in: query
//  *         name: q
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Từ khóa tìm kiếm
//  *     responses:
//  *       200:
//  *         description: Danh sách sản phẩm tìm được
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/SanPham'
//  */
// router.get("/sanpham/search", search);

// module.exports = router;
const express = require("express");
const {
  getAll,
  getById,
  insert,
  update,
  remove,
  search,
} = require("../controllers/sanPhamController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: SanPham
 *   description: API cho sản phẩm
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SanPham:
 *       type: object
 *       properties:
 *         maSP:
 *           type: string
 *           description: Mã sản phẩm
 *         maDM:
 *           type: string
 *           description: Mã danh mục
 *         tenSP:
 *           type: string
 *           description: Tên sản phẩm
 *         Thuonghieu:
 *           type: string
 *           description: Thương hiệu sản phẩm
 *         Xuatxu:
 *           type: string
 *           description: Xuất xứ sản phẩm
 *         Kieudang:
 *           type: string
 *           description: Kiểu dáng sản phẩm
 *         Loaimay:
 *           type: string
 *           description: Loại máy
 *         Duongkinh:
 *           type: string
 *           description: Đường kính sản phẩm
 *         Chatlieu:
 *           type: string
 *           description: Chất liệu sản phẩm
 *         Sizeday:
 *           type: string
 *           description: Size dây
 *         Chongnuoc:
 *           type: string
 *           description: Khả năng chống nước
 *         soLuong:
 *           type: integer
 *           description: Số lượng sản phẩm
 *         giaTien:
 *           type: number
 *           description: Giá tiền sản phẩm
 *         giamGia:
 *           type: number
 *           description: Phần trăm giảm giá
 *         anhSP:
 *           type: array
 *           items:
 *             type: string
 *           description: Danh sách ảnh sản phẩm
 */

// GET ALL
/**
 * @swagger
 * /api/sanpham/getall:
 *   get:
 *     tags: [SanPham]
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SanPham'
 */
router.get("/sanpham/getall", getAll);

// GET BY ID
/**
 * @swagger
 * /api/sanpham/getbyid/{id}:
 *   get:
 *     tags: [SanPham]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã sản phẩm
 *     responses:
 *       200:
 *         description: Một sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SanPham'
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.get("/sanpham/getbyid/:id", getById);

// INSERT
/**
 * @swagger
 * /api/sanpham/insert:
 *   post:
 *     tags: [SanPham]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maDM:
 *                 type: string
 *               tenSP:
 *                 type: string
 *               Thuonghieu:
 *                 type: string
 *               Xuatxu:
 *                 type: string
 *               Kieudang:
 *                 type: string
 *               Loaimay:
 *                 type: string
 *               Duongkinh:
 *                 type: string
 *               Chatlieu:
 *                 type: string
 *               Sizeday:
 *                 type: string
 *               Chongnuoc:
 *                 type: string
 *               soLuong:
 *                 type: integer
 *               giaTien:
 *                 type: number
 *               giamGia:
 *                 type: number
 *               anhSP:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Sản phẩm đã được tạo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SanPham'
 */
router.post("/sanpham/insert", insert);

// UPDATE
/**
 * @swagger
 * /api/sanpham/update:
 *   put:
 *     tags: [SanPham]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maSP:
 *                 type: string
 *               maDM:
 *                 type: string
 *               tenSP:
 *                 type: string
 *               Thuonghieu:
 *                 type: string
 *               Xuatxu:
 *                 type: string
 *               Kieudang:
 *                 type: string
 *               Loaimay:
 *                 type: string
 *               Duongkinh:
 *                 type: string
 *               Chatlieu:
 *                 type: string
 *               Sizeday:
 *                 type: string
 *               Chongnuoc:
 *                 type: string
 *               soLuong:
 *                 type: integer
 *               giaTien:
 *                 type: number
 *               giamGia:
 *                 type: number
 *               anhSP:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Sản phẩm đã được cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SanPham'
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.put("/sanpham/update", update);

// DELETE
/**
 * @swagger
 * /api/sanpham/delete/{id}:
 *   delete:
 *     tags: [SanPham]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã sản phẩm
 *     responses:
 *       200:
 *         description: Sản phẩm đã bị xóa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SanPham'
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.delete("/sanpham/delete/:id", remove);

// SEARCH
/**
 * @swagger
 * /api/sanpham/search:
 *   get:
 *     tags: [SanPham]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Từ khóa tìm kiếm
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm tìm được
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SanPham'
 */
router.get("/sanpham/search", search);

module.exports = router;