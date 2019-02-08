import React from 'react'; 

const Input = ({ name, label, error, ...rest }) => { // from props
    return (
        <div className="form-group">
            <label htmlFor="{name}">{label}</label>
            <input 
                // autoFocus ref={this.email} 
                {...rest}
                name={name} 
                id={name}
                className="form-control" />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
      );
}
 
export default Input;