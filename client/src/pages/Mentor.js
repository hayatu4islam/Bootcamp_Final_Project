import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Mentor.css";
import Dropdown from "react-bootstrap/Dropdown";

function Mentor() {
	const navigate = useNavigate();
	function handleSkill() {
		navigate("/skills");
	}
	function handleUser() {
		navigate("/user-profile");
	}
	const [studentData, setStudentData] = useState([]);
	useEffect(() => {
		axios
			.get("/api/students")
			.then((res) => {
				if (res.status === 200) {
					return res.data;
				} else {
					throw new Error("Something went wrong");
				}
			})
			.then((data) => setStudentData(data))
			.catch((error) => {
				console.log({ error: error.message });
			});
	}, []);

	return (
		<div className="table_container">
			<div className="button_container">
				<div>
					<Dropdown>
						<Dropdown.Toggle variant="primary" id="dropdown-basic">
							Class-Code
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item href="#/action-1">LDN5</Dropdown.Item>
							<Dropdown.Item href="#/action-2">NW3</Dropdown.Item>
							<Dropdown.Item href="#/action-3">WM5</Dropdown.Item>
							<Dropdown.Item href="#/action-4">ND3</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
				<Button variant="info" className="button_enabled" onClick={handleSkill}>
					View Learning Objectives
				</Button>
			</div>
			<div className="contain">
				<h2>STUDENTS LIST</h2>
				<Table bordered hover size="sm" responsive="md" striped="columns">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							{/* <th>CLASS-CODE</th> */}
							<th>REGION</th>
							<th> TOTAL SCORES</th>
							<th>Student Profile</th>
						</tr>
					</thead>
					<tbody>
						{studentData.map(
							({ id, name, total_score, region_name }) => (
								<tr key={id}>
									<td>{id}</td>
									<td>{name}</td>
									{/* <td>{class_code}</td> */}
									<td>{region_name}</td>
									<td>{total_score}</td>
									<td style={{ margin: "auto", textAlign: "center" }}>
										<button onClick={handleUser}>View</button>
									</td>
								</tr>
							)
						)}
					</tbody>
				</Table>
			</div>
		</div>
	);
}
export default Mentor;
