"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var business_logic_1 = require("../controller/business-logic");
router.post('/admin/add-grocery', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, business_logic_1.addGrocery)(req.body.name, req.body.price, req.body.description, req.body.inventory)];
            case 1:
                data = _a.sent();
                res.send("groceries added to inventory successfully");
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500).send("something went wrong");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/admin/get-groceries-items', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            (0, business_logic_1.getGroceries)().then(function (result) {
                res.status(200).send(result);
            });
        }
        catch (err) {
            res.status(500).send("something went wrong");
        }
        return [2 /*return*/];
    });
}); });
router.delete('/admin/delete-items', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        (0, business_logic_1.deleteItemsFromGrocery)().then(function (result) {
            res.status(200).send("items deleted successfully");
        }).catch(function (err) {
            res.status(500).send("something went wrong");
        });
        return [2 /*return*/];
    });
}); });
router.put('/admin/update-inventory', function (req, res) {
    var id = req.query.id;
    var price = req.query.price;
    (0, business_logic_1.updatePriceOfInventory)(id, price).then(function (result) {
        res.status(200).send("price updated");
    }).catch(function (err) {
        res.status(500).send(err);
    });
});
router.put('/admin/grocery/items/:id/inventory', function (req, res) {
    var id = req.params.id;
    var inventory = req.body.inventory;
    (0, business_logic_1.manageInventory)(id, inventory).then(function (result) {
        res.status(200).send("inventory updated");
    }).catch(function (err) {
        res.status(500).send(err);
    });
});
exports.default = router;
//# sourceMappingURL=endPoints.js.map