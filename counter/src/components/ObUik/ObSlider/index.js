import React from "react"
import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { ObButton } from "../index"
import { Plus } from "react-feather"
import {X} from "react-feather"
let closeModal

export const hideModal = () => {
	closeModal && closeModal()
}

const Slider = () => {
	function Header({ children, className, ...props }) {
		return (
			<div
				className={className ? className : "border-b bg-gray-50 px-4 py-3"}
				{...props}
			>
				{children}
			</div>
		)
	}

	function Title({ children, className, ...props }) {
		return (
			<Dialog.Title
				as="h3"
				className={`text-lg font-medium text-white ${className}`}
				{...props}
			>
				{children}
			</Dialog.Title>
		)
	}

	function Body({ children, className, ...props }) {
		return (
			<div
				className={`h-0 flex-1 overflow-y-auto p-2 ${className ? className : ""}`}
				{...props}
			>
				{children}
			</div>
		)
	}

	function Footer({
		children,
		className,
		enableCloseBtn,
		closeBtnStyle,
		closeBtnName,
		onClose,
		...props
	}) {
		return (
			<div
				className={` ${
					className ? className : "flex flex-shrink-0 justify-between border-t p-4"
				}`}
				{...props}
			>
				<div>{children}</div>
				{enableCloseBtn && (
					<ObButton
						className="secondary-outline"
						type="button"
						onClick={(e) => {
							closeModal && closeModal()
							onClose && onClose(e)
						}}
					>
						{typeof enableCloseBtn === "string" && enableCloseBtn.trim() !== ""
							? enableCloseBtn
							: "Cancel"}
					</ObButton>
				)}
			</div>
		)
	}
	function SliderDialog({
		children,
		preventBackgroundClick,
		closeBtnStyle,
		dialogBtn,
		dialogBtnStyle,
		className,
		onShow,
		onHide,
		sliderStyle,
		formStyle,
		hideCloseBtn,
		disableDialogBtn,
		onClose,
		show,
		...props
	}) {
		const [open, setOpen] = useState(false)
		const hideModal = (closeModal = () => {
			setOpen(false)
			onHide && onHide()
		})
		return (
			<div className="relative" data-testid="addNewAddressLayout">
				{!disableDialogBtn && (
					<ObButton
						className={` ${dialogBtnStyle ? dialogBtnStyle : "primary-outline"}`}
						onClick={() => {
							setOpen(true)
							onShow && onShow()
						}}
					>
						{!dialogBtn && <Plus size="15" className="mr-1" />}
						<span>{dialogBtn ? dialogBtn : "Add new address"}</span>
					</ObButton>
				)}
				<Transition.Root
					show={!disableDialogBtn ? open : show!== undefined && show !==null ? show : true}
					as={Fragment}
				>
					<Dialog
						as="div"
						static
						open={open}
						className="fixed inset-0 z-50 overflow-hidden"
						onClose={(e) => {
							!preventBackgroundClick
								? !disableDialogBtn
									? hideModal()
									: onClose && onClose(e)
								: () => {}
						}}
					>
						<div className="absolute inset-0 overflow-hidden">
							<Transition.Child
								as={Fragment}
								enter="ease-in-out duration-500"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in-out duration-500"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
							</Transition.Child>

							<div
								className={`fixed inset-y-0 right-0 flex max-w-full pl-16 ${
									sliderStyle && sliderStyle
								}`}
							>
								<Transition.Child
									as={Fragment}
									enter="transform transition ease-in-out duration-500 sm:duration-700"
									enterFrom="translate-x-full opacity-0"
									enterTo="translate-x-0 opacity-100"
									leave="transform transition ease-in-out duration-500 sm:duration-700"
									leaveFrom="translate-x-0 opacity-100"
									leaveTo="translate-x-full opacity-0"
								>
									{/* Use Max width property to adjust the width of the Slider. EX: max-w-xl */}
									<div
										className={`relative w-screen ${className ? className : "max-w-md"}`}
										{...props}
									>
										{!hideCloseBtn && (
											<ObButton
												type="button"
												className={`plain absolute rounded-full border-2 bg-gray-100 p-0.5 text-red-500 hover:bg-red-500 hover:text-white focus:ring-0 ${
													closeBtnStyle ? closeBtnStyle : ""
												}`}
												style={{ left: "-40px", top: "22px" }}
												onClick={(e) => {
													!disableDialogBtn ? hideModal() : onclose && onclose(e)
												}}
											>
												<X className="h-6 w-6" aria-hidden="true" />
											</ObButton>
										)}
										<form
											className={`flex h-full flex-col bg-white shadow-xl ${
												formStyle && formStyle
											}`}
										>
											{children}
										</form>
									</div>
								</Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition.Root>
			</div>
		)
	}
	return Object.freeze({
		SliderDialog,
		Header,
		Footer,
		Body,
		Title
	})
}

const ObSlider = Slider()
export default ObSlider
