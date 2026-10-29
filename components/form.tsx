import { zodResolver } from "@hookform/resolvers/zod";
import { Control, Controller, FieldPath, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { z } from "zod";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, "Please input first name")
    .max(30, "too long, must be under 30 characters"),
  lastName: z
    .string()
    .min(2, "Please input last name")
    .max(30, "too long, must be under 30 characters"),
  email: z.email().trim(),
  password: z.string().min(8, "must be 8 characters"),
  comfirmPass: z.string(),
});

type signUpFormType = z.infer<typeof formSchema>;

type signUpFormProps = {
  control: Control<signUpFormType>;
  name: FieldPath<signUpFormType>;
  placeholder: string;
  email?: boolean;
  secure?: boolean;
};

function FormInput({
  control,
  name,
  placeholder,
  email,
  secure,
}: signUpFormProps) {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <TextInput
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={name}
            keyboardType={email ? "email-address" : "default"}
            secureTextEntry={secure}
          />
        )}
      />
    </View>
  );
}

export default function signUpForm() {
  const { control, handleSubmit, reset } = useForm<signUpFormType>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      comfirmPass: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  function onSubmit({ password, comfirmPass, ...safe }: signUpFormType) {
    console.log("submitted", safe);
    const msg = JSON.stringify(safe, null, 2);

    reset();
  }

  return (
    <View>
      <FormInput control={control} name="firstName" placeholder="First Name" />
      <FormInput control={control} name="lastName" placeholder="Last Name" />
      <FormInput control={control} name="email" placeholder="email" email />
      <FormInput
        control={control}
        name="password"
        placeholder="Password"
        secure
      />
      <FormInput
        control={control}
        name="comfirmPass"
        placeholder="confirm Password"
        secure
      />
      <Pressable onPress={() => handleSubmit(onSubmit)()}>
        <Text>Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
