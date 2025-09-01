import './InputComponent.css';

function InputComponent({
                            inputType,
                            inputName,
                            inputId,
                            validationRequired = false,
                            validationMessage,
                            additionalValidation,
                            placeholder,
                            className,
                            register,
                            errors,
                            children
                        }) {
    return (
        <>
            <label htmlFor={inputId} className={className}>
                {children}{validationRequired ? "*" : ""}
                <input
                    type={inputType}
                    id={inputId}
                    placeholder={placeholder}
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