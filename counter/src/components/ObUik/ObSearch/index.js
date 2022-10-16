import React from "react"
import { Search } from "react-feather"
import { XCircleIcon } from "@heroicons/react/solid"
import { isNullOrUndefined } from "util"
import { ObButton } from ".."
import { FormattedMessage } from "react-intl"

export default function ObSearch({
	className,
	inputValues,
	setInputValues,
	dropDown1,
	dropDown2,
	onSearch,
	customPlaceholder
}) {
	return !isNullOrUndefined(inputValues) ? (
		<div
			className={`inputFocus flex w-full items-center justify-between bg-white px-3 ${
				className && className
			}`}
		>
			<Search className="w-5 text-gray-600 sm:w-4" />
			<FormattedMessage
				id={customPlaceholder ? "_SearchBy_" : "_Search_"}
				values={
					customPlaceholder && { value: inputValues.dropDown1.formattedLableName }
				}
			>
				{(optionalPlaceholder) => (
					<input
						type="text"
						placeholder={optionalPlaceholder}
						className="search-placeholder w-full rounded border-0 p-0 px-2"
						value={inputValues.searchString}
						onChange={(e) => {
							setInputValues({
								...inputValues,
								searchString: e.target.value
							})
							onSearch && onSearch()
						}}
						autoFocus
					/>
				)}
			</FormattedMessage>
			{inputValues.searchString && (
				<ObButton
					className="plain mr-1 border-0 p-0"
					onClick={() => setInputValues({ ...inputValues, searchString: "" })}
				>
					<XCircleIcon className="w-5 cursor-pointer text-red-700" />
				</ObButton>
			)}
			{dropDown1 && (
				<select
					className="border-0 focus:ring-0"
					onChange={(e) => {
						const value = JSON.parse(e.target.value)
						setInputValues({
							...inputValues,
							dropDown1: {
								value: value.value,
								formattedLableName: value.formattedLableName
							}
						})
					}}
				>
					{dropDown1.length &&
						dropDown1.length > 0 &&
						dropDown1.map((value) => (
							<option value={JSON.stringify(value)}>
								<FormattedMessage id={value.formattedLableName} />
							</option>
						))}
				</select>
			)}
			{dropDown2 && (
				<select
					className="border-0 focus:ring-0"
					onChange={(e) => {
						const value = JSON.parse(e.target.value)
						setInputValues({
							...inputValues,
							dropDown2: {
								value: value.value,
								formattedLableName: value.formattedLableName
							}
						})
					}}
				>
					{dropDown2.length &&
						dropDown2.length > 0 &&
						dropDown2.map((value) => (
							<option value={JSON.stringify(value)}>
								<FormattedMessage id={value.formattedLableName} />
							</option>
						))}
				</select>
			)}
		</div>
	) : null
}
