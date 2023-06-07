import { useState, useEffect } from "react";

function useQueryParamHandler(config) {
	const [params, setParams] = useState(new URLSearchParams(window.location.search));

	const updateURL = () => {
		const newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + params.toString();
		window.history.pushState({ path: newURL }, "", newURL);
	};

	const getQueryParamValue = (key) => {
		return params.get(key);
	};

	const setQueryParam = (key, value) => {
		params.set(key, value);
		setParams(new URLSearchParams(params.toString()));
	};

	const deleteQueryParam = (key) => {
		params.delete(key);
		setParams(new URLSearchParams(params.toString()));
	};

	const applyConfig = (config) => {
		for (const item of config) {
			const { key, valueAction } = item;
			const paramValue = getQueryParamValue(key);

			for (const action of valueAction) {
				const [expectedValue, stateSetter] = action;
				if (expectedValue === "any" || expectedValue === paramValue) {
					stateSetter(paramValue);
				}
			}
		}
	};

	useEffect(() => {
		const handlePopState = () => {
			setParams(new URLSearchParams(window.location.search));
		};

		window.addEventListener("popstate", handlePopState);

		applyConfig(config);

		return () => {
			window.removeEventListener("popstate", handlePopState);
		};
	}, [window.location.search]);

	useEffect(() => {
		updateURL();
	}, [params]);

	return [getQueryParamValue, setQueryParam, deleteQueryParam];
}

export default useQueryParamHandler;
