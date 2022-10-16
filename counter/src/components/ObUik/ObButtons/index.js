import React from "react"

const ObButton = ({ className, children, type, onClick, ...props }) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`btn-base ${className}`}
			{...props}
		>
			{children}
		</button>
	)
}

export default ObButton
