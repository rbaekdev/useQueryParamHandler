import { useState } from "react";
import useQueryParamHandler from "./hooks/useQueryParamsHandler";

function App() {
	const [overviewRoute, setOverviewRoute] = useState("");
	const [version, setVersion] = useState("");
	const [optionalValue, setOptionalValue] = useState("");

	const config = [
		{
			key: "topic",
			valueAction: [
				["tv", setOverviewRoute],
				["remote", setOverviewRoute],
			],
		},
		{
			key: "version",
			valueAction: [["any", setVersion]],
		},
		{
			key: "optional",
			valueAction: [["any", setOptionalValue]],
		},
	];

	const [getQueryParamValue, setQueryParam, deleteQueryParam] = useQueryParamHandler(config);

	const handleTopicChange = () => {
		const currentTopic = getQueryParamValue("topic");
		setQueryParam("topic", currentTopic === "tv" ? "remote" : "tv");
	};

	const handleVersionChange = () => {
		const currentVersion = getQueryParamValue("version") || "1";
		setQueryParam("version", (parseInt(currentVersion) + 1).toString());
	};

	const toggleOptionalParam = () => {
		const currentOptional = getQueryParamValue("optional");
		if (currentOptional) {
			deleteQueryParam("optional");
		} else {
			setQueryParam("optional", "optionalValue");
		}
	};

	return (
		<div>
			<button onClick={handleTopicChange}>Change Topic</button>
			<button onClick={handleVersionChange}>Increment Version</button>
			<button onClick={toggleOptionalParam}>Toggle Optional Parameter</button>
			<p>Current Topic: {overviewRoute}</p>
			<p>Current Version: {version}</p>
			<p>Current Optional Parameter: {optionalValue}</p>
		</div>
	);
}

export default App;
