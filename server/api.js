import { Router } from "express";

import logger from "./utils/logger";
//Thid data created by Irina for test
const data = [
	{
		id: 1,
		name: "John",
		score: 5,
	},
	{
		id: 2,
		name: "Mark",
		score: 1,
	},
	{
		id: 3,
		name: "Lisa",
		score: 2,
	},
	{
		id: 4,
		name: "Chris",
		score: 3,
	},
	{
		id: 5,
		name: "Anthony",
		score: 4,
	},
];
const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });

});
router.get("/students", (_, res) => {
	let students = data;
	res.send(students);
});

export default router;
