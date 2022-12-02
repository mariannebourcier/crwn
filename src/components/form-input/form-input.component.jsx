const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      {label && (
        <label className=
          {`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
          {label}
        </label>

      )}
      <input className="form-input"
        {...otherProps}
      />
    </div>
  )
}


//shrink text using ~ to apply the effect on div sibling text
export default FormInput;