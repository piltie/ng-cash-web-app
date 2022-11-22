import applestore from "../assets/applestore.png";
import googleplay from "../assets/googleplay.png";
import phone from "../assets/phone.png";
import background from "../assets/login_background.png";

export default function MobileScreen() {
  function removeSidebars() {
    if (window.innerWidth <= 1070) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "visible";
    }
  }

  window.onresize = removeSidebars;

  return (
    <div
      className="absolute top-0 z-50 hidden h-[100vh] w-[100vw]  text-white max-[1070px]:block"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex h-[100vh] flex-col content-center justify-center">
        <div className="m-auto flex h-[47%] w-[90%] flex-col items-center justify-between ">
          <img className="m-auto w-[10em]" src={phone} />
          <h1 className="text-center text-[2em] font-bold">
            Está pelo celular?
          </h1>
          <h2 className="mt-[1em] w-[60%] text-center text-[1em]">
            Baixe nosso aplicativo mobile e acesse com mais conforto!
          </h2>
          <div className="mt-[1.5em] flex w-[60%] flex-col items-center justify-between">
            <a href="https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=com.neaglebank&hl=en&utm_source=site&utm_campaign=download-app&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
              <img className="w-[7em]" src={googleplay} />
            </a>
            <a href="https://itunes.apple.com/app/id1480105326">
              <img className="mt-[0.8em] w-[7em]" src={applestore} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
