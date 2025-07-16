# Akıl Okuyan Tahmin Oyunu

Bu proje, EMAR Proje şirketindeki stajım sırasında, Staj Sorumlum Sayın **Mehmet Emre Doğan**'ın değerli yönlendirmeleri ve onaylarıyla geliştirildi. Kendisinin vizyonu ve geri bildirimleri, projenin temel yapısının ve işleyişinin şekillenmesinde belirleyici oldu. Bu oyun, kullanıcıların akıllarında tuttukları nesne, kişi veya kavramları "Evet/Hayır" sorularıyla tahmin etmeye çalışan yapay zeka destekli interaktif bir deneyim sunar.

---

## Proje Hakkında

Akıl Okuyan Tahmin Oyunu, kullanıcıların aklında tuttuğu bir şeyi bulmak için sınırlı sayıda "Evet" veya "Hayır" sorusu soran yapay zeka tabanlı bir tahmin oyunudur. Oyun, önceden tanımlanmış bir soru ağacı üzerinden ilerlerken, gerekli durumlarda veya soru limiti aşıldığında Gemini API'sini kullanarak son bir tahmin yapar. Kullanıcı geri bildirimleri, yapay zekanın tahmin yeteneğini gelecekte daha da geliştirmek için kaydedilir.

---

## Temel Özellikler

* **İnteraktif Soru-Cevap:** Kullanıcıya "Evet" veya "Hayır" şeklinde yanıtlayabileceği sorular sorar.
* **Soru Ağacı Navigasyonu:** Önceden tanımlanmış bir soru ağacı (karar ağacı) kullanarak mantıksal bir akış sağlar.
* **Gemini API Entegrasyonu:** Belirli durumlarda (örneğin, soru ağacının sonuna ulaşıldığında veya maksimum soru limitine yaklaşıldığında) Google Gemini API'sini kullanarak akıllı tahminler yapar.
* **Kullanıcı Geri Bildirimi:** Tahmin doğru çıktığında veya yanlış çıktığında kullanıcılardan geri bildirim alır ve yanlış tahmin durumunda doğru cevabı kaydederek modelin gelişimine katkıda bulunur.
* **Oyun Durumu Yönetimi:** Soru sayısı, oyun geçmişi ve tahmin durumu gibi bilgileri yönetir.
* **Duyarlı ve Estetik Arayüz:** Modern ve kullanıcı dostu bir arayüz ile akıcı bir oyun deneyimi sunar.

---

## Kullanılan Teknolojiler

* **Next.js:** React tabanlı modern ve performanslı bir web uygulaması geliştirmek için kullanıldı.
* **React:** Kullanıcı arayüzünü oluşturmak için tercih edildi.
* **TypeScript:** Kod tabanının güvenilirliğini ve sürdürülebilirliğini artırmak için kullanıldı.
* **Tailwind CSS:** Hızlı ve esnek UI geliştirme için faydalanıldı.
* **Google Gemini API:** Yapay zeka destekli tahmin yetenekleri için ana motor olarak entegre edildi.
* **Node.js:** API rotalarını ve sunucu tarafı işlemleri yönetmek için kullanıldı.
* **Vercel (Dağıtım):** Projenin kolayca dağıtılması için tercih edildi.

---

## Kurulum ve Çalıştırma

Projeyi yerel makinenizde kurmak ve çalıştırmak için aşağıdaki adımları izleyin:

1.  **Depoyu Klonlayın:**
    ```bash
    git clone [https://github.com/KULLANICI_ADINIZ/AKIL_OKUYAN_TAHMIN_OYUNU.git](https://github.com/KULLANICI_ADINIZ/AKIL_OKUYAN_TAHMIN_OYUNU.git)
    ```
2.  **Proje Dizinine Gidin:**
    ```bash
    cd AKIL_OKUYAN_TAHMIN_OYUNU
    ```
3.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    # veya
    yarn install
    ```
4.  **Ortam Değişkenlerini Ayarlayın:**
    Bir `.env.local` dosyası oluşturun ve Gemini API anahtarınızı buraya ekleyin:
    ```
    GEMINI_API_KEY=sizin_gemini_api_anahtarınız
    ```
    * `sizin_gemini_api_anahtarınız` kısmını Google AI Studio'dan alacağınız Gemini API anahtarınızla değiştirin.
5.  **Projeyi Başlatın:**
    ```bash
    npm run dev
    # veya
    yarn dev
    ```
    Uygulama genellikle `http://localhost:3000` adresinde çalışacaktır.

---

## Proje Yapısı

* `app/page.tsx`: Ana oyun mantığının ve durum yönetiminin bulunduğu Next.js sayfası.
* `app/GameUI.tsx`: Oyunun kullanıcı arayüzünü ve görsel bileşenlerini içeren React bileşeni.
* `app/data/questionTree.ts`: Oyunun temel soru ağacını (karar ağacını) tanımlayan veri yapısı.
* `app/api/gemini/route.ts`: Gemini API ile iletişimi sağlayan API rotası.
* `app/api/game/route.ts`: Oyun verilerini kaydetmek için kullanılan API rotası (burada veri kaydetme mantığı eklemeniz gerekebilir, örneğin bir veritabanına).
* `public/images/asdasd.jpg`: Arka plan görseli.
* `app/globals.css`: Tailwind CSS ve özel global stiller.

---

## Katkıda Bulunma

Bu projeye katkıda bulunmaktan çekinmeyin! Her türlü hata raporu, özellik önerisi veya kod katkısı memnuniyetle karşılanır. Lütfen bir "issue" açarak veya bir "pull request" göndererek katkıda bulunun.

---

## Lisans

Bu proje, MIT Lisansı altında yayımlanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakınız.
