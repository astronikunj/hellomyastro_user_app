// CountryCodeSelector.tsx
import { normalize } from "@/utils/normalize";
import { Colors, Fonts } from "@/assets";
import Ionicons from 'react-native-vector-icons/Ionicons'
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import {
  Country,
  CountryCode,
  FlagType,
  getAllCountries,
  getCallingCode,
} from "react-native-country-picker-modal";
import { Flag } from "react-native-country-picker-modal";

export default function CountryCodeSelector() {
  const [countryCode, setCountryCode] = useState<CountryCode>("IN");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCountryData, setFilterCountryData] = useState<Country[]>([]);

  const getCountries = async () => {
    const countries = await getAllCountries("flat" as FlagType);

    if (searchQuery !== "") {
      const filteredCountries = countries?.filter((country: any) =>
        country.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log("filter data", filteredCountries);
      setFilterCountryData(filteredCountries);
    } else {
      setFilterCountryData(countries);
    }
  };

  React.useEffect(() => {
    getCountries();
  }, [searchQuery]);

  const handleSelect = (country: Country) => {
    setSelectedCountry(country);
    setCountryCode(country.cca2);
    setModalVisible(false);
  };

  const renderCountry = ({ item }: { item: any }) => (
    <Pressable style={styles.row} onPress={() => handleSelect(item)}>
      <View style={styles.rowLeft}>
        <Flag flagSize={normalize(22)} countryCode={item.cca2} />
        <Text style={styles.countryText}>{item.name}</Text>
      </View>
      <Text style={styles.callingCode}>+{item.callingCode[0]}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.selector} onPress={() => {
        setModalVisible(true)
      }}>
        {selectedCountry ? (
          <>
            <Flag flagSize={24} countryCode={selectedCountry.cca2} />
            <Text style={styles.selectedText}>
              +{selectedCountry.callingCode[0]}
            </Text>
            <Ionicons name="caret-down-outline" size={16} color={Colors.blackColor} style={{marginLeft: 4}} />
          </>
        ) : (
          <>
            <Flag flagSize={24} countryCode="IN" />
            <Text style={styles.selectedText}>+91</Text>
            <Ionicons name="caret-down-outline" size={16} color={'#000'} />
          </>
        )}
      </Pressable>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 16,
            gap: 12
          }}>
            <Ionicons name="arrow-back-sharp" size={24} color={'#000'} onPress={() => setModalVisible(false)}  />
            <TextInput
              placeholder="Search country"
              placeholderTextColor="#888"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <FlatList
            data={filterCountryData}
            keyExtractor={(item) => item.cca2}
            renderItem={renderCountry}
            style={{ backgroundColor: "#fff", padding: 20 }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 8
  },
  selectedText: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    marginLeft: -6,
    color: Colors.blackColor,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: normalize(14),
    backgroundColor: "#f1f1f1",
    borderRadius: 24,
    marginVertical: 16,
    elevation: 5,
    fontFamily: Fonts.regular,
    includeFontPadding: false,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  countryText: {
    fontSize: normalize(14),
    color: "#000",
    fontFamily: Fonts.medium,
    includeFontPadding: false
  },
  callingCode: {
    fontSize: normalize(14),
    color: "#444",
    fontFamily: Fonts.medium,
    includeFontPadding: false
  },
});
