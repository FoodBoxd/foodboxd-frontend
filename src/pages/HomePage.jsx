import React, { useState, useEffect } from "react";
import Carousel from "../components/Carousel";
import Header from "../components/Header";
import api from "../api";

export default function HomePage() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const getDishes = async () => {
      try {
        const response = await api.get("dishes");
        const formattedDishes = response.data.map((dish) => ({
          id: dish.dishId,
          imageUrl: `data:image/jpeg;base64,${dish.photo}`,
          name: dish.name,
        }));
        setDishes(formattedDishes);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };


    getDishes();
  }, []);

  console.log(dishes);
  return (
    <div>
      <Header />
      <Carousel
        title="Em destaque"
        items={dishes}
        itemWidth={170}
        onItemClick={(item) => console.log("Clicked:", item)}
      />
    </div>
  );
}
