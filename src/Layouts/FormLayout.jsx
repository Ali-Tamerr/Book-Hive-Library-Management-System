import React from 'react';
import Popup from '../components/Popup.jsx';
import FormInput from '../components/FormInput.jsx';
import FormSelect from '../components/FormSelect.jsx';
import FormButton from '../components/FormButton.jsx';

const FormLayout = ({
  show,
  onClose,
  title,
  onSubmit,
  inputs,
  formData,
  onFormChange,
  submitButtonText = 'Submit',
  cancelButtonText = 'Cancel',
  onCancel,
  children,
}) => {
  return (
    <Popup show={show} onClose={onClose} title={title}>
      <form onSubmit={onSubmit} className={inputs.length > 6 ? "grid grid-cols-2 gap-4" : "space-y-3"}>
        {inputs.map((input) => {
          const { name, type } = input;
          if (type === 'custom') {
            return <div key={name}>{input.render(formData, onFormChange)}</div>;
          }
          if (type === 'select') {
            return (
              <FormSelect
                key={name}
                {...input}
                value={formData[name]}
                onChange={onFormChange}
              />
            );
          }
          return (
            <FormInput
              key={name}
              {...input}
              value={formData[name]}
              onChange={onFormChange}
            />
          );
        })}
        {children}
        <div className={`flex justify-between mt-5 ${inputs.length > 6 ? 'col-span-2' : ''}`}>
          <FormButton type="submit" isPrimary>
            {submitButtonText}
          </FormButton>
          <FormButton onClick={onCancel}>
            {cancelButtonText}
          </FormButton>
        </div>
      </form>
    </Popup>
  );
};

export default FormLayout;
