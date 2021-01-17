import React from 'react';
import styled from 'styled-components';

const FooterStyle = styled.div`
    display: flex;
    justify-content: center;
    
    
    p {
        background-color: rgb(0, 128, 96);
        color: #FFF;
        text-align: center;
        font-size: 3rem;
        padding: 20px;
        width: 100%;
    }

    a {
        color: rgb(251, 158, 85);
    }

    @media (max-width: 420px) {
        p {
            font-size: 2rem;
        }
    }
`;


const Footer = () => {
    return (
        <FooterStyle>
            <p>&#169; Future Employee of <span><a href="https://www.shopify.ca">Spotify</a></span> 🙏 <span><a href="http://www.ryantjong.com/">Ryan Tjong's Website</a></span></p>
        </FooterStyle>
    );
};

export default Footer;