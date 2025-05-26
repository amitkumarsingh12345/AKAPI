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
    WHERE reg_mobile = ?
  `;

  db.query(checkSql, [data.reg_mobile], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Check error:", checkErr);
      return res.status(500).json({
        message: "Database check error",
        error: checkErr,
        success: false,
      });
    }

    if (checkResult.length > 0) {
      return res.status(409).json({
        message: "User already registered with this login or mobile number",
        success: false,
      });
    }

    // Set default values for optional fields
    const defaults = {
      reg_mem_name: "",
      reg_nominee: "",
      reg_sex: "Male",
      reg_address: "",
      reg_city: "",
      reg_state: "",
      reg_pin_code: "",
      reg_sponser_name: "",
      reg_adhar: "",
      reg_email: "",
      reg_dob: null,
      reg_acc_holder: "",
      reg_bank: "",
      reg_otherbank: "",
      reg_account: "",
      reg_ifsc: "",
      reg_branch: "",
      reg_paymode: "",
      reg_pan: "",
      reg_pan_date: null,
      reg_joindt: new Date().toISOString().split("T")[0],
      reg_date: Math.floor(Date.now() / 1000),
      reg_block_date: 0,
      reg_block_remark: "",
      reg_nominee_relation: "",
      reg_active: 1,
      reg_add_by: 1,
      reg_branch_id: 1,
      reg_payment_mode: 1,
      reg_detail: "New registration",
    };

    // Combine defaults with provided data
    const userData = { ...defaults, ...data };

    // Step 2: Insert new user
    const sql = `
        INSERT INTO registration SET ?
      `;

    db.query(sql, userData, (err, result) => {
      if (err) {
        console.error("Insert error:", err);
        return res.status(500).json({
          message: "Database insert error",
          error: err,
          success: false,
        });
      }

      res.status(201).json({
        message: "Registration successful",
        reg_id: result.insertId,
        success: true,
      });
    });
  });
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

  // Validate required fields
  if (!data.reg_mem_name) {
    return res.status(400).json({ message: "Member name is required" });
  }

  const updateSql = `
    UPDATE registration SET 
      reg_sponser_id = ?, 
      reg_mem_id = ?, 
      reg_pakge = ?, 
      reg_percentage = ?, 
      reg_login = ?, 
      reg_password = ?, 
      reg_mem_name = ?, 
      reg_nominee = ?, 
      reg_sex = ?, 
      reg_address = ?, 
      reg_city = ?, 
      reg_state = ?, 
      reg_pin_code = ?, 
      reg_sponser_name = ?, 
      reg_adhar = ?, 
      reg_email = ?, 
      reg_dob = ?, 
      reg_acc_holder = ?, 
      reg_bank = ?, 
      reg_otherbank = ?, 
      reg_account = ?, 
      reg_ifsc = ?, 
      reg_branch = ?, 
      reg_paymode = ?, 
      reg_pan = ?, 
      reg_pan_date = ?, 
      reg_joindt = ?, 
      reg_block_remark = ?, 
      reg_nominee_relation = ?, 
      reg_detail = ?
    WHERE reg_mobile = ?
  `;

  const values = [
    data.reg_sponser_id || null,
    data.reg_mem_id || null,
    data.reg_pakge || null,
    data.reg_percentage || null,
    data.reg_login || null,
    data.reg_password || null,
    data.reg_mem_name || null,
    data.reg_nominee || null,
    data.reg_sex || "Male",
    data.reg_address || null,
    data.reg_city || null,
    data.reg_state || null,
    data.reg_pin_code || null,
    data.reg_sponser_name || null,
    data.reg_adhar || null,
    data.reg_email || null,
    data.reg_dob || null,
    data.reg_acc_holder || null,
    data.reg_bank || null,
    data.reg_otherbank || null,
    data.reg_account || null,
    data.reg_ifsc || null,
    data.reg_branch || null,
    data.reg_paymode || null,
    data.reg_pan || null,
    data.reg_pan_date || null,
    data.reg_joindt || null,
    data.reg_block_remark || null,
    data.reg_nominee_relation || null,
    data.reg_detail || null,
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
