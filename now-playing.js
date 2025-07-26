const username = 'postram';
const apiKey = 'ae4c2fa36d4fa82bc268e5ce3e1eb8c6'; //don't steal this plz


async function getNowPlaying() {
  const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`);
  const data = await res.json();

  const track = data.recenttracks.track[0];
  const isNowPlaying = track['@attr']?.nowplaying === 'true';

  const title = track.name;
  const artist = track.artist['#text'];
  const url = track.url;
  const album = track.album['#text'];
  const img = track.image?.pop()?.['#text']; // Largest image

document.getElementById('now-playing').innerHTML =
  `<img src="${img}" alt="Album art" style="height:50px; float: left; margin-right: 8px;">
   <a href="${url}" target="_blank"><strong>${title}</strong></a> by ${artist}
   <br/><span style="font-size: 0.8em; color: gray;">
     ${isNowPlaying ? 'Now Playing' : `Last played: ${new Date(track.date.uts * 1000).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "medium", timeZone: 'America/Chicago' })}`}
   </span>
   <div style="clear: both;"></div>`;

}

getNowPlaying();