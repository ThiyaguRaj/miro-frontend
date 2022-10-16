import { Fragment, useEffect } from "react"
import { Transition } from "@headlessui/react"
import {
	ExclamationIcon,
	ExclamationCircleIcon,
	CheckCircleIcon,
	InformationCircleIcon,
	XIcon
} from "@heroicons/react/outline"

export default function Notification({
	className,
	removeCloseBtn,
	autoClose,
	closeAfter,
	children,
	left,
	bottom,
	center,
	onHide,
	show,
	success,
	error,
	warning,
	info,
	setShow
}) {
	useEffect(() => {
		if (autoClose && setShow) {
			setTimeout(
				() => {
					setShow(false)
				},
				closeAfter !== null && closeAfter !== undefined ? closeAfter : 5000
			)
		}
	}, [autoClose, closeAfter, setShow])

	return (
		<>
			<div
				aria-live="assertive"
				className={`pointer-events-none fixed inset-0 z-50 mt-8 mb-2 flex px-4 py-6 sm:p-6 ${
					bottom ? "sm:items-end" : "sm:items-start "
				}`}
			>
				<div
					className={`flex w-3/4 flex-col items-center space-y-4 ${
						left ? "mx-auto sm:mr-auto" : center ? "mx-auto" : "mx-auto sm:ml-auto"
					}`}
				>
					<Transition
						show={show !== null && show !== undefined ? show : true}
						as={Fragment}
						enter="transform ease-out duration-300 transition"
						enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
						enterTo="translate-y-0 opacity-100 sm:translate-x-0"
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div
							id="alertElement"
							className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 sm:absolute ${
								bottom && left
									? "max-w-max sm:left-6 sm:bottom-3 sm:max-w-xs"
									: bottom && !left && !center
									? "max-w-max sm:right-6 sm:bottom-3 sm:max-w-xs"
									: !bottom && left
									? "left-6 top-0"
									: !bottom && !left && !center
									? "right-6 top-0"
									: center && !bottom
									? "top-0"
									: bottom && center && "bottom-3"
							} ${className}`}
						>
							<div className="relative flex justify-between gap-x-3 p-4">
								<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
									<div className="flex items-start">
										{warning | error | info | success ? (
											<div className="flex-shrink-0">
												{warning ? (
													<ExclamationIcon
														className="h-6 w-6 text-yellow-400"
														aria-hidden="true"
													/>
												) : error ? (
													<ExclamationCircleIcon
														className="h-6 w-6 text-red-600"
														aria-hidden="true"
													/>
												) : info ? (
													<InformationCircleIcon
														className="h-6 w-6 text-blue-400"
														aria-hidden="true"
													/>
												) : (
													success && (
														<CheckCircleIcon
															className="h-6 w-6 text-green-400"
															aria-hidden="true"
														/>
													)
												)}
											</div>
										) : null}
										<div className="ml-3 mt-0.5">{children}</div>
									</div>
								</div>
								{((!removeCloseBtn && onHide) ||
									(removeCloseBtn && !autoClose && onHide)) && (
									<button
										className="inline-flex cursor-pointer rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
										onClick={onHide}
									>
										<XIcon
											className="mt-1 ml-4 h-4 w-4 rounded-3xl border border-white bg-gray-200 text-black hover:text-red-600"
											aria-hidden="true"
										/>
									</button>
								)}
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</>
	)
}
