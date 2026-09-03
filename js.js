const araButonu = document.getElementById("araButonu");
const kullaniciAdiInput = document.getElementById("kullaniciAdiInput");
const kart = document.getElementById("kart");

// Aktif dil değişkeni (Varsayılan: Türkçe)
let aktifDil = "tr";

// Dil Veri Sözlüğü
const metinler = {
    tr: {
        baslik: "Hoşgeldiniz Github Ön İzleme",
        aciklama: "Burada kullanıcı adını girip depo sayısını ve takipçisini görebilirsiniz",
        placeholder: "GitHub Kullanıcı Adı Giriniz",
        araBtn: "Ara",
        depo: "Depo",
        takipci: "Takipçi",
        biyoYok: "Biyografi eklenmemiş.",
        hataBos: "Lütfen bir github kullanıcı adı girin!",
        hataYok: "Kullanıcı bulunamadı!"
    },
    en: {
        baslik: "Welcome to Github Preview",
        aciklama: "Enter a username to view repository and follower counts",
        placeholder: "Enter GitHub Username",
        araBtn: "Search",
        depo: "Repositories",
        takipci: "Followers",
        biyoYok: "No bio available.",
        hataBos: "Please enter a GitHub username!",
        hataYok: "User not found!"
    },
    de: {
        baslik: "Willkommen zur Github-Vorschau",
        aciklama: "Geben Sie einen Benutzernamen ein, um Repositories und Follower zu sehen",
        placeholder: "GitHub-Benutzernamen eingeben",
        araBtn: "Suchen",
        depo: "Repositories",
        takipci: "Follower",
        biyoYok: "Keine Biografie verfügbar.",
        hataBos: "Bitte geben Sie einen GitHub-Benutzernamen ein!",
        hataYok: "Benutzer nicht gefunden!"
    }
};

// 🌍 Dil Değiştirme Fonksiyonu
function dilDegistir(dil) {
    aktifDil = dil;
    const secilen = metinler[dil];

    document.getElementById("baslikMetni").textContent = secilen.baslik;
    document.getElementById("aciklamaMetni").textContent = secilen.aciklama;
    kullaniciAdiInput.placeholder = secilen.placeholder;
    araButonu.textContent = secilen.araBtn;
    document.getElementById("depoEtiketi").textContent = secilen.depo;
    document.getElementById("takipciEtiketi").textContent = secilen.takipci;
}

// 🔍 Arama Butonu Tıklama Olayı
araButonu.addEventListener("click", async () => {
    const kullaniciAdi = kullaniciAdiInput.value.trim();

    if (kullaniciAdi === "") {
        alert(metinler[aktifDil].hataBos);
        return;
    }

    try {
        const cevap = await fetch(`https://api.github.com/users/${kullaniciAdi}`);

        if (!cevap.ok) {
            alert(metinler[aktifDil].hataYok);
            return;
        }

        const veri = await cevap.json();

        // Kart içeriklerini dolduruyoruz
        document.getElementById("profilResmi").src = veri.avatar_url;
        document.getElementById("kullaniciAdi").textContent = veri.name || veri.login;
        document.getElementById("biyo").textContent = veri.bio || metinler[aktifDil].biyoYok;
        document.getElementById("repoSayisi").textContent = veri.public_repos;
        document.getElementById("takipciSayisi").textContent = veri.followers;

        // Kartı görünür yapıyoruz
        kart.style.display = "block";

    } catch (hata) {
        console.error("Veri çekilirken hata oluştu:", hata);
    }
});