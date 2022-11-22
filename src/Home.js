import React, { useEffect, useRef, useState } from "react";
import CardComponent from "./CardComponent";
import "./Home.css";
import useFetch from "./useFetch";
import { Card, SkeletonBodyText, SkeletonThumbnail } from "@shopify/polaris";

const Home = () => {
  const [user, setUser] = useFetch([]);
  const [isFetching, setIsFetching] = useState(false);
  const reference = useRef();

  var timer = useRef(null);

  // Searching Users
  const searchUsers = () => {
    setIsFetching(true);
    var query = reference.current.value;
    if (query.length === 0) {
      setIsFetching(false);
      setUser("clear");
      return;
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setUser(`https://api.github.com/users/${query}`);
      }, 1500);
    }
  };

  useEffect(() => {
    setIsFetching(false);
  }, [user]);

  console.log(user);
  return (
    <div className="Home">
      <h1>Get Github Profile Cards!!</h1>
      <input ref={reference} type="search" placeholder="Search a Github User" />
      <button onClick={searchUsers}>Search Now</button>
      {isFetching ? (
        <Card sectioned title="___________________________________________">
          <SkeletonThumbnail size="medium" />
          <SkeletonBodyText lines={5} />
        </Card>
      ) : user.length === 0 ? (
        <img src="https://lthub.ubc.ca/files/2021/06/GitHub-Logo.png" alt="" />
      ) : (
        <CardComponent
          photo={user.avatar_url}
          login={user.login}
          name={user.name}
          bio={user.bio}
          followers={user.followers}
          repositories={user.public_repos}
          following={user.following}
        />
      )}
    </div>
  );
};

export default Home;
