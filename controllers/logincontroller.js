const usermodeldata = require("../models/user");
const sequelize = require("../postgresdb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usermodeldata.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
};

module.exports = {
  LoginUser,
};
