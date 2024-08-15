/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Control,
  FieldPath,
  FieldPathValue,
  FieldValues,
  PathValue,
} from "react-hook-form";

import {
  ClassNameAndText,
  LeadingTrailingContent,
  ReactHookFormOnChangeEvent,
} from "@/components/Form";

type SelectProps<
  TFieldValue extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValue> = FieldPath<TFieldValue>
> = {
  clearable?: boolean;
  description?: string | ClassNameAndText;
  label?: string | ClassNameAndText;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
  control: Control<TFieldValue>;
  name: Name;
  onChange?: ReactHookFormOnChangeEvent<TFieldValue, Name>;
  shouldUnregister?: boolean;
  defaultValue?: PathValue<TFieldValue, Name>;
  leadingContent?: LeadingTrailingContent<TFieldValue, Name>;
  trailingContent?: LeadingTrailingContent<TFieldValue, Name>;
  options: NonNullable<FieldPathValue<TFieldValue, Name>> extends any[]
    ? NonNullable<FieldPathValue<TFieldValue, Name>>
    : NonNullable<FieldPathValue<TFieldValue, Name>>[];
};

export type { SelectProps };
