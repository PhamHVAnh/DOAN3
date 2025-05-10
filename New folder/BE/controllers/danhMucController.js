//const db = require("../models");

const DanhMuc = require("../models/danhMucModel");
const SanPham = require("../models/sanPhamModel");
const { Op } = require("sequelize");
//const db = require("../models");

exports.getAll = async (req, res) => {
  try {
    const danhMucs = await DanhMuc.findAll({
      include: {
        model: SanPham,
        as: "SanPhams",
      },
    });
    res.json(danhMucs);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách danh mục:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
 
};


exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const danhMuc = await DanhMuc.findByPk(id, {
      include: {
        model: SanPham,
        as: "SanPhams",
      },
    });

    if (!danhMuc) {
      return res.status(404).json({ error: "Không tìm thấy danh mục" });
    }

    res.json(danhMuc);
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
  
};

exports.insert = async (req, res) => {
  try {
    const { tenDM, moTa } = req.body;

    if (!tenDM) {
      return res.status(400).json({ error: "Tên danh mục là bắt buộc" });
    }

    const danhMuc = await DanhMuc.create({ tenDM, moTa });

    res.status(201).json(danhMuc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { maDM, tenDM, moTa } = req.body;

    if (!maDM) {
      return res.status(400).json({ error: "Mã danh mục là bắt buộc" });
    }

    const danhMuc = await DanhMuc.findByPk(maDM);
    if (!danhMuc) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }

    await danhMuc.update({ tenDM, moTa });

    res.status(200).json(danhMuc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const danhMuc = await DanhMuc.findByPk(id, {
      include: [{ model: SanPham, as: "SanPhams" }],
    });
    if (danhMuc) {
      await danhMuc.destroy();
      return res.status(200).json(danhMuc);
    }

    res.status(404).json({ error: "Không tìm thấy danh mục" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const { q } = req.query;

    const danhMucs = await DanhMuc.findAll({
      where: { tenDM: { [Op.like]: `%${q}%` } },
      include: [{ model: SanPham, as: "SanPhams" }],
    });

    if (danhMucs.length > 0) {
      return res.status(200).json(
        danhMucs.map((dm) => ({
          ...dm.toJSON(),
          SanPhams: dm.SanPhams,
        }))
      );
    }

    res.status(404).json({ message: "Không tìm thấy kết quả phù hợp" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.searchDMOrSanPham = async (req, res) => {
  try {
    const { q, maDM } = req.query;

    // 1. Nếu có maDM, tìm sản phẩm theo maDM
    if (maDM) {
      const sanPhams = await SanPham.findAll({
        where: { maDM },
        include: [
          {
            model: DanhMuc,
            as: "DanhMuc",
            attributes: ["maDM", "tenDM"],
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
          Chongnuoc: sp.Chongnuoc, // Chống nước
          Thuonghieu: sp.Thuonghieu, // Thương hiệu
          Xuatxu: sp.Xuatxu, // Xuất xứ
          DanhMuc: sp.DanhMuc, // Thông tin danh mục
        }));

        return res.status(200).json({ type: "SanPham", result });
      }
    }

    // 2. Tìm sản phẩm theo từ khóa q
    const sanPhams = await SanPham.findAll({
      where: {
        [Op.or]: [
          { tenSP: { [Op.like]: `%${q}%` } },
          { Thuonghieu: { [Op.like]: `%${q}%` } },
          { Xuatxu: { [Op.like]: `%${q}%` } },
        ],
      },
      include: [
        {
          model: DanhMuc,
          as: "DanhMuc",
          attributes: ["maDM", "tenDM"],
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
        Chongnuoc: sp.Chongnuoc, // Chống nước
        Thuonghieu: sp.Thuonghieu, // Thương hiệu
        Xuatxu: sp.Xuatxu, // Xuất xứ
        DanhMuc: sp.DanhMuc, // Thông tin danh mục
      }));

      return res.status(200).json({ type: "SanPham", result });
    }

    return res.status(404).json({ message: "Không tìm thấy kết quả phù hợp" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};