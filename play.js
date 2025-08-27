document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const audioPlayer = document.getElementById('audioPlayer');
    const playlist = document.getElementById('playlist');
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentSongIndex = -1;
    let songs = [];

    fileInput.addEventListener('change', (event) => {
        songs = Array.from(event.target.files);
        renderPlaylist();
    });

    playBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playBtn.textContent = '⏸️';
        } else {
            audioPlayer.pause();
            playBtn.textContent = '▶️';
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentSongIndex > 0) {
            currentSongIndex--;
            playSong(currentSongIndex);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentSongIndex < songs.length - 1) {
            currentSongIndex++;
            playSong(currentSongIndex);
        }
    });

    audioPlayer.addEventListener('ended', () => {
        if (currentSongIndex < songs.length - 1) {
            currentSongIndex++;
            playSong(currentSongIndex);
        } else {
            // Reinicia al principio de la lista
            currentSongIndex = 0;
            playSong(currentSongIndex);
        }
    });

    function renderPlaylist() {
        playlist.innerHTML = '';
        songs.forEach((song, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = song.name;
            listItem.addEventListener('click', () => {
                currentSongIndex = index;
                playSong(currentSongIndex);
            });
            playlist.appendChild(listItem);
        });
        if (songs.length > 0) {
            currentSongIndex = 0;
            playSong(currentSongIndex);
        }
    }

    function playSong(index) {
        if (songs.length === 0) return;

        const song = songs[index];
        const songURL = URL.createObjectURL(song);
        audioPlayer.src = songURL;

        // Desactiva la canción anterior y activa la nueva
        const listItems = playlist.querySelectorAll('li');
        listItems.forEach(item => item.classList.remove('active'));
        if (listItems[index]) {
            listItems[index].classList.add('active');
        }

        audioPlayer.play();
        playBtn.textContent = '⏸️';
    }
});

