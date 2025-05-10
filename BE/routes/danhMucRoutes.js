const express = require("express");
const {
  insert,
  update,
  remove,
  search,
  getByIdCTDM,
  getAllCTDM,
  searchCTDMOrSanPham,
} = require("../controllers/danhMucController"); // Đảm bảo đúng đường dẫn
const { verifyToken } = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/authorizeRole");

const router = express.Router();

router.post(" ", verifyToken, checkRole(["A00"]), insert);
router.put("/danhmuc/update", verifyToken, checkRole(["A00"]), update);
router.delete("/danhmuc/delete/:id", verifyToken, checkRole(["A00"]), remove);
router.get("/danhmuc/search", verifyToken, search);
router.get("/ctdanhmuc/getbyid/:id", getByIdCTDM);
router.get("/ctdanhmuc/getAll", getAllCTDM);  // Đảm bảo đường dẫn này được định nghĩa chính xác
router.get("/ctdanhmuc/search", searchCTDMOrSanPham);

module.exports = router;
