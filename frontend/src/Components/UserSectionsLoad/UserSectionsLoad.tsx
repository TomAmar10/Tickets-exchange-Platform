import "./UserSectionsLoad.scss";

function UserSectionsLoad(): JSX.Element {
  return (
    <div className="UserSectionsLoad">
      <div className="about-user">
        <span className="line"></span>
      </div>
      <div className="user-profile-sections">
        <div className="sections-container">
          <div className="section">
            <h5 className="header">{""}</h5>
            <div className="content"></div>
          </div>
          <div className="section">
            <h5 className="header">{""}</h5>
            <div className="content"></div>
          </div>
        </div>
        <div className="sections-container">
          <div className="section">
            <h5 className="header">{""}</h5>
            <div className="content"></div>
          </div>
          <div className="section">
            <h5 className="header">{""}</h5>
            <div className="content"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSectionsLoad;
