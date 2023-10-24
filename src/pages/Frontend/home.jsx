import bigImg from "../../assets/Full-Width-Hero.jpg";
import smallImg1 from "../../assets/MicrosoftTeams-image-111-wpadlarger.jpg";
import smallImg2 from "../../assets/MicrosoftTeams-image-112-larger.jpg";
import bannerImg from "../../assets/onlineonlydrop.jpg";
import img2 from "../../assets/SQ-Tiles-6.jpg";
import about from "../../assets/abou1.jpeg";
import about2 from "../../assets/about2.jpeg";
import about3 from "../../assets/about3.jpeg";
function Home() {
  return (
    <div className="">
      <div name="" className="">
        <div className="mb-4">
          <img src={bigImg} alt="" />
        </div>
        <div className="flex flex-row mb-4 ">
          <div className="mr-2">
            <img src={smallImg1} alt="" />
          </div>
          <div className="ml-2">
            <img src={smallImg2} alt="" />
          </div>
        </div>
        <div className="mb-4">
          <img src={bannerImg} alt="" />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="relative flex-[25%] mb-4 m-2 cursor-pointer">
          <span className="absolute text-2xl font-semibold uppercase top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            
          </span>
          <img className="z-0" src={img2} alt="" />
        </div>
        <div className="relative flex-[25%] mb-4 m-2 cursor-pointer">
          <span className="absolute text-2xl font-semibold uppercase top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            
          </span>
          <img className="z-0" src={img2} alt="" />
        </div>
        <div className="relative flex-[25%] mb-4 m-2 cursor-pointer">
          <span className="absolute text-2xl font-semibold uppercase top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            
          </span>
          <img className="z-0" src={img2} alt="" />
        </div>
        <div className="relative flex-[25%] mb-4 m-2 cursor-pointer">
          <span className="absolute text-2xl font-semibold uppercase top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            
          </span>
          <img className="z-0" src={img2} alt="" />
        </div>
      </div>
      <div className="px-32">
        <div className="my-8">
          <h1 className="font-aboutUs text-3xl font-semibold text-center">
            <div>INTERNATIONAL BRAND OF</div>
            <div>OUTDOOR FURNITURE IN VIETNAM</div>
          </h1>
        </div>
        <div className="">
          <span className="flex px-28 text-center">
            In a world of mass production, we recognise the value of genuine
            design that presents your graceful living style as well as the
            importance of quality-and-affordability products that helps to bring
            the comfortable luxury to your outdoor moments.
          </span>
          <div className="flex my-16">
            <div className="flex-[50%] pr-2">
              <img className="w-full" src={about} alt="" />
            </div>
            <div className="flex-[50%] pl-2">
              <img className="w-full h-[50%] pb-2" src={about2} alt="" />
              <img className=" w-full h-[50%]" src={about3} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
