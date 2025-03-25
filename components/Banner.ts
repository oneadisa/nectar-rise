// screens/home/banners.ts
import { ImageSourcePropType } from "react-native";

export interface BannerItem {
  id: number;
  title?: string;
  subtitle?: string;
  backgroundImage: ImageSourcePropType;
}

export const banners: BannerItem[] = [
  {
    id: 1,
    // title: "Fresh Vegetables",
    // subtitle: "Get Up To 40% OFF",
    backgroundImage: require("@/assets/images/banner.png"), // Replace with actual image path
  },
  {
    id: 2,
    // title: "Fresh Fruits",
    // subtitle: "Get Up To 30% OFF",
    backgroundImage: require("@/assets/images/banner.png"), // Replace with actual image path
  },
  {
    id: 3,
    // title: "Dairy Products",
    // subtitle: "Get Up To 20% OFF",
    backgroundImage: require("@/assets/images/banner.png"), // Replace with actual image path
  },
];
