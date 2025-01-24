import React, { useEffect, useState } from "react";

type product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

const ProductCard = () => {
  const [productList, setProductList] = useState<product[]>([]);
  const [foundProduct, setFoundProduct] = useState<product | undefined>();
  const [search, setSearch] = useState<string | undefined>();

  const fetchData = async () => {
    const req = await fetch("./products.json");
    const data = await req.json();
    setProductList(data.products);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    setFoundProduct(undefined) // ujra keresesnel reset
    if (search) {
      console.log(
        productList.find((p) =>
          p.name.toLowerCase().includes(search?.toLocaleLowerCase())
        )
      );
      setFoundProduct(
        productList.find((p) =>
          p.name.toLowerCase().includes(search?.toLocaleLowerCase())
        )
      );
    }
  };

  return (
    <div className="">
      <div className="search-section">
        <input onChange={handleInput} type="text" name="" id="" />
        <button onClick={handleSearch}>Keresés</button>
      </div>

      {foundProduct ? (
        <div className="product-card">
          <div className="results-section">
            <div className="product-info">
              <img className="product-image" src={foundProduct.image} alt="" />
              <div className="product-details">
                <p>Id: {foundProduct?.id}</p>
                <p>Név: {foundProduct?.name}</p>
                <p>Ár: {foundProduct?.price}</p>
                <p>Kategória: {foundProduct?.category}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="product-card">
          <div className="results-section">
            <div className="product-info">
              <img className="product-image" src="" alt="" />
              <div className="product-details error">
                <p>Nincs Találat</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
