import './InputComponent.css';

function InputComponent({
                            inputType,
                            inputName,
                            inputId,
                            validationRequired = false,
                            validationMessage,
                            additionalValidation,
                            register,
                            errors,
                            children
                        }) {
    return (
        <>
            <label htmlFor={inputId}>
                {children}{validationRequired ? "*" : ""}
                <input
                    type={inputType}
                    id={inputId}
                    {...register(
                        inputName,
                        {
                            required: validationRequired ? validationMessage : false, ...additionalValidation
                        })}
                />
            </label>
            {errors[inputName] && <p>{errors[inputName].message}</p>}
        </>
    );
}

export default InputComponent;