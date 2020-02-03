import React from "react";

const Input = ({ name, label, value, onChange, autoFocus, error, type }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                value={value}
                name={name}
                type={type}
                onChange={onChange}
                autoFocus={autoFocus === "true"}
                id={name}
                className="form-control"
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Input;
