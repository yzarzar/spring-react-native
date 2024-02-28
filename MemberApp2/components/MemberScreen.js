import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal
} from "react-native";
// import { useNavigation } from '@react-navigation/native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useMutation, useQuery } from "@apollo/client";
import { GET_MEMBERS, DELETE_MEMBER_BY_ID } from "./quries";
import UpdateForm from "./UpdateForm";

const MemberScreen = () => {
  const { loading, error, data, refetch } = useQuery(GET_MEMBERS);
  const [deleteMemberById] = useMutation(DELETE_MEMBER_BY_ID);
  const [previousData, setPreviousData] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     refetch();
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [refetch]);

  // useEffect(() => {
  //   if (
  //     data &&
  //     previousData &&
  //     JSON.stringify(data) != JSON.stringify(previousData)
  //   ) {
  //     refetch();
  //     console.log("New member added.");
  //   }
  //   setPreviousData(data);
  // }, [data, previousData, refetch]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Loading Data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Error: {error.message}</Text>
      </View>
    );
  }

  const handleDelete = (id) => {
    deleteMemberById({
      variables: { id },
    }).then(() => {
      refetch(); 
    }).catch((error) => {
      console.error("Error deleting member:", error);
    });
  };

  const handleUpdate = (member) => {
    setSelectedMember(member);
    setUpdateModalVisible(true);
  };

  const memberData = data.getAllMembers;

  return (
    <View style={styles.container}>
      <FlatList
        data={memberData}
        renderItem={({ item }) => (
          <SafeAreaView style={styles.container}>
            <View style={styles.card1}>
              <View style={styles.card}>
                <Text
                  style={{ fontWeight: "bold", fontSize: 14, color: "white" }}
                >
                  Email: {item.email}
                </Text>
                <Text
                  style={{ fontWeight: "bold", fontSize: 12, color: "grey" }}
                >
                  Password: {item.password}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => handleDelete(item.id)}
              >
                <FontAwesome name="trash" size={20} color="red" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => handleUpdate(item)}
              >
                <FontAwesome name="gear" size={20} color="green" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isUpdateModalVisible}
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <UpdateForm
              selectedMember={selectedMember}
              onClose={() => setUpdateModalVisible(false)}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
  },
  card1: {
    flexDirection: "row",
    backgroundColor: "white",
    width: 320,
    height: 60,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#2E321F",
  },
  icon: {
    justifyContent: "center",
    width: 30,
  },
  card: {
    flex: 1,
    justifyContent: "center",
  },
  list: {
    backgroundColor: "#E2DCE8",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    height: 300,
    width: "80%",
  },
});

export default MemberScreen;
