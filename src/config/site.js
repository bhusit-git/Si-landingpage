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
    line: "",
    lineId: "",
    mapUrl: "",
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
    GPTBot: "pending",
    ClaudeBot: "pending",
    "Google-Extended": "pending",
  },
  publication: {
    siteCopyApproved: false,
    legalPagesApproved: false,
    companyMetricsApproved: false,
    deliveryAreasApproved: false,
    service247Approved: false,
    customerProofApproved: false,
    certificatesApproved: false,
    sourceImagesApproved: false,
  },
  reviewFacts: [
    {
      id: "years-in-business",
      value: "27 ปี",
      label: "ประสบการณ์ในธุรกิจ",
      scope: "ข้อมูลรวม Super Ice Group",
      source: "Super Ice Group company profile, หน้า 1",
      reviewedOn: "2026-08-20",
      approved: false,
    },
    {
      id: "continuous-service",
      value: "24/7/365",
      label: "การให้บริการ",
      scope: "ข้อมูลรวม Super Ice Group",
      source: "Super Ice Group company profile, หน้า 1",
      reviewedOn: "2026-08-20",
      approved: false,
    },
    {
      id: "group-capacity",
      value: "5,000+ ตัน/วัน",
      label: "กำลังผลิตรวม",
      scope: "ข้อมูลรวม Super Ice Group",
      source: "Super Ice Group company profile, หน้า 1",
      reviewedOn: "2026-08-20",
      approved: false,
    },
    {
      id: "daily-commercial-customers",
      value: "4,000+ ราย/วัน",
      label: "ลูกค้าเชิงพาณิชย์รายวัน",
      scope: "ข้อมูลรวม Super Ice Group",
      source: "Super Ice Group company profile, หน้า 1",
      reviewedOn: "2026-08-20",
      approved: false,
    },
  ],
  reviewDeliveryPoints: [
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
