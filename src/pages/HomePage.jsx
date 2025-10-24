import React from "react";
import Carousel from "../components/Carousel";
import Header from "../components/Header";

const sampleItems = [
  {
    id: 1,
    imageUrl:
      "https://i.pinimg.com/1200x/38/f0/2a/38f02a3745255475c7edf2f323992fbb.jpg",
    name: "Tera?",
    
  },
  {
    id: 2,
    imageUrl:
      "https://i.pinimg.com/736x/db/d3/72/dbd372c07084e64e1df0ed462cba28a3.jpg",
    name: "wowie",
  },
  {
    id: 3,
    imageUrl:
      "https://i.pinimg.com/736x/77/35/1f/77351fe0c884a23c75fdce56baed2ca1.jpg",
    name: "wowie",
  },
  {
    id: 4,
    imageUrl:
      "https://i.pinimg.com/1200x/af/1d/5d/af1d5d946d795d38746744c5f77faf46.jpg",
    name: "wowie",
  },
  {
    id: 5,
    imageUrl:
      "https://i.pinimg.com/736x/bf/b1/ea/bfb1eaaf7d38d0b42614d80b2989fa8d.jpg",
    name: "wowie",
  },
  {
    id: 6,
    imageUrl:
      "https://i.pinimg.com/736x/86/dc/41/86dc41699fe3e73f4374063174d8e37b.jpg",
    name: "wowie",
  },
  {
    id: 7,
    imageUrl:
      "https://i.pinimg.com/736x/71/03/5c/71035cf7c8fb3981436f68fb35c73091.jpg",
    name: "wowie",
  },
  {
    id: 8,
    imageUrl:
      "https://i.pinimg.com/736x/4e/46/b6/4e46b6e7de2656de1b34046d274aeda4.jpg",
    name: "wowie",
  },
  {
    id: 9,
    imageUrl:
      "https://i.pinimg.com/736x/0f/ce/b8/0fceb803cfa5ac4ddee46ccd9cf2874b.jpg",
    name: "wowie",
  },
  {
    id: 10,
    imageUrl:
      "https://i.pinimg.com/736x/25/c6/20/25c620e93456b923a6ad4e6de1ddfafb.jpg",
    name: "wowie",
  },
];

export default function HomePage() {
  return (
    <div>
      <Header />
      <Carousel
        title="Em destaque"
        items={sampleItems}
        itemWidth={170}
        onItemClick={(item) => console.log("Clicked:", item)}
      />
    </div>
  );
}
