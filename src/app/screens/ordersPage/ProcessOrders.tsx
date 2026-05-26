import React from "react";
import { Box, Button, Stack } from "@mui/material";
import TabPanel from '@mui/lab/TabPanel';
import { createSelector } from "@reduxjs/toolkit";
import { retrieveProcessOrders } from "./selector";
import { useSelector } from "react-redux";
import { useGlobals } from "../../hooks/useGlobals";
import { sweetErrorHandling } from "../../../libs/sweetAlert";
import OrderService from "../../services/OrderService";
import { Messages, serverApi } from "../../../libs/config";
import { T } from "../../../libs/types/common";
import { Order, OrderItem, OrderUpdateInput } from "../../../libs/types/order";
import { OrderStatus } from "../../../libs/enums/order.enum";
import { orderDateFormatted } from "../../../libs/common";
import { Product } from "../../../libs/types/product";

import "../../../css/card.css";
import "../../../css/orders.css";

/****************************************
             REDUX SELECTOR
*****************************************/
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({processOrders})
)

interface ProcessOrdersProps {
  setValue: (input: string) => void;
}

export default function ProcessOrders(props: ProcessOrdersProps) {
  const { setValue } = props;
  const { processOrders } = useSelector(processOrdersRetriever);
  const { authMember, setOrderBuilder } = useGlobals();

  /*********** HANDLERS *************/
  const finishOrderHandler = async (e: T) => {
  try {
    if(!authMember) throw new Error(Messages.error2);

    const orderId = e.target.value;
    const input: OrderUpdateInput = {
      orderId: orderId,
      orderStatus: OrderStatus.FINISH,
    };

    const confirmation = window.confirm('Have you received your order?');
    if(confirmation) {
      const order = new OrderService();
      await order.updateOrder(input);
      setValue('3');

      setOrderBuilder(new Date());
      // this rebuilds the order and refetch data
    }
    } catch(err) {
      console.log(err)
      sweetErrorHandling(err).then();
    }
  }

  
  return (
    <TabPanel value="2" sx={{padding: '0px'}}>
      <Stack>
        {processOrders?.map((order: Order) => {
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
                  <Stack className="butts">
                    <Button 
                      className="verify"
                      value={order._id}
                      onClick={finishOrderHandler}
                    >
                      Verify to fulfill
                    </Button>
                  </Stack>
                </Stack>
                <Stack className="orders">
                  {order?.orderItems?.map((item: OrderItem) => {
                    const product: Product = order.productData.filter(
                      (ele: Product) => item.productId === ele._id
                    )[0];
                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                    return (
                      <Stack key={item.productId} className="item">
                        <Stack className="item-title">
                          <Box>
                            <img src={imagePath} alt=""/>
                          </Box>
                          <Stack className="names">
                            <span>{product?.productName}</span>
                            <p>{product?.productAuthorName}</p>
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
                  </Stack> */}
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
          );
        })}
      </Stack>
    </TabPanel>
  )
}