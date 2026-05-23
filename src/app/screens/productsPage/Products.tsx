import React, { ChangeEvent, useEffect, useState } from "react";
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
    order: 'createdAt',
    direction: -1,
    productCollection: ProductCollection.FICTION,
    search: '',
  })

  const [counts, setCounts] = useState<any>({});
  const [searchText, setSearchText] = useState<string>('');
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
                      <span>The Central Atrium</span>
                      <p>422 Literature Lane, Manhattan, NY</p>
                    </Stack>
                  </Stack>
                  <Stack className="address1">
                    <div className="icon"><LocationOnOutlinedIcon /></div>
                    <Stack className="address-txt">
                      <span>The Central Atrium</span>
                      <p>422 Literature Lane, Manhattan, NY</p>
                    </Stack>
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
        </Stack>

      </Container>
    </div>
  );
}