"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _localAuth = _interopRequireDefault(require("./localAuth"));
var _api = _interopRequireDefault(require("./api"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();
router.use('/auth', _localAuth.default);
router.use('/api', _api.default);
// fallback 404
router.use('/api', (req, res) => res.status(404).json('No route for this path'));
var _default = router;
/*
routes:

POST /auth/login
POST /auth/register
GET /auth/logout

GET api/users/me
GET /api/users/feature

*/
exports.default = _default;
//# sourceMappingURL=index.js.map