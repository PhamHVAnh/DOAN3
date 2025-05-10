const CTDanhMuc = require("../models/ctDanhMucModel");
const SanPham = require("../models/sanPhamModel");
const { Op } = require("sequelize");

exports.getAllCTDM = async (req, res) => {
  try {
    const danhMucCTs = await CTDanhMuc.findAll({
      include: [
        {
          model: SanPham,
          as: "SanPhams",
        },
      ],
    });

    const result = danhMucCTs.map((ctdm) => ({
      ma_CTDM: ctdm.ma_CTDM,
      tenCTDM: ctdm.tenCTDM,
      SanPhams: ctdm.SanPhams,
    }));

    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getByIdCTDM = async (req, res) => {
  try {
    const danhMucCT = await CTDanhMuc.findByPk(req.params.id, {
      include: [
        {
          model: SanPham,
          as: "SanPhams",
        },
      ],
    });
    if (danhMucCT) {
      res.status(200).json({
        ma_CTDM: danhMucCT.ma_CTDM,
        tenCTDM: danhMucCT.tenCTDM,
        SanPhams: danhMucCT.SanPhams,
      });
    } else {
      res.status(404).json({ message: "Chi tiết danh mục không tồn tại" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.insert = async (req, res) => {
  try {
    const { tenCTDM } = req.body;

    if (!tenCTDM) {
      return res.status(400).json({ error: "Tên chi tiết danh mục là bắt buộc" });
    }

    const chiTietDanhMuc = await CTDanhMuc.create({ tenCTDM });

    res.status(201).json(chiTietDanhMuc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { ma_CTDM, tenCTDM } = req.body;

    if (!ma_CTDM) {
      return res.status(400).json({ error: "Mã chi tiết danh mục là bắt buộc" });
    }

    const chiTietDanhMuc = await CTDanhMuc.findByPk(ma_CTDM);
    if (!chiTietDanhMuc) {
      return res.status(404).json({ message: "Chi tiết danh mục không tồn tại" });
    }

    await chiTietDanhMuc.update({ tenCTDM });

    res.status(200).json(chiTietDanhMuc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const chiTietDanhMuc = await CTDanhMuc.findByPk(id);
    if (chiTietDanhMuc) {
      await chiTietDanhMuc.destroy();
      return res.status(200).json(chiTietDanhMuc);
    }

    res.status(404).json({ error: "Không tìm thấy chi tiết danh mục" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const { q } = req.query;

    const chiTietDanhMucs = await CTDanhMuc.findAll({
      where: { tenCTDM: { [Op.like]: `%${q}%` } },
      include: [{ model: SanPham, as: "SanPhams" }],
    });

    if (chiTietDanhMucs.length > 0) {
      return res.status(200).json(
        chiTietDanhMucs.map((ctdm) => ({
          ...ctdm.toJSON(),
          SanPhams: ctdm.SanPhams,
        }))
      );
    }

    res.status(404).json({ message: "Không tìm thấy kết quả phù hợp" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.searchCTDMOrSanPham = async (req, res) => {
  try {
    const { q } = req.query;

    // 1. Tìm chi tiết danh mục có tên giống từ khóa
    const chiTietDMs = await CTDanhMuc.findAll({
      where: { tenCTDM: { [Op.like]: `%${q}%` } },
      include: [
        {
          model: SanPham,
          as: "SanPhams",
        },
      ],
    });

    if (chiTietDMs.length > 0) {
      const result = chiTietDMs.map((ctdm) => ({
        ma_CTDM: ctdm.ma_CTDM,
        tenCTDM: ctdm.tenCTDM,
        SanPhams: ctdm.SanPhams,
      }));

      return res.status(200).json({ type: "ChiTietDanhMuc", result });
    }

    // 2. Nếu không có chi tiết, thử tìm sản phẩm
    const sanPhams = await SanPham.findAll({
      where: { tenSP: { [Op.like]: `%${q}%` } },
      include: [
        {
          model: CTDanhMuc,
          as: "CTDanhMuc",
          attributes: ["ma_CTDM", "tenCTDM"],
        },
      ],
    });

    if (sanPhams.length > 0) {
      const result = sanPhams.map((sp) => ({
        maSP: sp.maSP, // ID sản phẩm
        tenSP: sp.tenSP, // Tên sản phẩm
        giaTien: sp.giaTien, // Giá sản phẩm
        moTa: sp.moTa, // Mô tả sản phẩm
        anhSP: sp.anhSP, // Ảnh sản phẩm
        soLuong: sp.soLuong, // Số lượng sản phẩm
        giamGia: sp.giamGia, // Giảm giá (nếu có)
        Kieudang: sp.Kieudang, // Kiểu dáng sản phẩm
        Loaimay: sp.Loaimay, // Loại máy sản phẩm
        Duongkinh: sp.Duongkinh, // Đường kính sản phẩm
        Chatlieu: sp.Chatlieu, // Chất liệu sản phẩm
        Sizeday: sp.Sizeday, // Size dây sản phẩm

        CTDanhMuc: sp.CTDanhMuc,
      }));

      return res.status(200).json({ type: "SanPham", result });
    }

    return res.status(404).json({ message: "Không tìm thấy kết quả phù hợp" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};