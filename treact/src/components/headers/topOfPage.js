import React, { useState, useEffect } from 'react';

import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import useAnimatedNavToggler from "../../helpers/useAnimatedNavToggler.js";
// import {Container as ContainerBase } from "components/misc/Layouts.js"

// import Login from "pages/Login.js"

import logo from "../../images/tooth.png";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";

// const Container = tw(ContainerBase)`bg-gray-900 text-gray-100 -mx-8 -mb-8`
const Header = tw.div`
  absolute
  p-5
  flex justify-between items-center
  w-screen // Forces the full width regardless of parent constraints
  bg-gradient-to-b from-gray-900 to-white // Gradient from gray-900 to white vertically
  text-gray-100
  fixed top-0 left-0 lg:z-1 // Set z-index to 0 to send it to the back

`;


export const NavLinks = tw.div`inline-block z-10`;

/* hocus: stands for "on hover or focus"
 * hocus:bg-primary-700 will apply the bg-primary-700 class on hover or focus
 */
export const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 z-10
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
`;

export const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-primary-500 text-gray-100 z-10
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
`;

export const LogoLink = styled(NavLink)`
  ${tw`flex z-10 items-center font-black border-b-0 text-2xl! ml-0!`};

  img {
    ${tw`w-10 mr-3`}
  }
`;

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between z-30 `;
export const NavToggle = tw.button`
  lg:hidden z-40 focus:outline-none hocus:text-primary-500 transition duration-300
`;
export const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-30 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white`}
  ${NavLinks} {
    ${tw`flex flex-col items-center `}
  }
`);

export const DesktopNavLinks = tw.nav`
  hidden lg:flex top-0 flex-1 justify-between items-center
  
`;

export default ({ roundedHeaderButton = false, logoLink, links, className, collapseBreakpointClass = "lg" , onOpenModal}) => {
  /*
   * This header component accepts an optionals "links" prop that specifies the links to render in the navbar.
   * This links props should be an array of "NavLinks" components which is exported from this file.
   * Each "NavLinks" component can contain any amount of "NavLink" component, also exported from this file.
   * This allows this Header to be multi column.
   * So If you pass only a single item in the array with only one NavLinks component as root, you will get 2 column header.
   * Left part will be LogoLink, and the right part will be the the NavLinks component you
   * supplied.
   * Similarly if you pass 2 items in the links array, then you will get 3 columns, the left will be "LogoLink", the center will be the first "NavLinks" component in the array and the right will be the second "NavLinks" component in the links array.
   * You can also choose to directly modify the links here by not passing any links from the parent component and
   * changing the defaultLinks variable below below.
   * If you manipulate links here, all the styling on the links is already done for you. If you pass links yourself though, you are responsible for styling the links or use the helper styled components that are defined here (NavLink)
   */
  // const defaultLinks = [
  //   <NavLinks key={4}>
  //     <NavLink href="/#">About</NavLink>
  //     {/* <NavLink href="/#">Blog</NavLink> */}
  //     <NavLink href="/#">Pricing</NavLink>
  //     <NavLink href="/#">Procedures</NavLink>
  //     {/* <NavLink href="/#">Contact Us</NavLink> */}


  //     <NavLink href="/#" tw="lg:ml-12!">
  //       Login
  //     </NavLink>
  //     <PrimaryLink css={roundedHeaderButton && tw`rounded-full`}href="/#">Sign Up</PrimaryLink>
  //   </NavLinks>
  // ];

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  // const [showLogin, setShowLogin] = useState(false);
  // const handleOpenLogin = () => {
  //   setShowLogin(true);
  // };

  // const handleCloseLogin = () => {
  //   setShowLogin(false);
  // };

  // const handleKeyDown = (event) => {
  //   if (event.key === 'Escape') {
  //     handleCloseLogin();
  //   }
  // };

  // useEffect(() => {
  //   if (showLogin) {
  //     // Add event listener for Escape key
  //     window.addEventListener('keydown', handleKeyDown);
  //   }

  //   return () => {
  //     // Cleanup the event listener
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [showLogin]);

  const collapseBreakpointCss = collapseBreakPointCssMap[collapseBreakpointClass];
 
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const defaultLogoLink = (
    <LogoLink href="/">
      <img src={logo} alt="logo" />
      cavity
    </LogoLink>
  );

  logoLink = logoLink || defaultLogoLink;

  // Styled component for the close button at the top-right of the mobile menu
  const CloseButton = styled.div`
  position: absolute;
  top: 9px;  // You can adjust the distance from the top
  right: 9px;  // You can adjust the distance from the right
  cursor: pointer;
  z-index: 999;  // Ensure it is above other content in the mobile menu
  `;

    // New state to track scroll position and visibility of the CloseIcon
    const [hideCloseIcon, setHideCloseIcon] = useState(false);

    // Scroll handler to track when to hide or show CloseIcon
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Hide CloseIcon when the user scrolls down, show it again when scrolling up
      if (scrollPosition > 150) {  // You can adjust the scroll threshold (50) as needed
        setHideCloseIcon(true);
      } else {
        setHideCloseIcon(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll); // Add scroll listener
  
      // Cleanup scroll event listener
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []); // Empty dependency array ensures this effect runs only once after the component mounts

    

//   links = links || defaultLinks;

  return (

    <>
 {/* <div     style={{
        position: 'absolute',    // Fixes the header to the top of the page
        top: 0,               // Position at the very top of the page
        left: 0,              // Align to the left edge of the viewport
        width: '100vw',       // Ensure the header spans the full width of the viewport
        maxWidth: '100vw',    // Ensure no max-width restrictions
        margin: 0,            // Remove any default margin
        padding: '0 16px',    // Add padding (adjust as needed)
        backgroundColor: '#1a202c', // bg-gray-900 equivalent
        color: '#edf2f7',     // text-gray-100 equivalent
        display: 'flex',      // Flexbox layout
        justifyContent: 'space-between', // Space between items
        alignItems: 'center', // Center the items vertically
        zIndex: 1000,           // Ensure it stays above other content
      }}>
        hi
 </div>
   */}

  <Header  >
      <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
        {logoLink}

        {/* <header className="fixed"> */}
          {/* <nav className="flex justify-around p-20"> */}

            <NavLinks key={3}>

              <NavLink href="/#Search">
              <button onClick={() => scrollToSection('search')} >Search</button>
              </NavLink>

              {/* <NavLink href="/#">Blog</NavLink> */}
              <NavLink href="/#Stats">
                <button onClick={() => scrollToSection('stats')} >Stats</button>
              </NavLink>

              <NavLink href="/#FAQ" >
              <button onClick={() => scrollToSection('faq')} >FAQ</button>
              </NavLink>

              {/* <NavLinks href="/#Home">
                <button onClick={() => scrollToSection('home')} >Home</button>
              </NavLinks> */}

              {/* <NavLink href="/#Procedures"> 
                <button onClick={() => scrollToSection('procedures')} >Procedures</button>
              </NavLink> */}

              <NavLink href="/Locations"> 
                <button onClick={() => scrollToSection('locations')} >Locations</button>
              </NavLink>

              {/* <NavLinks href="/#Features">
                <button onClick={() => scrollToSection('features')} >Features</button>
              </NavLinks> */}
              
              {/* <NavLink href="/#Footer">
              <button onClick={() => scrollToSection('footer')} >Newsletter</button>
              </NavLink> */}


              {/* <NavLink href="/#">Contact Us</NavLink> */}

              {/* <NavLink href="/#Login" tw="lg:ml-12!"> */}
                
              <>
              {/* <div> */}
      {/* <button onClick={onOpenModal} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Login
      </button> */}

      
    {/* </div> */}
                </>
                {/* <Login/> */}
              {/* </NavLink> */}
              <PrimaryLink onClick={onOpenModal} css={roundedHeaderButton && tw`rounded-full`}href="/#">Sign Up</PrimaryLink>
            </NavLinks>

          {/* <NavLinks ><button onClick={() => scrollToSection('home')} >Home</button>
            <button onClick={() => scrollToSection('FAQ')} >FAQ</button>
            <button onClick={() => scrollToSection('MainFeature')} >Main Feature</button>
            <button onClick={() => scrollToSection('footer')} >Footer</button>
            <button onClick={() => scrollToSection('search')} >Search</button>
            <button onClick={() => scrollToSection('features')} >Features</button>
            </NavLinks> */}
          {/* </nav> */}
        {/* </header> */}
      </DesktopNavLinks>

      <MobileNavLinksContainer css={collapseBreakpointCss.mobileNavLinksContainer}>
        {logoLink}

        {/* {showNavLinks && (
            <CloseButton onClick={toggleNavbar}>
              <CloseIcon tw="w-6 h-6 text-green-100" /> 
            </CloseButton>
          )} */}

        <MobileNavLinks initial={{ x: "150%", display: "none" }} animate={animation} css={collapseBreakpointCss.mobileNavLinks}>
          {/* {links} */}
          {/* <header className="fixed w-full bg-white shadow">
          <nav className="flex justify-around p-20">
            <button onClick={() => scrollToSection('home')} >Home</button>
            <button onClick={() => scrollToSection('FAQ')} >FAQ</button>
            <button onClick={() => scrollToSection('MainFeature')} >Main Feature</button>
            <button onClick={() => scrollToSection('footer')} >Footer</button>
            <button onClick={() => scrollToSection('search')} >Search</button>
            <button onClick={() => scrollToSection('features')} >Features</button>
          </nav>
        </header>

 */}

        <NavLinks key={8}>

        {hideCloseIcon && showNavLinks && (
            <CloseButton onClick={toggleNavbar}>
              <CloseIcon tw="w-6 h-6" onClick={toggleNavbar}/> 
            </CloseButton>
          )}
              <NavLink href="/#Search">
              <button onClick={() => scrollToSection('search')} >Search</button>
              </NavLink>
              {/* <NavLink href="/#">Blog</NavLink> */}

              <NavLink href="/#Stats">
                <button onClick={() => scrollToSection('stats')} >Stats</button>
              </NavLink>


              <NavLink href="/#FAQ" >
              <button onClick={() => scrollToSection('faq')} >FAQ</button>
              </NavLink>
              
              {/* <NavLinks href="/#Home">
                <button onClick={() => scrollToSection('home')} >Home</button>
              </NavLinks> */}


              {/* <NavLink href="/#Procedures"> 
                <button onClick={() => scrollToSection('procedures')} >Procedures</button>
              </NavLink> */}

              <NavLink href="/Locations"> 
                <button onClick={() => scrollToSection('locations')} >Locations</button>
              </NavLink>

              {/* <NavLinks href="/#Features">
                <button onClick={() => scrollToSection('features')} >Features</button>
              </NavLinks> */}
              {/* <NavLink href="/#Footer">
              <button onClick={() => scrollToSection('footer')} >Footer</button>
              </NavLink> */}


              {/* <NavLink href="/#">Contact Us</NavLink> */}

              {/* <NavLink href="/#" tw="lg:ml-12!">
                Login
              </NavLink>
              <PrimaryLink css={roundedHeaderButton && tw`rounded-full`}href="/#">Sign Up</PrimaryLink> */}
              <PrimaryLink onClick={onOpenModal} css={roundedHeaderButton && tw`rounded-full`}href="/#">Sign Up</PrimaryLink>

            </NavLinks>


        </MobileNavLinks>
        <NavToggle onClick={toggleNavbar} className={showNavLinks ? "open" : "closed"}>
        {!hideCloseIcon && (showNavLinks ? <CloseIcon tw="w-6 h-6" /> : <MenuIcon tw="w-6 h-6" />)}

          {/* {showNavLinks ? <CloseIcon tw="w-6 h-6" /> : <MenuIcon tw="w-6 h-6" />} */}
        </NavToggle>
      </MobileNavLinksContainer>
    </Header>

    {/* {showLogin && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          position: 'relative',
          // width: '400px', // Adjust width as necessary
        }}>
          <button onClick={handleCloseLogin} style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
          }}>
            X
          </button>
          <Login />
          JESLL
        </div>
      </div>
    )} */}
    </>

  );
};

/* The below code is for generating dynamic break points for navbar.
 * Using this you can specify if you want to switch
 * to the toggleable mobile navbar at "sm", "md" or "lg" or "xl" above using the collapseBreakpointClass prop
 * Its written like this because we are using macros and we can not insert dynamic variables in macros
 */

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  }
};
