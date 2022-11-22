import React, { useCallback, useEffect, useState } from "react";
import "./Dashboard.css";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "./CommonMaps";
import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import {
  Badge,
  Button,
  Card,
  Frame,
  Heading,
  Page,
  SkeletonPage,
  Tabs,
  TextStyle,
} from "@shopify/polaris";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useFetch([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(0);
  const [repositories, setRepositories] = useFetch([]);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "Overview",
      content: (
        <span>
          <Heading>Overview</Heading>
        </span>
      ),
      details: (
        <span>
          <img
            className="commonPic"
            src="https://www.apple.com/newsroom/images/live-action/wwdc/Apple_wwdc21_newsroom_homepage_tile_033021.jpg.og.jpg?202208260758"
            alt=""
          />
          <h1>Hi, I am {userData.name !== undefined && userData.name}</h1>
          <p>
            I'm a software engineer who is passionate about making contributing
            to open-source more approachable, creating technology to elevate
            people, and building community. Some technologies I enjoy working
            with include ReactJS, Jamstack (JavaScript, APIs + Markup) and
            GraphQL. In 2020, I was selected to be an inaugural GitHub Star
            star2 based on my involvement in the tech community. My interest in
            the React ecosystem led me to launch React Robins, a community for
            women and non-binary ReactJS developers.We know new problems are
            nothing but the possibilities of learning something new. I know that
            facing many technical problems can broaden our technical knowledge.
            We learn every day about how to use technology in the best way.
          </p>
          <br />
          <Heading>Find me around the web 🌎 </Heading>
          <ul>
            <li>
              Learning in the public or on{" "}
              <a target="blank" href="https://www.twitch.tv/">
                Twitch.
              </a>
            </li>
            <li>
              Twinkering with interaction on{" "}
              <a target="blank" href="https://codepen.io">
                Codepen.
              </a>
            </li>
          </ul>
        </span>
      ),
      accessibilityLabel: "Overview",
      panelID: "overview-content-1",
    },
    {
      id: "Repositories",
      content: (
        <span>
          <Heading>
            Repositories <Badge status="new"> {repositories.length === 0 ? '0' : repositories.length >= 30 ? "30+" : repositories.length}</Badge>
          </Heading>
        </span>
      ),
      details: (
        <span>
          {repositories.length !== 0 &&
            repositories.map((item, index) => 
            <Card key={index} title={item.name} sectioned >
              <Badge>{item.visibility}</Badge>
              <br />
              <i className="fa-regular fa-star"> {item.stargazers_count}</i>
              <br />
              <TextStyle variation="subdued">{item.description!==null ? item.description : 'No description available'}</TextStyle>
              <Page>
              <Button><a href={item.html_url} target="blank">View Repository</a></Button>
              </Page>
            </Card>)
            }
        </span>
      ),
      panelID: "Repositories-content-1",
    },
    {
      id: "Projects",
      content: (
        <span>
          <Heading>Projects</Heading>
        </span>
      ),
      details:(
        <h1 style={{fontSize: '1.5vw', fontWeight: '900'}}>No Projects Found !!!</h1>
      ),
      description: (
        <span>

        </span>
      ),
      panelID: "Projects-content-1",
    },
  ];

  useEffect(() => {
    setLoading(true);
    var loginName = sessionStorage.getItem("user");
    if (loginName === null) {
      navigate("/");
    } else {
      props.saveCredentials(loginName);
    }
  }, []);



  useEffect(() => {
    if (props.name === "") return;
    setUserData(`https://api.github.com/users/${props.name}`);
  }, [props.name]);



  useEffect(() => {
    if (userData.length === 0) return;
    setLoading(false);
    setRepositories(userData.repos_url);
  }, [userData]);



  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUserData("clear");
    setRepositories("clear");
    props.saveCredentials('')
    navigate("/");
  };

  console.log(repositories);
  return (
    <div className="Dashboard">
      <div className="Navbar">
        <img
          src="https://user-images.githubusercontent.com/59932098/104577259-8ea22080-5659-11eb-8efe-43e03c3b490f.png"
          alt=""
        />
        <input type="text" placeholder="Search or jump to..." />
        <h1>Pull Requests</h1>
        <h1>Issues</h1>
        <h1>Marketplace</h1>
        <h1>Explore</h1>
        <i className="fa-solid fa-bell"></i>
        {!loading && (
          <img src={userData.avatar_url} alt="" className="avatar" />
        )}
        {!loading && (
          <i
            className="fa-solid fa-right-from-bracket"
            onClick={handleLogout}
          ></i>
        )}
      </div>
      {loading ? (
        <Frame>
          <SkeletonPage lines={50} />
        </Frame>
      ) : (
        <div className="RowArea">
          <div className="leftArea">
            <img src={userData.avatar_url} alt="" />
            <h1>{userData.name === null ? "" : userData.name}</h1>
            <h2>{userData.login}</h2>
            <button>Follow</button>
            <h3>{userData.bio !== null ? userData.bio : ""}</h3>
            <h4>
              <i className="fa-solid fa-user-group"></i>
              <span className="dark">{userData.followers}</span> followers .{" "}
              <span className="dark">{userData.following}</span> following
            </h4>
            <h4>
              <i className="fa-solid fa-location-dot"></i>{" "}
              {userData.location === null ? "" : userData.location}
            </h4>
          </div>
          <div className="rightArea">
            <Card>
              <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                <Card.Section>
                  {tabs[selected].details}
                </Card.Section>
              </Tabs>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
