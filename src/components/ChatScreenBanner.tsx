import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { normalize } from "@/utils/normalize";
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, Images } from "@/assets";

type Props = {};

const { width } = Dimensions.get("window");

const ChatScreenBanner = (props: Props) => {
  const bannerData = [
    {
      id: 1,
      text: "When Will i get a married?",
      image: Images.chatScreenBannerImg,
    },
    {
      id: 2,
      text: `Will i have a love or arranged marriage?`,
      image: Images.chatScreenBannerImg,
    },
    {
      id: 3,
      text: "What does 2025 hold for me?",
      image: Images.chatScreenBannerImg,
    },
    {
      id: 4,
      text: "What Should i do : job Or Business ?",
      image: Images.chatScreenBannerImg,
    },
    {
      id: 5,
      text: "Will i reconnect my Ex?",
      image: Images.chatScreenBannerImg,
    },
    {
      id: 6,
      text: "When Will i get a job?",
      image: Images.chatScreenBannerImg,
    },
  ];
  const [activeIndex, setActiveIndex] = React.useState(0);
  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (width - 16));
    setActiveIndex(index);
  };

  return (
    <View>
      <FlatList
        data={bannerData}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <LinearGradient
            colors={["#FF8B33", "#FF9A4D"]}
            style={styles.container}
          >
            <Text style={styles.text}>{item.text}</Text>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
          </LinearGradient>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
      <View style={styles.indicatorContainer}>
        {bannerData.map((_, index) => (
          <View
            key={index}
            style={{
              backgroundColor:
                activeIndex == index ? Colors.whiteColor : Colors.blackColor,
              height: 7,
              width: 7,
              borderRadius: 10,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default ChatScreenBanner;

const styles = StyleSheet.create({
  container: {
    width: width - 16,
    height: 70,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
		paddingHorizontal: 16
  },
  text: {
    color: Colors.whiteColor,
    textAlign: "center",
    fontSize: normalize(12),
    fontWeight: "600",
    fontFamily: Fonts.medium,
    includeFontPadding: false,
  },
  image: {
    width: 80,
    height: 70,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    position: "absolute",
    bottom: 6,
    left: 0,
    right: 0,
    width: width,
    alignSelf: "center",
  },
});
