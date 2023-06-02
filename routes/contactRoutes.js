const express = require("express");
const {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  getContact,
} = require("../controllers/contactController");
const validateTokenHandler = require("../middleware/validateTokenHandler");
const router = express.Router();
router.use(validateTokenHandler);

router.route("/").get(getContacts).post(createContact);

router.route("/:id").put(updateContact).delete(deleteContact).get(getContact);

module.exports = router;
