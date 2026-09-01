# Super Ice Group Website

เว็บไซต์บริษัทแบบ B2B ภาษาไทย สร้างด้วย Astro แบบ static output สำหรับ Super Ice Group โดยแยกแบรนด์ **Super Ice** และ **ICEBERG** อย่างชัดเจน

เป้าหมาย hosting คือ **Cloudflare Workers Static Assets** ผ่าน **Workers Builds ที่เชื่อมกับ private GitHub repository** ไม่ใช่ Cloudflare Pages

> **สถานะปัจจุบัน: เวอร์ชันพัฒนาและตรวจทานภายในเท่านั้น**  
> ห้ามเชื่อมบัญชี GitHub/Cloudflare, ซื้อบริการ, รันคำสั่ง deploy หรือเผยแพร่ production จนกว่าจะได้รับอนุมัติจากเจ้าของโครงการอย่างชัดเจน

## ความต้องการของระบบ

- Node.js `>=22.12.0`
- npm ที่มากับ Node.js

ตรวจเวอร์ชันก่อนเริ่ม:

```bash
nvm use
node --version
npm --version
```

ไฟล์ `.nvmrc` กำหนด baseline เป็น Node `22.12.0` หากไม่ได้ใช้ nvm ให้เลือก Node เวอร์ชัน `22.12.0` ขึ้นไปด้วยเครื่องมือจัดการเวอร์ชันที่ใช้อยู่ ห้ามใช้ Node 20 กับโปรเจกต์นี้

## เริ่มพัฒนาในเครื่อง

ติดตั้ง dependencies:

```bash
npm install
```

เปิด development server:

```bash
npm run dev
```

Astro จะแสดง URL ที่เปิดใช้งานใน terminal โดยหน้าไทยหลักอยู่ที่ `/th/` เช่น `http://localhost:4321/th/`

สร้าง production-like static build:

```bash
npm run build
```

คำสั่งนี้ทำสามอย่างต่อเนื่อง:

1. รัน `astro check` เพื่อตรวจ type และ Astro diagnostics
2. สร้างไฟล์ static ลง `dist/`
3. รัน `scripts/validate-build.mjs` เพื่อตรวจโครงสร้างและ SEO ของ output

เปิด preview จาก build ที่สร้างแล้ว:

```bash
npm run preview
```

รันเฉพาะตัวตรวจ build หลังจากมี `dist/` แล้ว:

```bash
npm run validate
```

## คำสั่งของโปรเจกต์

| คำสั่ง | หน้าที่ | สถานะการใช้งาน |
|---|---|---|
| `npm run dev` | เปิด Astro development server | ใช้ได้ในเครื่อง |
| `npm run check` | ตรวจ type และ Astro diagnostics | ใช้ได้ในเครื่อง |
| `npm run build` | สร้าง `dist/` และตรวจ build | ใช้ได้ในเครื่อง |
| `npm run preview` | เปิด Astro preview จาก build | ใช้ได้ในเครื่อง |
| `npm run validate` | ตรวจไฟล์ใน `dist/` โดยไม่ build ใหม่ | ใช้ได้หลัง build |
| `npm run verify:production` | ตรวจ publication config ก่อน production | ควรล้มเหลวในสถานะปัจจุบัน |
| `npm run preview:worker` | build แล้วเปิด `wrangler dev` สำหรับจำลอง Workers ในเครื่อง | ใช้ได้ในเครื่องเท่านั้น |
| `npm run deploy:worker` | ตรวจ production config, build/validate ใหม่ แล้วเรียก `wrangler deploy` | **ห้ามรันจนกว่าจะได้รับอนุมัติ** |

## โครงสร้างสำคัญ

```text
src/
  components/             Astro UI components
  config/site.js          ข้อมูลบริษัท ติดต่อ analytics crawler policy และ publication gates
  content.config.ts       schema ของ Markdown collections
  content/
    pages/                หน้าข้อมูลทั่วไป
    products/             หน้าสินค้า
    solutions/            หน้าตามประเภทธุรกิจ
    knowledge/            บทความความรู้และฉบับร่าง
  layouts/                layout และ SEO metadata
  pages/                  Astro routes, robots.txt และ sitemap.xml
  styles/                 global styles
public/
  _headers                security headers และ cache policy สำหรับ Static Assets
  _redirects              redirects สำหรับ Static Assets
  scripts/site.js         interaction และ analytics event hooks
scripts/
  validate-build.mjs      ตรวจ static output
  verify-production-config.mjs
                          ป้องกัน deploy เมื่อ config ยังไม่พร้อม
wrangler.jsonc            Cloudflare Workers Static Assets configuration
```

ไฟล์ต้นทาง `Super Ice Group.pdf.pdf`, `ICEBERG Slide.pptx`, โฟลเดอร์ `tmp/` และไฟล์ render ใช้เพื่อการตรวจข้อมูลเท่านั้น ไม่ใช่ public assets

## การแก้เนื้อหาด้วย Markdown

Phase 1 ใช้ Markdown ใน repository และยังไม่มี CMS ไฟล์ทั้งหมดถูกตรวจด้วย schema ใน `src/content.config.ts`

### เส้นทางจาก collection

| Collection | ตัวอย่างไฟล์ | URL ที่สร้าง |
|---|---|---|
| `pages` | `pages/about.md` | `/th/about/` |
| `pages` แบบซ้อน | `pages/services/ice-delivery.md` | `/th/services/ice-delivery/` |
| `products` | `products/small-tube-ice.md` | `/th/products/small-tube-ice/` |
| `solutions` | `solutions/events.md` | `/th/solutions/events/` |
| `knowledge` | `knowledge/example.md` | เก็บเป็น collection สำหรับระยะถัดไป; ปัจจุบันยังไม่มี public route |

ไฟล์ที่ตั้ง `draft: true` จะไม่ถูกสร้างเป็นหน้าสาธารณะใน route ที่รองรับ collection นั้น

### Frontmatter พื้นฐาน

ทุก collection ใช้ field เหล่านี้:

| Field | รูปแบบ | ความหมาย |
|---|---|---|
| `title` | string | ชื่อหน้า ไม่เกิน 80 ตัวอักษร |
| `description` | string | Meta description ความยาว 40–180 ตัวอักษร |
| `eyebrow` | string | ป้ายสั้นเหนือหัวข้อ |
| `hero` | string | ข้อความนำใน hero |
| `ctaLabel` | string | ข้อความบน CTA |
| `ctaHref` | string | Same-origin internal path ที่ขึ้นต้นด้วย `/` ตัวเดียว; ห้ามใช้ `//`, backslash หรือ whitespace |
| `indexable` | boolean | ควบคุม `index`/`noindex` และการเข้า sitemap ตาม route |
| `draft` | boolean | ค่าเริ่มต้น `false`; ใช้ `true` กับเนื้อหาที่ยังไม่พร้อมสร้างหน้า |

ตัวอย่างหน้าเนื้อหาทั่วไป:

```yaml
---
title: "ชื่อหน้า"
description: "คำอธิบายเฉพาะหน้าที่มีความยาวอย่างน้อยสี่สิบตัวอักษรและอธิบายเจตนาของหน้าอย่างตรงไปตรงมา"
eyebrow: "SECTION LABEL"
hero: "ข้อความนำที่ตอบว่าหน้านี้ช่วยผู้ใช้อย่างไร"
ctaLabel: "ติดต่อทีมงาน"
ctaHref: "/th/contact/"
indexable: false
draft: true
---
```

### Frontmatter ของสินค้า

นอกจาก field พื้นฐาน ต้องมี:

| Field | รูปแบบ | ความหมาย |
|---|---|---|
| `brand` | `Super Ice` หรือ `ICEBERG` | ห้ามใช้ชื่อแบรนด์สลับกัน |
| `summary` | string | คำอธิบายสั้นของสินค้า |
| `features` | string array | คุณสมบัติที่มีแหล่งข้อมูลรองรับ |
| `suitableFor` | string array | การใช้งานที่เหมาะสม |
| `sourceDocument` | string | เอกสารต้นทาง |
| `sourceLocator` | string | หน้า สไลด์ หรือหัวข้อที่ตรวจสอบได้ |
| `copyApproved` | boolean | เจ้าของข้อมูลอนุมัติข้อความแล้วหรือไม่ |
| `imageApproved` | boolean | เจ้าของข้อมูลอนุมัติ visual ที่แสดงกับสินค้านี้แล้วหรือไม่ ไม่ว่าจะเป็นกราฟิกจำลองหรือภาพจริง |

หน้าสินค้าจะสร้าง Product JSON-LD และเปิดให้ index เฉพาะเมื่อข้อความผ่านอนุมัติแล้ว การเปิดเผยสินค้าหนึ่งรายการต้องเปลี่ยนทั้ง `copyApproved: true` และ `indexable: true` หลังการอนุมัติเท่านั้น อย่าเปิดเพียง field ใด field หนึ่ง

### Frontmatter ของ solution

นอกจาก field พื้นฐาน ต้องมี:

```yaml
concerns:
  - "สิ่งที่ลูกค้ากังวล"
outcomes:
  - "ข้อมูลหรือผลลัพธ์ที่หน้านี้ช่วยให้ตัดสินใจ"
```

### Frontmatter ของ knowledge

รองรับ field เพิ่มเติมแบบ optional:

```yaml
publishedAt: 2026-08-20
updatedAt: 2026-08-20
author: "ชื่อผู้เขียนที่ได้รับอนุมัติ"
reviewer: "ชื่อผู้ตรวจทานที่ได้รับอนุมัติ"
```

บทความทดลองต้องใช้ `draft: true` และ `indexable: false` จนกว่าผู้เขียน ผู้ตรวจทาน และข้อเท็จจริงจะได้รับอนุมัติ

## กติกาเนื้อหา

- ใช้ **Super Ice Group** เมื่อกล่าวถึงบริษัทแม่หรือข้อมูลรวมของกลุ่ม
- ใช้ **Super Ice** เฉพาะแบรนด์น้ำแข็งทั่วไป และ **ICEBERG** เฉพาะแบรนด์น้ำแข็งพรีเมียม
- ห้ามเผยแพร่ราคา ค่าจัดส่ง ขั้นต่ำการสั่ง หรือรอบจัดส่ง ให้พาผู้ใช้ไปโทร LINE หรืออีเมลหลังช่องทางเหล่านั้นได้รับอนุมัติ
- ห้ามสร้างเบอร์โทร LINE OA อีเมล ที่อยู่ พื้นที่บริการ หรือเงื่อนไข 24 ชั่วโมงขึ้นเอง
- ห้ามเผยแพร่โลโก้ลูกค้า ชื่อลูกค้า คำรับรอง ใบรับรอง ผลตรวจ หรือเอกสารอ่อนไหวโดยไม่มีสิทธิ์
- ห้ามใช้ claim เช่น “ดีที่สุด”, “อันดับ 1” หรือ “100%” หากไม่มีหลักฐานและการอนุมัติ
- ตัวเลขระดับกลุ่มต้องติดป้าย `ข้อมูลรวม Super Ice Group` พร้อม source/date/owner
- เนื้อหาสำคัญต้องอยู่ใน HTML ที่อ่านและค้นหาได้ ไม่ฝากข้อมูลไว้เฉพาะในภาพหรือ PDF
- ห้ามใส่ราคา ค่าจัดส่ง รอบจัดส่ง รีวิว หรือ stock ที่ไม่มีข้อมูลจริงลง structured data

## การแทนภาพและสิทธิ์เผยแพร่

หน้าสินค้าในปัจจุบันใช้กราฟิกจำลองจาก `src/components/ProductVisual.astro` ซึ่งระบุบนหน้าและใน accessible name ชัดเจนว่าไม่ใช่ภาพสินค้าจริง เพื่อหลีกเลี่ยงการเผยแพร่ภาพต้นฉบับโดยไม่ได้รับอนุญาต ส่วนหัวและท้ายเว็บใช้ชื่อ “Super Ice Group” แบบตัวอักษรเท่านั้น ยังไม่ได้ใช้หรือจำลองโลโก้ทางการ ต้องแทนด้วย asset ที่ผ่านอนุมัติก่อน production

ขั้นตอนเพิ่มหรือแทนภาพ:

1. ระบุเจ้าของภาพ แหล่งที่มา ขอบเขตสิทธิ์ และผู้อนุมัติให้ครบ
2. ห้ามถือว่าภาพที่ฝังใน PDF, PowerPoint, social screenshot หรือเอกสารบริษัทมีสิทธิ์นำขึ้นเว็บโดยอัตโนมัติ
3. ส่งออกภาพเว็บเป็น WebP/AVIF พร้อม fallback ตามความจำเป็น ใช้ชื่อไฟล์ที่สื่อความหมาย เช่น `iceberg-clear-ice-ball.webp`
4. วางไฟล์ที่อนุมัติแล้วใน `public/images/` โดยแยกหมวดให้ชัดเจน
5. ระบุ `width`, `height`, `sizes` และ alt text ตามสิ่งที่เห็นจริง ห้ามยัด keyword
6. แก้ component หรือ page ให้เรียกภาพใหม่ แล้วตรวจ crop ทุก breakpoint
7. ตั้ง `imageApproved: true` เฉพาะเมื่อ visual ของสินค้านั้นผ่านการตรวจแล้ว และเปลี่ยน `site.publication.sourceImagesApproved` เป็น `true` เมื่อชุดภาพจากเอกสารต้นทางที่นำมาใช้จริงผ่านการตรวจครบแล้ว
8. รัน `npm run build` และตรวจภาพบนมือถือและ desktop ก่อนรวมการเปลี่ยนแปลง

ห้ามนำไฟล์ PDF, PPTX, Word หรือ spreadsheet ต้นฉบับเข้า `public/` ตัวตรวจ build จะปฏิเสธเอกสารประเภทเหล่านี้ใน `dist/` เพื่อลดความเสี่ยงที่เอกสารต้นทางถูกเผยแพร่โดยไม่ตั้งใจ

## Site config และ publication gates

ข้อมูลที่มีผลทั้งเว็บไซต์อยู่ที่ `src/config/site.js` เพียงจุดเดียว สถานะเริ่มต้นถูกตั้งให้ fail closed:

- `canonicalOrigin` ยังเป็นโดเมน `.example`
- `productionReady` เป็น `false`
- `canonicalHostPolicy` ยังเป็น `pending` และก่อน production ต้องเลือก `www` หรือ `non-www`/`apex` ให้ตรงกับ `canonicalOrigin`
- `company.legalName` และ `company.address` อ้างอิงจาก company profile แล้ว; เบอร์สำนักงานยังว่าง
- Google Maps กลางได้รับการยืนยันแล้ว แต่ LINE กลาง อีเมล และ canonical domain ยังว่าง; ช่องทาง ICEBERG แยกอยู่ใน `brandContacts.iceberg`
- analytics ปิดอยู่และยังไม่มี GA4/GTM ID
- `GPTBot`, `ClaudeBot` และ `Google-Extended` ได้รับอนุญาตด้วยค่า `allow`
- `companyMetricsApproved`, `deliveryAreasApproved` และ `sourceImagesApproved` ได้รับการอนุมัติแล้ว; publication flags ที่เหลือยังเป็น `false`
- ตัวเลขใน `reviewFacts` มี source และได้รับการอนุมัติเมื่อ 2026-08-31

เมื่อ `productionReady: false`:

- เว็บไซต์แสดงแถบ “เวอร์ชันตรวจทานภายใน”
- `robots.txt` ใช้ `Disallow: /`
- crawler policy ที่ยัง pending ถูกบล็อกแบบ fail closed
- ช่องทางติดต่อที่ไม่มีข้อมูลจริงไม่ถูกแสดงเป็นลิงก์ปลอม

เปลี่ยนค่าเหล่านี้เฉพาะเมื่อเจ้าของข้อมูลอนุมัติแล้ว:

| Gate | ต้องยืนยันก่อนเปลี่ยน |
|---|---|
| `siteCopyApproved` | ผู้รับผิดชอบอนุมัติข้อความหลักของเว็บไซต์และความสัมพันธ์ระหว่างแบรนด์แล้ว; ต้องเป็น `true` ก่อน production |
| `legalPagesApproved` | ฝ่ายกฎหมายหรือผู้รับผิดชอบอนุมัติ Privacy Notice และ Cookie Policy แล้ว; ต้องเป็น `true` ก่อน production |
| `companyMetricsApproved` | ตัวเลข ขอบเขตว่าเป็นข้อมูลกลุ่ม source และวันที่ตรวจ |
| `deliveryAreasApproved` | จุดโรงงาน มาตรฐานที่ใช้ร่วมกัน ขอบเขตพื้นที่ และข้อจำกัดบริการ |
| `service247Approved` | เวลารับสายและเงื่อนไขบริการจริง |
| `customerProofApproved` | สิทธิ์ใช้ชื่อ โลโก้ คำรับรอง หรือกรณีศึกษา |
| `certificatesApproved` | ความถูกต้อง วันหมดอายุ ข้อมูลที่ต้องปิด และสิทธิ์เผยแพร่ |
| `sourceImagesApproved` | สิทธิ์ของภาพแต่ละไฟล์และการนำไปใช้บนเว็บ |

ก่อน production ทุก publication flag ต้องเป็น `true` เพื่อยืนยันว่าแต่ละหมวดได้รับการตรวจแล้ว แม้หมวดนั้นไม่มี asset ที่เผยแพร่ การตั้ง flag ไม่ได้แทนการตรวจเนื้อหาและไฟล์ทีละรายการ ต้องเก็บหลักฐานการอนุมัติไว้กับ owner ของข้อมูล

Analytics ยังไม่ถูกโหลดใน Phase 1 และ `analytics.enabled` ต้องคงเป็น `false` จนกว่าจะมี consent design และ implementation ที่ผ่านการตรวจ Event hooks ปัจจุบันเตรียมเฉพาะชื่อ event, `page_path` และ `contact_channel` ใน `dataLayer`; ห้ามเพิ่มชื่อ เบอร์โทร อีเมล ที่อยู่ หรือข้อความลูกค้า

## Production config verification

ตรวจ publication config ด้วย:

```bash
npm run verify:production
```

สคริปต์ `scripts/verify-production-config.mjs` ตรวจว่า:

- `productionReady` ถูกตั้งเป็น `true` อย่างชัดเจน
- canonical origin เป็น HTTPS, ไม่ใช่โดเมนสำรอง/localhost และไม่มี path/query/hash
- `canonicalHostPolicy` เป็น `www` หรือ `non-www`/`apex` และตรงกับ hostname จริง
- เบอร์โทร LINE อีเมล ชื่อนิติบุคคล และที่อยู่ถูกกรอก
- เบอร์โทรมีรูปแบบที่กดโทรได้, LINE เป็น HTTPS URL บน `lin.ee`/`line.me` และอีเมลมีรูปแบบถูกต้อง
- crawler policy ทั้งสามเป็นคำตัดสิน allow/disallow ที่ชัดเจน ไม่ใช่ `pending`
- publication flags ทั้งแปดรายการเป็น `true` จากผู้รับผิดชอบจริง
- มีสินค้า `indexable: true`, `copyApproved: true` และ `imageApproved: true` อย่างน้อยหนึ่งรายการต่อแบรนด์
- analytics ยังปิดอยู่จนกว่าจะมีระบบ consent ที่ตรวจแล้ว

คำสั่งนี้ **ควรล้มเหลวในสถานะปัจจุบัน** นั่นคือ safety gate ไม่ใช่ข้อผิดพลาดที่ควรข้าม ห้ามตั้งค่าปลอมเพียงเพื่อให้สคริปต์ผ่าน และต้องตรวจ publication flags, สิทธิ์ภาพ, เอกสาร และข้อความด้วยคนเพิ่มเติม เพราะสคริปต์ไม่ได้อนุมัติสิ่งเหล่านี้แทนเจ้าของข้อมูล

## สิ่งที่ `npm run build` ตรวจ

`scripts/validate-build.mjs` ตรวจ output ใน `dist/` อย่างน้อยดังนี้:

- มี `404.html`, `robots.txt` และ sitemap XML
- มีหน้าไทยภายใต้ `/th/`
- ทุกหน้าไทยมี `<html lang="th">` และ H1 เดียว
- ไม่มี form ใน Phase 1
- title, meta description และ canonical ไม่ซ้ำ
- canonical ใช้ trailing slash และ origin เดียวกัน
- internal links และ anchor ชี้ไปยังปลายทางที่มีจริง
- ไม่มี PDF, PPTX, Word หรือ spreadsheet หลุดเข้า public build

นโยบาย URL ปัจจุบันคือ trailing slash ทุกหน้า:

- Astro: `trailingSlash: "always"`
- Workers Static Assets: `html_handling: "force-trailing-slash"`
- `/` redirect ถาวรไป `/th/` ผ่าน `public/_redirects`
- 404 ใช้ `not_found_handling: "404-page"` เพื่อให้ตอบสถานะ 404 จริง

## Wrangler: ใช้ในเครื่องเท่านั้นในระยะนี้

ไฟล์ `wrangler.jsonc` ตั้งค่า Worker ชื่อ `super-ice-group` ให้เสิร์ฟ `./dist` เป็น Static Assets พร้อม custom 404 และ trailing slash โดยปิดทั้ง `workers.dev` และ public preview URLs เป็นค่าเริ่มต้น

จำลอง Workers ในเครื่อง:

```bash
npm run preview:worker
```

คำสั่งนี้เรียก `npm run build` ก่อน แล้วเปิด `wrangler dev` หยุดด้วย `Ctrl+C`

ในระยะนี้:

- อนุญาตเฉพาะ local development และ local preview
- ห้ามรัน `npx wrangler deploy`
- ห้ามรัน `npm run deploy:worker`
- ห้าม login, เชื่อม account, สร้าง Worker ภายนอก หรือเพิ่ม custom domain
- หาก Wrangler ขอ authentication หรือการเชื่อมต่อบัญชี ให้หยุดและรอการอนุมัติ

## การตั้งค่า GitHub และ Workers Builds ในอนาคต

ส่วนนี้เป็น runbook สำหรับใช้ **หลังได้รับอนุมัติให้เชื่อมบัญชีและ deploy เท่านั้น** การเชื่อม repository หรือกด Save and Deploy เป็น external action และอาจทำให้มี deployment จริง

### เงื่อนไขก่อนเชื่อม

- เลือก canonical domain และนโยบาย `www`/non-`www`
- กรอกบริษัท ที่อยู่ โทร LINE และอีเมลจริง
- อนุมัตินโยบาย `GPTBot`, `ClaudeBot` และ `Google-Extended`
- ตรวจข้อความ พื้นที่บริการ ภาพ เอกสาร และ policy pages
- ตั้ง `productionReady: true` เมื่อทุก gate ผ่านจริง
- รัน `npm run verify:production` และ `npm run build` ให้ผ่าน
- กำหนดชื่อ production branch อย่างชัดเจน เช่น `main`; ห้ามปล่อยให้เป็นการคาดเดา

### ขั้นตอนหลังได้รับอนุมัติ

1. สร้าง **private GitHub repository** ที่บริษัทเป็นเจ้าของ แล้ว push source code โดยไม่ commit `.env`, `dist/`, `.wrangler/`, `tmp/` หรือไฟล์ชั่วคราว
2. เข้า Cloudflare Dashboard ที่ `Workers & Pages` และเลือกสร้างหรือเชื่อม Worker ผ่าน **Import a repository / Settings > Builds**
3. เชื่อม GitHub repository ที่ได้รับอนุมัติ
4. ให้ชื่อ Worker ใน Dashboard ตรงกับ `name` ใน `wrangler.jsonc` คือ `super-ice-group` มิฉะนั้น Workers Builds อาจล้มเหลว
5. ตั้ง project root เป็น repository root (`/`)
6. ตั้ง Node.js ของ build environment เป็นเวอร์ชัน `>=22.12.0`
7. ตั้งค่าการ build ดังนี้:

   ```text
   Build command:  npm run build
   Deploy command: npm run deploy:worker
   Production branch: <ชื่อ branch ที่เจ้าของโครงการอนุมัติ>
   ```

8. หากต้องการ preview/staging ภายนอก ให้สร้าง environment แยกและป้องกันด้วย Cloudflare Access ก่อนเปิด public preview URLs; local review ใช้ `wrangler dev` ได้โดยไม่ต้องเปิด URL สาธารณะ
9. ตรวจ build log, preview URL, redirects, security headers, 404, robots, sitemap, canonical และ contact actions ก่อนอนุมัติ production ครั้งแรก
10. เปิด custom domain, Search Console, GA4/GTM และระบบภายนอกอื่นแยกเป็นขั้นตอนหลังได้รับสิทธิ์และการอนุมัติที่เกี่ยวข้อง

Push ไป production branch ที่ผูกกับ Deploy command จะสามารถ build และ promote deployment ได้อัตโนมัติ จึงต้องกำหนด branch protection และ review process ก่อนเปิด workflow นี้

เอกสาร Cloudflare ที่เกี่ยวข้อง:

- [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
- [Workers Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)
- [Build branches and preview builds](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/)
- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Static-site routing and custom 404](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/)
- [Static Assets headers](https://developers.cloudflare.com/workers/static-assets/headers/)
- [Static Assets redirects](https://developers.cloudflare.com/workers/static-assets/redirects/)

## Portability

ตัวเว็บไซต์ build เป็นไฟล์ static ใน `dist/` และไม่มี server-side runtime ใน Phase 1 จึงสามารถย้ายไป shared hosting ในอนาคตได้ อย่างไรก็ตาม `_headers`, `_redirects`, 404 behavior และ trailing-slash redirects เป็นความสามารถเฉพาะแพลตฟอร์ม ต้องแปลงเป็นกฎของ host ใหม่ก่อนใช้งาน

## Checklist ก่อนส่งให้ตรวจ

- [x] ใช้ Node.js `>=22.12.0`
- [x] `npm run build` ผ่าน
- [x] ตรวจหน้า `/th/`, หน้าแบรนด์ สินค้า solution ติดต่อ และ 404 บนมือถือและ desktop
- [x] ไม่มีข้อมูลติดต่อหรือ claim ที่แต่งขึ้น
- [x] ไม่มีราคา ค่าจัดส่ง หรือรอบจัดส่งใน HTML, schema หรือไฟล์สาธารณะ
- [x] ไม่มีภาพ เอกสาร ลูกค้า หรือคำรับรองที่ยังไม่ได้รับสิทธิ์
- [x] internal links และ CTA ไปยังหน้าที่มีจริง
- [x] เนื้อหาที่ไม่พร้อมใช้ `draft: true` หรือ `indexable: false` ตามกรณี
- [x] ยังไม่ได้รัน deploy หรือเชื่อมบัญชีภายนอก
