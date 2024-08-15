import { JollySelect, SelectItem } from "@/components";
import { Controller, FieldPath, FieldValues } from "react-hook-form";
import { SelectProps } from "./types";

const Select = <
  TFieldValue extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValue> = FieldPath<TFieldValue>
>({
  control,
  name,
  options,
  className,
  //   clearable,
  defaultValue,
  description,
  disabled,
  label,
  //   leadingContent,
  onChange,
  placeholder,
  //   readOnly,
  shouldUnregister,
}: //   trailingContent,
SelectProps<TFieldValue, Name>) => {
  return (
    <Controller
      name={name}
      control={control}
      shouldUnregister={shouldUnregister}
      defaultValue={defaultValue}
      rules={{
        onChange: (e) => {
          onChange?.(e?.target?.value);
        },
      }}
      render={({
        field: { name, onChange, value },
        fieldState: { invalid, error },
      }) => {
        return (
          <JollySelect
            label={
              label
                ? typeof label === "string"
                  ? label
                  : label.text
                : undefined
            }
            errorMessage={error?.message}
            placeholder={placeholder}
            isDisabled={disabled}
            isInvalid={invalid}
            selectedKey={value}
            onSelectionChange={(key) => {
              onChange(key);
            }}
            name={name}
            items={options}
            description={
              description
                ? typeof description === "string"
                  ? description
                  : description.text
                : undefined
            }
            className={className}
          >
            {options?.map((option: string) => {
              return (
                <SelectItem id={option} key={option}>
                  {option}
                </SelectItem>
              );
            })}
          </JollySelect>
        );
      }}
    />
  );
};

export { Select };
