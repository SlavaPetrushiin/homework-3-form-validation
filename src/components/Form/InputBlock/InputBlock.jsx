import React, {Component} from 'react';


const InputBlock = props => {
	const inputType = props.type || "text";
	const inputName = props.name;
	const htmlFor = props.htmlFor;
	const idInput = `${inputType}-${props.name}`;

	return (
		<div className="field">
			<label className="field__label" htmlFor={htmlFor}>
				<span className="field-labe">{props.label}</span>
			</label>
			<input
				className={`field__input field-input t-input-${props.name}`}
				type={inputType}
				id={idInput}
				value={props.value}
				name={inputName}
				onChange={props.onChange}
			/>
			{
				(props.errorMessage === "")
					? <span className={`field__error field-error t-error-${props.name}`}></span>
					: <span className={`field__error field-error t-error-${props.name}`}>{props.errorMessage}</span>
			}
			
		</div>
	)
}

export default InputBlock