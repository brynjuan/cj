// Daftar petunjuk dan jawaban
const hints = [
    { description: "makanan favoritku", answer: "nasi goreng" },
    { description: "kapan hari spesialnya trng(gunakan huruf yoo)", answer: "dua februari" },
    { description: "lagu monumental di awal trng pe hubungan", answer: "sesaat kau hadir" },
    { description: "minuman favoritku", answer: "kopi" },
    { description: "di manado sy tdr di?", answer: "kursi" },
];

let currentHintIndex = 0;
let score = 0;
let timeLeft = 20;
let timer;
let isGameOver = false;
const targetScore = 50;  // Skor target untuk menang

// Ambil elemen audio
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const timeUpSound = document.getElementById('time-up-sound');

// Fungsi untuk menampilkan petunjuk
function displayHint() {
    if (isGameOver) return;

    const hint = hints[currentHintIndex];
    document.getElementById('description').textContent = hint.description;
    document.getElementById('result').style.display = "none";  // Menyembunyikan hasil sebelumnya
    document.getElementById('answer').value = "";  // Reset input
    document.getElementById('answer').classList.remove('invalid'); // Menghapus animasi shake
    startTimer();
}

// Fungsi untuk memulai timer
function startTimer() {
    timeLeft = 20;
    document.getElementById('timer').textContent = timeLeft;
    if (timer) clearInterval(timer);
    
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById('timer').textContent = timeLeft;
        } else {
            clearInterval(timer);
            showResult(false);  // Game over jika waktu habis
            timeUpSound.play();  // Mainkan suara waktu habis
        }
    }, 1000);
}

// Fungsi untuk memeriksa jawaban
function checkAnswer() {
    if (isGameOver) return;

    const answer = document.getElementById('answer').value.trim().toLowerCase();
    const correctAnswer = hints[currentHintIndex].answer.toLowerCase();
    const resultElement = document.getElementById('result');

    if (answer === correctAnswer) {
        score += 10;
        resultElement.textContent = "njayy benerr";
        resultElement.style.color = "green";
        currentHintIndex = (currentHintIndex + 1) % hints.length;  // Beralih ke petunjuk berikutnya
        correctSound.play();  // Mainkan suara jawaban benar
        document.getElementById('score').textContent = score;

        // Cek apakah skor sudah mencapai target kemenangan
        if (score >= targetScore) {
            showResult(true);  // Tampilkan pesan kemenangan
        } else {
            setTimeout(displayHint, 1000);  // Menunggu sebentar sebelum menampilkan petunjuk berikutnya
        }
    } else {
        document.getElementById('answer').classList.add('invalid');  // Menambahkan animasi shake pada input
        resultElement.textContent = "kocak, ayo semangatt hu ha hu ha";
        resultElement.style.color = "red";
        wrongSound.play();  // Mainkan suara jawaban salah
    }

    resultElement.style.display = "block";  // Menampilkan hasil
}

// Fungsi untuk menampilkan hasil permainan (game over atau kemenangan)
function showResult(isSuccess) {
    isGameOver = true;
    const resultElement = document.getElementById('result');
    if (isSuccess) {
        resultElement.textContent = "ngeri abangku, spill scoresnya dungss " + score + "!";
    } else {
        resultElement.textContent = "pft, cukup tw sih";
    }
    resultElement.style.color = isSuccess ? "green" : "red";
    resultElement.style.fontSize = "2em";
    resultElement.style.display = "block";
}

// Inisialisasi game saat halaman dimuat
document.addEventListener('DOMContentLoaded', displayHint);
