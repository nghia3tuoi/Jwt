const redis = require("redis");
const client = redis.createClient({
	url: "redis://default:zBcDUmCmQLKJOkvv0SDAF8BrG4iDF7Gx@redis-14630.c295.ap-southeast-1-1.ec2.cloud.redislabs.com:14630",
});
(async () => {
	await client.connect();
})();
client.on("connect", () => {
	console.log("connected redis successfully!");
});
client.on("error", (err) => console.log("Redis Client Error", err));

module.exports = client;
