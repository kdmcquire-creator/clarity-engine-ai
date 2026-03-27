export default function SiteGroundBanner() {
  return (
    <div className="my-10 flex flex-col items-center gap-2">
      <a
        href="https://siteground.com/web-hosting.htm?afimagecode=9ab348200789c1a9052691eb4ac50064"
        target="_blank"
        rel="nofollow noopener sponsored"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          border={0}
          alt="Ad - Web Hosting from SiteGround - Crafted for easy site management. Click to learn more."
          src="https://siteground.com/static/affiliate/en/USD/general_EN_USD_general-hosting-square-light.jpg"
          width={250}
          height={250}
          style={{ display: "block" }}
        />
      </a>
      <p className="text-xs text-white/20">Sponsored</p>
    </div>
  );
}
