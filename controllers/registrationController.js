const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("../config/db");

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Post User Sign In Api---------------------------------------------------------
const isSignIn = (req, res) => {
  const { reg_mobile, reg_password } = req.body;

  if (!reg_mobile || !reg_password) {
    return res
      .status(400)
      .json({ message: "Mobile and password are required" });
  }

  const sql =
    "SELECT * FROM registration WHERE reg_mobile = ? AND reg_password = ?";
  db.query(sql, [reg_mobile, reg_password], (err, results) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Server error", error: err });
    }

    if (results.length === 0) {
      return res
        .status(401)
        .json({ message: "Invalid mobile number or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: results[0], // or omit password field
    });
  });
};

// Post User Sign Up Api----------------------------------------------------------------
const SignUp = (req, res) => {
  const data = req.body;

  // Step 1: Check if user already exists
  const checkSql = `
    SELECT * FROM registration 
    WHERE reg_login = ? OR reg_mobile = ?
  `;

  db.query(
    checkSql,
    [data.password, data.reg_mobile],
    (checkErr, checkResult) => {
      if (checkErr) {
        console.error("Check error:", checkErr);
        return res
          .status(500)
          .json({ message: "Database check error", error: checkErr });
      }

      if (checkResult.length > 0) {
        return res.status(409).json({
          message: "User already registered.",
        });
      }

      // Step 2: Insert new user
      const sql = `
        INSERT INTO registration (
          reg_sponser_id, reg_mem_id, reg_pakge, reg_percentage, reg_login, reg_password,
          reg_mem_name, reg_nominee, reg_sex, reg_address, reg_city, reg_state, reg_pin_code,
          reg_sponser_name, reg_adhar, reg_mobile, reg_email, reg_dob, reg_acc_holder,
          reg_bank, reg_otherbank, reg_account, reg_ifsc, reg_branch, reg_paymode, reg_pan,
          reg_pan_date, reg_joindt, reg_date, reg_block_date, reg_block_remark,
          reg_nominee_relation, reg_active, reg_add_by, reg_branch_id, reg_payment_mode,
          reg_detail
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        data.reg_sponser_id,
        data.reg_mem_id,
        data.reg_pakge,
        data.reg_percentage,
        data.reg_login,
        data.reg_password,
        data.reg_mem_name,
        data.reg_nominee,
        data.reg_sex,
        data.reg_address,
        data.reg_city,
        data.reg_state,
        data.reg_pin_code,
        data.reg_sponser_name,
        data.reg_adhar,
        data.reg_mobile,
        data.reg_email,
        data.reg_dob,
        data.reg_acc_holder,
        data.reg_bank,
        data.reg_otherbank,
        data.reg_account,
        data.reg_ifsc,
        data.reg_branch,
        data.reg_paymode,
        data.reg_pan,
        data.reg_pan_date,
        data.reg_joindt,
        data.reg_date,
        data.reg_block_date,
        data.reg_block_remark,
        data.reg_nominee_relation,
        data.reg_active,
        data.reg_add_by,
        data.reg_branch_id,
        data.reg_payment_mode,
        data.reg_detail,
      ];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error("Insert error:", err);
          return res
            .status(500)
            .json({ message: "Database insert error", error: err });
        }

        res.status(201).json({
          message: "Registration successful",
          reg_id: result.insertId,
        });
      });
    }
  );
};

// Get All User Api-------------------------------------------------------------
const getAllUsers = (req, res) => {
  const sql = "SELECT * FROM registration";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Fetch error:", err);
      return res
        .status(500)
        .json({ message: "Database fetch error", error: err });
    }

    res.status(200).json(results);
  });
};

//Get User By Mobile No.----------------------------------------------------
const getUserByMobile = (req, res) => {
  const { reg_mobile } = req.params;

  if (!reg_mobile) {
    return res.status(400).json({ message: "Mobile number is required" });
  }

  const sql = "SELECT * FROM registration WHERE reg_mobile = ?";

  db.query(sql, [reg_mobile], (err, results) => {
    if (err) {
      console.error("Fetch error:", err);
      return res
        .status(500)
        .json({ message: "Database fetch error", error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(results[0]);
  });
};

// Update User Api------------------------------------------------------------
const updateUser = (req, res) => {
  const { reg_mobile } = req.params;
  const data = req.body;

  if (!reg_mobile) {
    return res.status(400).json({ message: "Mobile number is required" });
  }

  const updateSql = `
    UPDATE registration SET 
      reg_mem_name = ?, reg_email = ?, reg_address = ?, reg_city = ?, reg_state = ?, 
      reg_pin_code = ?, reg_nominee = ?, reg_sex = ?, reg_dob = ?, reg_bank = ?, 
      reg_account = ?, reg_ifsc = ?
    WHERE reg_mobile = ?
  `;

  const values = [
    data.reg_mem_name,
    data.reg_email,
    data.reg_address,
    data.reg_city,
    data.reg_state,
    data.reg_pin_code,
    data.reg_nominee,
    data.reg_sex,
    data.reg_dob,
    data.reg_bank,
    data.reg_account,
    data.reg_ifsc,
    reg_mobile,
  ];

  db.query(updateSql, values, (err, result) => {
    if (err) {
      console.error("Update error:", err);
      return res
        .status(500)
        .json({ message: "Database update error", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  });
};

// Delete User Api------------------------------------------------------------
const deleteUser = (req, res) => {
  const { reg_mobile } = req.params;

  if (!reg_mobile) {
    return res.status(400).json({ message: "Mobile number is required" });
  }

  const deleteSql = "DELETE FROM registration WHERE reg_mobile = ?";

  db.query(deleteSql, [reg_mobile], (err, result) => {
    if (err) {
      console.error("Delete error:", err);
      return res
        .status(500)
        .json({ message: "Database delete error", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  });
};

module.exports = {
  isSignIn,
  SignUp,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserByMobile,
};
