"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server = (0, express_1.default)();
function intersect(a, b) {
    var setA = new Set(a);
    var setB = new Set(b);
    var intersection = new Set([...setA].filter(x => setB.has(x)));
    return Array.from(intersection);
}
server.get("/check", (req, res) => {
    console.log(req.headers);
    console.log("remote:", req.socket.remoteAddress);
    let anonymity;
    if (intersect(Object.keys(req.headers).map(x => x.toLowerCase()), ["x-forwarded-for", "x-real-ip", "via", "x-forwarded-for", "x-proxy-id", "from", "proxy-connection", "proxy-authorization"]).length == 0) {
        anonymity = "elite";
    }
    else if (!JSON.stringify(req.headers).includes(req.socket.remoteAddress)) {
        anonymity = "anonymous";
    }
    else {
        anonymity = "transparent";
    }
    res.json({
        at: Date.now(),
        level: anonymity,
    });
});
server.listen(81);
