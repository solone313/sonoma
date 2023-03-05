import React from 'react';

import './styles.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <span className="username">@hojin</span>
        <iframe
          src="https://github.com/solone313/nomadbook"
          frameBorder="0"
          scrolling="0"
          width="160px"
          height="30px"
        ></iframe>
      </div>
    </div>
  );
};

export default Footer;
