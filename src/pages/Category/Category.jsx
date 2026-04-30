import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("https://dummyjson.com/products/categories");
      setCategories(res.data);
    };
    getData();
  }, []);

  const categoryImages = {
    beauty: "https://cdn-icons-png.flaticon.com/512/1005/1005765.png",
    fragrances: "https://cdn-icons-png.flaticon.com/512/9812/9812493.png",
    furniture: "https://cdn-icons-png.flaticon.com/512/1040/1040230.png",
    groceries: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
    "home-decoration": "https://cdn-icons-png.flaticon.com/512/809/809957.png",
    "kitchen-accessories": "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
    laptops: "https://cdn-icons-png.flaticon.com/512/2920/2920244.png",
    "mens-shirts": "https://cdn-icons-png.flaticon.com/512/121/121863.png",
    "mens-shoes": "https://cdn-icons-png.flaticon.com/512/892/892458.png",
    "mens-watches": "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
    "mobile-accessories": "https://cdn-icons-png.flaticon.com/512/6268/6268352.png",
    motorcycle: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
    "skin-care": "https://cdn-icons-png.flaticon.com/512/4383/4383084.png",
    smartphones: "https://cdn-icons-png.flaticon.com/512/15/15874.png",
    "sports-accessories":"https://cdn-icons-png.flaticon.com/512/4645/4645268.png",
    sunglasses: "https://cdn-icons-png.flaticon.com/512/2948/2948035.png",
    tablets: "https://cdn-icons-png.flaticon.com/512/888/888879.png",
    tops: "https://cdn-icons-png.flaticon.com/512/892/892458.png",
    vehicle: "https://cdn-icons-png.flaticon.com/512/743/743922.png",
    "womens-bags": "https://cdn-icons-png.flaticon.com/512/892/892458.png",
    "womens-dresses": "https://cdn-icons-png.flaticon.com/512/892/892458.png",
    "womens-jewellery": "https://cdn-icons-png.flaticon.com/512/2972/2972528.png",
    "womens-shoes": "https://cdn-icons-png.flaticon.com/512/892/892458.png",
    "womens-watches": "idhttps://cdn-icons-png.flaticon.com/512/2922/2922510.png",
  };
  return (
    <div className=" font-serif bg-gray-100 min-h-screen px-4 md:px-10 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Categories</h1>
      <div className="grid lg:grid-cols-5 gap-6">
        {categories.map((item, index) => (
          <Link to={`/categorydetailpage/${item.slug}`} key={index}>
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer text-center flex flex-col items-center gap-3">
              <img src={categoryImages[item.slug]}
                alt={item.name}
                className="h-12 w-12 object-contain" />
              <h3 className="text-sm font-semibold text-gray-700 capitalize">{item.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}