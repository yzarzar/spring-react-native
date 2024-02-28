import React, {useState} from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { GET_MEMBERS, UPDATE_MEMBER } from "./quries";
import { useMutation, useQuery } from "@apollo/client";

export default function UpdateForm({ selectedMember, onClose }) {
  const [email, setEmail] = useState(selectedMember.email);
  const [password, setPassword] = useState(selectedMember.password);
  const [updateMember] = useMutation(UPDATE_MEMBER);
  const {refetch} = useQuery(GET_MEMBERS);

  const handleUpdateMember = () => {
    updateMember({
      variables: {
        id: selectedMember.id,
        email: email,
        password: password,
      },
    })
      .then(() => {
        Alert.alert("Member updated successfully.");
        refetch();
        onClose();
      })
      .catch((error) => {
        Alert.alert("Error updating member: " + error.message);
      });
  };

  return (
    <View style={styles.container}>
      <React.Fragment>
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <Text
              style={{ paddingBottom: 10, fontSize: 15, fontWeight: "bold" }}
            >
              Update Member
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new email"
              value={email}
              onChangeText={setEmail}
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="Enter new password"
              value={password}
              onChangeText={setPassword}
            ></TextInput>
          </View>
          <Pressable style={styles.button} onPress={handleUpdateMember}>
            <Text style={styles.text}>Save</Text>
          </Pressable>
        </View>
      </React.Fragment>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    flex: 1,
    width: 300,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    padding: 10,
    height: 40,
    width: 200,
    borderWidth: 0.3,
    borderColor: "black",
    color: "#2B5D4B",
    borderRadius: 5,
    margin: 5,
  },
  form: {
    height: 170,
    width: 250,
    backgroundColor: "#E6D8D8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    marginBottom: 9,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 95,
    borderRadius: 100,
    elevation: 3,
    backgroundColor: "#008CFA",
  },
  text: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
