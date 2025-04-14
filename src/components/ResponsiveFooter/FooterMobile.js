import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import FooterData from '../../bento/globalFooterData';
const FooterStyled = styled.footer`
  background-color: #1B496E;
  bottom: 0;
  width: 100%;
  z-index: 10;
  position: relative;
`;


const FooterContainer = styled.div`
  max-width: 1420px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const FooterEmailSignupContainer = styled.form`
  padding: 1rem 1rem 2rem 1rem;
  .signUpTitle {
    font-family: poppins;
    font-weight: 700;
    font-size: 22.88px;
    line-height: 34px;
    color: #FFFFFF;
    margin-bottom: 1rem;
    margin-top: 0;
  }

  .enterTitle {
    font-family: Open Sans;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #FFFFFF;
    margin-bottom: 10px;
  }

  .signUpInputBox {
    width: 100%;
    height: 47px;
    font-size: 25px;
    padding-left: 8px;
  }

  .signUpInputBox:focus {
    outline: 0.25rem solid #2491ff;
  }

  .signUpButton {
    width:100%;
    background: #FACE00;
    border-radius: 8px;
    border: 0;
    padding: 9px 16px;
    font-family: Open Sans;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    color: #14315C;
    margin-top: 18px;
  }

  .signUpButton:hover {
    cursor: pointer;
  }

  .errorEmail {
    background: #e41154;
    padding: 10px 5px 5px 5px;

    .signUpInputBox {
      outline: 0.25rem solid #2491ff;
      outline-offset: 5px;
    }
  }

  .ErrorBorder {
    position: relative;
    border-left: 0.25rem solid #e41154;
    padding-left: 1rem;
    left: -20px;
  }
`;

const FooterLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  .footItem {
    width: 253px; 
  }

  .footItemTitle {
    font-family: Open Sans;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 10px;
  }

  .footItemSubtitle {
    margin-bottom: 10px;
    max-width: 180px;
  }

  .footItemLink {
    font-family: Open Sans;
    color: #FFFFFF;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    text-decoration: none;
  }

  .footItemLink:hover {
    text-decoration: underline;
  }

  .dropbtn {
    display:flex;
    flex-direction: row;
    vertical-align: middle;
    text-align: left;
    background-color: #1B496E;
    width: 100%;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    color: #FFFFFF;
    padding: 1rem 0.5rem 1rem 0.5rem;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }

  .dropdown {
    position: relative;
    display: inline-block;
    border-bottom: 1px solid black;
  }

  .dropdown-content {
    display: none;
    z-index: 1;
  }

  .dropdown-content a {
    color: white;
    padding: 0 0 1rem 1rem;
    text-decoration: none;
    display: block;
    width: fit-content;
  }


  .show {
    display:block;
  }

  .arrow {
    margin-right: 0.25rem;
  }
  .rotate{
    transform: rotate(90deg); 
  }
`;

const BottomFooter = styled.div`
 background: #14315C;

  span {
    display: block;
  }

  .bottom-footer-container {
    display: flex;
    flex-flow: wrap;
    flex-direction: column;
    justify-content: space-between;
    max-width: 1420px;
    margin-left: auto;
    margin-right: auto;
    height: fit-content;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    padding-left: 1rem;
  }

  .break {
    order: 2;
    width: 100%;
    flex-basis: 100%;
    height: 2rem;
    margin: 0;
    border: 0;
    display: none;
  }

  .logoText {
    text-decoration: none;
    white-space: nowrap;
  }

  .logoUpperText {
    font-family: poppins;
    font-weight: 700;
    font-size: 24.96px;
    line-height: 37px;
    color: #FFFFFF;
    margin: 0;
  }

  .logoLowerText {
    font-family: poppins;
    font-weight: 400;
    font-size: 18.72px;
    color: #FFFFFF;
  }

  #bottom-footer-contact-us {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 22.88px;
    line-height: 34px;
    text-align: left;
    color: #FFFFFF;
    order: 1;
    margin-top: 1.5rem;
  }

  #bottom-footer-contact-links {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.6;
    color: #FFFFFF;
    margin-top: 0.25rem;
  }

  #bottom-footer-contact-links a {
    text-decoration: none;
    color: #FFFFFF;
    display: block;
    margin-left: 0px;
    margin-right: 10px;
    line-break: anywhere;
  }


  #bottom-footer-follow-us {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 22.88px;
    line-height: 34px;
    color: #FFFFFF;
    order: 3;
    margin-top: 1rem;
  }

  #bottom-footer-follow-us-links {
    margin-top: 1rem;
  }

  .bottom-footer-social-media-imgs {
    margin-left: 10px;
  }

  #bottom-footer-gov-links {
    order: 4;
  }

  #bottom-footer-gov-links a {
    text-decoration: none;
    display: block;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.6;
    text-align: left;
    color: #FFFFFF;
  }

  #bottom-footer-follow-us-links {
        margin-top: 0.75rem;
  }

  #bottom-footer-gov-links {
      margin-right: 0px;
      margin-top: 0.75rem;
  }

  .contactUs {
    margin: 0;
  }
`;

const FooterMobile = () => {
  const [errorClass, setErrorClass] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const emailForm = useRef();

  function validateEmail(email) {
    var reg = /^[A-Za-z0-9]+([_.-][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
    return reg.test(email);
  }

  const handleSubmit = (e) => {
    console.log("Handle click")
    if (!validateEmail(emailContent)) {
      setErrorClass("errorEmail");
      e.preventDefault();
    } else {
      setErrorClass("");
      emailForm.current.submit();
    }
  }


  const handleChange = (e) => {
    setEmailContent(e.target.value);
  }
  const handleDropdown = (param) => {
    document.getElementById(`${param}Dropdown`).classList.toggle("show");
    document.getElementById(`${param}Arrow`).classList.toggle("rotate");
  }

  return (
    <>
      <FooterStyled role="contentinfo">
        <FooterContainer>
          <FooterLinksContainer>
            {
              FooterData.link_sections.map((linkItem, linkidx) => {
                const linkkey = `link_${linkidx}`;
                return (
                  <div className='dropdown' key={linkkey}>
                    <button onClick={() => handleDropdown(linkkey)} className="dropbtn">
                      <svg id = {linkkey + "Arrow"} className = "arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                      </svg>
                      {linkItem.title}
                    </button>
                    <div id={linkkey + "Dropdown"} className="dropdown-content">
                      {
                        linkItem.items.map((item, itemidx) => {
                          const itemkey = `item_${itemidx}`;
                          return (
                            item.link.includes('http') || item.openNewTab === 'true' ? 
                              <a className='footItemLink' key={itemkey} href={item.link} target="_blank" rel="noopener noreferrer">{item.text}</a>
                              :
                              <a className='footItemLink' key={itemkey} href={item.link}>{item.text}</a>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
          </FooterLinksContainer>
          <FooterEmailSignupContainer  onSubmit={handleSubmit} ref={emailForm} action="https://public.govdelivery.com/accounts/USNIHNCI/subscribers/qualify" ariaLabel="Footer subscribe" method="post" target="_blank" id="signup_mobile" noValidate>
              <input type="hidden" name="topic_id" id="topic_id" value="USNIHNCI_223" />
              <h4 className='signUpTitle'>
                Sign up for email updates
              </h4>
              <div className={errorClass !== "" ? 'ErrorBorder' : null}>
                <div className='enterTitle'>
                  <label htmlFor="email_mobile"> Enter your email address</label>
                </div>
                <div className={errorClass}>
                  {errorClass !== "" ? <div className='enterTitle'>Enter a valid email address</div> : null}
                  <input id="email_mobile" type="email" name="email" className='signUpInputBox' value={emailContent} onChange={e => handleChange(e)} />
                </div>
              </div>
              <button type="submit" className='signUpButton'>
                Sign up
              </button>
            </FooterEmailSignupContainer>
        </FooterContainer>
      </FooterStyled>
      <BottomFooter>
        <div className="bottom-footer-container">
          <div id="bottom-footer-header">
            <a className='logoText' href="https://www.cancer.gov" target="_blank" rel="noopener noreferrer">
              <h4 className='logoUpperText'>National Cancer Institute</h4>
              <div className='logoLowerText'>at the National Institutes of Health</div>
            </a>
          </div>
          <div id="bottom-footer-contact-us">
            <h4 className='contactUs'>Contact Us</h4>
            <div id="bottom-footer-contact-links">
              {
                FooterData.contact_links.map((contactItem, contactidx) => {
                  const contactkey = `contact_${contactidx}`;
                  return (
                    contactItem.link.includes('http') ?
                      <a key={contactkey} href={contactItem.link} target="_blank" rel="noopener noreferrer">{contactItem.text}</a>
                      :
                      <a key={contactkey} href={contactItem.link}>{contactItem.text}</a>
                  )
                })
              }
            </div>
          </div>
          <div className="break"></div>
          <div id="bottom-footer-follow-us">
            Follow Us
            <div id="bottom-footer-follow-us-links">
              {
                FooterData.followUs_links.map((followItem, followidx) => {
                  const followkey = `follow_${followidx}`;
                  return (
                    <a key={followkey} className={followidx !== 0 ? "bottom-footer-social-media-imgs" : ""} href={followItem.link} target="_blank" rel="noopener noreferrer"><img src={followItem.img} alt={followItem.description} /></a>
                  )
                })
              }
            </div>
          </div>
          <div id="bottom-footer-gov-links">
            {
              FooterData.global_footer_links.map((linkItem, idx) => {
                const linkitemkey = `linkitem_${idx}`;
                return (
                  <a key={linkitemkey} href={linkItem.link} target="_blank" rel="noopener noreferrer">{linkItem.text}</a>
                )
              })
            }
          </div>
        </div>
      </BottomFooter>
    </>
  )
};

export default FooterMobile;
