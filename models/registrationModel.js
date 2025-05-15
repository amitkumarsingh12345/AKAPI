const db = require("../config/db");

const createRegistrationTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS registration (
      reg_id INT(11) NOT NULL AUTO_INCREMENT,
      reg_sponser_id VARCHAR(255) NOT NULL,
      reg_mem_id VARCHAR(255) NOT NULL,
      reg_pakge VARCHAR(255) NOT NULL,
      reg_percentage VARCHAR(255) NOT NULL,
      reg_login VARCHAR(255) NOT NULL,
      reg_password VARCHAR(255) NOT NULL,
      reg_mem_name VARCHAR(255) NOT NULL,
      reg_nominee VARCHAR(255) NOT NULL,
      reg_sex VARCHAR(255) NOT NULL,
      reg_address VARCHAR(255) NOT NULL,
      reg_city VARCHAR(255) NOT NULL,
      reg_state VARCHAR(255) NOT NULL,
      reg_pin_code VARCHAR(255) NOT NULL,
      reg_sponser_name VARCHAR(255) NOT NULL,
      reg_adhar VARCHAR(255) NOT NULL,
      reg_mobile VARCHAR(255) NOT NULL,
      reg_email VARCHAR(255) NOT NULL,
      reg_dob VARCHAR(255) NOT NULL,
      reg_acc_holder VARCHAR(255) NOT NULL,
      reg_bank VARCHAR(255) NOT NULL,
      reg_otherbank VARCHAR(255) NOT NULL,
      reg_account VARCHAR(255) NOT NULL,
      reg_ifsc VARCHAR(255) NOT NULL,
      reg_branch VARCHAR(255) NOT NULL,
      reg_paymode VARCHAR(255) NOT NULL,
      reg_pan VARCHAR(255) NOT NULL,
      reg_pan_date INT(11) NOT NULL,
      reg_joindt VARCHAR(255) NOT NULL,
      reg_date INT(11) NOT NULL,
      reg_block_date INT(11) NOT NULL,
      reg_block_remark VARCHAR(255) NOT NULL,
      reg_nominee_relation VARCHAR(255) NOT NULL,
      reg_active INT(11) NOT NULL,
      reg_add_by INT(11) NOT NULL,
      reg_branch_id INT(11) NOT NULL,
      reg_payment_mode INT(11) NOT NULL,
      reg_detail VARCHAR(255) NOT NULL,
      PRIMARY KEY (reg_id)
    ) ENGINE=MyISAM;
  `;

  db.query(sql, (err) => {
    if (err) throw err;
    console.log("Registration table created or already exists.");
  });
};

module.exports = createRegistrationTable;
