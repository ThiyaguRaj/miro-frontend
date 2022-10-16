import React from "react"
import { Fragment, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { ObButton } from "../index"
import { XIcon } from "@heroicons/react/solid"
import FormattedMessage from "../../Obutil/FormattedMessage"
let closeModal

export const hideModal = () => {
	closeModal && closeModal()
}
const Modal = () => {
	function Header({ children, headerClassName }) {
		return (
			<div className={`border-b px-6 py-4  ${headerClassName}`}>{children}</div>
		)
	}

	function Title({ children, titleClassName }) {
		return (
			<Dialog.Title
				as="h3"
				className={`text-lg font-medium leading-6 text-gray-900 ${titleClassName}`}
			>
				{children}
			</Dialog.Title>
		)
	}

	function Body({ children, bodyClassName, customBodyStyle }) {
		return (
			<div
				className={`p-8  ${bodyClassName}`}
				style={{ maxHeight: "66vh", overflowY: "auto", ...customBodyStyle }}
			>
				{children}
			</div>
		)
	}

	function Footer({
		children,
		FooterClassName,
		enableCloseBtn,
		closeBtnStyle,
		closeBtnName,
		onClose,
		disabled
	}) {
		return (
			<div
				className={`${
					FooterClassName ? FooterClassName : "border-t p-4 text-right"
				}`}
			>
				{enableCloseBtn && (
					<ObButton
						type="button"
						className={`mr-2 ${closeBtnStyle ? closeBtnStyle : "secondary-outline"}`}
						onClick={(e) => {
							closeModal && closeModal()
							onClose && onClose(e)
						}}
						disabled={disabled}
					>
						{closeBtnName ? (
							closeBtnName
						) : (
							<FormattedMessage parentProp="_Common_" childProp="_Close_" />
						)}
					</ObButton>
				)}
				{children}
			</div>
		)
	}

	function OBDialog({
		children,
		closeModalIcon,
		preventBackgroundClick,
		dialogBtn,
		dialogBtnStyle,
		className,
		onShow,
		disableDialogBtn,
		onClose
	}) {
		const [show, setShow] = useState(false)
		const cancelButtonRef = useRef(null)
		const hideModal = (closeModal = () => setShow(false))

		return (
			<>
				{!disableDialogBtn && (
					<ObButton
						type="button"
						className={`${dialogBtnStyle ? dialogBtnStyle : "primary animation"}`}
						onClick={(e) => {
							setShow(true)
							onShow && onShow(e)
						}}
					>
						{dialogBtn ? dialogBtn : "Open"}
					</ObButton>
				)}
				<Transition.Root show={!disableDialogBtn ? show : true} as={Fragment}>
					<Dialog
						as="div"
						auto-reopen="false"
						className="fixed inset-0 z-50 mx-10 ml-2 mr-2 overflow-y-auto"
						initialFocus={cancelButtonRef}
						onClose={(e) => {
							!preventBackgroundClick
								? !disableDialogBtn
									? hideModal()
									: onClose && onClose(e)
								: () => {}
						}}
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
                      				rounded-lg bg-white text-left align-bottom shadow-xl 
									transition-all sm:my-8 sm:align-middle ${className ? className : "lg:w-1/2"}`}
								>
									{closeModalIcon && (
										<div className="absolute" style={{ right: "12px", top: "15px" }}>
											<ObButton
												className="plain p-0 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-0 focus:ring-offset-0"
												onClick={(e) => {
													!disableDialogBtn ? hideModal() : onClose && onClose(e)
												}}
											>
												<XIcon className="mt-1 mr-2 h-5 w-5" aria-hidden="true" />
											</ObButton>
										</div>
									)}
									<div>{children}</div>
								</div>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition.Root>
			</>
		)
	}

	return Object.freeze({
		OBDialog,
		Header,
		Footer,
		Body,
		Title
	})
}

const ObModal = Modal()
export default ObModal
