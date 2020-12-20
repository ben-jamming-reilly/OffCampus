import React from "react";
import Image from "react-bootstrap/Image";

const Landing = () => {
  return (
    <div className='container'>
      <br />
      <h1 className='text-center'>By: Benjamin Reilly & Makoto Kewish</h1>
      <br />
      <h4>
        RateMyLandLord is the newest and brighest way of finding affordable and
        acceptable housing. No longer are the days of struggling to find quality
        housing in the Logan neighborhood. With this WApp (Web Application),
        finding quality housing has never been easier.
      </h4>
      <br />
      <h4>
        Simply use our search feature to find an list of all the houses our site
        offers. Can't find your house? Well, feel free to make an account and
        leave a review of your own house. Seen a house you previously lived at?
        Use that same account to leave a review. And while you're at it, like
        another review if you think it's really rad.
      </h4>
      <br />
      <h4>Officialy non-affiliated with Gonzaga University... for now</h4>
      <br />
      <div className='text-center'>
        <Image
          src={
            "https://media.spokesman.com/photos/2018/08/29/Logan-neighborhood.jpg"
          }
        />
      </div>
      <br />
      <br />
    </div>
  );
};

export default Landing;
