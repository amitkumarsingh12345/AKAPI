const db = require("../config/db");

const createRegistrationTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS registration (
      reg_id INT(11) AUTO_INCREMENT,
      reg_sponser_id VARCHAR(255),
      reg_mem_id VARCHAR(255),
      reg_pakge VARCHAR(255),
      reg_percentage VARCHAR(255),
      reg_login VARCHAR(255),
      reg_password VARCHAR(255),
      reg_mem_name VARCHAR(255),
      reg_nominee VARCHAR(255),
      reg_sex VARCHAR(255),
      reg_address VARCHAR(255),
      reg_city VARCHAR(255),
      reg_state VARCHAR(255),
      reg_pin_code VARCHAR(255),
      reg_sponser_name VARCHAR(255),
      reg_adhar VARCHAR(255),
      reg_mobile VARCHAR(255),
      reg_email VARCHAR(255),
      reg_dob VARCHAR(255),
      reg_acc_holder VARCHAR(255),
      reg_bank VARCHAR(255),
      reg_otherbank VARCHAR(255),
      reg_account VARCHAR(255),
      reg_ifsc VARCHAR(255),
      reg_branch VARCHAR(255),
      reg_paymode VARCHAR(255),
      reg_pan VARCHAR(255),
      reg_pan_date INT(11),
      reg_joindt VARCHAR(255),
      reg_date INT(11),
      reg_block_date INT(11),
      reg_block_remark VARCHAR(255),
      reg_nominee_relation VARCHAR(255),
      reg_active INT(11),
      reg_add_by INT(11),
      reg_branch_id INT(11),
      reg_payment_mode INT(11),
      reg_detail VARCHAR(255),
      PRIMARY KEY (reg_id)
    ) ENGINE=MyISAM;
  `;

  db.query(sql, (err) => {
    if (err) throw err;
    console.log("Registration table created or already exists.");
  });
};

module.exports = createRegistrationTable;
