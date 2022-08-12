import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

import {
  Close,
  Logo,
  Lock,
  ProjectSection,
  ProjectSectionTwo,
} from "../components";

import {
  navMenuLinks,
  navDropdownLinks,
  companyLogos,
  countries,
} from "../data";
import { useLayoutEffect } from "react";

const formInitialState = [
  { name: "name", value: "", error: "" },
  { name: "email", value: "", error: "" },
  { name: "message", value: "", error: "" },
];

const Home = () => {
  const [formState, setFormState] = useState(formInitialState);
  const [isLoading, setIsLoading] = useState(false);
  const navDropdownRef = useRef();
  const q = gsap.utils.selector(navDropdownRef);

  useLayoutEffect(() => {
    gsap.to(navDropdownRef.current, { display: "none" });
  }, []);
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const updatedState = formState.map((field) => {
      if (field.name === name) {
        return { ...field, value, error: "" };
      }
      return field;
    });
    setFormState(updatedState);
  };

  const closeNav = () => {
    gsap.to(navDropdownRef.current, {
      opacity: 0,
      duration: 0.5,
      display: "none",
      ease: "power2",
    });
  };

  const openNav = () => {
    gsap.to(navDropdownRef.current, {
      opacity: 1,
      duration: 0.5,
      display: "block",
    });

    gsap.fromTo(
      q(".navLink"),
      {
        x: 20,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        stagger: 0.1,
      }
    );

    gsap.fromTo(
      q(".country"),
      {
        x: -10,
        opacity: 0,
      },
      {
        x: 0,
        delay: 1,
        opacity: 1,
        stagger: 0.12,
        ease: "power2",
      }
    );
  };

  const handleFormSubmit = () => {
    const updatedFormState = formState.map((field) => {
      if (field.value === "") {
        return { ...field, error: "This field is required" };
      }
      return field;
    });
    const isFormValid = updatedFormState.every((field) => field.error === "");

    if (isFormValid) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setFormState(formInitialState);
        alert("Form submitted successfully");
      }, 2000);
    } else {
      setFormState(updatedFormState);
    }
  };

  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <main>
      <div className="bg-black flex justify-center">
        <nav className="xl:w-full px-12 h-28 xl:flex justify-between items-center">
          <div>
            <Logo />
          </div>
          <div className="relative flex justify-between items-center h-10 gap-20">
            <ul className="flex gap-12 text-white uppercase menu-list">
              {navMenuLinks.map((link) => (
                <li key={link}>
                  <Link to="/">{link}</Link>{" "}
                </li>
              ))}
            </ul>
            <div>
              <button onClick={openNav} className="menu-btn h-10">
                <svg
                  width="31"
                  height="9"
                  viewBox="0 0 31 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.31976 4.5C8.31976 6.70914 6.5289 8.5 4.31976 8.5C2.11062 8.5 0.319763 6.70914 0.319763 4.5C0.319763 2.29086 2.11062 0.5 4.31976 0.5C6.5289 0.5 8.31976 2.29086 8.31976 4.5Z"
                    fill="white"
                  />
                  <path
                    d="M19.5198 4.5C19.5198 6.70914 17.7289 8.5 15.5198 8.5C13.3106 8.5 11.5198 6.70914 11.5198 4.5C11.5198 2.29086 13.3106 0.5 15.5198 0.5C17.7289 0.5 19.5198 2.29086 19.5198 4.5Z"
                    fill="white"
                  />
                  <path
                    d="M30.7198 4.5C30.7198 6.70914 28.9289 8.5 26.7198 8.5C24.5106 8.5 22.7198 6.70914 22.7198 4.5C22.7198 2.29086 24.5106 0.5 26.7198 0.5C28.9289 0.5 30.7198 2.29086 30.7198 4.5Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </div>

      <div
        className={`hidden h-screen w-screen bg-black fixed top-28 xl:top-0 pt-9 px-12
        }`}
        ref={navDropdownRef}
      >
        <div className="flex justify-between items-center">
          <Logo />
          <button className="rounded-full p-3" onClick={closeNav}>
            <Close />
          </button>
        </div>
        <div className="relative">
          <div className="absolute text-white uppercase bg-black top-4 hidden xl:block">
            <p className="country text-gray-500">Landen</p>
            <ul>
              {countries.map((country, index) => (
                <li
                  key={index}
                  className="country transition delay-75 duration-100 ease-in-out hover:translate-x-4 country-select"
                >
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a href="#">{country}</a>
                </li>
              ))}
            </ul>
          </div>
          <ul className="mt-12 flex flex-col items-end gap-5 w-full">
            {navDropdownLinks.map((link, index) => (
              <li
                key={index}
                className="navLink text-white uppercase text-4xl xl:text-5xl w-full flex justify-end pb-3 border-b border-gray-500 menu-select"
              >
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="xl:hidden flex flex-col px-8">
        <div className="flex py-9 justify-center items-center  relative">
          <div className="absolute left-10">
            <Lock />
          </div>
          <input className=" bg-gray-200 h-12 w-full rounded-full px-11" />
        </div>
        <div className="flex justify-between items-center p-1 pb-4">
          <Logo fill="#000" />
          <button className="uppercase" onClick={openNav}>
            Menu
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-col-reverse">
        <header className="w-full hero bg-hero-image bg-cover pb-20 flex flex-col justify-end">
          <div className="w-full px-12 mx-auto">
            <div className="flex flex-col gap-8">
              <p className="uppercase font-MaisonNeue-Light text-white">Work</p>
              <p className="text-white text-2xl">
                A selection of projects that{" "}
                <span className="font-MaisonNeue-Bold">pioneer</span>
                <br /> <span className="font-MaisonNeue-Bold">
                  tech
                </span> and{" "}
                <span className="font-MaisonNeue-Bold">marketing</span> to help
                brands <br />
                stay ahead.
              </p>
            </div>
          </div>
        </header>
        <div className="w-full h-20 bg-black xl:bg-white">
          <div className="h-full xl:w-full px-5 xl:px-12 mx-auto text-sm xl:text-base">
            <div className="h-full flex xl:flex-row-reverse items-center justify-between text-xl font-MaisonNeue-Light">
              <div>
                <p>
                  <span className="text-stone-400">in </span>
                  <a href="/" className="xl:underline text-white xl:text-black">
                    all industries
                  </a>
                </p>
              </div>
              <div>
                <p>
                  <span className="text-stone-400">Show me </span>
                  <a href="/" className="xl:underline text-white xl:text-black">
                    all work
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ProjectSection
          bgImageOne="bg-swimming"
          bgImageTwo="bg-work"
          titleOne="A Summer island in the Netherlands"
          titleTwo="Not some average banking website"
          companyNameOne="bol.com"
          companyNameTwo="kempen"
        />
        <ProjectSection
          bgImageOne="bg-lights"
          bgImageTwo="bg-collage"
          titleOne="Beautiful design meets innovative technology"
          titleTwo="A 100 years of Mondriaan & De Stijl"
          companyNameOne="philips"
          companyNameTwo="GEMEENTEMUSEUM"
        />
      </div>

      <div>
        <ProjectSectionTwo
          bgImage="bg-think"
          title="Rethinking the entire online ecosystem."
          companyName="Florensis"
          articleOne={{
            text: "Tapping into Ireland’s unique gaming culture and bringing a fresh flavour to their Xbox social media channels",
            title: "microsoft",
          }}
          articleTwo={{
            text: "Integrating existing content into O’Neills’s new e-commerce platform",
            title: "oneill",
          }}
          articleThree={{
            text: "Tapping into Ireland’s unique gaming culture and bringing a fresh flavour to their Xbox social media channels",
            title: "microsoft",
          }}
        />
      </div>

      <div>
        <ProjectSection
          bgImageOne="bg-lamp"
          bgImageTwo="bg-illustration"
          titleOne="Delivering clarity on a global scale"
          titleTwo="Swipe to find out your next holiday destination"
          companyNameOne="be lightning"
          companyNameTwo="tui"
        />
      </div>

      <div>
        <ProjectSectionTwo
          switchOrder
          bgImage="bg-beach"
          title="Rethinking the entire online ecosystem."
          companyName="Florensis"
          articleOne={{
            text: "Starting with delivery through drones",
            title: "amazon",
          }}
          articleTwo={{
            text: "Integrating existing content into O’Neills’s new e-commerce platform",
            title: "oneill",
          }}
          articleThree={{
            text: "Tapping into Ireland’s unique gaming culture and bringing a fresh flavour to their Xbox social media channels",
            title: "microsoft",
          }}
        />
      </div>

      <div>
        <ProjectSection
          bgImageOne="bg-packs"
          bgImageTwo="bg-boateng"
          titleOne="A campaign for the limited edition packs"
          titleTwo="Live like a champion like Jerome Boateng"
          companyNameOne="chocomel"
          companyNameTwo="jbl"
        />

        <ProjectSection
          bgImageOne="bg-guys"
          bgImageTwo="bg-books"
          titleOne="Innovative SEO and content strategy for Zalando"
          titleTwo="The search of the most influential book ever"
          companyNameOne="zalando"
          companyNameTwo="KONINKLIJKE BIBLIOTHEEK"
        />
      </div>

      <div className="w-full bg-black px-10 py-24 text-xl flex items-center justify-center text-white font-MaisonNeue-Light">
        <div className="xl:w-2/3 w-full text-center">
          <p>
            “Dept helped us tell our story through a bold new identity and a
            robust online experience. To the tone of 60% growth in online
            bookings in just one month””
          </p>
          <p className="mt-8 text-base">MATTIJS TEN DRINK - CEO, TRANSAVIA</p>
        </div>
      </div>

      <div>
        <ProjectSection
          bgImageOne="bg-serverRoom"
          bgImageTwo="bg-food"
          titleOne="Delivering complex commerce solutions"
          titleTwo="Swipe to find your next holiday destination"
          companyNameOne="liberty global"
          companyNameTwo="arla"
        />
      </div>

      <div className="w-full bg-black px-10 py-24 text-xl flex flex-col text-white font-MaisonNeue-Light">
        <div className="w-full xl:w-5/6">
          <h2 className="text-2xl font-MaisonNeue-Light">Clients</h2>
          <p className="mt-4">
            We value a great working relationship with our clients above all
            else. It’s why they often come to our parties. It’s also why we’re
            able to challenge and inspire them to reach for the stars.
          </p>
        </div>
        <div className="w-full xl:w-2/3 mx-auto mt-20">
          <div className="flex items-center justify-center gap-32 flex-wrap">
            {companyLogos.map(({ name, url }, index) => (
              <div key={index}>
                <img src={url} alt={`${name}-logo`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-32 px-20 py-16 font-MaisonNeue-Light">
        <div className="flex">
          <p className="uppercase text-3xl xl:text-5xl xl:leading-normal w-full xl:w-80">
            Question? We are here to help!
          </p>
        </div>
        <div className="">
          <form action="">
            <div className="flex flex-col xl:flex-row gap-10">
              <div className="flex flex-col xl:w-80 relative">
                <label htmlFor="name" className="uppercase">
                  Name
                </label>
                <input
                  name="name"
                  value={formState[0].value}
                  onChange={handleFormChange}
                  className="border-b mt-3 outline-0"
                  required
                  aria-required
                />
                {formState[0].error && (
                  <span className="absolute text-sm text-red-600 -bottom-6">
                    {formState[0].error}
                  </span>
                )}
              </div>
              <div className="flex flex-col xl:w-80 relative">
                <label htmlFor="email" className="uppercase">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  onChange={handleFormChange}
                  className="border-b mt-3 outline-0"
                  required
                  aria-required
                  value={formState[1].value}
                />
                {formState[1].error && (
                  <span className="absolute text-sm text-red-600 -bottom-6">
                    {formState[1].error}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-10">
              <div className="flex flex-col xl:w-80 relative">
                <label htmlFor="message" className="uppercase">
                  Message
                </label>
                <textarea
                  name="message"
                  onChange={handleFormChange}
                  cols={4}
                  className="border-b mt-3 outline-0"
                  required
                  aria-required
                  value={formState[2].value}
                />
                {formState[2].error && (
                  <span className="absolute text-sm text-red-600 -bottom-6">
                    {formState[2].error}
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              diabled={isLoading.toString()}
              rel="true"
              onClick={handleFormSubmit}
              className="mt-10 border border-black w-full xl:w-44 h-14 hover:bg-black hover:text-white transition rounded-full flex items-center justify-center"
            >
              {isLoading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    ></path>
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                "SEND"
              )}
            </button>
          </form>
        </div>
      </div>

      <footer className="flex pl-10 bg-black h-footer-sl xl:h-footer">
        <div className="flex flex-col pr-10 w-full xl:w-auto xl:grow h-full justify-center gap-14">
          <div className="flex gap-28 items-center border-b border-gray-700 pb-10">
            <div className="hidden xl:block">
              <svg
                width="89"
                height="25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.739 12.235c0-6.204-3.387-10.983-11.996-10.983h-9.21v21.966h9.21c8.61 0 11.996-4.78 11.996-10.983Zm-6.267 0c0 4.336-2.437 5.95-5.824 5.95H7.514v-11.9h3.134c3.387 0 5.824 1.614 5.824 5.95ZM24.171 23.218H41.58v-5H30.154V14.45h10.033V9.703H30.154v-3.45h11.14V1.252H24.172v21.966ZM61.844 8.88c0-5.54-3.545-7.628-9.052-7.628h-9.527v21.966h5.982v-6.71h3.545c5.507 0 9.052-2.09 9.052-7.628Zm-6.203 0c0 2.152-1.013 3.038-3.45 3.038h-2.944V5.841h2.944c2.437 0 3.45.887 3.45 3.039ZM62.497 6.38h6.932v16.838h5.982V6.379h6.931V1.252H62.498v5.127ZM79.857 20.143a3.595 3.595 0 0 0 3.597 3.596c1.988 0 3.613-1.609 3.613-3.596a3.623 3.623 0 0 0-3.613-3.613c-1.988 0-3.597 1.625-3.597 3.613Zm.694 0c0-1.641 1.294-2.982 2.903-2.982s2.919 1.34 2.919 2.982c0 1.64-1.31 2.965-2.919 2.965-1.61 0-2.903-1.325-2.903-2.965Zm1.215 1.782H82.9v-1.23h.648l.678 1.23h1.23l-.82-1.451c.379-.158.662-.584.662-1.057 0-.836-.536-1.23-1.451-1.23h-2.082v3.738Zm2.382-2.492c0 .3-.189.426-.552.426H82.9v-.79h.695c.363 0 .552.096.552.364Z"
                  fill="#fff"
                />
              </svg>
            </div>
            <div className="flex justify-between items-start xl:items-center gap-20 w-full xl:w-auto">
              <ul className="flex flex-col xl:flex-row gap-8 xl:gap-12 text-white uppercase menu-list">
                {navMenuLinks.map((link) => (
                  <li key={link}>
                    <Link to={link}>{link}</Link>{" "}
                  </li>
                ))}
              </ul>

              {/* social media footer */}
              <div className="flex flex-col justify-start gap-8 xl:hidden">
                <a
                  href="https://web.facebook.com/DeptAgency"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.5 2.5H18.75C17.0924 2.5 15.5027 3.15848 14.3306 4.33058C13.1585 5.50269 12.5 7.0924 12.5 8.75V12.5H8.75V17.5H12.5V27.5H17.5V17.5H21.25L22.5 12.5H17.5V8.75C17.5 8.41848 17.6317 8.10054 17.8661 7.86612C18.1005 7.6317 18.4185 7.5 18.75 7.5H22.5V2.5Z"
                      fill="white"
                    />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/deptagency"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.875 3.37508C24.7977 4.13499 23.6049 4.71621 22.3425 5.09633C21.665 4.31728 20.7645 3.76511 19.7629 3.5145C18.7613 3.26389 17.7069 3.32693 16.7423 3.69509C15.7777 4.06326 14.9495 4.71878 14.3696 5.57301C13.7897 6.42724 13.4862 7.43896 13.5 8.47133V9.59633C11.523 9.6476 9.56393 9.20912 7.79738 8.31996C6.03084 7.4308 4.51161 6.11855 3.375 4.50008C3.375 4.50008 -1.125 14.6251 9 19.1251C6.68309 20.6978 3.92305 21.4864 1.125 21.3751C11.25 27.0001 23.625 21.3751 23.625 8.43758C23.624 8.12422 23.5938 7.81163 23.535 7.50383C24.6832 6.37151 25.4934 4.94188 25.875 3.37508Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/deptagency/?hl=en"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.125 2.25H7.875C4.7684 2.25 2.25 4.7684 2.25 7.875V19.125C2.25 22.2316 4.7684 24.75 7.875 24.75H19.125C22.2316 24.75 24.75 22.2316 24.75 19.125V7.875C24.75 4.7684 22.2316 2.25 19.125 2.25Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.0002 12.7913C18.139 13.7276 17.9791 14.6838 17.5431 15.524C17.1072 16.3641 16.4174 17.0454 15.572 17.471C14.7265 17.8965 13.7684 18.0446 12.8339 17.8943C11.8994 17.7439 11.0361 17.3027 10.3669 16.6334C9.69757 15.9641 9.25636 15.1008 9.10598 14.1663C8.95561 13.2318 9.10373 12.2737 9.52928 11.4283C9.95482 10.5828 10.6361 9.89305 11.4763 9.45712C12.3164 9.02118 13.2726 8.86126 14.2089 9.0001C15.1639 9.14172 16.0481 9.58674 16.7308 10.2694C17.4135 10.9521 17.8585 11.8363 18.0002 12.7913Z"
                      stroke="#0E0E0E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19.6875 7.3125H19.6987"
                      stroke="#0E0E0E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row text-gray-500 gap-10 xl:gap-0 justify-between">
            <div className="flex flex-col xl:flex-row xl:gap-10">
              <p>Chamber of Commerce: 63464101</p>
              <p>VAT: NL 8552.47.502.B01</p>
              <p>Terms and conditions</p>
            </div>
            <div className="">
              <p>© 2022 Dept Agency</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="hidden xl:flex flex-col items-center justify-center w-32 gap-2 bg-white"
          onClick={scrollToTop}
        >
          <svg
            width="18"
            height="36"
            viewBox="0 0 18 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.20907 0.296031C8.44528 -0.0918603 8.99288 -0.100123 9.24011 0.280473L17.8959 13.6059C18.1678 14.0245 17.8754 14.5851 17.3853 14.5851H0.614676C0.132658 14.5851 -0.161205 14.041 0.0942641 13.6215L8.20907 0.296031Z"
              fill="#5115F7"
            />
            <path
              d="M6.87176 8.28665C6.87176 7.9388 7.14652 7.6568 7.48546 7.6568H10.5539C10.8929 7.6568 11.1676 7.9388 11.1676 8.28665V35.3702C11.1676 35.718 10.8929 36 10.5539 36H7.48546C7.14652 36 6.87176 35.718 6.87176 35.3702V8.28665Z"
              fill="#5115F7"
            />
          </svg>
          <p className=" text-indigo-600">TOP</p>
        </button>
      </footer>
    </main>
  );
};

export default Home;
