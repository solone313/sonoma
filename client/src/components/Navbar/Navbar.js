import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { logOutUser } from '../../store/actions/authActions';
import './styles.css';

const Navbar = ({ auth, logOutUser, history }) => {
  const onLogOut = (event) => {
    event.preventDefault();
    logOutUser(history);
  };

  return (
    <nav className="navbar">
      <h2 className="logo">SONOMA</h2>
      <ul className="nav-links flex-1">
        <li className="nav-item">
          <Link to="/">홈</Link>
        </li>
        {auth.isAuthenticated ? (
          <>
            <li className="nav-item">
              <Link to="/users">멤버관리</Link>
            </li>
            <li className="nav-item">
              <Link to="/empty">세팅관리</Link>
            </li>
            <li className="nav-item">
              <Link to="/empty">접수관리</Link>
            </li>
            <li className="nav-item">
              <Link to="/empty">접수통계</Link>
            </li>
            <li className="nav-item">
              <Link to="/empty">공정관리</Link>
            </li>
            <li className="flex-1" />
            <img className="avatar" src={auth.me.avatar}/>
            <li className="nav-item">
                <Link to={`/${auth.me.username}`}>내 정보</Link>
              </li>
            <li className="nav-item" onClick={onLogOut}>
              <a href="#">로그아웃</a>
            </li>
          </>
        ) : (
          <>
            <li className="flex-1" />

            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(withRouter, connect(mapStateToProps, { logOutUser }))(Navbar);
