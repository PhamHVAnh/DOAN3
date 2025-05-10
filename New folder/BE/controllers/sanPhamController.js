const SanPham = require("../models/sanPhamModel");
const DanhMuc = require("../models/danhMucModel");
const sequelize = require("../config/database");

const { Op } = require("sequelize");

// Lấy tất cả sản phẩm cùng danh mục
exports.getAll = async (req, res) => {
  try {
    const sanPhams = await SanPham.findAll({
      include: [
        {
          model: DanhMuc,
          as: "DanhMuc",
        },
      ],
    });
    res.status(200).json(sanPhams);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

// Lấy sản phẩm theo ID và thông tin danh mục
exports.getById = async (req, res) => {
  try {
    const sanPham = await SanPham.findByPk(req.params.id, {
      include: [
        {
          model: DanhMuc,
          as: "DanhMuc",
        },
      ],
    });

    if (!sanPham) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.status(200).json(sanPham);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm theo ID:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
};


exports.insert = async (req, res) => {
  try {
    const {
      tenSP,
      maDM,
      Thuonghieu,
      Xuatxu,
      Kieudang,
      Loaimay,
      Duongkinh,
      Chatlieu,
      Sizeday,
      Chongnuoc,
      soLuong,
      giaTien,
      giamGia,
      anhSP,
    } = req.body;

    const anhSPArray = Array.isArray(anhSP) ? anhSP : [anhSP];

    const sanPham = await SanPham.create({
      tenSP,
      maDM,
      Thuonghieu,
      Xuatxu,
      Kieudang,
      Loaimay,
      Duongkinh,
      Chatlieu,
      Sizeday,
      Chongnuoc,
      soLuong,
      giaTien,
      giamGia,
      anhSP: JSON.stringify(anhSPArray),
    });

    res.status(201).json(sanPham);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const {
      maSP,
      tenSP,
      maDM,
      Thuonghieu,
      Xuatxu,
      Kieudang,
      Loaimay,
      Duongkinh,
      Chatlieu,
      Sizeday,
      Chongnuoc,
      soLuong,
      giaTien,
      giamGia,
      anhSP,
    } = req.body;

    const sanPham = await SanPham.findByPk(maSP);

    if (sanPham) {
      await sanPham.update({
        tenSP,
        maDM,
        Thuonghieu,
        Xuatxu,
        Kieudang,
        Loaimay,
        Duongkinh,
        Chatlieu,
        Sizeday,
        Chongnuoc,
        soLuong,
        giaTien,
        giamGia,
        anhSP: JSON.stringify([].concat(anhSP)),
      });
      res.status(200).json(sanPham);
    } else {
      res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const sanPham = await SanPham.findByPk(req.params.id);
    if (sanPham) {
      await sanPham.destroy();
      res.status(200).json(sanPham);
    } else {
      res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const keyword = req.query.q || "";

    const sanPhams = await SanPham.findAll({
      include: [
        {
          model: DanhMuc,
          as: "DanhMuc",
          required: false,
        },
      ],
      where: {
        [Op.or]: [
          { tenSP: { [Op.like]: `%${keyword}%` } },
          { Thuonghieu: { [Op.like]: `%${keyword}%` } },
          { Xuatxu: { [Op.like]: `%${keyword}%` } },
          { Kieudang: { [Op.like]: `%${keyword}%` } },
          { Loaimay: { [Op.like]: `%${keyword}%` } },
          { Duongkinh: { [Op.like]: `%${keyword}%` } },
          { Chatlieu: { [Op.like]: `%${keyword}%` } },
          { Sizeday: { [Op.like]: `%${keyword}%` } },
          { Chongnuoc: { [Op.like]: `%${keyword}%` } },
        ],
      },
    });

    res.status(200).json(sanPhams);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};