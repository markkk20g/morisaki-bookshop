import React, { useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import { Messages, serverApi } from "../../../libs/config";
import { MemberUpdateInput } from "../../../libs/types/member";
import { T } from "../../../libs/types/common";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../libs/sweetAlert";
import MemberService from "../../services/MemberService";
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import "../../../css/users.css";
import "../../../css/card.css";
import { OrderStatus } from "../../../libs/enums/order.enum";
import { Order, OrderInquery, OrderItem } from "../../../libs/types/order";
import OrderService from "../../services/OrderService";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setFinishedOrders } from "../ordersPage/slice";
import { retrieveFinishedOrders } from "../ordersPage/selector";
import { useDispatch, useSelector } from "react-redux";
import { MemberType } from "../../../libs/enums/member.enum";
import { orderDateFormatted } from "../../../libs/common";
import { Product } from "../../../libs/types/product";
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import "../../../css/users.css";
import "../../../css/card.css";

const actionDispatch = (dispatch: Dispatch) => ({
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({finishedOrders})
);

export default function UsersPage() {
  const history = useHistory();
  const { authMember, setAuthMember } = useGlobals();
  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage ? `${serverApi}/${authMember.memberImage}` 
    : "/img/avatar.jpg" 
  );
  const { setFinishedOrders } = actionDispatch(useDispatch());
  const { finishedOrders } = useSelector(finishedOrdersRetriever);
  

  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>({
    memberNick: authMember?.memberNick,
    memberPhone: authMember?.memberPhone,
    memberAddress: authMember?.memberAddress,
    memberDesc: authMember?.memberDesc,
    memberImage: authMember?.memberImage, 
  });

  const [orderInquiry, setOrderInquiry] = useState<OrderInquery>({
    page: 1,
    limit: 3,
    orderStatus: OrderStatus.FINISH,
  });

  useEffect(() => {
    const order = new OrderService();

    order.getMyOrders({...orderInquiry, orderStatus: OrderStatus.FINISH})
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry])

  /*********  HANDLERS  *********/
  const memberNickHandler = (e: T) => {
    memberUpdateInput.memberNick = e.target.value;
    setMemberUpdateInput({...memberUpdateInput});
  };

  const memberPhoneHandler = (e: T) => {
    memberUpdateInput.memberPhone = e.target.value;
    setMemberUpdateInput({...memberUpdateInput});
  };

  const memberAddressHandler = (e: T) => {
    memberUpdateInput.memberAddress = e.target.value;
    setMemberUpdateInput({...memberUpdateInput});
  };

  const memberDescHandler = (e: T) => {
    memberUpdateInput.memberDesc = e.target.value;
    setMemberUpdateInput({...memberUpdateInput});
  };

  const handleSubmitButton = async () => {
    try {
      if(!authMember) throw new Error(Messages.error2);

      if(
        memberUpdateInput.memberNick === '' ||
        memberUpdateInput.memberPhone === '' ||
        memberUpdateInput.memberAddress === '' ||
        memberUpdateInput.memberDesc === ''
      ) {
        throw new Error(Messages.error3);
      };

      const member = new MemberService();
      const result = await member.updateMember(memberUpdateInput);
      setAuthMember(result);

      await sweetTopSmallSuccessAlert('Successfully modified!', 700);
    } catch(err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  }

  const handleImageViewer = (e: T) => {
    const file = e.target.files[0];
    console.log('file:', file);

    const fileType = file.type;
    const validateImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];

    if(!validateImageTypes.includes(fileType)) {
      sweetErrorHandling(Messages.error5).then();
    } else {
      if(file) {
        memberUpdateInput.memberImage = file;
        setMemberUpdateInput({...memberUpdateInput});
        setMemberImage(URL.createObjectURL(file));
      }
    }
  }

  if(!authMember) history.push('/');
  return (
    <div className="my-page">
      <Container className="my-screen">
        <Stack className="user-details">
          <Box className="avatar">
            <div className="shape"></div>
            <img src={authMember?.memberImage ? `${serverApi}/${authMember?.memberImage}` : "/img/avatar.jpg" } alt=""/>
            <Box className="user-badge">
              <img 
                className="badge-img"
                src={authMember?.memberType === MemberType.ADMIN 
                ? '/icons/verified.png' : '/icons/not-verified.png'} 
                
              />
            </Box>
          </Box>
          <Stack className="user-info">
            <Stack className="name-type">
              <p>{authMember?.memberType}</p>
              <span>{authMember?.memberNick}</span>
            </Stack>
            <Stack className="address">
              <span>
                {authMember?.memberAddress 
                ? authMember.memberAddress 
                : "no address given yet"}
              </span>
              <p>
                {authMember?.memberDesc 
                ? authMember.memberDesc 
                : "no description given yet"}
              </p>
            </Stack>
          </Stack>
        </Stack>
        <Stack className="order-details">
          <Stack className="buttons" onClick={() => history.push('/orders')}>
            <div className="icon"><ListAltOutlinedIcon /></div>
            <Stack className="detail">
              <span>View All Orders</span>
              <p>Track and manage history</p>
            </Stack>
          </Stack>
          <Stack className="buttons">
            <div className="icon"><PaymentsOutlinedIcon /></div>
            <Stack className="detail">
              <span>Payment Methods</span>
              <p>Manage cards & bills</p>
            </Stack>
          </Stack>
          <Stack className="buttons">
            <div className="icon"><FmdGoodOutlinedIcon /></div>
            <Stack className="detail">
              <span>Addresses</span>
              <p>Default shipping & pickup</p>
            </Stack>
          </Stack>
        </Stack>
        <Stack className="form-history">
          <Stack className="form-frame">
            <Stack className="header">
              <span>Account Settings</span>
              <p>UPDATE YOUR USER PROFILE</p>
            </Stack>
            <Stack className="form">
              <Stack className="img-upload">
                <Box className="img-frame">
                  <img src={memberImage} alt=""/>
                </Box>
                <Stack className="upload-form">
                  <form>
                    <span>Upload Image</span>
                    <p>JPG, JPEG, PNG formats only allowed!</p>
                    <Button component={'label'} onChange={handleImageViewer}>
                      <DriveFolderUploadOutlinedIcon sx={{marginLeft: '-11px'}}/>
                      <span style={{marginLeft: '7px'}}>upload</span>
                      <input 
                        type="file"
                        // accept="image/*"
                        hidden
                        />
                    </Button>
                  </form>
                </Stack>
              </Stack>
              <Stack className="input-areas">
                <Box className="form-in">
                  <span>username</span>
                  <input 
                    type="text"
                    placeholder={authMember?.memberNick}
                    value={memberUpdateInput.memberNick}
                    name="memberNick"
                    onChange={memberNickHandler}
                  />
                </Box>
                <Box className="form-in">
                  <span>phone</span>
                  <input 
                    type="text"
                    placeholder={authMember?.memberPhone}
                    value={memberUpdateInput.memberPhone}
                    name="memberPhone"
                    onChange={memberPhoneHandler}
                  />
                </Box>
                <Box className="form-in">
                  <span>address</span>
                  <textarea 
                    name="memberAddress" 
                    rows={4} 
                    placeholder={authMember?.memberAddress ? authMember.memberAddress : 'no address given yet'}
                    value={memberUpdateInput.memberAddress}
                    onChange={memberAddressHandler}
                  >          
                  </textarea>
                </Box>
                <Box className="form-in">
                  <span>Description</span>
                  <textarea 
                    name="memberDesc" 
                    rows={4} 
                    placeholder={authMember?.memberDesc ? authMember.memberDesc : 'no description given yet'}
                    value={memberUpdateInput.memberDesc}
                    onChange={memberDescHandler}
                  >
                    
                  </textarea>
                </Box>
                <Box>
                  <Button 
                    className="button"
                    onClick={handleSubmitButton}
                  >
                    Save Changes
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Stack>
          <Stack className="order-history">
            <Stack className="header">
              <Stack className="title">
                <span>Recent Orders</span>
                <p>YOUR RECENTLY ACQUIRED PRODUCTS</p>
              </Stack>
              <a href="/orders">VIEW ALL</a>
            </Stack>
            <Stack className="past-orders">
              {finishedOrders?.map((order: Order) => {
                const totalItems = order.orderItems.reduce((sum, item) => {
                  return sum + item.itemQuantity
                }, 0);
                return (
                  <Stack key={order._id} className="past-card">
                    <Stack className="content">
                      <Stack className="head">
                        <Stack className="title">
                          <span>{order?.orderNumber}</span>
                          <Stack className="order-status">
                            <p>{orderDateFormatted(order?.updatedAt)}</p>
                            <TaskAltOutlinedIcon style={{color: 'rgba(0, 108, 73, 1)', fontSize: '17px'}}/>
                            <p>{order?.orderStatus}</p>
                          </Stack>
                        </Stack>
                        <Stack className="totals">
                          <p>$ {order.orderTotal.toFixed(2)}</p>
                          <span>Total</span>
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
                      </Stack>
                      {/* <Stack className="sums">
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
                      </Stack> */}
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}