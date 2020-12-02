const os = require("os");

const interfaces = os.networkInterfaces();
let addresses = [];

const ipAddr = () => {
    for (let interface of Object.keys(interfaces)) {
        for (let network of interfaces[interface]) {
            if (network.family === "IPv4" && !network.internal) {
                addresses.push(network.address);
            }
        }
    }
    return addresses[addresses.length - 1];
};

module.exports = ipAddr;
