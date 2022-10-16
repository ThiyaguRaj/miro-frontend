import {
	XCircleIcon,
	InformationCircleIcon,
	CheckCircleIcon,
	ExclamationCircleIcon,
	XIcon
} from "@heroicons/react/outline"
import React from "react"
import { ObButton } from ".."

function ObAlert({ children, error, success, warning, onHide, className }) {
	return (
		<div
			className={`alert ${
				error
					? "alert-danger"
					: success
					? "alert-success"
					: warning
					? "alert-warning"
					: "alert-info"
			} ${className}`}
		>
			<div className="mr-1">
				{error ? (
					<ExclamationCircleIcon className="h-5 w-5 text-current" />
				) : success ? (
					<CheckCircleIcon className="h-5 w-5 text-current" />
				) : warning ? (
					<ExclamationCircleIcon className="h-5 w-5 text-current" />
				) : (
					<InformationCircleIcon className="h-5 w-5 text-current" />
				)}
			</div>
			<div className="flex-1">
				<div className="alert-message mr-8">{children}</div>
			</div>

			{onHide && (
				<div className="btn-close">
					<span className="sr-only">Dismiss</span>
					<XIcon
						className="-mt-1 h-5 w-5 cursor-pointer text-current"
						onClick={onHide && onHide}
					/>
				</div>
			)}
		</div>
	)
}

export default ObAlert
