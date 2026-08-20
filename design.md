# Design Direction — Super Ice Group / ICEBERG

เอกสารนี้กำหนดทิศทางภาพและระบบ UI สำหรับเว็บไซต์ Super Ice Group โดยถอด visual DNA จาก `ICEBERG Slide.pptx` และเชื่อมกับโครงสร้างเว็บไซต์ใน `WEBSITE_AND_SEO_RESEARCH_TH.md`

> แหล่งอ้างอิงด้านภาพ: `ICEBERG Slide.pptx` จำนวน 9 สไลด์ ขนาด 16:9 (1280 × 720)  
> หลักการสำคัญ: เว็บไซต์หลักใช้แบรนด์ **Super Ice Group** เป็นบริษัทแม่ ส่วน **ICEBERG** เป็นแบรนด์น้ำแข็งพรีเมียม ห้ามทำให้สองระดับนี้ดูเป็น entity เดียวกัน

## 1. Design concept

### แนวคิดหลัก: Precision in Every Cube

ภาพรวมต้องสื่อ 4 คุณลักษณะพร้อมกัน:

1. **สะอาดและเชื่อถือได้** — พื้นขาว พื้นที่ว่างชัด เอกสารและกระบวนการตรวจสอบได้
2. **พรีเมียมแต่ไม่หรูหราจนห่างเหิน** — ภาพน้ำแข็งและเครื่องดื่มคอนทราสต์สูง ใช้สีดำอย่างมีน้ำหนัก
3. **แม่นยำและเป็นระบบ** — กริดที่คม เส้นกรอบบาง รูปทรงสี่เหลี่ยม และการจัดแนวที่เคร่งครัด
4. **พร้อมให้บริการจริง** — ใช้ภาพโรงงาน รถส่ง ทีมงาน และลูกค้าจริง ไม่พึ่งภาพ stock ที่ดูจัดฉาก

บุคลิกแบรนด์: `Clean / Precise / Confident / Dependable / Contemporary Thai`

## 2. สิ่งที่ถอดมาจากสไลด์ต้นฉบับ

| Visual cue | สิ่งที่พบในสไลด์ | วิธีนำมาใช้บนเว็บ |
|---|---|---|
| Split composition | ภาพและข้อความแบ่งพื้นที่ประมาณ 50/50 | ใช้กับ hero, brand story และ product feature section |
| Dark product photography | ภาพน้ำแข็ง/เครื่องดื่มบนพื้นมืดในสไลด์เปิด–ปิด | ใช้เป็น signature moment ของ ICEBERG |
| Clean white canvas | สไลด์ข้อมูลใช้พื้นขาวและตัวอักษรเข้ม | ใช้กับข้อมูลบริษัท มาตรฐาน โลจิสติกส์ และบทความ |
| Cyan accent | หัวข้อสำคัญ ไอคอน และแถบกราฟิกใช้ฟ้าสด | ใช้เน้น keyword, CTA และสถานะสำคัญ ไม่ใช้เป็นพื้นหลักทั้งหน้า |
| Strong typographic contrast | หัวข้อ Kanit หนา คู่กับเนื้อหา Kanit Light | สร้าง hierarchy ที่ชัด อ่านภาษาไทยง่าย |
| Thin outlined frame | กรอบคำว่า “MORE THAN ICE” | ใช้กับ eyebrow, label หรือกรอบข้อความสั้น ๆ |
| Three-dot motif | วงกลม 3 จุดที่มุมขวาบน | ใช้เป็นลายเซ็นตกแต่งเท่านั้น และต้องไม่ดูเหมือน carousel ที่กดได้ |
| Cyan/gray blocks | สไลด์ลูกค้าใช้บล็อกสี่เหลี่ยมซ้อนกัน | ใช้เป็น framing device ใน section divider หรือ customer proof |
| Documentary proof | มีผัง RO, ผลตรวจ, รถส่ง และ feedback จริง | แปลงเป็นเนื้อหา HTML ที่อ่านได้ พร้อมภาพต้นฉบับสำหรับดู/ดาวน์โหลด |

## 3. Brand architecture ในงานออกแบบ

### Super Ice Group

- เป็นเจ้าของ navigation, footer, corporate pages และหน้าแรก
- โทนหลัก: ขาว ดำ เทาเข้ม ดูเป็นองค์กรและเป็นกลาง
- สีฟ้าใช้เพื่อเชื่อมระบบทั้งหมดและชี้ action
- ต้องทำให้ผู้ใช้เห็นทางเลือก `Super Ice` และ `ICEBERG` ภายในช่วงต้นของหน้าแรก

### Super Ice

- ตำแหน่ง: น้ำแข็งทั่วไปสำหรับการใช้งานประจำและปริมาณสูง
- ใช้ฐานสีของกลุ่ม โดยเพิ่มภาพที่สว่าง ใช้งานจริง และตรงไปตรงมา
- หลีกเลี่ยงการใช้ภาพมืดแบบ editorial มากเกินไป เพราะจะทำให้สับสนกับ ICEBERG

### ICEBERG

- ตำแหน่ง: น้ำแข็งพรีเมียมสำหรับเครื่องดื่ม ร้านอาหาร คาเฟ่ บาร์ และ hospitality
- ใช้ภาพ hero โทนมืด คอนทราสต์สูง ประกายใสของน้ำแข็ง และ cyan accent
- ใช้ tagline lockup “MORE THAN ICE” จากไฟล์โลโก้จริง ห้ามพิมพ์เลียนแบบโลโก้ด้วยฟอนต์ทั่วไป

## 4. Color system

สีหลักอ้างอิงจากไฟล์ PowerPoint โดยตรง และเพิ่ม neutral token สำหรับงานเว็บ:

| Token | Hex | การใช้งาน |
|---|---:|---|
| `--color-ice` | `#00B0F0` | สีแบรนด์จากต้นฉบับ, keyword highlight, icon และงานตกแต่ง |
| `--color-ice-action` | `#007FA8` | CTA/link ที่ต้องใช้กับข้อความขาวตามเกณฑ์ contrast |
| `--color-ice-hover` | `#006C91` | hover/pressed ของ CTA |
| `--color-ice-soft` | `#E6F7FD` | section tint, selected state, note background |
| `--color-ink` | `#111111` | หัวข้อและพื้นมืดหลัก |
| `--color-charcoal` | `#404040` | หัวข้อรอง ไอคอน และพื้นเทาเข้ม |
| `--color-body` | `#292929` | เนื้อหาหลัก |
| `--color-muted` | `#666666` | metadata และคำอธิบายรอง |
| `--color-line` | `#D9D9D9` | เส้นแบ่ง กรอบ และตาราง |
| `--color-surface` | `#F5F7F8` | พื้น section รอง |
| `--color-white` | `#FFFFFF` | พื้นหลักและข้อความบนพื้นมืด |
| `--color-black` | `#000000` | ใช้เฉพาะจุดที่ต้องการ contrast สูงสุด |

กฎการใช้สี:

- ให้ขาว/ดำ/เทาครองพื้นที่ประมาณ 85–90% และให้ cyan เป็น accent 10–15%
- CTA หลักบนพื้นขาวใช้ `#007FA8` และ hover `#006C91` เพื่อให้ข้อความขาวผ่าน contrast
- `#00B0F0` เหมาะกับตัวอักษรขนาดใหญ่ ไอคอน เส้น และพื้นตกแต่ง แต่ไม่ควรใช้กับตัวหนังสือขนาดเล็กบนพื้นขาว
- อย่าเพิ่มหลายสีตามธีม Office ในไฟล์ PowerPoint; สีส้ม เขียว และม่วงใน theme ไม่ใช่สีที่ปรากฏเป็นภาษาหลักของแบรนด์

## 5. Typography

ฟอนต์จาก theme ของสไลด์คือ **Kanit** และ **Kanit Light**

### Font stack

```css
--font-display: "Kanit", "Noto Sans Thai", sans-serif;
--font-body: "Kanit", "Noto Sans Thai", sans-serif;
```

โหลดน้ำหนักเท่าที่ใช้จริง: `300`, `400`, `500`, `600`, `700`

### Type scale

| Role | Desktop | Mobile | Weight | Line-height |
|---|---:|---:|---:|---:|
| Display / Hero | 72–88px | 44–52px | 600–700 | 0.98–1.08 |
| H1 | 56–64px | 38–44px | 600–700 | 1.08 |
| H2 | 40–48px | 30–36px | 600–700 | 1.15 |
| H3 | 28–32px | 24–28px | 600 | 1.25 |
| Lead | 21–24px | 18–20px | 300–400 | 1.55 |
| Body | 17–18px | 16–17px | 300–400 | 1.65 |
| Small / Meta | 14–15px | 14px | 400–500 | 1.5 |
| Eyebrow | 13–14px | 12–13px | 500–600 | 1.2 |

กฎ typography:

- ใช้ Kanit 600–700 กับหัวข้อ และ Kanit 300–400 กับย่อหน้า
- หัวข้อสั้น กระชับ และขึ้นบรรทัดตามความหมาย ไม่ตัดคำไทยแบบสุ่ม
- จำกัดความยาวย่อหน้าที่ `60–72ch`
- ภาษาอังกฤษในชื่อ section ใช้ Title Case; ไม่ใช้ตัวพิมพ์ใหญ่ทั้งประโยค ยกเว้น label สั้น
- ใช้ cyan เน้นเพียงคำหรือวลีสำคัญแบบเดียวกับ “Product Features” และ “Customer Feedback” ในสไลด์

## 6. Grid, spacing และ shape language

### Container และ grid

- Maximum content width: `1280px`
- Desktop: 12 columns, gutter `24px`, side padding `48–64px`
- Tablet: 8 columns, gutter `20px`, side padding `32px`
- Mobile: 4 columns, gutter `16px`, side padding `20px`
- Hero แบบ split ใช้สัดส่วน `5/7`, `6/6` หรือ `7/5` ตามน้ำหนักภาพ
- Section vertical spacing: `96–128px` desktop, `64–80px` tablet, `48–64px` mobile

### Spacing tokens

ใช้ฐาน 4px: `4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128`

### Shape language

- มุมส่วนใหญ่คม หรือ radius ต่ำ `0–8px`
- ปุ่มใช้ radius `4px`; หลีกเลี่ยง pill button
- เส้นกรอบทั่วไป `1px`; กรอบ emphasis `2px`
- icon frame ใช้สี่เหลี่ยมจัตุรัสหรือสี่เหลี่ยมเอียงเล็กน้อย
- shadow ต้องเบาและใช้เฉพาะสิ่งที่ลอยจริง เช่น sticky nav, dialog, document preview
- ไม่ใช้ glassmorphism, gradient หลากสี หรือเงาฟุ้งแบบ SaaS dashboard

## 7. Imagery direction

### ภาพ signature ของ ICEBERG

- close-up น้ำแข็ง เครื่องดื่ม และขั้นตอนเทเครื่องดื่ม
- ฉากหลังดำ/น้ำตาลเข้ม มี highlight เย็นบนผิวน้ำแข็ง
- ให้ภาพมี negative space สำหรับวางข้อความ
- crop แบบชิดและมี scale ใหญ่ เพื่อเน้นความใส รูปทรง และพื้นผิว

### ภาพ corporate และ operations

- โรงงาน ระบบกรอง RO บรรจุภัณฑ์ ห้องเย็น รถส่ง และทีมงานจริง
- แสงธรรมชาติหรือแสงขาวสะอาด สีไม่ติดเหลืองมาก
- ภาพต้องบอกขั้นตอนหรือข้อพิสูจน์ ไม่เป็นเพียงภาพประกอบทั่วไป
- ใช้ภาพรถและคนในบริบทจริงเพื่อสื่อ coverage และ readiness

### เอกสารและ social proof

- ใบรับรอง/ผลตรวจต้องแสดงชื่อเอกสาร หน่วยงาน วันที่ และสถานะเป็น HTML
- มี thumbnail สำหรับ preview และปุ่ม `ดูเอกสาร` / `ดาวน์โหลดต้นฉบับ`
- ห้ามแสดงเอกสารสองหน้าแบบย่อจนอ่านข้อความไม่ได้เหมือนบนสไลด์
- ภาพ feedback หรือโพสต์ลูกค้าใช้ได้เมื่อมีสิทธิ์เผยแพร่ และต้องมีคำอธิบายข้อความแทนภาพ

## 8. Core components

### 8.1 Header

- Desktop: โลโก้ Super Ice Group ซ้าย, navigation กลาง/ขวา, CTA `ขอใบเสนอราคา`
- Mobile: โลโก้ + menu button + CTA ทางลัดหนึ่งรายการ
- พื้นโปร่งบน hero ได้ แต่ต้องเปลี่ยนเป็นพื้นขาวเมื่อ scroll เพื่อรักษาความอ่านง่าย
- เมนูแบรนด์ควรแยก `Super Ice` และ `ICEBERG` ชัดเจน

### 8.2 Buttons

**Primary** — พื้น `--color-ice-action`, hover เป็น `--color-ice-hover`, ข้อความขาว, สูงอย่างน้อย `48px`  
**Secondary** — พื้นโปร่ง เส้น `1px` สี ink  
**On dark** — พื้นขาว/ข้อความดำ หรือเส้นขาวตามลำดับชั้น  
**Text link** — มีลูกศรและ underline เมื่อ hover

ข้อความ CTA ใช้ภาษาที่บอกผลลัพธ์ เช่น `ขอใบเสนอราคา`, `เช็กพื้นที่จัดส่ง`, `ดูมาตรฐานการผลิต`

### 8.3 Hero

มี 2 pattern หลัก:

1. **Corporate hero** — พื้นขาวหรือภาพสว่าง, H1 ดำ, cyan highlight, trust proof และ CTA 2 ระดับ
2. **ICEBERG hero** — ภาพเต็มหรือ split บนพื้นมืด, โลโก้/ข้อความขาว, เส้นกรอบบาง และ product close-up

ข้อกำหนด:

- คำตอบว่า “บริษัททำอะไร” ต้องเห็นใน viewport แรก
- CTA หลักต้องเห็นโดยไม่เลื่อนบน desktop และมือถือมาตรฐาน
- ห้ามใช้ auto-rotating carousel
- overlay ภาพมืดต้องพอให้ข้อความผ่าน WCAG AA

### 8.4 Brand selector

ใช้สองพื้นที่ขนาดใหญ่แทนการ์ดเล็กจำนวนมาก:

- `Super Ice` — ภาพสว่าง ข้อมูลการใช้งานประจำและปริมาณ
- `ICEBERG` — ภาพมืด premium, cyan accent และผลิตภัณฑ์เด่น

แต่ละพื้นที่ต้องมีชื่อแบรนด์ คำอธิบายหนึ่งประโยค และ link ชัดเจน

### 8.5 Feature list

- ใช้ภาพสินค้าใหญ่ 45–55% ของพื้นที่ คู่กับรายการคุณสมบัติ
- รายการหนึ่งข้อควรมี headline สั้น + คำอธิบาย ไม่เกิน 2–3 บรรทัด
- ใช้ไอคอนเส้นขาวบนสี่เหลี่ยม charcoal หรือ cyan ตามแบบสไลด์สินค้า
- บนมือถือเรียงภาพก่อนข้อความ และให้รายการมีระยะห่างอย่างน้อย `20px`

### 8.6 Process / Logistics

- Desktop ใช้เส้นทางแนวนอน 4–6 ขั้นตอน; mobile เปลี่ยนเป็นแนวตั้ง
- แต่ละขั้นมี icon, ชื่อขั้น และหลักฐานหนึ่งบรรทัด
- ใช้ cyan แสดง active/critical step และ gray สำหรับเส้นเชื่อม
- ตัวเลขสำคัญ เช่น จำนวนรถหรืออุณหภูมิห้องเย็น ต้องมีหน่วยและขอบเขต entity ชัดเจน

### 8.7 Proof block

- ใช้ metric ขนาดใหญ่ + supporting evidence แทนแถวการ์ด dashboard
- ตัวอย่างประเภทหลักฐาน: ประสบการณ์, จุดกระจายสินค้า, รถส่ง, เวลาบริการ, มาตรฐาน
- หากตัวเลขเป็นข้อมูลรวมของกลุ่ม ต้องติดป้าย `ข้อมูลรวม Super Ice Group`
- ใส่ source/date ใน CMS แม้จะไม่แสดงทั้งหมดบนหน้า

### 8.8 Certification/document viewer

- แสดง metadata ก่อนภาพเอกสาร
- preview เปิดเป็น dialog/lightbox ที่ zoom และใช้ keyboard ได้
- มีลิงก์ดาวน์โหลดไฟล์ต้นฉบับและข้อความสรุปที่ค้นหาได้
- เอกสารหมดอายุหรือยังไม่ยืนยันต้องไม่แสดงเป็นสถานะปัจจุบัน

### 8.9 Customer proof

- ใช้ชื่อ/โลโก้/คำรับรองเฉพาะที่ได้รับอนุญาต
- แบ่งตามกลุ่มลูกค้า เช่น Bar, Restaurant & Cafe, Hotel, Retail, Industrial
- ใช้ layout แบบ editorial ที่มีภาพเด่นหนึ่งภาพและรายชื่อประกอบ แทน logo wall ที่แน่นเกินไป
- Social screenshot ต้องมีลิงก์หรือรายละเอียดแหล่งที่มาเมื่อเหมาะสม

### 8.10 Mobile contact bar

- ติดด้านล่าง แบ่งเป็น `โทร`, `LINE`, `อีเมล/ขอราคา`
- สูงไม่เกิน `64px` และต้องไม่บัง cookie banner หรือเนื้อหาสำคัญ
- ปุ่มแตะอย่างน้อย `44 × 44px`

### 8.11 Footer

- โลโก้บริษัทแม่และคำอธิบายสั้น
- ลิงก์แบรนด์ สินค้า บริการ พื้นที่จัดส่ง มาตรฐาน และติดต่อ
- แสดงโทรศัพท์ LINE และอีเมลเป็นข้อความจริง ไม่ซ่อนในภาพ
- มี Privacy Notice, Cookie Policy และข้อมูลนิติบุคคล

## 9. Page blueprints

### Homepage

1. Corporate hero + CTA
2. Trust proof strip
3. Brand selector: Super Ice / ICEBERG
4. Solutions by business type
5. Delivery coverage + 24/7 service condition
6. Production and quality process
7. Standards/documents
8. Customer proof/case study
9. Sustainability
10. FAQ
11. Final CTA

### ICEBERG landing page

1. Dark premium hero พร้อมโลโก้ ICEBERG
2. Value proposition: ความใส รูปทรงสม่ำเสมอ ละลายช้า
3. Product close-up + specifications
4. Production/RO and quality proof
5. Use cases: cocktail bar, restaurant, cafe, hospitality
6. Packaging and contamination-control details
7. Customer proof
8. Delivery/contact CTA

### Product detail

1. Product image + name + brand label
2. Key specifications
3. Suitable uses/glass types
4. Quality and packaging
5. Delivery information without publishing price or schedule
6. Related products
7. CTA โทร / LINE / อีเมล

### Quality and standards

1. Intro claim ที่ระบุขอบเขตอย่างแม่นยำ
2. Water/production process
3. Control points
4. Certificate and lab result index
5. Downloadable documents
6. QA contact CTA

### Delivery/logistics

1. Coverage overview
2. Distribution points
3. Fleet and cold-chain details
4. Service flow
5. Information customers should prepare
6. Contact CTA เพื่อเช็กพื้นที่ ค่าส่ง และรอบจัดส่ง

## 10. Responsive behavior

- ทุก split layout ต้อง stack เป็นหนึ่งคอลัมน์ที่ `≤ 768px`
- ภาพสำคัญอยู่ก่อนข้อความเมื่อภาพช่วยอธิบายสินค้า; ข้อความอยู่ก่อนเมื่อผู้ใช้ต้องตัดสินใจ/กด CTA
- หัวข้อห้ามล้น viewport และต้องไม่ใช้ `white-space: nowrap` กับข้อความภาษาไทย
- ตารางกว้างเปลี่ยนเป็น stacked definition list หรือมี horizontal scroll พร้อม affordance
- process diagram เปลี่ยนเป็น vertical stepper
- เอกสารและภาพ feedback ห้ามย่อจนอ่านไม่ได้ ให้เปิด viewer แยก
- navigation และ CTA ต้องใช้งานได้ด้วยนิ้วเดียวบนมือถือ

## 11. Motion

- ใช้ duration `160–240ms` สำหรับ hover/focus และ `240–360ms` สำหรับ section reveal
- easing: `cubic-bezier(0.2, 0.8, 0.2, 1)`
- motion ที่เหมาะสม: fade, slight translate, image mask reveal และเส้นกรอบขยายสั้น ๆ
- ไม่ใช้ autoplay video พร้อมเสียง, parallax หนัก, bouncing CTA หรือ animation ที่วนไม่จบ
- รองรับ `prefers-reduced-motion: reduce`

## 12. Accessibility และ usability

- เป้าหมายขั้นต่ำ WCAG 2.2 AA
- body text อย่างน้อย `16px`; line-height ภาษาไทยอย่างน้อย `1.55`
- contrast ข้อความทั่วไปอย่างน้อย `4.5:1`; ข้อความใหญ่ `3:1`
- focus state ต้องเห็นชัด ใช้ outline cyan เข้มร่วมกับ offset
- ห้ามใช้สีเพียงอย่างเดียวเพื่อสื่อสถานะ
- icon-only control ต้องมี accessible name
- รูปสินค้า กระบวนการ และเอกสารต้องมี alt text ที่อธิบายหน้าที่ของภาพ
- รองรับ keyboard ทั้ง menu, dialog, document viewer และ form
- ข้อมูลสำคัญต้องอยู่ใน HTML ไม่ฝังอยู่เฉพาะในรูปหรือ PDF

## 13. Content and data rules

- ใช้ `Super Ice Group` เมื่อพูดถึงบริษัทแม่หรือข้อมูลรวมของกลุ่ม
- ใช้ `Super Ice` และ `ICEBERG` เฉพาะข้อมูลของแบรนด์นั้น
- ห้ามเผยแพร่ราคา ค่าส่ง หรือรอบจัดส่ง; ให้พาไปโทร LINE หรืออีเมล
- ตัวเลข สถิติ มาตรฐาน รายชื่อลูกค้า และคำว่า `24/7/365` ต้องมี owner/source/date และผ่านการยืนยันก่อนเผยแพร่
- หลีกเลี่ยงคำว่า `ดีที่สุด`, `อันดับ 1`, `100%` หรือ claim เปรียบเทียบ หากไม่มีหลักฐานรองรับ
- คำอธิบายสินค้าใช้ประโยชน์ที่ตรวจสอบได้ เช่น รูปทรง ความใส การละลาย บรรจุภัณฑ์ และการใช้งานที่เหมาะสม

## 14. Do / Don't

### Do

- ใช้ภาพจริงขนาดใหญ่และปล่อยให้ภาพเป็นพระเอก
- สลับ section พื้นขาวกับ signature section พื้นมืดอย่างมีจังหวะ
- เน้นคำสำคัญด้วย cyan เพียงหนึ่งจุดต่อ heading
- ใช้กรอบ เส้น และสี่เหลี่ยมอย่างแม่นยำ
- แสดงหลักฐานให้ค้นหา อ่าน และดาวน์โหลดได้
- รักษา hierarchy ของบริษัทแม่และแบรนด์ลูกทุกหน้า

### Don't

- ไม่ทำทุก section เป็น card grid
- ไม่ใช้ carousel จุดสามจุดเพียงเพราะมี motif นี้ในสไลด์
- ไม่ใช้ cyan เป็นตัวหนังสือเล็กบนพื้นขาว
- ไม่ย่อภาพเอกสารหรือ social screenshot จนอ่านไม่ได้
- ไม่พิมพ์เลียนแบบโลโก้ ICEBERG ด้วยข้อความธรรมดา
- ไม่ใช้ภาพ stock ของก้อนน้ำแข็งหรือโรงงานที่ไม่ตรงกับสินค้าจริง
- ไม่ใช้ gradient, pill, glass panel หรือเงาหนักที่ขัดกับภาษาภาพต้นฉบับ

## 15. Suggested CSS tokens

```css
:root {
  --color-ice: #00b0f0;
  --color-ice-action: #007fa8;
  --color-ice-hover: #006c91;
  --color-ice-soft: #e6f7fd;
  --color-ink: #111111;
  --color-charcoal: #404040;
  --color-body: #292929;
  --color-muted: #666666;
  --color-line: #d9d9d9;
  --color-surface: #f5f7f8;
  --color-white: #ffffff;

  --font-display: "Kanit", "Noto Sans Thai", sans-serif;
  --font-body: "Kanit", "Noto Sans Thai", sans-serif;

  --container: 80rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --border: 1px solid var(--color-line);
  --focus-ring: 3px solid var(--color-ice-hover);

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;
}
```

## 16. Acceptance checklist

- [ ] หน้าแรกอธิบายโครงสร้าง Super Ice Group / Super Ice / ICEBERG ได้ภายใน viewport แรกหรือช่วงต้นหน้า
- [ ] ใช้ Kanit/Kanit Light และ accent `#00B0F0` ตามต้นฉบับ
- [ ] มีทั้ง white corporate sections และ dark ICEBERG signature sections โดยไม่ทำให้เว็บมืดทั้งเว็บ
- [ ] Hero และภาพสินค้ารักษาคุณภาพและ crop ได้ถูกต้องทุก breakpoint
- [ ] CTA โทร LINE และอีเมลใช้งานได้จริงบนมือถือ
- [ ] ไม่มีข้อมูลสำคัญอยู่เฉพาะในภาพหรือ PDF
- [ ] เอกสารมาตรฐานอ่าน ค้นหา zoom และดาวน์โหลดได้
- [ ] ตัวเลขและ claim ระบุ entity/source/date ครบในระบบข้อมูล
- [ ] contrast, keyboard, focus, alt text และ reduced motion ผ่าน QA
- [ ] ไม่มี carousel อัตโนมัติ card grid หนาแน่น หรือองค์ประกอบตกแต่งที่ดูเหมือน control โดยไม่ทำงาน
