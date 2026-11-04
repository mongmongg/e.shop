import Button from "./UI/Button";
import Carousel from "./Carousel";
const HERO_IMAGES = [
  { id: 0, url: "./hero/hero-1.jpg" },
  { id: 1, url: "./hero/hero-2.jpg" },
  { id: 2, url: "./hero/hero-3.jpg" },
];
export default function Hero() {
  return (
    <article className="mx-6 relative max-h-200 h-auto mt-6">
      <Carousel images={HERO_IMAGES} />
      <div className="w-full absolute text-center bottom-10">
        <Button main className="">
          Start shopping
        </Button>
      </div>
    </article>
  );
}
