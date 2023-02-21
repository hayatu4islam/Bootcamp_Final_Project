import React, { useState, useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import Skills from "./Skills";
import axios from "axios";
import UserScores from "./UserScores";

function Student({ userId }) {
	const [skills, setSkills] = useState([]);
	const [selectedScore, setSelectedScore] = useState({});

	const handleSelectScore = (objectiveId, score) => {
		setSelectedScore({ ...selectedScore, [objectiveId]: score });
	};
	console.log(selectedScore);
	useEffect(() => {
		axios
			.get("/api/checklist")
			.then((res) => {
				if (res.status === 200) {
					return res.data;
				} else {
					throw new Error("Something went wrong");
				}
			})
			.then((data) => {
				setSkills(data);
				console.log(skills);
			})
			.catch((error) => {
				console.error({ error: error.message });
			});
	}, []);
	//Save the selected scores for user id
	const saveSelectedScores = async () => {
		try {
			await axios
				.post("/api/scores", {
					userID: userId,
					selectedScores: selectedScore,
				})
				.then((res) => {
					if (res.status === 200) {
						return res.data;
					}
					throw new Error("Failed to save the score");
				})
				.then((data) => {
					alert(data.message);
					setSelectedScore({});
				});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Container style={{ marginTop: "50px", marginBottom: "200px" }}>
			<Row style={{ color: "#DC143C" }}>
				<Row as="h1" style={{ justifyContent: "center" }}>
					CodeYourFuture
				</Row>
				<Row as="h2">Course Topics Checklist</Row>
				<Row as="h5">How to use this checklist</Row>
			</Row>
			<Row as="p">
				Select your level of confidence with the score buttons next to each
				statement. Choosing the lowest score of 1 indicates you do not
				understand the topic well, and the highest score of 5 means you are
				confident about the topic. Similarly, the scores between 2-4 indicate a
				different level of confidence that may need additional work.
			</Row>
			<Row>
				{skills.map((skill) => (
					<Row key={skill.skill_name}>
						<Skills
							skill={skill}
							selectedScore={selectedScore}
							handleSelectScore={handleSelectScore}
						/>
					</Row>
				))}
			</Row>
			<div className="d-flex justify-content-center">
				<Button
					variant="danger"
					style={{ marginTop: "50px" }}
					className="mx-auto"
					onClick={saveSelectedScores}
				>
					Save & Submit
				</Button>
			</div>
			<UserScores userId={userId} />
		</Container>
	);
}

export default Student;
