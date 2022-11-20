import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes, useState } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  isRequired: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  isRequired,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isRequired={isRequired} isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

type PasswordInputFieldProps = InputFieldProps & {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  showPassword: boolean;
};

export const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  label,
  size: _,
  isRequired,
  onClick,
  showPassword,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isRequired={isRequired} isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputGroup>
        <Input {...field} {...props} id={field.name} />
        <InputRightElement h={"full"}>
          <Button variant={"ghost"} onClick={onClick}>
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
