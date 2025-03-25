import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import { FONTS } from "@/constants/Fonts";

const AccountScreen = () => {
  // Mock user data
  const user = {
    name: "Afsar Hossen",
    email: "lmshuvo97@gmail.com",
    // Using a placeholder color instead of an image
    avatarColor: "#53B175",
  };

  // Menu items
  const menuItems = [
    {
      id: "orders",
      title: "Orders",
      icon: <Ionicons name="document-text-outline" size={22} color="#181725" />,
    },
    {
      id: "details",
      title: "My Details",
      icon: <Ionicons name="card-outline" size={22} color="#181725" />,
    },
    {
      id: "address",
      title: "Delivery Address",
      icon: <Ionicons name="location-outline" size={22} color="#181725" />,
    },
    {
      id: "payment",
      title: "Payment Methods",
      icon: <Ionicons name="card-outline" size={22} color="#181725" />,
    },
    {
      id: "promo",
      title: "Promo Cord",
      icon: <Ionicons name="pricetag-outline" size={22} color="#181725" />,
    },
    {
      id: "notifications",
      title: "Notifecations",
      icon: <Ionicons name="notifications-outline" size={22} color="#181725" />,
    },
    {
      id: "help",
      title: "Help",
      icon: <Ionicons name="help-circle-outline" size={22} color="#181725" />,
    },
    {
      id: "about",
      title: "About",
      icon: (
        <Ionicons name="information-circle-outline" size={22} color="#181725" />
      ),
    },
  ];

  const handleMenuItemPress = (id: string) => {
    console.log(`Pressed ${id}`);
    // Navigation logic would go here
  };

  const handleLogout = () => {
    console.log("Logging out");
    // Logout logic would go here
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <Image
              source={require("@/assets/images/profile-pic.png")}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.userName}>{user.name}</Text>
                <TouchableOpacity style={styles.editButton}>
                  <Feather name="edit-2" size={16} color="#53B175" />
                </TouchableOpacity>
              </View>
              <Text style={styles.userEmail}>lmshuvo97@gmail.com</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuItemPress(item.id)}
            >
              <View style={styles.menuIconTitle}>
                {item.icon}
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#181725" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Feather name="log-out" size={24} color="#53B175" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  headerTitle: {
    fontFamily: FONTS.semi,
    fontSize: 20,
    color: "#181725",
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 8,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontFamily: FONTS.semi,
    fontSize: 18,
    color: "#181725",
    marginRight: 10,
  },
  editButton: {
    padding: 5,
  },
  userEmail: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: "#7C7C7C",
    marginTop: 5,
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E2E2",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  menuIconTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuTitle: {
    fontFamily: FONTS.semi,
    fontSize: 16,
    color: "#181725",
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F3F2",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 18,
  },
  logoutText: {
    fontFamily: FONTS.semi,
    fontSize: 18,
    color: "#53B175",
    marginLeft: 8,
  },
});

export default AccountScreen;
