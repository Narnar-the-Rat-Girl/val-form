import { StyleSheet, View } from "react-native";
import SignUpForm from "../../components/form";

export default function Index() {
  return (
    <View style={styles.container}>
      <SignUpForm></SignUpForm>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
