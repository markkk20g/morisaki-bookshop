import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Box, Button, Container, Pagination, PaginationItem, Stack } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductCard from "../../components/common/ProductCard";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SearchIcon from '@mui/icons-material/Search';
import "../../../css/products.css";
import "../../../css/card.css";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../libs/types/product";
import { retrieveProducts } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { Direction, ProductCollection } from "../../../libs/enums/product.enum";
import { useHistory } from "react-router-dom";
import ProductService from "../../services/ProductService";
import { CartItem } from "../../../libs/types/search";
import { serverApi } from "../../../libs/config";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { T } from "../../../libs/types/common";

/****************************************
              REDUX SLICE
*****************************************/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data))
});

/****************************************
              REDUX SELECTOR
*****************************************/
const productsRetriever = createSelector(
  retrieveProducts, (products) => ({products})
);

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}


export default function Products(props: ProductsProps) {
  const { onAdd } = props;

  const {setProducts} = actionDispatch(useDispatch());
  const {products} = useSelector(productsRetriever)

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: 'productViews',
    direction: -1,
    productCollection: ProductCollection.FICTION,
    search: '',
  })

  const [counts, setCounts] = useState<any>({});
  const [searchText, setSearchText] = useState<string>('');
  const [openMap, setOpenMap] = useState<number | null>(null);
  const mapRef = useRef<HTMLElement | null>(null);
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product.getProducts(productSearch)
    .then((data) => setProducts(data))
    .catch((err) => console.log(err))
  }, [productSearch]);

  useEffect(() => {
    if(searchText === "") {
      productSearch.search = "";
      setProductSearch({...productSearch})
    }
  }, [searchText]);

  useEffect(() => {
    const product = new ProductService();
    product.getProductCounts()
      .then((data) => {
        const total: T = {};
        data.map((ele: any) => total[ele?._id] = ele.count);

        setCounts(total)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (mapRef.current && !mapRef.current.contains(e.target as Node)) {
        setOpenMap(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /*********** HANDLERS *************/

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({...productSearch});
  };

  // const searchOrderHandler = (order: string) => {
  //   productSearch.page = 1;
  //   productSearch.order = order;
  //   setProductSearch({...productSearch})
  // };

  const searchOrderHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    productSearch.page = 1;
    const value = e.target.value;

    let order: string = '';
    let direction: number = 1;

    switch(value) {

      case 'relevance': 
        order = 'productViews';
        direction = -1;
        break;
      
      case 'newest':
        order = 'createdAt';
        direction = -1;
        break;

      case 'oldest':
        order = 'createdAt';
        direction = 1;
        break;

      case 'lowest':
        order = 'productPrice';
        direction = 1;
        break;
        
      case 'highest':
        order = 'productPrice';
        direction = -1;
        break;
    }
    
    productSearch.order = order;
    productSearch.direction = direction;

    setProductSearch({...productSearch})
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({...productSearch})
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({...productSearch})
  };

  const chooseProductHandler = (id: string) => {
    history.push(`/products/${id}`)
  }

  

  return (
    <div className="products-screen-frame">
      <Container className="products-screen">
        <Stack className="sidebar-filter">
          <Stack className="sidebar-category">
            <Box className="category-title">CATEGORIES /
              GENRE</Box>
            <Stack className="category-list">
              <Button 
                className={`list-item ${productSearch.productCollection === ProductCollection.FICTION 
                    ? 'active' : ''}`}
                onClick={() => searchCollectionHandler(ProductCollection.FICTION)}
              >
                <p className="category-name">Fiction</p>
                <p className="category-total">{counts.FICTION}</p>
              </Button>
              <Button 
                className={`list-item ${productSearch.productCollection === ProductCollection.BUSINESS 
                    ? 'active' : ''}`}
                onClick={() => searchCollectionHandler(ProductCollection.BUSINESS)}
              >
                <p className="category-name">Business & Economics</p>
                <p className="category-total">{counts.BUSINESS}</p>
              </Button>
              <Button 
                className={`list-item ${productSearch.productCollection === ProductCollection.SELF_HELP 
                    ? 'active' : ''}`}
                onClick={() => searchCollectionHandler(ProductCollection.SELF_HELP)}
              >
                <p className="category-name">Self-help & Improvement</p>
                <p className="category-total">{counts.SELF_HELP}</p>
              </Button>
              <Button 
                className={`list-item ${productSearch.productCollection === ProductCollection.TECHNOLOGY 
                    ? 'active' : ''}`}
                onClick={() => searchCollectionHandler(ProductCollection.TECHNOLOGY)}
              >
                <p className="category-name">Technology & Science</p>
                <p className="category-total">{counts.TECHNOLOGY}</p>
              </Button>
              <Button 
                className={`list-item ${productSearch.productCollection === ProductCollection.KIDS 
                    ? 'active' : ''}`}
                onClick={() => searchCollectionHandler(ProductCollection.KIDS)}
              >
                <p className="category-name">Kids Literature</p>
                <p className="category-total">{counts.KIDS}</p>
              </Button>
              <Button 
                className={`list-item ${productSearch.productCollection === ProductCollection.MAGAZINE 
                    ? 'active' : ''}`}
                onClick={() => searchCollectionHandler(ProductCollection.MAGAZINE)}
              >
                <p className="category-name">Magazines & Journals</p>
                <p className="category-total">{counts.MAGAZINE}</p>
              </Button>
            </Stack>
          </Stack>
          <Stack className="sidebar-sorting">
            <Box className="category-title">SORTED BY</Box>
            {/* <Box className="sorting-tool" flexDirection={"row"}>
              <p>Relevance</p>
              <ExpandMoreIcon />
            </Box> */}
            <Box>
              <select 
                className="sorting-tool"
                onChange={searchOrderHandler}
              >
                <option value={'relevance'}>Relevance</option>
                <option value={'newest'}>Newest Arrivals</option>
                <option value={'oldest'}>Oldest Arrivals</option>
                <option value={'lowest'}>Price: Low to High</option>
                <option value={'highest'}>Price: High to Low</option>
              </select>
            </Box>
          </Stack>
        </Stack>


        <Stack className="main-frame">
          <Stack className="main-frame-info">
            <Stack className="collect-title">
              <span>Our Products</span>
            </Stack>
            <Stack className="collect-search">
              <input 
                type="search"
                placeholder="Search products..."
                name="singleSearch"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if(e.key === 'Enter') searchProductHandler()
                }}
              />
              <Button 
                className="search-btn"
                onClick={searchProductHandler}
              >
                Search
                <SearchIcon fontSize="small" />
              </Button>
            </Stack>
          </Stack>
          <Stack className="main-frame-items">
            {products?.length !== 0 ? (
              products.map((product: Product, index: any) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`
                return (
                  <ProductCard 
                    product={product} 
                    onAdd={onAdd} 
                    imagePath={imagePath} 
                    key={index}
                    chooseProductHandler={chooseProductHandler}
                  />
                )
              })
            ) : (
              <Box className="no-data">Products are not available!</Box>
            )}
            {/* {productsCard.map((product, index) => {
              return <ProductCard key={index} />
            })} */}
          </Stack>
          <Stack className="main-frame-pagination">
            <Stack spacing={2} className='pagination'>
            <Pagination
              count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
              color='secondary'
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
          </Stack>
          <Stack className="main-frame-location">
            <Stack className="location-frame">
              <Stack className="location-info">
                <Stack className="title-desc">
                  <span>Find us in person</span>
                  <p>Our physical locations are more than just shops. 
                    They are curated spaces designed for discovery. 
                    Visit us for exclusive events, author signings, 
                    and a hand-picked physical archive.
                  </p>
                </Stack>
                <Stack className="addresses">
                  <Stack className="address1">
                    <div className="icon"><LocationOnOutlinedIcon /></div>
                    <Stack className="address-txt">
                      <span>Manhattan branch</span>
                      <p>58 Warren St, New York, NY 10007</p>
                    </Stack>
                    <Box className="map-wrap">
                      <p 
                        className="map-link"
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenMap(1)
                        }}
                      >
                        See on map
                      </p>
                      
                    </Box>
                  </Stack>
                  <Stack className="address1">
                    <div className="icon"><LocationOnOutlinedIcon /></div>
                    <Stack className="address-txt">
                      <span>Brooklyn branch</span>
                      <p>143 7th Ave, Brooklyn, NY 11215</p>
                    </Stack>
                    <Box className="map-wrap">
                      <p 
                        className="map-link"
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenMap(2)
                        }}
                      >
                        See on map
                      </p>
                      
                    </Box>
                  </Stack>
                </Stack>
              </Stack>

              <Stack className="location-visuals">
                <div className="main-img">
                  <img src="/img/interior.jpg"/>
                </div>
                <div className="tag">
                  <p>Curated Events</p>
                  <p>Every Thursday</p>
                </div>
              </Stack>
            </Stack>
            
          </Stack>
          {openMap === 1 && (
            <Box className={`map-frame ${openMap === 1 ? "open" : ""}`} ref={mapRef}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12096.561971439389!2d-74.02826521284179!3d40.7149236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a1f282d9f6d%3A0xcbc9d2953228f5c8!2sMysterious%20Book%20Shop!5e0!3m2!1sen!2skr!4v1779568168895!5m2!1sen!2skr" 
                width="1005px" 
                height="350px" 
                style={{
                  border: "0",
                  marginTop: '40px',
                  borderRadius: '20px'
                }} 
                loading="lazy" 
                referrerPolicy='no-referrer-when-downgrade'
              ></iframe>
            </Box>
          )}

          {openMap === 2 && (
            <Box className={`map-frame ${openMap === 2 ? "open" : ""}`} ref={mapRef}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24208.447185015582!2d-74.01578683327114!3d40.672737300000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b07284f6df9%3A0x4c72d20256b53184!2sCommunity%20Bookstore!5e0!3m2!1sen!2skr!4v1779629344285!5m2!1sen!2skr" 
                width="1005px" 
                height="350px" 
                style={{
                  border: "0",
                  marginTop: '40px',
                  borderRadius: '20px'
                }}  
                // allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </Box>
          )}
        </Stack>

      </Container>
    </div>
  );
}