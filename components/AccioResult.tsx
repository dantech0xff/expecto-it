import React from "react";

interface AccioResultProps {
	text: string;
	className?: string;
}

const AccioResult: React.FC<AccioResultProps> = ({ text, className }) => {
	return (
		<div className={className}>
			<p>{text}</p>
		</div>
	);
};

export default AccioResult;
