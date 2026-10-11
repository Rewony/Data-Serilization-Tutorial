/**
 * FormatMaster - Comprehensive Learning Guides (Konu Anlatımı & Sözdizim Kılavuzları)
 * A'dan Z'ye JSON, YAML ve XML Eğitimi
 */

window.FormatGuides = {
  json: {
    title: "JSON (JavaScript Object Notation) Eğitimi",
    subtitle: "Modern webin ve REST API'lerin evrensel veri dili",
    icon: "code",
    color: "cyan",
    sections: [
      {
        id: "json-intro",
        title: "1. JSON Nedir ve Neden Kullanılır?",
        content: `
          <p class="text-sm text-slate-300 leading-relaxed mb-3">
            <strong>JSON</strong>, insan tarafından kolayca okunabilen ve makineler tarafından hızla ayrıştırılabilen (parse edilebilen) hafif bir metin tabanlı veri değişim formatıdır.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div class="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300">
              <strong class="text-cyan-400 block mb-1">🚀 Neden XML'in Yerini Aldı?</strong>
              Daha az karakter tüketir, dosya boyutu küçüktür, JavaScript ile yerel olarak <code>JSON.parse()</code> ile tek satırda nesneye dönüştürülebilir ve karmaşık şema yapılandırması gerektirmez.
            </div>
            <div class="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300">
              <strong class="text-cyan-400 block mb-1">🌐 Nerelerde Kullanılır?</strong>
              RESTful API'ler, Mobil ve Web uygulamaları veri iletişimi, MongoDB gibi NoSQL veritabanları, <code>package.json</code> veya <code>tsconfig.json</code> gibi ayar dosyaları.
            </div>
          </div>
        `
      },
      {
        id: "json-types",
        title: "2. Desteklenen 6 Veri Tipi",
        content: `
          <p class="text-sm text-slate-300 mb-3">JSON'da yalnızca 6 geçerli veri tipi bulunur. Bunların dışındaki veri tipleri (örneğin Date, Function, undefined) <strong>desteklenmez</strong>:</p>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4 text-xs">
            <div class="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span class="text-amber-400 font-bold block mb-1">1. String (Metin)</span>
              Mutlaka çift tırnaklı: <code class="text-slate-300">"Merhaba"</code>
            </div>
            <div class="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span class="text-purple-400 font-bold block mb-1">2. Number (Sayı)</span>
              Tam veya ondalıklı: <code class="text-slate-300">42</code> veya <code class="text-slate-300">3.14</code>
            </div>
            <div class="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span class="text-rose-400 font-bold block mb-1">3. Boolean</span>
              Küçük harfle: <code class="text-slate-300">true</code> veya <code class="text-slate-300">false</code>
            </div>
            <div class="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span class="text-slate-400 font-bold block mb-1">4. Null (Boşluk)</span>
              Değer yokluğunu belirtir: <code class="text-slate-300">null</code>
            </div>
            <div class="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span class="text-cyan-400 font-bold block mb-1">5. Object (Nesne)</span>
              Süslü parantez içinde anahtar-değer çiftleri: <code class="text-slate-300">{"ad": "Ali"}</code>
            </div>
            <div class="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span class="text-emerald-400 font-bold block mb-1">6. Array (Dizi)</span>
              Köşeli parantez içinde sıralı elemanlar: <code class="text-slate-300">[1, 2, "üç"]</code>
            </div>
          </div>
        `
      },
      {
        id: "json-rules",
        title: "3. Sözdizim (Syntax) Kuralları & Kritik Hatalar",
        content: `
          <div class="space-y-4">
            <!-- Karşılaştırma 1 -->
            <div>
              <h4 class="text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-cyan-400"></span> Kural A: Çift Tırnak Zorunluluğu (Tek Tırnak Geçersizdir!)
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                <div class="p-3 rounded-lg bg-rose-950/30 border border-rose-500/40 text-rose-300">
                  <div class="text-[11px] font-bold text-rose-400 mb-1 flex items-center gap-1">❌ YANLIŞ</div>
                  <pre>{ 'ad': 'Mehmet', age: 25 }</pre>
                  <p class="font-sans text-[11px] text-rose-400/80 mt-1.5">Tek tırnaklar ve tırnaksız nesne anahtarları JSON'da kesinlikle yasaktır.</p>
                </div>
                <div class="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/40 text-emerald-300">
                  <div class="text-[11px] font-bold text-emerald-400 mb-1 flex items-center gap-1">✅ DOĞRU</div>
                  <pre>{ "ad": "Mehmet", "age": 25 }</pre>
                  <p class="font-sans text-[11px] text-emerald-400/80 mt-1.5">Hem anahtarlar hem de metin değerler çift tırnak içine alınmalıdır.</p>
                </div>
              </div>
            </div>

            <!-- Karşılaştırma 2 -->
            <div>
              <h4 class="text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-cyan-400"></span> Kural B: Sonda Fazla Virgül (Trailing Comma) Hatası
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                <div class="p-3 rounded-lg bg-rose-950/30 border border-rose-500/40 text-rose-300">
                  <div class="text-[11px] font-bold text-rose-400 mb-1 flex items-center gap-1">❌ YANLIŞ</div>
                  <pre>[ "elma", "armut", "muz", ]</pre>
                  <p class="font-sans text-[11px] text-rose-400/80 mt-1.5">JavaScript dizilerinde izin verilse de standart JSON'da son elemandan sonra virgül koyulamaz.</p>
                </div>
                <div class="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/40 text-emerald-300">
                  <div class="text-[11px] font-bold text-emerald-400 mb-1 flex items-center gap-1">✅ DOĞRU</div>
                  <pre>[ "elma", "armut", "muz" ]</pre>
                  <p class="font-sans text-[11px] text-emerald-400/80 mt-1.5">Virgül sadece elemanlar arasına konulur, en son elemandan sonra konulmaz.</p>
                </div>
              </div>
            </div>

            <!-- Karşılaştırma 3 -->
            <div>
              <h4 class="text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-cyan-400"></span> Kural C: Yorum Satırları Kesinlikle Desteklenmez
              </h4>
              <p class="text-xs text-slate-300 mb-2">
                JSON dosyalarına <code class="text-rose-400">// bu bir yorum</code> veya <code class="text-rose-400">/* yorum */</code> yazamazsınız. Yorum satırı koymak ayrıştırıcıların hata vermesine sebep olur.
              </p>
            </div>
          </div>
        `
      }
    ],
    relatedChallengeIndex: 0
  },

  yaml: {
    title: "YAML (YAML Ain't Markup Language) Eğitimi",
    subtitle: "DevOps, Kubernetes, Docker ve CI/CD dünyasının standart dili",
    icon: "file-text",
    color: "emerald",
    sections: [
      {
        id: "yaml-intro",
        title: "1. YAML Nedir ve Neden Tercih Edilir?",
        content: `
          <p class="text-sm text-slate-300 leading-relaxed mb-3">
            <strong>YAML</strong>, insan gözü için maksimum okunabilirlik sağlamak amacıyla tasarlanmış bir veri serileştirme dilidir. Parantezler veya kapanış etiketleri yerine <strong>girinti (indentation)</strong> kullanır.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div class="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs text-slate-300">
              <strong class="text-emerald-400 block mb-1">✨ Başlıca Avantajları</strong>
              Gereksiz tırnak ve süslü parantez karmaşası yoktur. Yorum satırlarını (<code>#</code>) destekler. Aynı ayarları tekrar etmemek için kopyalama (Anchor & Alias) yeteneğine sahiptir.
            </div>
            <div class="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs text-slate-300">
              <strong class="text-emerald-400 block mb-1">🛠️ Nerelerde Kullanılır?</strong>
              Kubernetes Pod ve Service manifestoları, Docker Compose (<code>docker-compose.yml</code>), GitHub Actions, GitLab CI/CD, Ansible otomasyon playbook'ları, OpenAPI / Swagger şemaları.
            </div>
          </div>
        `
      },
      {
        id: "yaml-indentation",
        title: "2. Altın Kural: TAB Tuşu Yasaktır & 2 Boşluk Girinti",
        content: `
          <div class="p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 mb-3 text-xs text-rose-200">
            <strong>⛔ KESİN KURAL:</strong> YAML ayrıştırıcıları TAB karakterini (\t) sözdizim hatası olarak değerlendirir. Girintileme hiyerarşisi oluştururken <strong>yalnızca boşluk (space)</strong> tuşunu kullanmalısınız. Endüstri standardı seviye başına <strong>2 boşluk</strong>tur.
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div class="p-3 rounded-lg bg-rose-950/30 border border-rose-500/40 text-rose-300">
              <div class="text-[11px] font-bold text-rose-400 mb-1">❌ YANLIŞ (TAB veya Eşitsiz Boşluk)</div>
              <pre>server:\n\tport: 8080\n  host: localhost</pre>
            </div>
            <div class="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/40 text-emerald-300">
              <div class="text-[11px] font-bold text-emerald-400 mb-1">✅ DOĞRU (Düzgün 2 Boşluk)</div>
              <pre>server:\n  port: 8080\n  host: localhost</pre>
            </div>
          </div>
        `
      },
      {
        id: "yaml-syntax",
        title: "3. Sözdizim Elemanları: Anahtarlar, Listeler, Çok Satırlılar",
        content: `
          <div class="space-y-4 text-xs text-slate-300">
            <div>
              <h4 class="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span> Anahtar-Değer ve İki Nokta Kuralı:
              </h4>
              <p class="mb-1.5">İki noktadan sonra MUTLAKA bir adet boşluk olmalıdır: <code class="text-emerald-300">isim: Ahmet</code> (<code class="text-rose-400">isim:Ahmet</code> HATALIDIR).</p>
            </div>

            <div>
              <h4 class="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span> Listeler (Diziler):
              </h4>
              <p class="mb-1.5">Liste elemanları tire işareti (<code>-</code>) ve bir boşluk ile başlar:</p>
              <pre class="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-emerald-300">meyveler:\n  - Elma\n  - Armut\n  - Portakal</pre>
            </div>

            <div>
              <h4 class="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span> Çok Satırlı Metinler: (| vs >)
              </h4>
              <p class="mb-1.5">
                • <code>|</code> (Literal blok): Satır sonlarını (enter tuşunu) aynen korur.<br>
                • <code>></code> (Folded blok): Satırları tek bir uzun cümleye dönüştürür.
              </p>
              <pre class="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-emerald-300">aciklama: |\n  Satır 1 aynen korunur.\n  Satır 2 alt satırda kalır.</pre>
            </div>

            <div class="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30">
              <h4 class="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                ⚠️ Meşhur "Norveç Tuzağı" (The Norway Problem):
              </h4>
              <p class="text-slate-300">
                YAML'da <code>yes</code>, <code>no</code>, <code>on</code>, <code>off</code> kelimeleri otomatik olarak boolean (true/false) sayılır. Norveç'in ülke kodu olan <code>NO</code> yazarsanız bu <code>false</code>'a çevrilir! Bu nedenle bu tür ifadeleri mutlaka tırnak içine almalısınız: <code class="text-amber-300">"NO"</code>.
              </p>
            </div>
          </div>
        `
      }
    ],
    relatedChallengeIndex: 1
  },

  xml: {
    title: "XML (eXtensible Markup Language) Eğitimi",
    subtitle: "Hiyerarşik, katı kurallı ve kendi kendini tanımlayan etiketleme dili",
    icon: "layers",
    color: "amber",
    sections: [
      {
        id: "xml-intro",
        title: "1. XML Nedir ve Neden Kullanılır?",
        content: `
          <p class="text-sm text-slate-300 leading-relaxed mb-3">
            <strong>XML</strong>, hem insanlar hem bilgi işlem sistemleri tarafından okunabilecek belgeler oluşturmak için W3C tarafından geliştirilmiş etiket tabanlı (markup) bir meta dildir. HTML'e benzer ancak HTML verinin <em>nasıl görüneceğini</em> tanımlarken, XML verinin <em>ne olduğunu</em> tanımlar.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div class="p-3 rounded-lg bg-amber-950/30 border border-amber-500/20 text-xs text-slate-300">
              <strong class="text-amber-400 block mb-1">🏛️ Başlıca Güçlü Yönleri</strong>
              Son derece katı sözdizim kuralları sayesinde veri bütünlüğü yüksektir. XSD (XML Schema Definition) ile çok detaylı veri doğrulama yapılabilir. Zengin nitelik (attribute) ve ad alanı (namespace) desteği vardır.
            </div>
            <div class="p-3 rounded-lg bg-amber-950/30 border border-amber-500/20 text-xs text-slate-300">
              <strong class="text-amber-400 block mb-1">📁 Nerelerde Kullanılır?</strong>
              RSS ve Atom haber akışları, SVG vektörel çizim formatı, Android uygulama manifestoları (<code>AndroidManifest.xml</code>) ve arayüz dosyaları, SOAP tabanlı kurumsal bankacılık servisleri, Microsoft Office belgeleri (DOCX, XLSX aslında XML arşivleridir).
            </div>
          </div>
        `
      },
      {
        id: "xml-root-tag",
        title: "2. Kök (Root) Eleman ve Kapanış Zorunluluğu",
        content: `
          <div class="space-y-3 text-xs">
            <div class="p-3 rounded bg-slate-900 border border-slate-800">
              <strong class="text-amber-300 block mb-1">1. Tek Kök Eleman (Single Root):</strong>
              Geçerli bir XML belgesi en dışta mutlaka ve sadece BİR TANE ana kapsayıcı kök etikete sahip olmalıdır. Yan yana iki ayrı kök etiket bulunamaz!
            </div>
            <div class="p-3 rounded bg-slate-900 border border-slate-800">
              <strong class="text-amber-300 block mb-1">2. Büyük/Küçük Harf Duyarlılığı (Case-Sensitivity):</strong>
              <code class="text-rose-400">&lt;kitap&gt;...&lt;/Kitap&gt;</code> GEÇERSİZDİR. Açılış ve kapanış harf büyüklükleri birebir aynı olmalıdır.
            </div>
            <div class="p-3 rounded bg-slate-900 border border-slate-800">
              <strong class="text-amber-300 block mb-1">3. Kendi Kendine Kapanan Etiketler:</strong>
              İçeriği olmayan boş etiketler tek başına kapatılabilir: <code class="text-amber-300">&lt;resim src="logo.png"/&gt;</code>
            </div>
          </div>
        `
      },
      {
        id: "xml-attr-cdata",
        title: "3. Nitelik (Attribute) vs Eleman ve CDATA Blokları",
        content: `
          <div class="space-y-4 text-xs text-slate-300">
            <div>
              <h4 class="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-amber-400"></span> Nitelik (Attribute) ve Eleman (Element) Ayrımı:
              </h4>
              <p class="mb-2">Genel kural: Verinin kimliği ve meta bilgileri nitelikte, asıl taşınan veri ise eleman içinde tutulur.</p>
              <pre class="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-amber-300">&lt;ogrenci id="104" aktif="true"&gt;\n  &lt;ad&gt;Zeynep&lt;/ad&gt;\n  &lt;not&gt;95&lt;/not&gt;\n&lt;/ogrenci&gt;</pre>
            </div>

            <div>
              <h4 class="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-amber-400"></span> CDATA (Character Data) Bloğu:
              </h4>
              <p class="mb-1.5">
                XML içinde <code>&lt;</code>, <code>&gt;</code> veya <code>&amp;</code> gibi özel karakterler doğrudan metin içinde bulunursa XML çöker. Kod veya ham metin saklamak için CDATA kullanılır:
              </p>
              <pre class="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-amber-300">&lt;kod&gt;&lt;![CDATA[\n  if (a &lt; 10 &amp;&amp; b &gt; 5) {\n    alert("Geçerli!");\n  }\n]]&gt;&lt;/kod&gt;</pre>
            </div>
          </div>
        `
      }
    ],
    relatedChallengeIndex: 2
  }
};
