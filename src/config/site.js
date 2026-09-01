/**
 * Single source of truth for company, contact, SEO, analytics and crawler data.
 * Keep productionReady false until every pending field has been approved.
 */
export const site = {
  name: "Super Ice Group",
  shortName: "Super Ice Group",
  language: "th",
  locale: "th_TH",
  canonicalOrigin: "https://super-ice-group.example",
  productionReady: false,
  trailingSlash: "always",
  canonicalHostPolicy: "pending",
  company: {
    legalName: "บริษัท ซูเปอร์ ไอซ์ จำกัด",
    address: "18/39 ซอยนวมินทร์ 111 แยก 15 แขวงนวมินทร์ เขตบึงกุ่ม กรุงเทพมหานคร 10240",
    description:
      "ผู้ผลิตและจัดส่งน้ำแข็งสำหรับธุรกิจในกรุงเทพฯ และปริมณฑล โดยมี Super Ice สำหรับน้ำแข็งทั่วไป และ ICEBERG สำหรับน้ำแข็งพรีเมียม",
  },
  contact: {
    phone: "",
    email: "",
    line: "",
    lineId: "",
    mapUrl: "https://maps.app.goo.gl/5f1eRKf7YFyCTBe78",
  },
  brandContacts: {
    iceberg: {
      lineId: "@icebergiceball",
      lineUrl: "https://line.me/R/ti/p/@icebergiceball",
    },
  },
  social: {
    facebook: "",
    instagram: "",
  },
  analytics: {
    enabled: false,
    ga4MeasurementId: "",
    googleTagManagerId: "",
  },
  aiCrawlerPolicies: {
    GPTBot: "allow",
    ClaudeBot: "allow",
    "Google-Extended": "allow",
  },
  publication: {
    siteCopyApproved: false,
    legalPagesApproved: false,
    companyMetricsApproved: true,
    deliveryAreasApproved: true,
    service247Approved: false,
    customerProofApproved: false,
    certificatesApproved: false,
    sourceImagesApproved: true,
  },
  reviewFacts: [
    {
      id: "years-in-business",
      value: "27 ปี",
      label: "ประสบการณ์ในธุรกิจ",
      scope: "ข้อมูลรวม Super Ice Group",
      source: "Super Ice Group company profile, หน้า 1",
      reviewedOn: "2026-08-31",
      approved: true,
    },
    {
      id: "continuous-service",
      value: "24/7/365",
      label: "การให้บริการ",
      scope: "ข้อมูลรวม Super Ice Group",
      source: "Super Ice Group company profile, หน้า 1",
      reviewedOn: "2026-08-31",
      approved: true,
    },
    {
      id: "group-capacity",
      value: "5,000+ ตัน/วัน",
      label: "กำลังผลิตรวม",
      scope: "ข้อมูลรวม Super Ice Group",
      source: "Super Ice Group company profile, หน้า 1",
      reviewedOn: "2026-08-31",
      approved: true,
    },
    {
      id: "daily-commercial-customers",
      value: "4,000+ ราย/วัน",
      label: "ลูกค้าเชิงพาณิชย์รายวัน",
      scope: "ข้อมูลรวม Super Ice Group",
      source: "Super Ice Group company profile, หน้า 1",
      reviewedOn: "2026-08-31",
      approved: true,
    },
  ],
  factoryLocations: [
    "มีนบุรี",
    "ร่มเกล้า",
    "ลาดกระบัง",
    "กรุงเทพกรีฑา",
    "รามอินทรา",
    "แบริ่ง",
    "ลาดพร้าว 101",
    "รามคำแหง",
    "สุขุมวิท 50",
    "พัฒนาการ 34",
  ],
};

export const siteConfig = site;
export default site;

export const hasLine = (() => {
  try {
    const url = new URL(site.contact.line.trim());
    const hostname = url.hostname.toLowerCase().replace(/\.$/, "");
    const allowedHost =
      hostname === "lin.ee" || hostname === "line.me" || hostname.endsWith(".line.me");
    return url.protocol === "https:" && allowedHost && !url.username && !url.password;
  } catch {
    return false;
  }
})();

export const hasPhone = site.contact.phone.trim().length > 0;
export const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.contact.email.trim());
export const hasMap = site.contact.mapUrl.trim().length > 0;
