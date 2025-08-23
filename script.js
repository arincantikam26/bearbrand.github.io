document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const openText = document.getElementById('openText');
    const envelopePage = document.getElementById('envelopePage');
    const mainContent = document.getElementById('mainContent');
    
    // Animasi untuk amplop
    envelope.addEventListener('click', function() {
        // Buka amplop
        envelope.classList.add('open');
        openText.style.opacity = '0';
        
        // Buat efek konfeti
        createConfetti();
        
        // Setelah animasi selesai, tampilkan halaman utama
        setTimeout(function() {
            envelopePage.style.display = 'none';
            mainContent.style.display = 'block';
            
            // Pastikan body bisa di-scroll
            document.body.style.overflow = 'auto';
            
            // Mulai musik
            if (backgroundMusic) {
                backgroundMusic.play().catch(error => {
                    console.log('Autoplay prevented: ', error);
                    isMusicPlaying = false;
                    if (musicToggle) {
                        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
                    }
                });
            }
        }, 2000);
    });
    
    // Fungsi untuk membuat efek konfeti
    function createConfetti() {
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#FFEB3B', '#FF9800'];
        
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 15 + 5) + 'px';
            confetti.style.height = (Math.random() * 15 + 5) + 'px';
            confetti.style.opacity = '1';
            confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            document.body.appendChild(confetti);
            
            // Hapus confetti setelah animasi selesai
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 5000);
        }
    }
    
    // Pastikan elemen-elemen utama ada sebelum menggunakannya
    let onBtn, offBtn, candles, message, videoContainer, youtubeVideo, musicToggle, backgroundMusic;
    let isMusicPlaying = true;
    
    // Tunggu sampai DOM sepenuhnya dimuat sebelum mengakses elemen
    setTimeout(function() {
        onBtn = document.getElementById('onBtn');
        offBtn = document.getElementById('offBtn');
        candles = document.querySelectorAll('.candle');
        message = document.getElementById('birthdayMessage');
        videoContainer = document.getElementById('videoContainer');
        youtubeVideo = document.getElementById('youtubeVideo');
        musicToggle = document.getElementById('musicToggle');
        backgroundMusic = document.getElementById('backgroundMusic');
        
        // Pastikan semua elemen ada sebelum menambahkan event listener
        if (onBtn && offBtn) {
            // Event listener untuk tombol
            onBtn.addEventListener('click', turnOnCandles);
            offBtn.addEventListener('click', turnOffCandles);
        }
        
        if (musicToggle && backgroundMusic) {
            // Kontrol musik
            musicToggle.addEventListener('click', function() {
                if (isMusicPlaying) {
                    backgroundMusic.pause();
                    musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
                } else {
                    backgroundMusic.play().catch(error => {
                        console.log('Play error: ', error);
                    });
                    musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                }
                isMusicPlaying = !isMusicPlaying;
            });
        }
    }, 100);
    
    // Fungsi untuk menyalakan lilin
    function turnOnCandles() {
        if (candles && candles.length > 0) {
            candles.forEach(candle => {
                candle.classList.remove('off');
            });
        }
        
        if (message) {
            message.classList.remove('show');
        }
        
        if (videoContainer) {
            videoContainer.classList.remove('show');
        }
        
        // Jeda video YouTube
        if (youtubeVideo && youtubeVideo.contentWindow) {
            try {
                youtubeVideo.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            } catch (e) {
                console.log('Error pausing video: ', e);
            }
        }
    }
    
    // Fungsi untuk mematikan lilin - DIPERBAIKI
    function turnOffCandles() {
        if (candles && candles.length > 0) {
            candles.forEach(candle => {
                candle.classList.add('off');
            });
        }
        
        // Scroll ke bagian pesan ulang tahun dengan offset
        if (message) {
            const headerOffset = 80;
            const elementPosition = message.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        
        // Tampilkan pesan dan video setelah 1 detik
        setTimeout(() => {
            if (message) {
                message.classList.add('show');
            }
            
            if (videoContainer) {
                videoContainer.classList.add('show');
            }
            
            // Putar video YouTube
            if (youtubeVideo && youtubeVideo.contentWindow) {
                try {
                    youtubeVideo.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                } catch (e) {
                    console.log('Error playing video: ', e);
                }
            }
        }, 1000);
    }
    
    // Efek kilauan
    function createSparkles() {
        const container = document.querySelector('.container');
        if (!container) return;
        
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animation = `sparkleAnimation 2s ease-in-out forwards`;
        
        container.appendChild(sparkle);
        
        // Hapus elemen setelah animasi selesai
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
            }
        }, 2000);
    }
    
    // Tambahkan keyframes untuk animasi sparkle
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes sparkleAnimation {
            0% {
                opacity: 0;
                transform: scale(0) translate(0, 0);
            }
            50% {
                opacity: 1;
                transform: scale(1) translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px);
            }
            100% {
                opacity: 0;
                transform: scale(0) translate(0, 0);
            }
        }
        
        @keyframes confettiFall {
            0% {
                transform: translateY(-100px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(1000px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Buat efek kilauan secara periodik
    setInterval(createSparkles, 300);
});