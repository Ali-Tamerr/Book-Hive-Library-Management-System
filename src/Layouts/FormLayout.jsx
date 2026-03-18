import React from "react";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import Popup from "../components/Popup.jsx";
import FormInput from "../components/FormInput.jsx";
import FormSelect from "../components/FormSelect.jsx";
import FormButton from "../components/FormButton.jsx";

const FormLayout = ({
  show,
  onClose,
  title,
  onSubmit,
  inputs,
  formData,
  onFormChange,
  submitButtonText = "SUBMIT",
  cancelButtonText = "CANCEL",
  onCancel,
  submitButtonClassName,
  cancelButtonClassName,
  children,
  icon,
  customLayout,
  error,
  isLoading = false,
}) => {
  const renderInput = (input) => {
    const { name, type } = input;
    if (type === "custom") {
      return <div key={name}>{input.render(formData, onFormChange)}</div>;
    }
    if (type === "select") {
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
  };

  const renderFormContent = () => {
    if (customLayout) {
      return (
        <div className="space-y-4">
          {customLayout.map((row, rowIndex) => {
            if (row.type === "flex") {
              return (
                <div
                  key={rowIndex}
                  className={`flex gap-4 ${row.justify === "center" ? "justify-center" : ""}`}
                >
                  {row.inputs.map((inputConfig) => {
                    const inputName =
                      typeof inputConfig === "string"
                        ? inputConfig
                        : inputConfig.name;
                    const flexValue =
                      typeof inputConfig === "object" ? inputConfig.flex : 1;
                    const wrapperClassName =
                      typeof inputConfig === "object"
                        ? inputConfig.className || ""
                        : "";
                    const input = inputs.find((inp) => inp.name === inputName);
                    return input ? (
                      <div
                        key={inputName}
                        className={wrapperClassName}
                        style={
                          flexValue !== undefined
                            ? { flex: flexValue }
                            : undefined
                        }
                      >
                        {renderInput(input)}
                      </div>
                    ) : null;
                  })}
                </div>
              );
            }

            return (
              <div
                key={rowIndex}
                className={`grid gap-4`}
                style={{ gridTemplateColumns: `repeat(${row.columns}, 1fr)` }}
              >
                {row.inputs.map((inputName) => {
                  const input = inputs.find((inp) => inp.name === inputName);
                  return input ? renderInput(input) : null;
                })}
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div
        className={inputs.length > 6 ? "grid grid-cols-2 gap-4" : "space-y-3"}
      >
        {inputs.map((input) => renderInput(input))}
      </div>
    );
  };

  return (
    <Popup show={show} onClose={onClose} title={title} icon={icon}>
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-xl bg-white/50 backdrop-blur-sm dark:bg-[#131418]/50">
          <LoadingSpinner size="md" />
        </div>
      )}
      <form onSubmit={onSubmit} className="flex flex-col gap-14">
        <div className="px-10">
          {renderFormContent()}
          {children}
        </div>
        {error && (
          <div className="px-10 text-center text-sm font-medium text-red-500">
            {error}
          </div>
        )}
        <div
          className={`flex justify-between gap-3 ${inputs.length > 6 && !customLayout ? "col-span-2" : ""}`}
        >
          <FormButton
            onClick={onCancel}
            className={cancelButtonClassName}
            disabled={isLoading}
          >
            {cancelButtonText}
          </FormButton>
          <FormButton
            type="submit"
            isPrimary
            className={submitButtonClassName}
            disabled={isLoading}
          >
            {submitButtonText}
          </FormButton>
        </div>
      </form>
    </Popup>
  );
};

export default FormLayout;
