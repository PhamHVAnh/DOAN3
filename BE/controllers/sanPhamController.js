const SanPham = require("../models/sanPhamModel");
const CTDanhMuc = require("../models/ctDanhMucModel");
const Sequelize = require("../config/database");
const { Op } = require("sequelize");

exports.getAll = async (req, res) => {
  try {
    const sanPhams = await SanPham.findAll({
      include: [{ model: CTDanhMuc, as: "CTDanhMuc" }],
    });
    res.status(200).json(sanPhams);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const sanPham = await SanPham.findByPk(req.params.id, {
      include: [{ model: CTDanhMuc, as: "CTDanhMuc" }],
    });
    if (sanPham) {
      res.status(200).json(sanPham);
    } else {
      res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.insert = async (req, res) => {
  try {
    const {
      tenSP,
      ma_CTDM,
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
      ma_CTDM,
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
      ma_CTDM,
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
        ma_CTDM,
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
          model: CTDanhMuc,
          as: "CTDanhMuc",
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
          Sequelize.where(Sequelize.col("CTDanhMuc.tenCTDM"), {
            [Op.like]: `%${keyword}%`,
          }),
        ],
      },
    });

    res.status(200).json(sanPhams);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
