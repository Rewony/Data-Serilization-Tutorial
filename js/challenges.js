/**
 * FormatMaster - Comprehensive Challenges Database
 * Exactly 15 questions for JSON, 15 for YAML, and 15 for XML (Total 45 challenges)
 * Balanced: 5 Beginner, 5 Intermediate, 5 Advanced for each format
 */

window.FormatChallenges = [
  // =========================================================================
  // 🔵 JSON SORULARI (1 - 15)
  // =========================================================================

  // --- JSON BAŞLANGIÇ (1 - 5) ---
  {
    id: "json-1",
    title: "JSON: Tırnak ve Virgül Tuzağı",
    category: "json",
    level: "beginner",
    description: "Aşağıdaki JSON verisinde iki kritik hata var: Tek tırnaklar ('') kullanılmış ve son elemandan sonra fazla bir virgül (trailing comma) bırakılmış. Bu hataları düzelterek geçerli bir JSON oluşturun.",
    hints: [
      "JSON standartlarında tek tırnak ('...') GEÇERSİZDİR; anahtarlar ve dizeler daima çift tırnak (\"...\") olmalıdır.",
      "Son anahtar veya dizi elemanından sonra virgül koyulamaz."
    ],
    initialCode: `{\n  'username': 'ahmet_yilmaz',\n  'email': 'ahmet@example.com',\n  'role': 'developer',\n  'active': true,\n}`,
    solutionCode: `{\n  "username": "ahmet_yilmaz",\n  "email": "ahmet@example.com",\n  "role": "developer",\n  "active": true\n}`,
    validate(code) {
      const diag = window.ConverterEngine.JSON.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d.username === "ahmet_yilmaz" && d.email === "ahmet@example.com" && d.active === true) {
        return { passed: true, message: "Harika! Tek tırnakları çift tırnağa çevirdiniz ve sondaki fazla virgülü kaldırdınız." };
      }
      return { passed: false, message: "Beklenen anahtar-değer çiftleri eksik veya değiştirilmiş." };
    },
    explanation: "JSON'da tek tırnak ve nesnenin en sonundaki virgül kesinlikle geçersizdir."
  },

  {
    id: "json-2",
    title: "JSON: Tırnaksız Anahtarlar (Unquoted Keys)",
    category: "json",
    level: "beginner",
    description: "JavaScript'te nesne anahtarları tırnaksız yazılabilir, ancak standart JSON'da TÜM anahtarlar çift tırnak içinde olmalıdır. Tırnaksız anahtarları çift tırnağa alarak düzeltin.",
    hints: [
      "title, price ve in_stock anahtarlarını çift tırnak içine alın: \"title\", \"price\", \"in_stock\""
    ],
    initialCode: `{\n  title: "Kablosuz Kulaklık",\n  price: 450,\n  in_stock: true\n}`,
    solutionCode: `{\n  "title": "Kablosuz Kulaklık",\n  "price": 450,\n  "in_stock": true\n}`,
    validate(code) {
      const diag = window.ConverterEngine.JSON.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d.title === "Kablosuz Kulaklık" && d.price === 450 && d.in_stock === true) {
        return { passed: true, message: "Tebrikler! Tüm anahtarları standart JSON kurallarına uygun olarak çift tırnak içine aldınız." };
      }
      return { passed: false, message: "title, price ve in_stock anahtarlarını kontrol edin." };
    },
    explanation: "JSON spesifikasyonu anahtar isimlerinde tırnaksız gösterime izin vermez."
  },

  {
    id: "json-3",
    title: "JSON: Kaçış Karakterleri (Escape Sequences)",
    category: "json",
    level: "beginner",
    description: "Bir yorum metni içinde çift tırnak (\") ve dosya yolu ters bölü (\\) işaretleri geçiyor. Kaçış karakteri (\\) kullanılmadığı için JSON bozulmuş. Metin içindeki çift tırnakları ve ters bölüyü ters bölü (\\) ile kaçırın.",
    hints: [
      "Metin içinde çift tırnak için: \\\"",
      "Ters bölü için: \\\\"
    ],
    initialCode: `{\n  "comment_id": 842,\n  "message": "Kitabın adı "Sefiller" ve dosya yolu C:\\docs\\kitap.pdf olarak geçiyor"\n}`,
    solutionCode: `{\n  "comment_id": 842,\n  "message": "Kitabın adı \\"Sefiller\\" ve dosya yolu C:\\\\docs\\\\kitap.pdf olarak geçiyor"\n}`,
    validate(code) {
      const diag = window.ConverterEngine.JSON.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d && d.message && d.message.includes('"Sefiller"') && d.message.includes("C:\\docs\\kitap.pdf")) {
        return { passed: true, message: "Harika! Kaçış karakterlerini (\\\" ve \\\\) başarıyla kullandınız." };
      }
      return { passed: false, message: "message alanı içinde 'Sefiller' çift tırnaklı ve dosya yolu C:\\docs\\kitap.pdf olmalıdır." };
    },
    explanation: "JSON string değerlerinde özel karakterler ters bölü (\\) ile kaçırılmalıdır."
  },

  {
    id: "json-4",
    title: "JSON: Sayı Tipleri & Geçersiz Değerler (NaN / Infinity)",
    category: "json",
    level: "beginner",
    description: "JSON'da NaN ve Infinity sayı tipleri DESTEKLENMEZ. Ayrıca tamsayılar ve ondalıklı sayılar tırnaksız yazılır. Aşağıdaki geçersiz 'discount' (NaN) değerini null yapın ve string olarak yazılmış 'tax_rate' değerini sayı (0.18) yapın.",
    hints: [
      "NaN yerine null yazın.",
      "\"0.18\" string'ini tırnaksız 0.18 sayısına çevirin."
    ],
    initialCode: `{\n  "product_id": 101,\n  "tax_rate": "0.18",\n  "discount": NaN\n}`,
    solutionCode: `{\n  "product_id": 101,\n  "tax_rate": 0.18,\n  "discount": null\n}`,
    validate(code) {
      const diag = window.ConverterEngine.JSON.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (typeof d.tax_rate === "number" && d.tax_rate === 0.18 && d.discount === null) {
        return { passed: true, message: "Süper! JSON'da NaN yasağını ve sayı tipini başarıyla düzelttiniz." };
      }
      return { passed: false, message: "tax_rate sayı (0.18) ve discount null olmalıdır." };
    },
    explanation: "JSON yalnızca IEEE 754 sayılarını tanır; NaN ve Infinity değerlerini desteklemez."
  },

  {
    id: "json-5",
    title: "JSON: Basit Dizi ve Boolean Mantığı",
    category: "json",
    level: "beginner",
    description: "Bir blog etiketleri ve yayın durumu nesnesi oluşturun. 'post_id' (1), 'tags' (en az 3 adet string içeren dizi: [\"yazilim\", \"web\", \"kod\"]) ve 'published' (boolean: true) alanlarını geçerli JSON olarak yazın.",
    hints: [
      "tags köşeli parantez içinde virgülle ayrılmış string dizisi olmalıdır.",
      "published true (tırnaksız) olmalıdır."
    ],
    initialCode: `{\n  "post_id": 1,\n  "tags": [\n    // 3 etiket ekleyin\n  ],\n  "published": "true"\n}`,
    solutionCode: `{\n  "post_id": 1,\n  "tags": [\n    "yazilim",\n    "web",\n    "kod"\n  ],\n  "published": true\n}`,
    validate(code) {
      const diag = window.ConverterEngine.JSON.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d.post_id === 1 && Array.isArray(d.tags) && d.tags.length >= 3 && d.published === true) {
        return { passed: true, message: "Tebrikler! JSON dizi ve mantıksal değer yapısını kusursuz yazdınız." };
      }
      return { passed: false, message: "tags dizisi en az 3 eleman içermeli ve published boolean (true) olmalıdır." };
    },
    explanation: "JSON'da boolean değerler tırnaksız true veya false olarak yazılır."
  },

  // --- JSON ORTA SEVİYE (6 - 10) ---
  {
    id: "json-6",
    title: "JSON: E-Ticaret Sipariş Özeti",
    category: "json",
    level: "intermediate",
    description: "Bir e-ticaret API'si için sipariş nesnesi oluşturun: 'orderId' (sayı: 49201), 'customer' (nesne: 'name' ve 'vip' boolean: true), 'items' (en az 2 ürün içeren dizi; her ürün 'title' ve 'price' içermelidir) ve 'total' (sayı: 400).",
    hints: [
      "items içinde en az 2 adet {\"title\": \"...\", \"price\": ...} nesnesi bulunmalıdır."
    ],
    initialCode: `{\n  "orderId": 49201,\n  "customer": {\n    "name": "Burak Yılmaz",\n    "vip": true\n  },\n  "items": [\n    // 2 ürün ekleyin\n  ],\n  "total": 0\n}`,
    solutionCode: `{\n  "orderId": 49201,\n  "customer": {\n    "name": "Burak Yılmaz",\n    "vip": true\n  },\n  "items": [\n    {\n      "title": "Mousepad",\n      "price": 150\n    },\n    {\n      "title": "USB Bellek",\n      "price": 250\n    }\n  ],\n  "total": 400\n}`,
    validate(code) {
      const diag = window.ConverterEngine.JSON.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d.orderId && d.customer && typeof d.customer.vip === "boolean" && Array.isArray(d.items) && d.items.length >= 2) {
        if (d.items[0].title && d.items[0].price !== undefined) {
          return { passed: true, message: "Harika! E-ticaret sipariş JSON yapısını tam kurallarına uygun yazdınız." };
        }
      }
      return { passed: false, message: "items dizisi içinde en az 2 adet 'title' ve 'price' barındıran nesne olmalıdır." };
    },
    explanation: "Gerçek dünya REST API'lerinde en çok kullanılan JSON deseni nesneler dizisi (array of objects) hiyerarşisidir."
  },

  {
    id: "json-7",
    title: "JSON: GeoJSON Harita Koordinat Standardı",
    category: "json",
    level: "intermediate",
    description: "Harita servislerinin ve GPS sistemlerinin ortak formatı GeoJSON'dır. İstanbul Boğazı için şu alanları içeren geçerli bir GeoJSON nesnesi oluşturun:\n- 'type': 'Point'\n- 'coordinates': [29.0, 41.0] (Boylam ve Enlem dizisi)\n- 'properties': { 'city': 'Istanbul' }",
    hints: [
      "GeoJSON kuralı: coordinates bir sayı dizisidir: [29.0, 41.0]"
    ],
    initialCode: `{\n  type: 'Point',\n  coordinates: [29.0, 41.0],\n  properties: {\n    city: 'Istanbul'\n  }\n}`,
    solutionCode: `{\n  "type": "Point",\n  "coordinates": [29.0, 41.0],\n  "properties": {\n    "city": "Istanbul"\n  }\n}`,
    validate(code) {
      const diag = window.ConverterEngine.JSON.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d.type === "Point" && Array.isArray(d.coordinates) && d.coordinates.length === 2 && d.properties && d.properties.city === "Istanbul") {
        return { passed: true, message: "Kusursuz! Uluslararası GeoJSON coğrafi veri standardını oluşturdunuz." };
      }
      return { passed: false, message: "type: 'Point', coordinates: [29.0, 41.0] ve properties: { city: 'Istanbul' } yapısını sağlayın." };
    },
    explanation: "Harita servisleri konum verilerini standart GeoJSON formatında aktarır."
  },

  {
    id: "json-8",
    title: "JSON: REST API RFC 7807 Hata Detayı Şablonu",
    category: "json",
    level: "intermediate",
    description: "Modern REST API'ler standart hata dönerken RFC 7807 'Problem Details' JSON formatını kullanır. Aşağıdaki alanları içeren bir hata yanıtı oluşturun:\n- 'status': 404 (sayı)\n- 'title': 'Kullanıcı Bulunamadı'\n- 'detail': 'Belirtilen ID sistemde kayıtlı değil.'\n- 'errors': ['ID: 99 gecersiz']",
    hints: [
      "status bir sayıdır (404), errors bir string dizisidir."
    ],
    initialCode: `{\n  // RFC 7807 Hata yanıtını buraya yazın\n}`,
    solutionCode: `{\n  "status": 404,\n  "title": "Kullanıcı Bulunamadı",\n  "detail": "Belirtilen ID sistemde kayıtlı değil.",\n  "errors": [\n    "ID: 99 gecersiz"\n  ]\n}`,
    validate(code) {
      const diag = window.ConverterEngine.JSON.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d.status === 404 && d.title && d.detail && Array.isArray(d.errors)) {
        return { passed: true, message: "Müthiş! Kurumsal REST API'lerin RFC 7807 hata şablonunu başarıyla oluşturdunuz." };
      }
      return { passed: false, message: "status (404), title, detail ve errors dizisini kontrol edin." };
    },
    explanation: "RFC 7807, HTTP API'lerinin hata yanıtlarını tekdüze ve makine tarafından okunabilir kılmak için tasarlanmıştır."
  },

  {
    id: "json-9",
    title: "JSON: JSON Patch (RFC 6902) Güncelleme Dizisi",
    category: "json",
    level: "intermediate",
    description: "Bir nesneyi kısmi olarak güncellemek (PATCH) için RFC 6902 JSON Patch kullanılır. JSON Patch en dışta BİR DİZİDİR ([]). Aşağıdaki 2 işlem nesnesini içeren geçerli bir dizi oluşturun:\n1. { 'op': 'replace', 'path': '/email', 'value': 'yeni@example.com' }\n2. { 'op': 'add', 'path': '/aktif', 'value': true }",
    hints: [
      "En dışta köşeli parantez [ ... ] bulunmalıdır.",
      "İçinde 2 adet nesne olmalıdır."
    ],
    initialCode: `// JSON Patch dizisini buraya yazın`,
    solutionCode: `[\n  {\n    "op": "replace",\n    "path": "/email",\n    "value": "yeni@example.com"\n  },\n  {\n    "op": "add",\n    "path": "/aktif",\n    "value": true\n  }\n]`,
    validate(code) {
      const diag = window.ConverterEngine.JSON.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (Array.isArray(d) && d.length === 2 && d[0].op === "replace" && d[1].op === "add") {
        return { passed: true, message: "Tebrikler! JSON Patch RFC 6902 kısmi güncelleme dizisini başarıyla yazdınız." };
      }
      return { passed: false, message: "En dışta dizi içinde 2 adet op, path ve value nesnesi bulunmalıdır." };
    },
    explanation: "JSON Patch, bir belgedeki değişiklikleri sıralı komut dizisi (replace, add, remove) olarak taşır."
  },

  {
    id: "json-10",
    title: "JSON: İç İçe Adres Defteri Hiyerarşisi",
    category: "json",
    level: "intermediate",
    description: "Bir kullanıcı profili oluşturun:\n- 'user_id': 105\n- 'name': 'Deniz'\n- 'addresses': 2 adet adres nesnesi içeren dizi (her adres 'type': 'home'/'work' ve 'city': 'Ankara'/'Izmir' içermelidir).",
    hints: [
      "addresses bir dizi, içindeki her eleman ise bir nesnedir."
    ],
    initialCode: `{\n  "user_id": 105,\n  "name": "Deniz",\n  "addresses": []\n}`,
    solutionCode: `{\n  "user_id": 105,\n  "name": "Deniz",\n  "addresses": [\n    {\n      "type": "home",\n      "city": "Ankara"\n    },\n    {\n      "type": "work",\n      "city": "Izmir"\n    }\n  ]\n}`,
    validate(code) {
      const diag = window.ConverterEngine.JSON.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d.user_id === 105 && Array.isArray(d.addresses) && d.addresses.length >= 2) {
        if (d.addresses[0].type && d.addresses[0].city) {
          return { passed: true, message: "Harika! Çoklu adres nesneleri barındıran hiyerarşik JSON'ı tamamladınız." };
        }
      }
      return { passed: false, message: "addresses içinde en az 2 adet type ve city barındıran nesne olmalıdır." };
    },
    explanation: "İlişkisel veritabanlarındaki 1-N (One-to-Many) ilişkileri JSON'da nesneler dizisi olarak modellenir."
  },

  // --- JSON İLERİ SEVİYE (11 - 15) ---
  {
    id: "json-11",
    title: "JSON vs JavaScript Nesnesi: Katı Kuralların Testi",
    category: "json",
    level: "advanced",
    description: "Aşağıdaki kod geçerli bir JavaScript nesnesidir ama geçerli bir JSON DEĞİLDİR! Hatalar: 1) Tırnaksız anahtarlar, 2) 'undefined' değeri, 3) Fonksiyon barındırması, 4) Yorum satırı. Bunu standart ve geçerli bir JSON'a dönüştürün.",
    hints: [
      "JSON fonksiyon ve undefined barındıramaz; geçersiz özellikleri kaldırın veya null yapın.",
      "Yorum satırlarını silin ve tüm anahtarları çift tırnak içine alın."
    ],
    initialCode: `{\n  // Kullanıcı profili\n  userId: 1042,\n  name: "Can",\n  nickname: undefined,\n  greet: function() { return "Selam"; }\n}`,
    solutionCode: `{\n  "userId": 1042,\n  "name": "Can",\n  "nickname": null\n}`,
    validate(code) {
      if (code.includes("//") || code.includes("function") || code.includes("undefined")) {
        return { passed: false, message: "JSON'da yorum satırları, 'undefined' veya fonksiyonlar yer alamaz!" };
      }
      const diag = window.ConverterEngine.JSON.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d && d.userId === 1042 && d.name === "Can") {
        return { passed: true, message: "Tebrikler! JavaScript nesnesi ile katı JSON arasındaki derin farkı kavradınız." };
      }
      return { passed: false, message: "userId ve name alanlarını geçerli JSON kurallarıyla tanımlayın." };
    },
    explanation: "JSON yalnızca saf veri taşımak içindir; fonksiyon ve undefined gibi çalışma zamanı tiplerini desteklemez."
  },

  {
    id: "json-12",
    title: "JSON: JWT (JSON Web Token) Payload Mimarisi",
    category: "json",
    level: "advanced",
    description: "Kimlik doğrulama token'ı için standart bir JWT payload nesnesi oluşturun:\n- 'sub': 'user_8829'\n- 'name': 'Emre Can'\n- 'admin': false\n- 'exp': 1760000000 (sayı cinsinden son geçerlilik zamanı)",
    hints: [
      "sub, name, admin, exp anahtarlarını çift tırnaklı tanımlayın.",
      "admin boolean (false), exp ise sayı olmalıdır."
    ],
    initialCode: `{\n  // JWT alanlarını buraya ekleyin\n}`,
    solutionCode: `{\n  "sub": "user_8829",\n  "name": "Emre Can",\n  "admin": false,\n  "exp": 1760000000\n}`,
    validate(code) {
      const diag = window.ConverterEngine.JSON.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d.sub === "user_8829" && d.name === "Emre Can" && d.admin === false && typeof d.exp === "number") {
        return { passed: true, message: "Müthiş! Modern web güvenliğinin temeli olan JWT JSON Payload'unu yazdınız." };
      }
      return { passed: false, message: "sub, name, admin (false) ve exp (sayı) alanlarını doğru biçimlendirin." };
    },
    explanation: "JWT'nin ortasındaki veri parçası Base64 ile kodlanmış saf bir JSON nesnesidir."
  },

  {
    id: "json-13",
    title: "JSON: Sayfalama (Pagination) & Metadata Şeması",
    category: "json",
    level: "advanced",
    description: "Büyük veri listeleri sunan bir API için sayfalama yapısı kurun. Şunları içermelidir:\n- 'data': ['kullanici1', 'kullanici2']\n- 'meta': { 'page': 1, 'per_page': 10, 'total': 150, 'has_more': true }",
    hints: [
      "data bir dizi, meta ise bir nesnedir.",
      "has_more boolean (true), diğer meta alanları sayıdır."
    ],
    initialCode: `{\n  // data ve meta alanlarını buraya yazın\n}`,
    solutionCode: `{\n  "data": [\n    "kullanici1",\n    "kullanici2"\n  ],\n  "meta": {\n    "page": 1,\n    "per_page": 10,\n    "total": 150,\n    "has_more": true\n  }\n}`,
    validate(code) {
      const diag = window.ConverterEngine.JSON.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (Array.isArray(d.data) && d.meta && d.meta.page === 1 && d.meta.has_more === true && d.meta.total === 150) {
        return { passed: true, message: "Tebrikler! Kurumsal REST API'lerin altın kuralı olan Pagination şemasını tamamladınız." };
      }
      return { passed: false, message: "data dizisi ve meta ({ page, per_page, total, has_more }) alanlarını sağlayın." };
    },
    explanation: "Büyük veri kümelerini parçalayarak aktarmak için pagination metadata şeması kullanılır."
  },

  {
    id: "json-14",
    title: "JSON: Webhook Olay Bildirim Yükü (Webhook Payload)",
    category: "json",
    level: "advanced",
    description: "Stripe veya GitHub gibi sistemlerin gönderdiği bir Webhook bildirim nesnesi tasarlayın:\n- 'id': 'evt_98412'\n- 'event': 'payment.succeeded'\n- 'created_at': 1760012000\n- 'data': { 'amount': 5000, 'currency': 'try', 'paid': true }",
    hints: [
      "data içinde amount (5000), currency ('try') ve paid (true) bulunmalıdır."
    ],
    initialCode: `{\n  // Webhook payload'unu buraya yazın\n}`,
    solutionCode: `{\n  "id": "evt_98412",\n  "event": "payment.succeeded",\n  "created_at": 1760012000,\n  "data": {\n    "amount": 5000,\n    "currency": "try",\n    "paid": true\n  }\n}`,
    validate(code) {
      const diag = window.ConverterEngine.JSON.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d.id === "evt_98412" && d.event === "payment.succeeded" && d.data && d.data.amount === 5000 && d.data.paid === true) {
        return { passed: true, message: "Mükemmel! Finans ve ödeme sistemlerinin kullandığı Webhook JSON yapısını kurdunuz." };
      }
      return { passed: false, message: "id, event, created_at ve data ({ amount, currency, paid }) alanlarını kontrol edin." };
    },
    explanation: "Webhook'lar servisler arası anlık veri tetiklemelerinde standart JSON nesnesi kullanır."
  },

  {
    id: "json-15",
    title: "JSON: JSON Schema Doğrulama Manifestosu",
    category: "json",
    level: "advanced",
    description: "JSON verilerini doğrulamak için bir JSON Schema oluşturun:\n- 'type': 'object'\n- 'properties': { 'email': { 'type': 'string' }, 'age': { 'type': 'number' } }\n- 'required': ['email']",
    hints: [
      "type: 'object', properties bir nesne, required ise string dizisidir."
    ],
    initialCode: `{\n  // JSON Schema tanımını buraya yazın\n}`,
    solutionCode: `{\n  "type": "object",\n  "properties": {\n    "email": {\n      "type": "string"\n    },\n    "age": {\n      "type": "number"\n    }\n  },\n  "required": [\n    "email"\n  ]\n}`,
    validate(code) {
      const diag = window.ConverterEngine.JSON.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d.type === "object" && d.properties && d.properties.email && Array.isArray(d.required) && d.required.includes("email")) {
        return { passed: true, message: "🏆 HARİKA! 15. JSON görevini tamamlayarak JSON Ustalık seviyesine ulaştınız!" };
      }
      return { passed: false, message: "type, properties (email, age) ve required (['email']) alanlarını sağlayın." };
    },
    explanation: "JSON Schema, API veri modellerinin tip güvenliğini ve zorunlu alanlarını doğrulamak için kullanılır."
  },

  // =========================================================================
  // 🟢 YAML SORULARI (16 - 30)
  // =========================================================================

  // --- YAML BAŞLANGIÇ (16 - 20) ---
  {
    id: "yaml-1",
    title: "YAML: Tab Karakteri & Girinti Hatası",
    category: "yaml",
    level: "beginner",
    description: "Verilen YAML belgesinde bir TAB karakteri kullanılmış ve 'skills' listesinin girintisi bozulmuş. YAML'da TAB kesinlikle yasaktır. TAB karakterini 2 boşlukla değiştirin ve listeyi doğru girintileyin.",
    hints: [
      "YAML spesifikasyonuna göre girintiler sadece boşluk (space) tuşu ile yapılabilir.",
      "Liste elemanları ('-') bir üst özelliğin altında 2 boşluk girintiyle yazılmalıdır."
    ],
    initialCode: `developer:\n\tname: Ayşe Demir\n  experience_years: 5\nskills:\n- Python\n- Docker\n- Kubernetes`,
    solutionCode: `developer:\n  name: Ayşe Demir\n  experience_years: 5\nskills:\n  - Python\n  - Docker\n  - Kubernetes`,
    validate(code) {
      if (code.includes("\t")) {
        return { passed: false, message: "Dosyada hala TAB karakteri (\t) bulunuyor! TAB tuşu yerine boşluk (space) kullanın." };
      }
      const diag = window.ConverterEngine.YAML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const data = diag.data;
      if (data && data.developer && data.developer.name && Array.isArray(data.skills) && data.skills.length === 3) {
        return { passed: true, message: "Mükemmel! Tab karakterini temizlediniz ve YAML girintisini kusursuz hale getirdiniz." };
      }
      return { passed: false, message: "YAML yapısı geçerli fakat 'skills' listesi veya 'developer' nesnesi eksik." };
    },
    explanation: "YAML'ın en katı kuralı boşluk hiyerarşisidir; TAB karakteri sözdizim hatasıdır."
  },

  {
    id: "yaml-2",
    title: "YAML: Basit Anahtar-Değer & İki Nokta Kuralı",
    category: "yaml",
    level: "beginner",
    description: "YAML'da iki noktadan sonra MUTLAKA bir boşluk olmalıdır. Aşağıdaki 'server:nginx' ve 'port:80' hatalarını iki noktadan sonra boşluk bırakarak düzeltin.",
    hints: [
      "server: nginx",
      "port: 80"
    ],
    initialCode: `server:nginx\nport:80\nenabled: true`,
    solutionCode: `server: nginx\nport: 80\nenabled: true`,
    validate(code) {
      const diag = window.ConverterEngine.YAML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d && d.server === "nginx" && Number(d.port) === 80 && d.enabled === true) {
        return { passed: true, message: "Harika! İki noktadan sonra bir boşluk bırakma kuralını uyguladınız." };
      }
      return { passed: false, message: "server, port ve enabled alanlarını doğru yazın." };
    },
    explanation: "YAML'da anahtar sonrasındaki iki noktadan sonra boşluk bırakılmazsa değer ayrıştırılamaz."
  },

  {
    id: "yaml-3",
    title: "YAML: Doğru Veri Tipleri & Boolean Değerler",
    category: "yaml",
    level: "beginner",
    description: "Aşağıdaki YAML dosyasında sayı olması gereken port değeri string yapılmış, boolean olması gereken 'enabled' değeri tırnak içine alınmış. Sayıyı tırnaksız sayıya, 'enabled' değerini gerçek boolean (true) değerine çevirin.",
    hints: [
      "\"8080\" yerine 8080 yazın.",
      "\"true\" yerine true yazın."
    ],
    initialCode: `app:\n  name: "AuthService"\n  port: "8080"\n  enabled: "true"\n  max_retries: 3`,
    solutionCode: `app:\n  name: "AuthService"\n  port: 8080\n  enabled: true\n  max_retries: 3`,
    validate(code) {
      const diag = window.ConverterEngine.YAML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d && d.app) {
        if (typeof d.app.port !== "number") {
          return { passed: false, message: "Port alanı hala string ('8080'). Tırnakları kaldırıp sayı (8080) yapın." };
        }
        if (typeof d.app.enabled !== "boolean") {
          return { passed: false, message: "Enabled alanı hala string ('true'). Tırnakları kaldırıp boolean (true) yapın." };
        }
        return { passed: true, message: "Süper! YAML'da tip çıkarımını (type inference) doğru şekilde yapılandırdınız." };
      }
      return { passed: false, message: "Beklenen veri yapısı eksik." };
    },
    explanation: "YAML dinamik tip çıkarımına sahiptir; tırnak koymazsanız sayı ve boolean tipleri otomatik tanır."
  },

  {
    id: "yaml-4",
    title: "YAML: Yorum Satırları Ekleme (#)",
    category: "yaml",
    level: "beginner",
    description: "YAML'ın JSON'a göre en büyük avantajlarından biri yorum satırlarıdır. 'database' ayarı üzerine '# Veritabani baglantisi' yorum satırı ekleyin ve host/port ayarlarını tanımlayın.",
    hints: [
      "# ile başlayan satırlar yorumdur.",
      "database:\n  host: localhost\n  port: 5432"
    ],
    initialCode: `database:\n  host: localhost\n  port: 5432`,
    solutionCode: `# Veritabani baglantisi\ndatabase:\n  host: localhost\n  port: 5432`,
    validate(code) {
      if (!code.includes("#")) {
        return { passed: false, message: "Dosyaya '#' ile başlayan bir yorum satırı eklemelisiniz." };
      }
      const diag = window.ConverterEngine.YAML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d && d.database && d.database.host === "localhost" && d.database.port === 5432) {
        return { passed: true, message: "Tebrikler! YAML yorum satırı desteğini başarıyla kullandınız." };
      }
      return { passed: false, message: "database ayarlarını koruyun." };
    },
    explanation: "YAML `#` karakteri ile yorum satırlarını destekler, bu da konfigürasyon belgeleri için hayati önem taşır."
  },

  {
    id: "yaml-5",
    title: "YAML: Liste Elemanları & Meyve Sepeti",
    category: "yaml",
    level: "beginner",
    description: "'sepet' adında bir anahtar oluşturun ve altında 3 adet meyve ismi ('elma', 'armut', 'muz') barındıran bir liste tanımlayın. Her liste elemanının tire (-) ile başlaması gerektiğini unutmayın.",
    hints: [
      "sepet:\n  - elma\n  - armut\n  - muz"
    ],
    initialCode: `sepet:\n// Meyveleri tire (-) ile ekleyin`,
    solutionCode: `sepet:\n  - elma\n  - armut\n  - muz`,
    validate(code) {
      const diag = window.ConverterEngine.YAML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d && Array.isArray(d.sepet) && d.sepet.length >= 3) {
        return { passed: true, message: "Harika! Standart YAML liste sözdizimini oluşturdunuz." };
      }
      return { passed: false, message: "sepet altında en az 3 adet liste elemanı olmalıdır." };
    },
    explanation: "YAML'da listeler tire işareti (-) ve ardından bir boşluk ile temsil edilir."
  },

  // --- YAML ORTA SEVİYE (21 - 25) ---
  {
    id: "yaml-6",
    title: "YAML: Docker Compose Servis Konfigürasyonu",
    category: "yaml",
    level: "intermediate",
    description: "Aşağıdaki Docker Compose yapılandırmasında portlar ('80:80') ve ortam değişkenleri ('environment') liste şeklinde olmalı, ancak girinti ve tire ('-') hataları yüzünden geçersiz. Doğru Docker Compose yapısını kurun.",
    hints: [
      "ports ve environment listelerdir. Her liste elemanı '-' ile başlar ve 2 boşluk içeride olmalıdır."
    ],
    initialCode: `version: '3.8'\nservices:\n  web:\n    image: nginx:alpine\n    ports:\n    80:80\n    environment:\n    NODE_ENV: production`,
    solutionCode: `version: '3.8'\nservices:\n  web:\n    image: nginx:alpine\n    ports:\n      - "80:80"\n    environment:\n      - NODE_ENV=production`,
    validate(code) {
      const diag = window.ConverterEngine.YAML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d && d.services && d.services.web) {
        const web = d.services.web;
        if (Array.isArray(web.ports) && web.ports.length > 0 && web.image) {
          return { passed: true, message: "Kusursuz! Docker Compose sözdizimini ve YAML liste hiyerarşisini düzelttiniz." };
        }
      }
      return { passed: false, message: "web servisi altında ports listesi doğru tanımlanmamış." };
    },
    explanation: "DevOps dünyasında Docker Compose tamamen YAML liste ve sözlük yapıları üzerine kuruludur."
  },

  {
    id: "yaml-7",
    title: "YAML: Çok Satırlı Metinler (| vs >)",
    category: "yaml",
    level: "intermediate",
    description: "YAML'da çok satırlı metinler için '|' (satır sonlarını korur - literal) ve '>' (satır sonlarını boşluğa dönüştürür - folded) operatörleri kullanılır. 'release_notes' için satır sonlarını koruyan literal (|) bloğunu kullanın.",
    hints: [
      "release_notes: |",
      "Bir alt satıra geçip 2 boşluk girintiyle içeriği yazın."
    ],
    initialCode: `package:\n  name: "super-app"\n  version: "2.1.0"\n  release_notes:\n    Satır 1: Güvenlik yamaları uygulandı.\n    Satır 2: Performans iyileştirildi.`,
    solutionCode: `package:\n  name: "super-app"\n  version: "2.1.0"\n  release_notes: |\n    Satır 1: Güvenlik yamaları uygulandı.\n    Satır 2: Performans iyileştirildi.`,
    validate(code) {
      const diag = window.ConverterEngine.YAML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      if (!code.includes("|")) {
        return { passed: false, message: "release_notes alanında satır sonlarını koruyan '|' operatörünü kullanın." };
      }
      const d = diag.data;
      if (d && d.package && d.package.release_notes && d.package.release_notes.includes("\n")) {
        return { passed: true, message: "Bravo! YAML'ın çok satırlı literal blok (|) mekanizmasını doğru kullandınız." };
      }
      return { passed: false, message: "release_notes çok satırlı bir metin olarak algılanmadı." };
    },
    explanation: "YAML'da '|' (pipe) satır sonlarını korurken, '>' (folded) satırları birleştirip tek bir paragraf yapar."
  },

  {
    id: "yaml-8",
    title: "YAML: DRY Konfigürasyon (Anchors & Aliases)",
    category: "yaml",
    level: "intermediate",
    description: "YAML'da tekrarlanan blokları kopyalamamak için Anchor (&) ve Alias (*) kullanılır. 'default_db' ayarını '&db_config' ile etiketleyin ve 'production_db' içinde '<<: *db_config' kullanarak miras alın, ardından portu 5433 olarak ezin.",
    hints: [
      "Tanımlama: default_db: &db_config",
      "Kullanım: production_db:\n    <<: *db_config\n    port: 5433"
    ],
    initialCode: `default_db:\n  host: "localhost"\n  port: 5432\n  driver: "postgres"\n\nproduction_db:\n  host: "localhost"\n  port: 5433\n  driver: "postgres"`,
    solutionCode: `default_db: &db_config\n  host: "localhost"\n  port: 5432\n  driver: "postgres"\n\nproduction_db:\n  <<: *db_config\n  port: 5433`,
    validate(code) {
      if (!code.includes("&") || !code.includes("*")) {
        return { passed: false, message: "Anchor (&) ve Alias (*) sembollerini kullanmalısınız." };
      }
      const diag = window.ConverterEngine.YAML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d.production_db && d.production_db.driver === "postgres" && d.production_db.port === 5433) {
        return { passed: true, message: "Müthiş! YAML'ın Anchor & Alias miras alma mekanizmasını uyguladınız." };
      }
      return { passed: false, message: "production_db konfigürasyonu bekleneni karşılamıyor." };
    },
    explanation: "YAML'ın DRY yeteneği büyük dosyalarda veri tekrarını ve güncelleme hatalarını engeller."
  },

  {
    id: "yaml-9",
    title: "YAML: CI/CD Pipeline & Bash Script Bloğu",
    category: "yaml",
    level: "intermediate",
    description: "Bir CI/CD pipeline adımında çok satırlı bir bash komut kümesi çalıştırılmak isteniyor. Satır sonlarını koruyan literal blok (|) operatörünü kullanarak 'script' alanını geçerli bir YAML yapısına dönüştürün.",
    hints: [
      "script: |",
      "Bir alt satıra geçip 2 boşluk girintiyle komutları yazın: echo 'Testler basliyor' ve npm test"
    ],
    initialCode: `job:\n  name: "Birim Testleri"\n  script:\n    echo "Testler basliyor"\n    npm test\n    echo "Testler bitti"`,
    solutionCode: `job:\n  name: "Birim Testleri"\n  script: |\n    echo "Testler basliyor"\n    npm test\n    echo "Testler bitti"`,
    validate(code) {
      const diag = window.ConverterEngine.YAML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d && d.job && typeof d.job.script === "string" && d.job.script.includes("\n")) {
        return { passed: true, message: "Mükemmel! script: | ile çok satırlı terminal komutlarını YAML'a aktardınız." };
      }
      return { passed: false, message: "script alanında '|' literal operatörünü kullanın." };
    },
    explanation: "GitLab CI ve GitHub Actions iş akışlarında çok satırlı bash script'leri daima '|' operatörü ile tanımlanır."
  },

  {
    id: "yaml-10",
    title: "YAML: GitHub Actions Workflow İskeleti",
    category: "yaml",
    level: "intermediate",
    description: "Aşağıdaki GitHub Actions iş akışında girintiler bozulmuş. 'on: push' tetikleyicisi olan ve 'build' adında bir job çalıştıran geçerli bir GitHub Actions YAML dosyası haline getirin.",
    hints: [
      "jobs altında build, build altında runs-on yer almalıdır."
    ],
    initialCode: `name: CI Pipeline\non: push\njobs:\nbuild:\nruns-on: ubuntu-latest`,
    solutionCode: `name: CI Pipeline\non: push\njobs:\n  build:\n    runs-on: ubuntu-latest`,
    validate(code) {
      const diag = window.ConverterEngine.YAML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d && d.jobs && d.jobs.build && d.jobs.build["runs-on"] === "ubuntu-latest") {
        return { passed: true, message: "Tebrikler! GitHub Actions hiyerarşisini ve girintilerini kusursuz düzelttiniz." };
      }
      return { passed: false, message: "jobs altında build, build altında runs-on yer almalıdır." };
    },
    explanation: "GitHub Actions iş akışları `.github/workflows/` klasöründe YAML olarak saklanır."
  },

  // --- YAML İLERİ SEVİYE (26 - 30) ---
  {
    id: "yaml-11",
    title: "YAML: Kubernetes Deployment Pod Manifestosu",
    category: "yaml",
    level: "advanced",
    description: "Aşağıdaki Kubernetes Deployment dosyasında 'containers' bir listedir ve altında 'name', 'image' ve 'ports' yer alır. Ancak girintilerdeki kayma yüzünden sözdizimi bozulmuştur. Hatasız bir K8s Deployment manifestosu haline getirin.",
    hints: [
      "spec.template.spec.containers bir listedir: altında '-' ile container tanımı başlar."
    ],
    initialCode: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx-deployment\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n      name: nginx\n      image: nginx:1.14.2\n      ports:\n      containerPort: 80`,
    solutionCode: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx-deployment\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n        - name: nginx\n          image: nginx:1.14.2\n          ports:\n            - containerPort: 80`,
    validate(code) {
      const diag = window.ConverterEngine.YAML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      try {
        const containers = d.spec.template.spec.containers;
        if (Array.isArray(containers) && containers[0].name === "nginx") {
          const ports = containers[0].ports;
          if (Array.isArray(ports) && ports[0].containerPort === 80) {
            return { passed: true, message: "Kusursuz! Kubernetes Pod ve Container liste hiyerarşisini kurguladınız." };
          }
        }
      } catch (e) {}
      return { passed: false, message: "spec.template.spec.containers ve ports alanlarının doğru liste (-) yapısında olduğundan emin olun." };
    },
    explanation: "Kubernetes manifestoları YAML liste ve sözlüklerinin en katı uygulandığı alanlardır."
  },

  {
    id: "yaml-12",
    title: "YAML: Meşhur 'Norveç Problemi' (The Norway Problem)",
    category: "yaml",
    level: "advanced",
    description: "YAML 1.1 spesifikasyonunda 'NO' ifadesi Norveç ülke kodu yerine 'false' (boolean) olarak yorumlanır! Aşağıdaki ülkeler listesinde Norveç (NO) değerinin boolean değil string 'NO' olarak algılanmasını sağlayın.",
    hints: [
      "Değeri tırnak içine alın: \"NO\""
    ],
    initialCode: `countries:\n  - TR\n  - DE\n  - NO\n  - FR`,
    solutionCode: `countries:\n  - TR\n  - DE\n  - "NO"\n  - FR`,
    validate(code) {
      const diag = window.ConverterEngine.YAML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d && Array.isArray(d.countries)) {
        if (d.countries.includes(false)) {
          return { passed: false, message: "Tuzak tetiklendi! 'NO' değeri boolean 'false' olarak algılandı. Onu tırnak içine alın: \"NO\"" };
        }
        if (d.countries.includes("NO")) {
          return { passed: true, message: "Tebrikler! Yazılım dünyasının en ünlü YAML tuzaklarından 'Norveç Problemi'ni çözdünüz!" };
        }
      }
      return { passed: false, message: "countries listesinde 'NO' ifadesini koruyun." };
    },
    explanation: "YAML 1.1'deki Norveç Problemi, tırnaksız NO ifadesini boolean false yapmasından kaynaklanır."
  },

  {
    id: "yaml-13",
    title: "YAML: Helm Chart values.yaml İnce Ayarı",
    category: "yaml",
    level: "advanced",
    description: "Kubernetes paket yöneticisi Helm için kaynak sınırlarını belirleyin:\nresources:\n  limits:\n    cpu: \"500m\"\n    memory: \"512Mi\"\n  requests:\n    cpu: \"250m\"\n    memory: \"256Mi\"",
    hints: [
      "resources altında limits ve requests iki ayrı sözlüktür."
    ],
    initialCode: `resources:\nlimits:\ncpu: "500m"\nrequests:\ncpu: "250m"`,
    solutionCode: `resources:\n  limits:\n    cpu: "500m"\n    memory: "512Mi"\n  requests:\n    cpu: "250m"\n    memory: "256Mi"`,
    validate(code) {
      const diag = window.ConverterEngine.YAML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d && d.resources && d.resources.limits && d.resources.requests) {
        if (d.resources.limits.cpu && d.resources.requests.cpu) {
          return { passed: true, message: "Süper! Helm Chart ve K8s kaynak yönetim sözdizimini eksiksiz kurguladınız." };
        }
      }
      return { passed: false, message: "resources altında limits ve requests alt sözlükleri doğru girintilenmelidir." };
    },
    explanation: "Helm Chart'lar ile Kubernetes uygulamaları deploy edilirken `values.yaml` ile kaynak limitleri yönetilir."
  },

  {
    id: "yaml-14",
    title: "YAML: Ansible Playbook Görev Tanımı",
    category: "yaml",
    level: "advanced",
    description: "Sunucu otomasyon aracı Ansible için bir playbook yazın:\n- name: Nginx Kurulumu\n  hosts: webservers\n  tasks:\n    - name: Paket kur\n      apt:\n        name: nginx\n        state: present",
    hints: [
      "tasks bir listedir (- name: Paket kur)",
      "apt sözlüğü 2 boşluk içeride olmalıdır."
    ],
    initialCode: `- name: Nginx Kurulumu\nhosts: webservers\ntasks:\nname: Paket kur\napt: nginx`,
    solutionCode: `- name: Nginx Kurulumu\n  hosts: webservers\n  tasks:\n    - name: Paket kur\n      apt:\n        name: nginx\n        state: present`,
    validate(code) {
      const diag = window.ConverterEngine.YAML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (Array.isArray(d) && d[0].hosts === "webservers" && Array.isArray(d[0].tasks)) {
        return { passed: true, message: "Harika! Ansible Playbook otomasyon manifestosunu doğru kurguladınız." };
      }
      return { passed: false, message: "Playbook en dışta bir listedir (- name: ...), tasks altında liste elemanı yer almalıdır." };
    },
    explanation: "Ansible, sunucu konfigürasyonlarını yönetirken YAML playbook dosyalarından yararlanır."
  },

  {
    id: "yaml-15",
    title: "YAML: OpenAPI / Swagger 3.0 API Tanımı",
    category: "yaml",
    level: "advanced",
    description: "Bir REST API dokümantasyonu için OpenAPI 3.0 şeması kurun:\nopenapi: \"3.0.0\"\ninfo:\n  title: \"Kullanici Servisi\"\n  version: \"1.0.0\"\npaths:\n  /users:\n    get:\n      summary: \"Kullanicilari listele\"",
    hints: [
      "paths altında /users, /users altında get, get altında summary yer alır."
    ],
    initialCode: `openapi: "3.0.0"\ninfo:\n  title: "Kullanici Servisi"\npaths:\n/users:\nget:\nsummary: "Kullanicilari listele"`,
    solutionCode: `openapi: "3.0.0"\ninfo:\n  title: "Kullanici Servisi"\n  version: "1.0.0"\npaths:\n  /users:\n    get:\n      summary: "Kullanicilari listele"`,
    validate(code) {
      const diag = window.ConverterEngine.YAML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d && d.openapi === "3.0.0" && d.paths && d.paths["/users"] && d.paths["/users"].get) {
        return { passed: true, message: "🏆 MUHTEŞEM! 15. YAML görevini tamamlayarak YAML Ustalık seviyesine ulaştınız!" };
      }
      return { passed: false, message: "openapi, info ve paths altındaki hiyerarşiyi kontrol edin." };
    },
    explanation: "Swagger ve OpenAPI spesifikasyonları API dokümantasyonunu YAML ağacı olarak modeller."
  },

  // =========================================================================
  // 🟠 XML SORULARI (31 - 45)
  // =========================================================================

  // --- XML BAŞLANGIÇ (31 - 35) ---
  {
    id: "xml-1",
    title: "XML: Kök Eleman & Kapanmayan Etiket",
    category: "xml",
    level: "beginner",
    description: "Aşağıdaki XML dökümanı geçerli değil: 1) Tek bir kök (root) elemanı yok (iki ayrı ana etiket var), 2) <fiyat> etiketi kapanmamış. Tüm içeriği tek bir <urunler> kök etiketine alın ve kapanış etiketini düzeltin.",
    hints: [
      "Tüm XML dökümanları tek bir kök etiketine sahip olmalıdır.",
      "Açılan her etiket kapanmalıdır: </fiyat>"
    ],
    initialCode: `<urun id="101">\n  <ad>Kablosuz Klavye</ad>\n  <fiyat>750\n</urun>\n<urun id="102">\n  <ad>Optik Fare</ad>\n  <fiyat>350</fiyat>\n</urun>`,
    solutionCode: `<urunler>\n  <urun id="101">\n    <ad>Kablosuz Klavye</ad>\n    <fiyat>750</fiyat>\n  </urun>\n  <urun id="102">\n    <ad>Optik Fare</ad>\n    <fiyat>350</fiyat>\n  </urun>\n</urunler>`,
    validate(code) {
      const diag = window.ConverterEngine.XML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const data = diag.data;
      if (!data.urun || !Array.isArray(data.urun)) {
        return { passed: false, message: "Kök etiket altında en az iki <urun> elemanı olmalıdır." };
      }
      return { passed: true, message: "Tebrikler! Tek kök etiket kuralını uyguladınız ve kapanmayan etiketi onardınız." };
    },
    explanation: "XML belgesi iyi biçimlendirilmiş (well-formed) olmalı; tek bir kök eleman barındırmalıdır."
  },

  {
    id: "xml-2",
    title: "XML: Nitelik (Attribute) vs Eleman (Element)",
    category: "xml",
    level: "beginner",
    description: "Aşağıdaki XML'de 'isbn' ve 'kategori' eleman olarak yazılmış. Bu iki alanı <kitap> etiketinin içine NİTELİK (Attribute) olarak taşıyın, içeride sadece <baslik> ve <yazar> kalsın.",
    hints: [
      "<kitap isbn=\"978-605-360\" kategori=\"Bilim Kurgu\">...</kitap>"
    ],
    initialCode: `<kitap>\n  <isbn>978-605-360</isbn>\n  <kategori>Bilim Kurgu</kategori>\n  <baslik>Cesur Yeni Dünya</baslik>\n  <yazar>Aldous Huxley</yazar>\n</kitap>`,
    solutionCode: `<kitap isbn="978-605-360" kategori="Bilim Kurgu">\n  <baslik>Cesur Yeni Dünya</baslik>\n  <yazar>Aldous Huxley</yazar>\n</kitap>`,
    validate(code) {
      const diag = window.ConverterEngine.XML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d && d["@attributes"] && d["@attributes"].isbn && d["@attributes"].kategori) {
        if (d.baslik && d.yazar && !d.isbn && !d.kategori) {
          return { passed: true, message: "Tebrikler! XML'de Nitelik ve Eleman ayrımını başarıyla uyguladınız." };
        }
      }
      return { passed: false, message: "isbn ve kategori alanlarını <kitap ...> etiketinin niteliği (attribute) yapmalısınız." };
    },
    explanation: "Meta bilgiler genellikle niteliklerde, asıl taşınan veri elemanlarda tutulur."
  },

  {
    id: "xml-3",
    title: "XML: Özel Varlıklar (Entities - &lt; &amp;)",
    category: "xml",
    level: "beginner",
    description: "XML'de '<' ve '&' karakterleri doğrudan metin içine yazılamaz çünkü ayrıştırıcı bunları etiket başlangıcı sanır. Aşağıdaki metindeki '<' işaretini '&lt;' ve '&' işaretini '&amp;' ile değiştirin.",
    hints: [
      "< yerine &lt; yazın.",
      "& yerine &amp; yazın."
    ],
    initialCode: `<kural>\n  Puan < 50 & Seviye == 1 ise elenir.\n</kural>`,
    solutionCode: `<kural>\n  Puan &lt; 50 &amp; Seviye == 1 ise elenir.\n</kural>`,
    validate(code) {
      const diag = window.ConverterEngine.XML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      if (code.includes("&lt;") && code.includes("&amp;")) {
        return { passed: true, message: "Harika! XML önceden tanımlı kaçış varlıklarını (&lt; ve &amp;) başarıyla kullandınız." };
      }
      return { passed: false, message: "< ve & işaretlerini &lt; ve &amp; ile değiştirin." };
    },
    explanation: "XML standartlarında <, >, &, \", ' karakterleri entity ref ile kaçırılmalıdır."
  },

  {
    id: "xml-4",
    title: "XML: Büyük/Küçük Harf Uyuşmazlığı (Case Sensitivity)",
    category: "xml",
    level: "beginner",
    description: "XML'de etiket isimleri büyük/küçük harf duyarlıdır. <Kullanici> ile </kullanici> uyuşmaz. Aşağıdaki etiketlerin tümünü küçük harfli (<kullanici>, <ad>, <soyad>) yaparak XML'ı düzeltin.",
    hints: [
      "Açılış ve kapanış etiket harf büyüklükleri birebir aynı olmalıdır."
    ],
    initialCode: `<Kullanici>\n  <Ad>Mert</ad>\n  <soyad>Demir</Soyad>\n</kullanici>`,
    solutionCode: `<kullanici>\n  <ad>Mert</ad>\n  <soyad>Demir</soyad>\n</kullanici>`,
    validate(code) {
      const diag = window.ConverterEngine.XML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d && d.ad === "Mert" && d.soyad === "Demir") {
        return { passed: true, message: "Tebrikler! Etiket isimlerindeki harf büyüklüklerini eşleştirdiniz." };
      }
      return { passed: false, message: "kullanici, ad ve soyad etiketlerini küçük harfle eşleştirin." };
    },
    explanation: "HTML'in aksine XML tamamen büyük/küçük harf duyarlıdır (case-sensitive)."
  },

  {
    id: "xml-5",
    title: "XML: Kendi Kendine Kapanan Etiketler (Self-Closing)",
    category: "xml",
    level: "beginner",
    description: "İçeriği olmayan boş etiketler XML'de `<ayar />` şeklinde kendi kendine kapatılmalıdır. Aşağıdaki `<ayar>` etiketini `<ayar durum=\"aktif\"/>` haline getirin.",
    hints: [
      "<ayar durum=\"aktif\"/> şeklinde slash (/) ile kapatın."
    ],
    initialCode: `<sistem>\n  <ayar durum="aktif">\n  <versiyon>1.0</versiyon>\n</sistem>`,
    solutionCode: `<sistem>\n  <ayar durum="aktif"/>\n  <versiyon>1.0</versiyon>\n</sistem>`,
    validate(code) {
      const diag = window.ConverterEngine.XML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      if (code.includes("<ayar") && code.includes("/>")) {
        return { passed: true, message: "Harika! Boş etiketlerin kendi kendine kapanma kuralını uyguladınız." };
      }
      return { passed: false, message: "<ayar durum=\"aktif\"/> etiketini self-closing yapın." };
    },
    explanation: "XML'de içeriği olmayan etiketler `<tag/>` şeklinde tek satırda sonlandırılabilir."
  },

  // --- XML ORTA SEVİYE (36 - 40) ---
  {
    id: "xml-6",
    title: "XML: CDATA ile Ham Kod Saklama",
    category: "xml",
    level: "intermediate",
    description: "XML'de metin içinde '<' ve '&' işaretleri doğrudan bulunamaz. Aşağıdaki JavaScript kodunu XML'in çökmesini engellemek için CDATA bloğu içine alın: <![CDATA[ ... ]]>",
    hints: [
      "<script><![CDATA[ ... ]]></script>"
    ],
    initialCode: `<webpage>\n  <title>Anasayfa</title>\n  <script>\n    if (score < 50 && level > 1) {\n      console.log("Tekrar dene!");\n    }\n  </script>\n</webpage>`,
    solutionCode: `<webpage>\n  <title>Anasayfa</title>\n  <script><![CDATA[\n    if (score < 50 && level > 1) {\n      console.log("Tekrar dene!");\n    }\n  ]]></script>\n</webpage>`,
    validate(code) {
      const diag = window.ConverterEngine.XML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      if (!code.includes("<![CDATA[")) {
        return { passed: false, message: "Script etiketini CDATA bloğu içine almadınız!" };
      }
      return { passed: true, message: "Kusursuz! CDATA kullanarak XML ayrıştırıcısının çökmesini önlediniz." };
    },
    explanation: "CDATA bölümleri XML ayrıştırıcısına bu kısmı denetlememesini söyler; ham kod saklamak için idealdir."
  },

  {
    id: "xml-7",
    title: "XML: SVG Vektörel Çizim Anatomisi",
    category: "xml",
    level: "intermediate",
    description: "SVG (Scalable Vector Graphics) aslında saf bir XML standardıdır! Kök etiketi <svg viewBox=\"0 0 100 100\"> olan ve içinde kırmızı bir daire (<circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"red\"/>) barındıran geçerli bir SVG XML kodu yazın.",
    hints: [
      "<svg viewBox=\"0 0 100 100\"><circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"red\"/></svg>"
    ],
    initialCode: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="40" fill="red">\n</svg>`,
    solutionCode: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="40" fill="red"/>\n</svg>`,
    validate(code) {
      const diag = window.ConverterEngine.XML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      if (code.includes("<circle") && (code.includes("/>") || code.includes("</circle>"))) {
        return { passed: true, message: "Harika! SVG'nin saf XML mimarisini ve kendi kendine kapanan etiketini başarıyla yazdınız." };
      }
      return { passed: false, message: "<circle> etiketini kapatmayı unutmayın (<circle ... />)." };
    },
    explanation: "Web'de gördüğünüz tüm SVG vektör çizimleri arka planda XML ayrıştırıcısı tarafından okunur."
  },

  {
    id: "xml-8",
    title: "XML: Sitemap.xml Arama Motoru Haritası",
    category: "xml",
    level: "intermediate",
    description: "Google ve arama motorları için bir Sitemap XML belgesi oluşturun:\n- Kök etiket: <urlset>\n- İçinde bir <url> olmalı\n- <url> içinde <loc>https://example.com/blog</loc> ve <priority>0.8</priority> yer almalı.",
    hints: [
      "<urlset><url><loc>...</loc><priority>0.8</priority></url></urlset>"
    ],
    initialCode: `<urlset>\n  <!-- url elemanını buraya ekleyin -->\n</urlset>`,
    solutionCode: `<urlset>\n  <url>\n    <loc>https://example.com/blog</loc>\n    <priority>0.8</priority>\n  </url>\n</urlset>`,
    validate(code) {
      const diag = window.ConverterEngine.XML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d && d.url && d.url.loc && d.url.priority) {
        return { passed: true, message: "Tebrikler! SEO ve web sitelerinin standardı olan Sitemap XML yapısını yazdınız." };
      }
      return { passed: false, message: "urlset altında url, url altında loc ve priority bulunmalıdır." };
    },
    explanation: "Sitemap.xml, arama motorlarına bir web sitesindeki sayfaları ve önceliklerini bildiren standart XML'dir."
  },

  {
    id: "xml-9",
    title: "XML: e-Fatura / UBL-TR Finans Şablonu",
    category: "xml",
    level: "intermediate",
    description: "Türkiye'de e-Fatura sistemi UBL-TR XML standardını kullanır. Aşağıdaki fatura kök belgesini tamamlayın:\n<Invoice>\n  <ID>GIB202600000001</ID>\n  <IssueDate>2026-10-11</IssueDate>\n  <PayableAmount currencyID=\"TRY\">1500.00</PayableAmount>\n</Invoice>",
    hints: [
      "PayableAmount etiketi currencyID=\"TRY\" niteliğine (attribute) sahip olmalıdır."
    ],
    initialCode: `<Invoice>\n  <ID>GIB202600000001</ID>\n  <IssueDate>2026-10-11</IssueDate>\n  <!-- PayableAmount ekleyin -->\n</Invoice>`,
    solutionCode: `<Invoice>\n  <ID>GIB202600000001</ID>\n  <IssueDate>2026-10-11</IssueDate>\n  <PayableAmount currencyID="TRY">1500.00</PayableAmount>\n</Invoice>`,
    validate(code) {
      const diag = window.ConverterEngine.XML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d && d.ID && d.IssueDate && d.PayableAmount) {
        return { passed: true, message: "Harika! Resmi e-Fatura UBL-TR standart veri yapısını kurguladınız." };
      }
      return { passed: false, message: "PayableAmount alanını ekleyin." };
    },
    explanation: "Maliye ve e-Dönüşüm sistemleri fatura verilerini standart UBL XML formatında işler."
  },

  {
    id: "xml-10",
    title: "XML: HTML vs Katı XML Kuralları (XHTML)",
    category: "xml",
    level: "intermediate",
    description: "Standart HTML kapanmayan <img> veya <br> etiketlerini affeder, ama XML affetmez! Aşağıdaki belgede kapanmayan <img src=\"logo.png\"> ve <br> etiketlerini XML kurallarına göre self-closing (<img ... /> ve <br/>) yaparak düzeltin.",
    hints: [
      "<img src=\"logo.png\"/> ve <br/> yazın."
    ],
    initialCode: `<html>\n  <body>\n    <img src="logo.png">\n    <br>\n    <p>Hosgeldiniz</p>\n  </body>\n</html>`,
    solutionCode: `<html>\n  <body>\n    <img src="logo.png"/>\n    <br/>\n    <p>Hosgeldiniz</p>\n  </body>\n</html>`,
    validate(code) {
      const diag = window.ConverterEngine.XML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      if (code.includes("<img") && code.includes("/>") && code.includes("<br/>")) {
        return { passed: true, message: "Süper! Katı XML / XHTML kapanış kurallarını başarıyla uyguladınız." };
      }
      return { passed: false, message: "img ve br etiketlerini kendi kendine kapanan etiket (/>) haline getirin." };
    },
    explanation: "XHTML, HTML'in XML katı kurallarıyla yazılmış halidir; her etiket mutlaka kapanmalıdır."
  },

  // --- XML İLERİ SEVİYE (41 - 45) ---
  {
    id: "xml-11",
    title: "XML: RSS / Podcast Beslemesi Şeması",
    category: "xml",
    level: "advanced",
    description: "Bir RSS 2.0 beslemesi oluşturun:\n- Kök eleman: <rss version=\"2.0\">\n- İçinde bir <channel> olmalı\n- Channel içinde <title>, <link>, <description> ve en az 1 adet <item> bulunmalı\n- <item> içinde <title> ve <pubDate> olmalı.",
    hints: [
      "<rss version=\"2.0\"><channel>...</channel></rss> şablonunu kullanın."
    ],
    initialCode: `<rss version="2.0">\n  <!-- Buraya channel ve elemanlarını ekleyin -->\n</rss>`,
    solutionCode: `<rss version="2.0">\n  <channel>\n    <title>Yazılım Günlükleri</title>\n    <link>https://example.com</link>\n    <description>Teknoloji ve kodlama haberleri</description>\n    <item>\n      <title>YAML vs JSON</title>\n      <pubDate>Sun, 11 Oct 2026 12:00:00 GMT</pubDate>\n    </item>\n  </channel>\n</rss>`,
    validate(code) {
      const diag = window.ConverterEngine.XML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d && d.channel) {
        const ch = d.channel;
        if (ch.title && ch.link && ch.item) {
          return { passed: true, message: "Harika! Standart bir RSS 2.0 XML akışını eksiksiz inşa ettiniz." };
        }
      }
      return { passed: false, message: "channel altında title, link ve item elemanları eksiksiz tanımlanmalıdır." };
    },
    explanation: "Podcast yayınları ve haber akışları dünya çapında RSS XML standardını kullanır."
  },

  {
    id: "xml-12",
    title: "XML: Ad Alanları (Namespaces - xmlns)",
    category: "xml",
    level: "advanced",
    description: "XML'de farklı kaynaklardan gelen etiketlerin çakışmasını önlemek için ad alanları (xmlns) kullanılır. Kök etiketinde 'xmlns:sec=\"https://auth.example.com\"' tanımlı ve içinde <sec:token>JWT_123</sec:token> etiketi barındıran bir XML yazın.",
    hints: [
      "<auth xmlns:sec=\"https://auth.example.com\"><sec:token>JWT_123</sec:token></auth>"
    ],
    initialCode: `<auth>\n  <!-- sec namespace tanımını ve sec:token etiketini ekleyin -->\n</auth>`,
    solutionCode: `<auth xmlns:sec="https://auth.example.com">\n  <sec:token>JWT_123</sec:token>\n</auth>`,
    validate(code) {
      const diag = window.ConverterEngine.XML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      if (code.includes("xmlns:sec=") && code.includes("<sec:token>")) {
        return { passed: true, message: "Harika! XML ad alanı (Namespace) ön ek mekanizmasını başarıyla uyguladınız." };
      }
      return { passed: false, message: "xmlns:sec tanımı ve <sec:token> etiketi bulunmalıdır." };
    },
    explanation: "SOAP servisleri ve kurumsal XML belgelerinde etiket çakışmalarını önlemek için XML Namespaces kullanılır."
  },

  {
    id: "xml-13",
    title: "XML: Android Layout Arayüz Şablonu",
    category: "xml",
    level: "advanced",
    description: "Android mobil arayüzleri XML ile kodlanır. Aşağıdaki dikey LinearLayout içine id'si 'baslik' olan ve text değeri 'Hoşgeldiniz' olan bir <TextView/> bileşeni ekleyin.",
    hints: [
      "<TextView android:id=\"@+id/baslik\" android:text=\"Hoşgeldiniz\"/>"
    ],
    initialCode: `<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android" android:orientation="vertical">\n  <!-- TextView bileşenini buraya ekleyin -->\n</LinearLayout>`,
    solutionCode: `<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android" android:orientation="vertical">\n  <TextView android:id="@+id/baslik" android:text="Hoşgeldiniz"/>\n</LinearLayout>`,
    validate(code) {
      const diag = window.ConverterEngine.XML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      if (code.includes("<TextView") && code.includes("android:text=\"Hoşgeldiniz\"")) {
        return { passed: true, message: "Harika! Mobil geliştiricilerin her gün yazdığı Android UI XML yapısını tamamladınız." };
      }
      return { passed: false, message: "LinearLayout içine <TextView android:text=\"Hoşgeldiniz\"/> ekleyin." };
    },
    explanation: "Android işletim sisteminde ekran tasarımları XML formatında oluşturulur."
  },

  {
    id: "xml-14",
    title: "XML: SOAP Web Servisi Mesaj Zarfı (SOAP Envelope)",
    category: "xml",
    level: "advanced",
    description: "Kurumsal bankacılık ve kamu servislerinin kullandığı SOAP XML zarfı oluşturun:\n<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n  <soap:Body>\n    <GetDovizKuru>\n      <ParaBirimi>USD</ParaBirimi>\n    </GetDovizKuru>\n  </soap:Body>\n</soap:Envelope>",
    hints: [
      "soap:Envelope -> soap:Body -> GetDovizKuru hiyerarşisini kurun."
    ],
    initialCode: `<!-- SOAP Zarfını buraya yazın -->`,
    solutionCode: `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n  <soap:Body>\n    <GetDovizKuru>\n      <ParaBirimi>USD</ParaBirimi>\n    </GetDovizKuru>\n  </soap:Body>\n</soap:Envelope>`,
    validate(code) {
      const diag = window.ConverterEngine.XML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      if (code.includes("<soap:Envelope") && code.includes("<soap:Body>") && code.includes("<GetDovizKuru>")) {
        return { passed: true, message: "Kusursuz! Finans ve bankacılık SOAP XML protokolünü başarıyla kurguladınız." };
      }
      return { passed: false, message: "soap:Envelope, soap:Body ve GetDovizKuru etiketlerini eksiksiz tanımlayın." };
    },
    explanation: "SOAP (Simple Object Access Protocol), kurumsal sistemler arasında sıkı XML şemaları ile haberleşmeyi sağlar."
  },

  {
    id: "xml-15",
    title: "XML: Maven pom.xml Bağımlılık (Dependency) Ağacı",
    category: "xml",
    level: "advanced",
    description: "Java dünyasında projeler `pom.xml` ile yönetilir. Aşağıdaki proje içine JUnit test kütüphanesini ekleyin:\n<dependency>\n  <groupId>junit</groupId>\n  <artifactId>junit</artifactId>\n  <version>4.13.2</version>\n</dependency>",
    hints: [
      "dependencies etiketi içine <dependency>...</dependency> ekleyin."
    ],
    initialCode: `<project>\n  <modelVersion>4.0.0</modelVersion>\n  <dependencies>\n    <!-- dependency etiketini buraya ekleyin -->\n  </dependencies>\n</project>`,
    solutionCode: `<project>\n  <modelVersion>4.0.0</modelVersion>\n  <dependencies>\n    <dependency>\n      <groupId>junit</groupId>\n      <artifactId>junit</artifactId>\n      <version>4.13.2</version>\n    </dependency>\n  </dependencies>\n</project>`,
    validate(code) {
      const diag = window.ConverterEngine.XML.diagnose(code);
      if (!diag.valid) return { passed: false, message: diag.tip || diag.error };
      const d = diag.data;
      if (d && d.dependencies && d.dependencies.dependency) {
        return { passed: true, message: "🏆 MUHTEŞEM! 15. XML görevini tamamlayarak XML Ustalık seviyesine ulaştınız!" };
      }
      return { passed: false, message: "dependencies altına dependency (groupId, artifactId, version) ekleyin." };
    },
    explanation: "Java ekosisteminde Maven derleme ve paketleme aracı `pom.xml` ile tüm proje bağımlılıklarını yönetir."
  }
];
