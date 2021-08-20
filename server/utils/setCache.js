let setCache = (req, res, next) => {
	const period = 60 * 60 * 24 * 30;

	if (req.method == "GET") {
		res.set("Cache-control", `public, max-age=${period}`);
	} else {
		res.set("Cache-control", `no-store`);
	}
	next();
};

export default setCache;
