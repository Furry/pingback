import express from "express";
const server = express();

function intersect<T>(a: T[], b: T[]): T[] {
    var setA = new Set(a);
    var setB = new Set(b);
    var intersection = new Set([...setA].filter(x => setB.has(x)));
    return Array.from(intersection);
}

server.get("/check", (req, res) => {
    const ip = req.headers["x-forwarded-for"] || (req.connection.remoteAddress || req.socket.remoteAddress);
    let anonymity;
    if (intersect(Object.keys(req.headers).map(x => x.toLowerCase()), ["x-forwarded-for", "x-real-ip", "via", "x-forwarded-for", "x-proxy-id", "from", "proxy-connection", "proxy-authorization"]).length == 0) {
        anonymity = "elite";
    } else if (!JSON.stringify(req.headers).includes(ip as string)) {
        anonymity = "anonymous";
    } else {
        anonymity = "transparent";
    }

    res.json({
        at: Date.now(),
        level: anonymity,
    })
})

server.listen(80, () => {
    console.log("Listening on port 80");
});