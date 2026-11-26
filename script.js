const triyanaForm = document.getElementById('triyana_form_kontak');

if (triyanaForm) {
  triyanaForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const notif = document.getElementById('triyana_notif');

    notif.textContent = 'Terima kasih! Pesanmu sudah terkirim.';
    notif.style.color = 'green';

    triyanaForm.reset();
  });
}
/* KUIS */
const triyanaSoal = [
  {
    tanya: 'Apa arti kata "Gracias" dalam bahasa Spanyol?',
    opsi: ['Terima kasih', 'Halo', 'Selamat tinggal', 'Maaf'],
    benar: 0
  },
  {
    tanya: 'Dalam bahasa Korea, apa ucapan "Halo" yang sopan?',
    opsi: ['Kamsahamnida', 'Annyeonghaseyo', 'Annyeonghi gaseyo', 'Aniyo'],
    benar: 1
  },
  {
    tanya: 'Jika orang Rusia berkata "Spasibo", apa maksudnya?',
    opsi: ['Halo', 'Ya', 'Terima kasih', 'Tidak'],
    benar: 2
  },
  {
    tanya: 'Apa arti sapaan "Namaste" dari India?',
    opsi: ['Terima kasih', 'Halo (salam penghormatan)', 'Selamat tinggal', 'Maaf'],
    benar: 1
  },
  {
    tanya: '"Uno, Dos, Tres" berasal dari bahasa apa, dan artinya?',
    opsi: [
      'Rusia, artinya Satu, Dua, Tiga',
      'Korea, artinya Satu, Dua, Tiga',
      'Spanyol, artinya Satu, Dua, Tiga',
      'Hindi, artinya Satu, Dua, Tiga'
    ],
    benar: 2
  }
];

const triyanaArea = document.getElementById('triyana_kuis_area');

if (triyanaArea) {
  let nomor = 0;
  let skor = 0;

  const elProgress = document.getElementById('triyana_kuis_progress');
  const elSoal = document.getElementById('triyana_kuis_soal');
  const elOpsi = document.getElementById('triyana_kuis_opsi');
  const elFeedback = document.getElementById('triyana_kuis_feedback');
  const tombolNext = document.getElementById('triyana_kuis_next');
  const elHasil = document.getElementById('triyana_kuis_hasil');
  const elSkor = document.getElementById('triyana_kuis_skor');
  const tombolUlang = document.getElementById('triyana_kuis_ulang');

  function tampilSoal() {
    const s = triyanaSoal[nomor];
    elProgress.textContent = 'Soal ' + (nomor + 1) + ' dari ' + triyanaSoal.length;
    elSoal.textContent = s.tanya;
    elOpsi.innerHTML = '';
    elFeedback.textContent = '';
    tombolNext.disabled = true;

    s.opsi.forEach(function (teks, i) {
      const btn = document.createElement('button');
      btn.className = 'triyana_opsi';
      btn.textContent = teks;
      btn.addEventListener('click', function () {
        jawab(i);
      });
      elOpsi.appendChild(btn);
    });
  }

  function jawab(pilihan) {
    const s = triyanaSoal[nomor];
    const semuaTombol = elOpsi.querySelectorAll('.triyana_opsi');

    semuaTombol.forEach(function (btn, i) {
      btn.disabled = true;
      if (i === s.benar) btn.classList.add('triyana_benar');
    });

    if (pilihan === s.benar) {
      skor++;
      elFeedback.textContent = 'Benar! 🎉';
      elFeedback.style.color = '#2e9e57';
    } else {
      semuaTombol[pilihan].classList.add('triyana_salah');
      elFeedback.textContent = 'Kurang tepat, jawaban benarnya sudah ditandai hijau.';
      elFeedback.style.color = '#d64545';
    }

    tombolNext.disabled = false;
  }

  tombolNext.addEventListener('click', function () {
    nomor++;
    if (nomor < triyanaSoal.length) {
      tampilSoal();
    } else {
      triyanaArea.style.display = 'none';
      elHasil.style.display = 'block';
      elSkor.textContent = 'Skor kamu: ' + skor + ' / ' + triyanaSoal.length;
    }
  });

  tombolUlang.addEventListener('click', function () {
    nomor = 0;
    skor = 0;
    elHasil.style.display = 'none';
    triyanaArea.style.display = 'block';
    tampilSoal();
  });

  tampilSoal();
}
/*MENU HAMBURGER  */
const triyanaHamburger = document.getElementById('triyana_hamburger');
const triyanaMenu = document.getElementById('triyana_menu');

if (triyanaHamburger && triyanaMenu) {
  triyanaHamburger.addEventListener('click', function () {
    triyanaMenu.classList.toggle('triyana_buka');
    const terbuka = triyanaMenu.classList.contains('triyana_buka');
    triyanaHamburger.textContent = terbuka ? '✕' : '☰';
  });
}
/*  TANDAI MENU AKTIF  */
const triyanaHalaman = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.triyana_menu a').forEach(function (link) {
  if (link.getAttribute('href') === triyanaHalaman) {
    link.classList.add('triyana_aktif');
  }
});
/*  MUNCUL SAAT DI-SCROLL  */
const triyanaItemReveal = document.querySelectorAll('.triyana_reveal');

if (triyanaItemReveal.length > 0) {
  const triyanaObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('triyana_tampil');
        triyanaObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  triyanaItemReveal.forEach(function (el) {
    triyanaObserver.observe(el);
  });
}

/*  TUTUP MENU HP SETELAH LINK DIKLIK  */
const triyanaMenuEl = document.getElementById('triyana_menu');
const triyanaHamburgerEl = document.getElementById('triyana_hamburger');

if (triyanaMenuEl && triyanaHamburgerEl) {
  triyanaMenuEl.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      triyanaMenuEl.classList.remove('triyana_buka');
      triyanaHamburgerEl.textContent = '☰';
    });
  });
}