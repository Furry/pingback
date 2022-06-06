import express from "express";
const server = express();

function intersect<T>(a: T[], b: T[]): T[] {
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
    } else if (!JSON.stringify(req.headers).includes(req.socket.remoteAddress as string)) {
        anonymity = "anonymous";
    } else {
        anonymity = "transparent";
    }

    res.json({
        at: Date.now(),
        level: anonymity,
    })
})

server.listen(80);