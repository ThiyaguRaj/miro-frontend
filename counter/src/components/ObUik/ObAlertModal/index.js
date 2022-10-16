import React from "react"
import { Fragment, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import {
	ExclamationIcon,
	ExclamationCircleIcon,
	CheckCircleIcon,
	InformationCircleIcon,
	XIcon
} from "@heroicons/react/outline"
import { ObButton } from ".."

export default function AlertModal({
	children,
	hideCloseIcon,
	clickOutsideToClose,
	className,
	show,
	onHide,
	success,
	warning,
	error,
	info
}) {
	const cancelButtonRef = useRef(null)

	return (
		<Transition.Root
			show={show !== null && show !== undefined ? show : true}
			as={Fragment}
		>
			<Dialog
				as="div"
				className="fixed inset-0 z-10 ml-2 mr-2 overflow-y-auto"
				initialFocus={cancelButtonRef}
				onClose={clickOutsideToClose ? onHide && onHide : () => {}}
			>
				<div className="flex items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div
							className={`relative inline-block transform overflow-hidden 
                      rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle ${
																							className ? className : "lg:w-1/2"
																						}`}
						>
							<div className="bg-white px-4 pt-5 pb-4 sm:flex sm:items-start sm:p-6 sm:pb-4">
								{warning | error | info | success ? (
									<div
										className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 ${
											error
												? "bg-red-100"
												: warning
												? " bg-yellow-700"
												: info
												? "bg-blue-100"
												: success && "bg-green-100"
										}`}
									>
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
													className="h-6 w-6 text-green-600"
													aria-hidden="true"
												/>
											)
										)}
									</div>
								) : null}
								<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
									{children}
								</div>
							</div>
							{!hideCloseIcon && (
								<div className="absolute" style={{ right: "6px", top: "9px" }}>
									<ObButton
										className="plain inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:ring-offset-2"
										onClick={onHide && onHide}
										ref={cancelButtonRef}
									>
										<XIcon className="mt-1 mr-2 h-6 w-6" aria-hidden="true" />
									</ObButton>
								</div>
							)}
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}
