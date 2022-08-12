import {Dots} from "../components";

export const ProjectSectionTwo = (props) => {
  const {
    bgImage,
    companyName,
    title,
    articleOne,
    articleTwo,
    articleThree,
    switchOrder,
  } = props;
  const articles = [
    { title: articleOne.title, text: articleOne.text },
    { title: articleTwo.title, text: articleTwo.text },
    { title: articleThree.title, text: articleThree.text },
  ];

  return (
    <div
      className={`flex ${
        switchOrder ? "flex-col xl:flex-row-reverse" : "flex-col xl:flex-row"
      } justify-between xl:h-130 text-white font-MaisonNeue-Light`}
    >
      <div
        className={`h-125 xl:h-full w-full lg:w-3/4 ${bgImage} bg-cover flex flex-col justify-end pb-16 pl-10 gap-3`}
      >
        <p className="uppercase">{companyName}</p>
        <p className="text-3xl w-full lg:w-1/2">{title}</p>
        <div className="flex items-center gap-3 cursor-pointer">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="6" r="5.7" stroke="white" strokeWidth="0.6" />
            <circle
              cx="6"
              cy="6"
              r="1.7"
              fill="white"
              stroke="white"
              strokeWidth="0.6"
            />
          </svg>

          <p className="text-sm">Read more</p>
        </div>
      </div>

      <div className="bg-black h-125 xl:h-full w-full xl:w-1/4 flex flex-col gap-6 pl-8 pr-12 py-8 xl:py-16">
        {articles.map((article, index) => (
          <div
            className={`${
              index === 1 && " border-b border-t py-4"
            } text-white font-MaisonNeue-Light`}
            key={index}
          >
            <p className="uppercase">{article.title}</p>
            <p>{article.text}</p>
            <div className="flex items-center gap-2 mt-3 cursor-pointer">
              <Dots className="w-3 h-3" />
              <p className="text-sm">Read more</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
