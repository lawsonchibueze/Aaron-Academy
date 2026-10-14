const youtubeVideoId = "5nu5TW_EDmk";
const youtubeUrl = "https://youtube.com/shorts/5nu5TW_EDmk?si=-5FUUZ7TLe3ZZG08";

export default function TrainingVideo() {
  return (
    <section className="training-video" aria-labelledby="training-video-title">
      <div className="training-video__heading">
        <p className="eyebrow">Inside Aaron&apos;s Soccer Academy</p>
        <h2 id="training-video-title">
          Football is learned by working with football.
        </h2>
        <p>
          See the players, practical sessions and day-to-day learning that
          helps young people grow through the game.
        </p>
      </div>
      <a
        className="training-video__player"
        href={youtubeUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Watch Aaron's Soccer Academy training video on YouTube"
      >
        <iframe
          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeVideoId}&playsinline=1&rel=0&modestbranding=1`}
          title="Aaron's Soccer Academy training video"
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          aria-hidden="true"
        />
        <span className="training-video__watch">Watch on YouTube <span aria-hidden="true">↗</span></span>
      </a>
    </section>
  );
}
