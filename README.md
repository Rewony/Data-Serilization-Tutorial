# FormatMaster (XML • YAML • JSON Pratik Laboratuvarı)

FormatMaster; modern web, backend ve DevOps dünyasında en sık kullanılan üç temel veri formatı olan **JSON**, **YAML** ve **XML** üzerinde pratik yapabileceğiniz, canlı dönüştürmeler ve sözdizim analizleri gerçekleştirebileceğiniz interaktif bir web uygulamasıdır.

---

## 🌟 Öne Çıkan Özellikler

1. **🎯 30 Adet İnteraktif Meydan Okuma (Challenges & Quizzes):**
   - **Başlangıç Seviyesi:** Tek tırnak ve virgül hataları, YAML Tab ve girinti (indentation) sorunları, XML kök etiket kuralları, JSON kaçış karakterleri (`\"` ve `\\`).
   - **Orta Seviye:** Docker Compose servis konfigürasyonları, E-ticaret sipariş dizileri, XML CDATA kullanımı, YAML çok satırlı bloklar (`|` vs `>`), GeoJSON harita standardı, SVG vektörel çizim XML'i, GitHub Actions workflow yapısı.
   - **İleri Seviye:** Kubernetes Deployment pod manifestoları, YAML *"Norveç Problemi"*, RSS besleme şeması, XML Namespaces (`xmlns`), JWT JSON Payload, Helm Chart `values.yaml`, Android Layout XML'i, REST API Pagination metadata'sı.
   - **Canlı Değerlendirme:** Kodunuzu anında test eder, hata varsa satır bazında Türkçe ipucu verir, doğru çözüldüğünde konfeti ve ses efektiyle ödüllendirir.

2. **⚡ Canlı Dönüştürücü & Laboratuvar (Sandbox):**
   - JSON <-> YAML <-> XML arasında anında çift yönlü dönüşüm.
   - **Sözdizim Doktoru (Syntax Doctor):** Hatanın tam satırını, nedenini ve nasıl düzeltileceğini Türkçe analiz eder.
   - **Hazır Şablonlar:** REST API kullanıcı profili, Docker Compose, E-ticaret siparişi, RSS/XML beslemesi.
   - Biçimlendir (Prettify), Sıkıştır (Minify), Kopyala ve İndir desteği.

3. **🌳 Görsel Ağaç İnceleyici (Visual AST / Tree Inspector):**
   - Girdiğiniz herhangi bir formatı görsel hiyerarşik düğümlere (Object, Array, string, number, boolean, XML attributes) dönüştürür.
   - Düğümleri açma/kapatma (Collapse/Expand) ve anlık arama/filtreleme.

4. **📖 Kapsamlı Rehber & Format Savaşları (Cheat Sheet):**
   - JSON vs YAML vs XML karşılaştırma tablosu (okunabilirlik, yorum satırı, dosya boyutu, hız, tipler, kullanım alanları).
   - Formatların tuzakları ve kritik kuralları.

---

## 🚀 Nasıl Çalıştırılır?

Bu uygulama **sıfır bağımlılıkla** (zero-dependency) tasarlanmıştır. Herhangi bir derleme (build) veya `npm install` gerektirmez.

### Yöntem 1: Doğrudan Tarayıcıda Açma
Proje klasöründeki `index.html` dosyasına çift tıklayarak Google Chrome, Microsoft Edge veya Firefox tarayıcınızda doğrudan açabilirsiniz:
```
C:\Users\goktu\.gemini\antigravity\scratch\format-master\index.html
```

### Yöntem 2: Python Yerel Sunucusu (Önerilen)
PowerShell veya Terminal'de şu komutu çalıştırabilirsiniz:
```powershell
cd C:\Users\goktu\.gemini\antigravity\scratch\format-master
python -m http.server 3000
```
Ardından tarayıcınızda açın:
👉 `http://localhost:3000`

---

## 📁 Proje Dosya Yapısı
```
format-master/
├── index.html            # Ana tek sayfa uygulama (SPA)
├── README.md             # Kullanım ve tanıtım kılavuzu
├── css/
│   └── styles.css        # Özel yazı tipleri, satır numaraları ve ağaç stilleri
└── js/
    ├── converter.js      # JSON, YAML, XML motoru & Sözdizim Doktoru
    ├── challenges.js     # 18 adet seviye bazlı interaktif görev
    ├── guides.js         # A'dan Z'ye Konu Anlatımı ve Sözdizim Rehberleri
    ├── tree-view.js      # Görsel hiyerarşik AST ağaç oluşturucu
    └── app.js            # Durum yönetimi, çözüm modalı ve ses efektleri
```
