export const ProjectSection = (props) => {
  const {
    bgImageOne,
    bgImageTwo,
    titleOne,
    titleTwo,
    companyNameOne,
    companyNameTwo,
  } = props;
  return (
    <div className="project-card flex flex-col xl:flex-row justify-between xl:h-130  text-white font-MaisonNeue-Light">
      {[1, 2].map((item, index) => {
        const bgImage = index === 0 ? bgImageOne : bgImageTwo;
        const title = index === 0 ? titleOne : titleTwo;
        const companyName = index === 0 ? companyNameOne : companyNameTwo;
        return (
          <div
            className={`h-125 xl:h-full w-full xl:w-1/2 ${bgImage} bg-cover flex flex-col justify-end pb-16 pl-10 gap-3`}
            key={item}
          >
            <p className="uppercase companyName">{companyName}</p>
            <p className="text-3xl w-full lg:w-1/2">{title}</p>
            <div className="flex items-center gap-3 cursor-pointer">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="6"
                  cy="6"
                  r="5.7"
                  stroke="white"
                  strokeWidth="0.6"
                />
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
        );
      })}
    </div>
  );
};
