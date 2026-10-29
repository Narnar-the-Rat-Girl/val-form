import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Control, Controller, FieldPath, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { z } from "zod";

const formSchema = z
  .object({
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
  })
  .refine((data) => data.password == data.comfirmPass, {
    message: "passwords dont match",
    path: ["comfirmPass"],
  });

type signUpFormType = z.infer<typeof formSchema>;

type signUpFormProps = {
  control: Control<signUpFormType>;
  name: FieldPath<signUpFormType>;
  placeholder: string;
  email?: boolean;
  secure?: boolean;
};

function FormInput({ control, name, email, secure }: signUpFormProps) {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              style={styles.formBox}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={name}
              keyboardType={email ? "email-address" : "default"}
              secureTextEntry={secure}
            />
            {error && <Text>{error.message}</Text>}
          </>
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
    router.push({
      pathname: "/confirmation",
      params: { firstName: safe.firstName },
    });

    reset();
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewBox}>
        <FormInput
          control={control}
          name="firstName"
          placeholder="First Name"
        />
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
      </View>

      <Pressable
        onPress={() => handleSubmit(onSubmit)()}
        style={styles.signUpButton}
      >
        <Text>Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
  },
  formBox: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "black",
    padding: 10,
  },
  viewBox: { flexDirection: "row", gap: 3 },
  signUpButton: {
    backgroundColor: "#5a1f69",
    padding: 10,
    borderRadius: 5,
    width: 150,
  },
});
