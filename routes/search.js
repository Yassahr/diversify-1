const express = require("express");
const router = express.Router();
const searchController = require("../controllers/search");

// search request to the youtube api(must be before playlistview bc of id query)
console.log("it got this far")
router.get("/:query", searchController.searchAPI);

module.exports = router;
