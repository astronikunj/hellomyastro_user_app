import { Dimensions, StyleSheet, View, Image } from "react-native";
import React from "react";
import Carousel from "pinar";
import { normalize } from "@/utils/normalize";
import { Sizes } from "@/assets";
import FastImage, { ResizeMode } from "react-native-fast-image";
import { imgBaseurl } from "@/constants/constant";

const height = Dimensions.get("screen").height;

type Props = {
  images: any;
  contentFit?: ResizeMode;
  crouselContainerStyle?: any;
};

const CarouselView = (props: Props) => {
  const { images, contentFit, crouselContainerStyle } = props;
  console.log(images)
  return (
    <View style={[styles.carouselContainer, { ...crouselContainerStyle }]}>
      <Carousel
        style={styles.carousel}
        loop={true}
        autoplay={true}
        autoplayInterval={10000}
        showsControls={false}
        showsDots={true}
        bounces={false}
      >
        {images?.map((item: any, index: number) => (
          <FastImage
            key={index}
            style={styles.image}
            source={{uri: `${imgBaseurl}${item.bannerImage}`}}
            resizeMode={"cover"}
          />
        ))}
      </Carousel>
    </View>
  );
};

export default CarouselView;

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
    borderRadius: Sizes.small,
  },
  carousel: {
    height: "100%",
    width: "100%",
  },
  carouselContainer: {
    height: normalize(130),
    width: "100%",
    alignSelf: "center",
  },
});
