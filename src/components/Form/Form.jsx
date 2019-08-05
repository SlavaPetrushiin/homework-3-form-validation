import React, {Component} from 'react';
import bond from "./assets/bond_approve.jpg";
import InputBlock from "./InputBlock/InputBlock";
import "./Form.css"

class Form extends React.Component {

	state={
		forms:{
			firstname: {
				type: "text",
				value: "",
				label: "Имя",
				errorMessage: "",
				htmlFor: "firstname",
				name: "firstname"				
			},
			lastname: {
				type: "text",
				value: "",
				label: "Фамилия",
				errorMessage: "",
				htmlFor: "lastname",
				name: "lastname"				
			},
			password: {
				type: "password",
				value: "",
				label: "Пароль",
				errorMessage: "",
				htmlFor: "password",
				name: "password"				
			}	
		},
		user: {
			firstname: "James",
			lastname: "Bond",
			password: "007"
		},
		success: false		
	}

	onChangeHandler = (event, controlName) => {
		const cloneForm = {...this.state.forms}
		cloneForm[controlName].value = event.target.value;

		this.setState({
			cloneForm
		})		
	}

	successUser = resultComparison => {
		for (let i =0; i < resultComparison.length; i++){
			if (resultComparison[i] !== true){
				return false;
			}
		}
		return true;
	} 

	comparison = (paramName, cloneForm) => {
		console.log(paramName)
		if (cloneForm[paramName].value !== ""){
			if (cloneForm[paramName].value === this.state.user[paramName]){
				return true; // Правильный ответ
			} else {
				cloneForm[paramName].errorMessage =  `${cloneForm[paramName].label} указано не верно`;
				return false;
			}
		} else {
			cloneForm[paramName].errorMessage = (paramName === "lastname") ? "Нужно указать фамилию" : `Нужно указать ${cloneForm[paramName].label.toLowerCase()}`;
			return false;
		}
	}

	onSubmitHandler = event => {
		event.preventDefault();
		const cloneForm = {...this.state.forms};

		let resultComparison = [];
		for (let key in cloneForm){
			resultComparison.push(this.comparison(key, cloneForm))
		}
		
		let success = this.successUser(resultComparison); 
		
		if(success){
			this.setState({
				success: true
			})	
		} else {
			this.setState({
				cloneForm
			})	
		}

	}

	renderInputs = () => {
		const inputs = Object.keys(this.state.forms).map((controlName, index) => {
			const control = this.state.forms[controlName];
			return (
				<InputBlock 
					type={control.type}
					value={control.value}
					label={control.label}
					errorMessage={control.errorMessage}
					htmlFor={control.htmlFor}
					name={control.name}
					key ={controlName + index}
					onChange={event => this.onChangeHandler(event, controlName)}					
				/>
			)
		});
		return inputs
	}

	renderForm = () => {
		return (
			<form className="form" onSubmit={this.onSubmitHandler}>
				<h1>Введите свои данные, агент</h1>
				{this.renderInputs()}
				<div className="form__buttons">
					<input 
						type="submit"
						className="button t-submit"
						value="Submit"
					/>
				</div>
			</form>	
		)
	}

	render() {
		const success = this.state.success;
		console.log(success)
		return (
			<div className="app-container">

			{success
				? <img src={bond} alt="bond approve" className="t-bond-image" />
				: this.renderForm()	
			}
			</div>
		)		
	}
}
export default Form