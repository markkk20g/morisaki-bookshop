// import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import "../../../css/card.css";
import "../../../css/orders.css";
import { createSelector } from "@reduxjs/toolkit";
import { retrievePausedOrders } from "./selector";
import { useSelector } from "react-redux";
import { useGlobals } from "../../hooks/useGlobals";
import { T } from "../../../libs/types/common";
import { sweetErrorHandling } from "../../../libs/sweetAlert";
import { Messages, serverApi } from "../../../libs/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../libs/types/order";
import { OrderStatus } from "../../../libs/enums/order.enum";
import OrderService from "../../services/OrderService";
import { orderDateFormatted } from "../../../libs/common";
import { Product } from "../../../libs/types/product";

/****************************************
             REDUX SELECTOR
*****************************************/
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({pausedOrders})
)

interface PausedOrdersProps {
  setValue: (input: string) => void;
}

export default function PauseOrders(props: PausedOrdersProps) {
  const { setValue } = props; 
  const { pausedOrders } = useSelector(pausedOrdersRetriever);
  const { authMember, setOrderBuilder } = useGlobals();

/*********** HANDLERS *************/

const deleteOrderHandler = async (e: T) => {
  try {
    if(!authMember) throw new Error(Messages.error2);

    const orderId = e.target.value;
    const input: OrderUpdateInput = {
      orderId: orderId,
      orderStatus: OrderStatus.DELETE,
    };

    const confirmation = window.confirm('Do you want to delete the order?');
    if(confirmation) {
      const order = new OrderService();
      await order.updateOrder(input);

      setOrderBuilder(new Date());
      // this rebuilds the order and refetch data
    }
  } catch(err) {
    console.log(err)
    sweetErrorHandling(err).then();
  }
}

const processOrderHandler = async (e: T) => {
  try {
    if(!authMember) throw new Error(Messages.error2);

    // the PAYMENT process logic will be here !!!

    const orderId = e.target.value;
    const input: OrderUpdateInput = {
      orderId: orderId,
      orderStatus: OrderStatus.PROCESS,
    };

    const confirmation = window.confirm('Do you want to proceed with the payment?');
    if(confirmation) {
      const order = new OrderService();
      await order.updateOrder(input);
      setValue('2');

      setOrderBuilder(new Date());
      // this rebuilds the order and refetch data
    }
  } catch(err) {
    console.log(err)
    sweetErrorHandling(err).then();
  }
}

  return (
    <TabPanel value="1" sx={{padding: '0px'}}>
      <Stack>
        {pausedOrders?.map((order: Order) => {
          const totalItems = order.orderItems.reduce((sum, item) => {
            return sum + item.itemQuantity
          }, 0);
          return (
            <Stack key={order._id} className="content-card">
              <Stack className="content">
                <Stack className="head">
                  <Stack className="title">
                    <span>{order?.orderNumber}</span>
                    <p>{orderDateFormatted(order?.createdAt)}</p>
                  </Stack>
                  <Box className="butts">
                    <Button 
                      className="cancel"
                      value={order._id}
                      onClick={deleteOrderHandler}
                    >
                      Cancel</Button>
                    <Button 
                      className="pay"
                      value={order._id}
                      onClick={processOrderHandler}
                    >
                      payment</Button>
                  </Box>
                </Stack>
                <Stack className="orders">
                  {order?.orderItems?.map((item: OrderItem) => {
                    const product: Product = order.productData.filter(
                      (ele: Product) => item.productId === ele._id
                    )[0];
                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                    return (
                      <Stack className="item">
                        <Stack className="item-title">
                          <Box>
                            <img src={imagePath} alt=""/>
                          </Box>
                          <Stack className="names">
                            <span>{product.productName}</span>
                            <p>{product.productAuthorName}</p>
                          </Stack>
                        </Stack>
                        <Stack className="item-price">
                          <span>${item.itemPrice.toFixed(2)}</span>
                          <p>Qty: {item.itemQuantity}</p>
                        </Stack>
                      </Stack>
                    );
                  })}
                  {/* <Stack className="item">
                    <Stack className="item-title">
                      <Box>
                        <img src="/img/new/lie-to-me.webp" alt=""/>
                      </Box>
                      <Stack className="names">
                        <span>The Great Gatsby</span>
                        <p>F. Scott Fitzgerald</p>
                      </Stack>
                    </Stack>
                    <Stack className="item-price">
                      <span>$17.50</span>
                      <p>Qty: 1</p>
                    </Stack>
                  </Stack>
                  <Stack className="item">
                    <Stack className="item-title">
                      <Box>
                        <img src="/img/new/lie-to-me.webp" alt=""/>
                      </Box>
                      <Stack className="names">
                        <span>The Great Gatsby</span>
                        <p>F. Scott Fitzgerald</p>
                      </Stack>
                    </Stack>
                    <Stack className="item-price">
                      <span>$17.50</span>
                      <p>Qty: 1</p>
                    </Stack>
                  </Stack>
                  <Stack className="item">
                    <Stack className="item-title">
                      <Box>
                        <img src="/img/new/lie-to-me.webp" alt=""/>
                      </Box>
                      <Stack className="names">
                        <span>The Great Gatsby</span>
                        <p>F. Scott Fitzgerald</p>
                      </Stack>
                    </Stack>
                    <Stack className="item-price">
                      <span>$17.50</span>
                      <p>Qty: 1</p>
                    </Stack>
                  </Stack> */}
                  
                </Stack>
                <Stack className="sums">
                  <Stack className="cost">
                    <span>Subtotal ({totalItems} items)</span>
                    <p>$ {(order.orderTotal - order.orderDelivery).toFixed(2)}</p>
                  </Stack>
                  <Stack className="cost">
                    <span>Shipping</span>
                    <p>{order.orderDelivery ? `$ ${order.orderDelivery.toFixed(2)}` : "Free"}</p>
                  </Stack>
                  <Stack className="total">
                    <span>Total</span>
                    <p>$ {order.orderTotal.toFixed(2)}</p>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          )
        })}
      </Stack>
      {/* <Stack className="content-card">
        <Stack className="content">
          <Stack className="head">
            <Stack className="title">
              <span>Order #RF-92834</span>
              <p>2026 May 11 - 21 : 01</p>
            </Stack>
            <Stack className="butts">
              <Button className="cancel">Cancel</Button>
              <Button className="pay">payment</Button>
            </Stack>
          </Stack>
          <Stack className="orders">
            <Stack className="item">
              <Stack className="item-title">
                <Box>
                  <img src="/img/new/lie-to-me.webp" alt=""/>
                </Box>
                <Stack className="names">
                  <span>The Great Gatsby</span>
                  <p>F. Scott Fitzgerald</p>
                </Stack>
              </Stack>
              <Stack className="item-price">
                <span>$17.50</span>
                <p>Qty: 1</p>
              </Stack>
            </Stack>
            <Stack className="item">
              <Stack className="item-title">
                <Box>
                  <img src="/img/new/lie-to-me.webp" alt=""/>
                </Box>
                <Stack className="names">
                  <span>The Great Gatsby</span>
                  <p>F. Scott Fitzgerald</p>
                </Stack>
              </Stack>
              <Stack className="item-price">
                <span>$17.50</span>
                <p>Qty: 1</p>
              </Stack>
            </Stack>
            <Stack className="item">
              <Stack className="item-title">
                <Box>
                  <img src="/img/new/lie-to-me.webp" alt=""/>
                </Box>
                <Stack className="names">
                  <span>The Great Gatsby</span>
                  <p>F. Scott Fitzgerald</p>
                </Stack>
              </Stack>
              <Stack className="item-price">
                <span>$17.50</span>
                <p>Qty: 1</p>
              </Stack>
            </Stack>
            
          </Stack>
          <Stack className="sums">
            <Stack className="cost">
              <span>Subtotal (3 items)</span>
              <p>$ 52.50</p>
            </Stack>
            <Stack className="cost">
              <span>Shipping</span>
              <p>Free</p>
            </Stack>
            <Stack className="total">
              <span>Total</span>
              <p>$ 52.50</p>
            </Stack>
          </Stack>
        </Stack>
      </Stack> */}
    </TabPanel>
  )
}