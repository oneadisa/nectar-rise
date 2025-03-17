import React, { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  ViewToken,
} from "react-native";

const { width } = Dimensions.get("window");

export interface BannerSlide {
  id: string;
  image: any;
  title?: string;
  subtitle?: string;
}

interface BannerSliderProps {
  data: BannerSlide[];
}

interface ViewableItemsChangedInfo {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

const BannerSlider: React.FC<BannerSliderProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  // Auto-slide functionality with more reliable cycling
  useEffect(() => {
    // Create a single interval that doesn't depend on currentIndex
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      setCurrentIndex(nextIndex);
      
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        flatListRef.current?.scrollToIndex({
          animated: true,
          index: nextIndex,
          viewPosition: 0.5
        });
      });
    }, 2000); // 2 seconds interval
    
    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, [currentIndex, data.length]);
  
  // Handle manual scrolling
  const handleManualScroll = () => {
    // This function intentionally left empty to prevent
    // resetting the timer when scrolling manually
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: ViewableItemsChangedInfo) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== undefined) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 100,
  });

  const renderItem = ({ item }: { item: BannerSlide }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
        <View style={styles.textOverlay}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        onMomentumScrollEnd={() => {}} // Prevent scroll interruption
        scrollEventThrottle={16} // For smoother scrolling (60fps)
        decelerationRate="fast" // Faster snap to items
        snapToInterval={width - 30} // Match slide width
        snapToAlignment="center"
      />
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === currentIndex ? "#53B175" : "#E2E2E2",
                width: index === currentIndex ? 23 : 8,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 115,
    borderRadius: 10,
    overflow: "hidden",
  },
  slide: {
    width: width - 30, // Accounting for padding
    height: 115,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  pagination: {
    position: "absolute",
    bottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  textOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#53B175",
    fontWeight: "600",
  },
});

export default BannerSlider;
