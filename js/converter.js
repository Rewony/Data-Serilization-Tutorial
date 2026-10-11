/**
 * FormatMaster - Universal Converter & Syntax Doctor
 * JSON, YAML, and XML parsing, validation, conversion, and formatting
 */

window.ConverterEngine = (() => {

  // ==========================================
  // 1. JSON Engine
  // ==========================================
  const JSONEngine = {
    parse(str) {
      if (!str || str.trim() === '') {
        throw new Error("Girdi boş! Lütfen geçerli bir JSON içeriği yazın.");
      }
      return JSON.parse(str);
    },

    format(obj, indent = 2) {
      return JSON.stringify(obj, null, indent);
    },

    minify(str) {
      const obj = this.parse(str);
      return JSON.stringify(obj);
    },

    diagnose(str) {
      try {
        const data = this.parse(str);
        return { valid: true, error: null, line: null, tip: null, data };
      } catch (err) {
        let msg = err.message;
        let line = null;
        let tip = "JSON sözdizim kurallarını kontrol edin.";

        // Line detection from standard browser error message
        const posMatch = msg.match(/position\s+(\d+)/i) || msg.match(/column\s+(\d+)/i);
        if (posMatch) {
          const pos = parseInt(posMatch[1], 10);
          const lines = str.substring(0, pos).split('\n');
          line = lines.length;
        } else {
          const lineMatch = msg.match(/line\s+(\d+)/i);
          if (lineMatch) line = parseInt(lineMatch[1], 10);
        }

        // Common JSON pitfalls diagnosis
        if (/'[^']*'/.test(str)) {
          tip = "⚠️ JSON'da tek tırnak (') GEÇERSİZDİR! Anahtarlar ve metinler mutlaka çift tırnak (\") içine alınmalıdır.";
        } else if (/,\s*[}\]]/.test(str)) {
          tip = "⚠️ Trailing Comma (Sonda Fazla Virgül) tespit edildi! JSON'da son elemandan sonra virgül koyamazsınız.";
        } else if (/\/\*|\/\//.test(str)) {
          tip = "⚠️ JSON yorum satırlarını (// veya /* */) desteklemez! Yorumları kaldırmalısınız.";
        } else if (/([{,]\s*)([a-zA-Z0-9_]+)\s*:/.test(str)) {
          tip = "⚠️ Tırnaksız nesne anahtarı bulundu! JSON'da tüm anahtarlar (\"key\") çift tırnaklı olmalıdır.";
        } else if (/undefined|NaN/.test(str)) {
          tip = "⚠️ JSON 'undefined' veya 'NaN' tiplerini tanımaz. Boş değerler için 'null' kullanın.";
        }

        return { valid: false, error: msg, line, tip, data: null };
      }
    }
  };

  // ==========================================
  // 2. YAML Engine
  // ==========================================
  const YAMLEngine = {
    parse(str) {
      if (!str || str.trim() === '') {
        throw new Error("Girdi boş! Lütfen geçerli bir YAML içeriği yazın.");
      }
      if (typeof jsyaml === 'undefined') {
        throw new Error("YAML kütüphanesi yüklenemedi. İnternet bağlantınızı kontrol edin.");
      }
      return jsyaml.load(str);
    },

    format(obj, indent = 2) {
      if (typeof jsyaml === 'undefined') return JSON.stringify(obj, null, 2);
      return jsyaml.dump(obj, {
        indent,
        lineWidth: -1,
        noRefs: true,
        quotingType: '"'
      });
    },

    diagnose(str) {
      // Check for TAB characters (very common pitfall)
      const tabMatch = str.match(/\t/);
      if (tabMatch) {
        const lines = str.split('\n');
        let tabLine = 1;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes('\t')) {
            tabLine = i + 1;
            break;
          }
        }
        return {
          valid: false,
          error: "Tab karakteri tespit edildi!",
          line: tabLine,
          tip: "⛔ YAML'da TAB TUŞU KESİNLİKLE YASAKTIR! Girinti için sadece 2 boşluk (Space) kullanmalısınız.",
          data: null
        };
      }

      try {
        const data = this.parse(str);
        if (data === undefined) {
          return { valid: false, error: "YAML verisi boş veya anlaşılamadı.", line: 1, tip: "Geçerli bir anahtar-değer çifti yazın.", data: null };
        }
        return { valid: true, error: null, line: null, tip: null, data };
      } catch (err) {
        let msg = err.message;
        let line = null;
        let tip = "Girinti seviyelerini (indentation) ve iki nokta üst üste sonrası boşlukları kontrol edin.";

        if (err.mark && err.mark.line !== undefined) {
          line = err.mark.line + 1;
        }

        if (msg.includes("bad indentation")) {
          tip = "⚠️ Girinti hatası: YAML'da hiyerarşi boşluk sayılarına bağlıdır. Alt öğelerin aynı sayıda boşluğa sahip olduğundan emin olun.";
        } else if (msg.includes("mapping values are not allowed here") || /:\S/.test(str)) {
          tip = "⚠️ Anahtar sonrası iki noktadan sonra mutlaka bir boşluk olmalıdır. Örn: 'name: John' (name:John HATALIDIR).";
        } else if (msg.includes("duplicated mapping key")) {
          tip = "⚠️ Aynı seviyede yinelenen (duplicate) anahtar kullanılamaz.";
        }

        return { valid: false, error: msg, line, tip, data: null };
      }
    }
  };

  // ==========================================
  // 3. XML Engine
  // ==========================================
  const XMLEngine = {
    // Converts XML String to JS Object
    parse(str) {
      if (!str || str.trim() === '') {
        throw new Error("Girdi boş! Lütfen geçerli bir XML içeriği yazın.");
      }

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(str.trim(), "application/xml");

      // Check for parse errors
      const parseError = xmlDoc.getElementsByTagName("parsererror");
      if (parseError.length > 0) {
        throw new Error(parseError[0].textContent.trim());
      }

      return this.xmlNodeToObj(xmlDoc.documentElement);
    },

    // Recursive helper to transform DOM node to JS Object
    xmlNodeToObj(node) {
      // Text node
      if (node.nodeType === Node.TEXT_NODE) {
        return node.nodeValue.trim();
      }

      const obj = {};

      // Attributes
      if (node.attributes && node.attributes.length > 0) {
        obj["@attributes"] = {};
        for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes[i];
          obj["@attributes"][attr.name] = attr.value;
        }
      }

      // Child nodes
      const children = Array.from(node.childNodes).filter(n => {
        return n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.nodeValue.trim() !== "");
      });

      if (children.length === 0) {
        // Empty element
        return Object.keys(obj).length > 0 ? obj : "";
      }

      if (children.length === 1 && children[0].nodeType === Node.TEXT_NODE) {
        const textVal = children[0].nodeValue.trim();
        if (Object.keys(obj).length === 0) {
          // Coerce numbers or booleans if sensible, or leave as string
          if (textVal === "true") return true;
          if (textVal === "false") return false;
          if (!isNaN(textVal) && textVal !== "") return Number(textVal);
          return textVal;
        }
        obj["#text"] = textVal;
        return obj;
      }

      for (let child of children) {
        if (child.nodeType === Node.ELEMENT_NODE) {
          const childName = child.nodeName;
          const childVal = this.xmlNodeToObj(child);

          if (obj[childName] === undefined) {
            obj[childName] = childVal;
          } else if (Array.isArray(obj[childName])) {
            obj[childName].push(childVal);
          } else {
            obj[childName] = [obj[childName], childVal];
          }
        }
      }

      return obj;
    },

    // Convert JS Object to XML String
    format(obj, rootName = "root", indent = 2) {
      const buildXml = (data, name, level) => {
        const spaces = " ".repeat(level * indent);
        
        if (data === null || data === undefined) {
          return `${spaces}<${name}/>\n`;
        }

        if (typeof data !== "object") {
          return `${spaces}<${name}>${escapeXml(String(data))}</${name}>\n`;
        }

        if (Array.isArray(data)) {
          let res = "";
          for (let item of data) {
            res += buildXml(item, name, level);
          }
          return res;
        }

        // Object
        let attrs = "";
        let childrenStr = "";

        for (let key in data) {
          if (key === "@attributes" && typeof data[key] === "object") {
            for (let attrKey in data[key]) {
              attrs += ` ${attrKey}="${escapeXml(String(data[key][attrKey]))}"`;
            }
          } else if (key === "#text") {
            childrenStr += `${spaces}${" ".repeat(indent)}${escapeXml(String(data[key]))}\n`;
          } else {
            const val = data[key];
            if (Array.isArray(val)) {
              for (let item of val) {
                childrenStr += buildXml(item, key, level + 1);
              }
            } else {
              childrenStr += buildXml(val, key, level + 1);
            }
          }
        }

        if (!childrenStr) {
          return `${spaces}<${name}${attrs}/>\n`;
        }

        return `${spaces}<${name}${attrs}>\n${childrenStr}${spaces}</${name}>\n`;
      };

      function escapeXml(unsafe) {
        return unsafe.replace(/[<>&'"]/g, c => {
          switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
          }
        });
      }

      // If object already has a single top-level key, use that as root
      const keys = Object.keys(obj);
      if (keys.length === 1 && typeof obj[keys[0]] === "object" && !Array.isArray(obj[keys[0]]) && keys[0] !== "@attributes") {
        return `<?xml version="1.0" encoding="UTF-8"?>\n` + buildXml(obj[keys[0]], keys[0], 0).trim();
      }

      return `<?xml version="1.0" encoding="UTF-8"?>\n` + buildXml(obj, rootName, 0).trim();
    },

    diagnose(str) {
      if (!str || str.trim() === '') {
        return { valid: false, error: "XML içeriği boş!", line: 1, tip: "Geçerli bir XML dökümanı yazın.", data: null };
      }

      // Check declaration or root tag
      const parser = new DOMParser();
      const doc = parser.parseFromString(str.trim(), "application/xml");
      const errNodes = doc.getElementsByTagName("parsererror");

      if (errNodes.length > 0) {
        const fullErr = errNodes[0].textContent;
        let line = null;
        let tip = "Etiketlerin doğru açılıp kapandığından emin olun.";

        const lineMatch = fullErr.match(/line\s+(\d+)/i) || fullErr.match(/satır\s+(\d+)/i);
        if (lineMatch) {
          line = parseInt(lineMatch[1], 10);
        }

        if (fullErr.includes("Extra content at the end of the document") || fullErr.includes("multiple root")) {
          tip = "⚠️ XML'de yalnızca BİR TANE kök (root) eleman bulunabilir! Tüm elemanları tek bir <root>...</root> içine toplayın.";
        } else if (fullErr.includes("mismatched tag") || fullErr.includes("Opening and ending tag mismatch")) {
          tip = "⚠️ Açılış ve kapanış etiketi uyuşmazlığı var! Örneğin: <kitap>...</dergi> veya büyük/küçük harf duyarsızlığı.";
        } else if (fullErr.includes("Premature end of data") || fullErr.includes("Unclosed")) {
          tip = "⚠️ Kapanmayan etiket var. Her <etiket> mutlaka </etiket> veya <etiket/> ile kapatılmalıdır.";
        } else if (fullErr.includes("EntityRef: expecting ';'")) {
          tip = "⚠️ XML'de <, >, & gibi karakterler doğrudan metin içinde kullanılamaz! &lt;, &gt;, &amp; yazmalı veya CDATA kullanmalısınız.";
        }

        return { valid: false, error: fullErr, line, tip, data: null };
      }

      try {
        const data = this.parse(str);
        return { valid: true, error: null, line: null, tip: null, data };
      } catch (e) {
        return { valid: false, error: e.message, line: null, tip: "XML yapısını gözden geçirin.", data: null };
      }
    }
  };

  // ==========================================
  // 4. Universal Conversion Controller
  // ==========================================
  function convert(content, fromFormat, toFormat) {
    if (fromFormat === toFormat) return content;

    // 1. Parse input to standard JS Object
    let jsObj;
    if (fromFormat === 'json') {
      jsObj = JSONEngine.parse(content);
    } else if (fromFormat === 'yaml') {
      jsObj = YAMLEngine.parse(content);
    } else if (fromFormat === 'xml') {
      jsObj = XMLEngine.parse(content);
    } else {
      throw new Error("Bilinmeyen kaynak format: " + fromFormat);
    }

    // 2. Format JS Object to target string
    if (toFormat === 'json') {
      return JSONEngine.format(jsObj);
    } else if (toFormat === 'yaml') {
      return YAMLEngine.format(jsObj);
    } else if (toFormat === 'xml') {
      return XMLEngine.format(jsObj);
    } else {
      throw new Error("Bilinmeyen hedef format: " + toFormat);
    }
  }

  function diagnose(content, format) {
    if (format === 'json') return JSONEngine.diagnose(content);
    if (format === 'yaml') return YAMLEngine.diagnose(content);
    if (format === 'xml') return XMLEngine.diagnose(content);
    return { valid: false, error: 'Bilinmeyen format' };
  }

  return {
    JSON: JSONEngine,
    YAML: YAMLEngine,
    XML: XMLEngine,
    convert,
    diagnose
  };
})();
