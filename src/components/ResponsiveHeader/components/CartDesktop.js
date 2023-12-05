import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Tooltip,
  Box,
} from '@material-ui/core';
import styled from 'styled-components';
import { navBarCartData } from '../../../bento/globalHeaderData';

const CartContainer = styled.div`
  position: absolute;
  top: 12px;
  right: calc(50% - 710px);
  z-index: 9999;

  @media (max-width: 1430px) {
    right: 0;
  }

  .logotype {
    white-space: nowrap;
    border: 0px;
    cursor: pointer;
    margin: 0px;
    display: inline-flex;
    padding: 6px 32px 0px 5px;
    position: relative;
    align-items: center;
    line-height: 1.75;
    text-transform: uppercase;
    vertical-align: middle;
    justify-content: center;
    text-decoration: none;
    background-color: transparent;

    &:hover, &:focus: {
      border-radius: 0
    },
  }

  .myFilesText {
    color: #585C65;
    font-family: poppins;
    font-size: 14px;
    font-weight: 600;
    line-height: 21px;
    padding-top: 10px;
  }

  .cartIcon {
    height: 55px;
    margin: 0px 0px 0px 6px;
    z-index: 10000;
  }

  .cartLabelText {
    text-decoration: none;
    color: #FFFFFF;
    font-family: poppins;
    text-transform: UPPERCASE;
    font-size: 13px;
  }

  .badge {
    display: inline-flex;
    position: relative;
    vertical-align: middle;
  }

  .cartCounter2Wrapper {
    margin-top: 6px;
    margin-left: 3px;
  }

  .cartCounter2 {
    height: 15px;
    font-size: 11px;
    line-height: 16px;
    min-width: 17px;
    text-align: center;
    font-weight: 600;
    background: #24415C;
    border-radius: 5px;
    margin: 2px 6px 0 -19px;
    padding-left: 3px;
  }

  .cartLabel {
    height: 14px;
    min-width: 16px;
    color: #585C65;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-align: start;
    font-size: 12px;
  }
`;

const Cart = (props) => {
  const { length: numberOfCases } = props.filesId;
  
  useEffect(() => {
  }, []);

  return (
    <CartContainer>
      {
        navBarCartData && (
          <Box id="button_navbar_mycases" className="logotype">
              <NavLink
                className="cartLabelText"
                to={navBarCartData.cartLink}
              >
                {navBarCartData.cartLabel}
                <Tooltip title="Files" placement="bottom-end">
                  <span className="badge">
                  <div className='myFilesText'>MY FILES</div>
                    <img
                      className="cartIcon"
                      src={navBarCartData.cartIcon}
                      alt={navBarCartData.cartIconAlt}
                    />
                    {navBarCartData.cartLabelType === "labelUnderCount" ? (
                      <div className="cartCounter2Wrapper">
                        <div className="cartCounter2">
                          {numberOfCases}
                        </div>
                        <div className="cartLabel">
                          Files
                        </div>
                      </div>
                    ) : (
                      <span className="badge">
                        <span className="cartCounter">
                          {numberOfCases}
                        </span>
                      </span>
                    )}
                  </span>
                </Tooltip>
              </NavLink>
          </Box>
        )
      }
    </CartContainer>
  );
};


const mapStateToProps = (state) => ({
  filesId: state.cartReducer.filesId,
});

export default connect(mapStateToProps, null)(Cart);