// Interactive Ice Finder Data
const finderData = {
  ball: {
    brand: "ICEBERG PREMIUM",
    title: "Crystal Clear Ice Ball",
    desc: "น้ำแข็งทรงกลมใสบริสุทธิ์ สัดส่วนสมบูรณ์แบบสำหรับแก้ว Rock ช่วยลดพื้นที่สัมผัสกับของเหลว ทำให้อัตราการละลายช้าที่สุด คงรสชาติวิสกี้และสปิริตชั้นเลิศได้ยาวนาน",
    img: "/images/products/crystal-clear-ice-ball.jpg",
    size: "เส้นผ่านศูนย์กลาง 55 มม. / 60 มม.",
    melt: "ละลายช้าที่สุด (Ultra Slow)",
    glass: "Rock Glass / Old Fashioned",
    fit: "Whiskey, Bourbon, Negroni, Old Fashioned",
    link: "/th/products/crystal-clear-ice-ball/"
  },
  cube: {
    brand: "ICEBERG PREMIUM",
    title: "Crystal Clear Ice Cube",
    desc: "น้ำแข็งก้อนสี่เหลี่ยมลูกบาศก์ขนาด 2 นิ้ว ขอบคมใสเหมือนเพชร แช่แข็งนาน 48 ชม. ไร้ฟองอากาศ เหมาะสำหรับค็อกเทลคลาสสิกที่ต้องการความเย็นจัดแต่น้ำไม่เจือจางเร็ว",
    img: "/images/products/crystal-clear-ice-cube.jpg",
    size: "2 × 2 นิ้ว (50 × 50 มม.)",
    melt: "ละลายช้ามาก (Very Slow)",
    glass: "Double Rock / Tumbler",
    fit: "Negroni, Boulevardier, Signature Cocktails",
    link: "/th/products/crystal-clear-ice-cube/"
  },
  stick: {
    brand: "ICEBERG PREMIUM",
    title: "Crystal Clear Ice Stick",
    desc: "น้ำแข็งทรงแท่งยาวใสบริสุทธิ์ ออกแบบสัดส่วนเฉพาะสำหรับแก้วทรงสูง ช่วยกระจายความเย็นสม่ำเสมอตั้งแต่ก้นแก้วถึงปากแก้ว ดูสวยงามหรูหรา",
    img: "/images/products/crystal-clear-ice-stick.jpg",
    size: "4 × 1.5 นิ้ว (100 × 38 มม.)",
    melt: "ละลายช้า (Slow)",
    glass: "Highball / Collins Glass",
    fit: "Whisky Highball, Gin & Tonic, Iced Americano",
    link: "/th/products/crystal-clear-ice-stick/"
  },
  shaker: {
    brand: "ICEBERG PREMIUM",
    title: "Crystal Clear Ice Shaker",
    desc: "ก้อนน้ำแข็งความหนาแน่นสูงสำหรับเชกเกอร์ ให้ความเย็นจัดอย่างรวดเร็วโดยไม่แตกตัวเป็นเกล็ดน้ำแข็งเล็กๆ คงบาลานซ์รสชาติของค็อกเทลได้อย่างแม่นยำ",
    img: "/images/products/crystal-clear-ice-shaker.jpg",
    size: "Solid Craft Ice Block",
    melt: "เย็นจัด ละลายช้า",
    glass: "Cocktail Shaker / Mixing Glass",
    fit: "Sour Drinks, Daiquiri, Martini Shaking",
    link: "/th/products/crystal-clear-ice-shaker/"
  },
  tube: {
    brand: "SUPER ICE STANDARD",
    title: "Small Tube Ice (น้ำแข็งหลอดเล็ก)",
    desc: "น้ำแข็งหลอดมาตรฐานยอดนิยม ผลิตจากน้ำกรอง RO บริสุทธิ์ สด สะอาด เคี้ยวง่าย เย็นเร็ว คุ้มค่า เหมาะสำหรับร้านกาแฟ ชานม และร้านอาหารทั่วไป",
    img: "/images/products/small-tube-ice.jpg",
    size: "Standard Small Tube",
    melt: "เย็นเร็ว คุ้มค่า",
    glass: "แก้วกาแฟ 16-22 oz / แก้วเครื่องดื่มทั่วไป",
    fit: "Iced Latte, Milk Tea, Soft Drinks, Food Service",
    link: "/th/products/small-tube-ice/"
  }
};

document.addEventListener("DOMContentLoaded", function() {
  // Client logo marquee: auto-scroll with native touch/trackpad scrolling and mouse drag.
  const clientMarquee = document.querySelector("[data-client-marquee]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (clientMarquee) {
    const firstGroup = clientMarquee.querySelector('.client-marquee__group:not([aria-hidden="true"])');
    let isDragging = false;
    let isPaused = reduceMotion;
    let dragStartX = 0;
    let dragStartScroll = 0;
    let lastFrame = 0;
    let resumeTimer = 0;

    const getLoopWidth = function() {
      if (!firstGroup) return 0;
      const track = clientMarquee.querySelector(".client-marquee__track");
      const gap = track ? parseFloat(window.getComputedStyle(track).gap) || 0 : 0;
      return firstGroup.scrollWidth + gap;
    };

    const normalizeScroll = function() {
      const loopWidth = getLoopWidth();
      if (!loopWidth) return;

      if (clientMarquee.scrollLeft >= loopWidth * 2) clientMarquee.scrollLeft -= loopWidth;
      if (clientMarquee.scrollLeft <= 0) clientMarquee.scrollLeft += loopWidth;
    };

    const pauseTemporarily = function() {
      isPaused = true;
      window.clearTimeout(resumeTimer);
      if (!reduceMotion) {
        resumeTimer = window.setTimeout(function() {
          if (!isDragging && !clientMarquee.matches(":hover, :focus-within")) isPaused = false;
        }, 1400);
      }
    };

    const autoScroll = function(timestamp) {
      if (!lastFrame) lastFrame = timestamp;
      const elapsed = Math.min(timestamp - lastFrame, 40);
      lastFrame = timestamp;

      if (!isPaused && !isDragging) {
        clientMarquee.scrollLeft += elapsed * 0.035;
        normalizeScroll();
      }

      window.requestAnimationFrame(autoScroll);
    };

    clientMarquee.addEventListener("pointerdown", function(event) {
      if (event.pointerType === "touch") {
        pauseTemporarily();
        return;
      }

      isDragging = true;
      isPaused = true;
      dragStartX = event.clientX;
      dragStartScroll = clientMarquee.scrollLeft;
      clientMarquee.classList.add("is-dragging");
      clientMarquee.setPointerCapture(event.pointerId);
    });

    clientMarquee.addEventListener("pointermove", function(event) {
      if (!isDragging) return;
      clientMarquee.scrollLeft = dragStartScroll - (event.clientX - dragStartX);
      normalizeScroll();
    });

    const finishDrag = function(event) {
      if (!isDragging) return;
      isDragging = false;
      clientMarquee.classList.remove("is-dragging");
      if (clientMarquee.hasPointerCapture(event.pointerId)) clientMarquee.releasePointerCapture(event.pointerId);
      pauseTemporarily();
    };

    clientMarquee.addEventListener("pointerup", finishDrag);
    clientMarquee.addEventListener("pointercancel", finishDrag);
    clientMarquee.addEventListener("wheel", pauseTemporarily, { passive: true });
    clientMarquee.addEventListener("touchstart", pauseTemporarily, { passive: true });
    clientMarquee.addEventListener("mouseenter", function() { isPaused = true; });
    clientMarquee.addEventListener("mouseleave", function() { if (!isDragging && !reduceMotion) isPaused = false; });
    clientMarquee.addEventListener("focusin", function() { isPaused = true; });
    clientMarquee.addEventListener("focusout", function() { if (!reduceMotion) isPaused = false; });
    clientMarquee.addEventListener("scroll", normalizeScroll, { passive: true });

    if (!reduceMotion) {
      window.requestAnimationFrame(function() {
        clientMarquee.scrollLeft = getLoopWidth();
        window.requestAnimationFrame(autoScroll);
      });
    }
  }

  // Ice Finder Tabs
  const chips = document.querySelectorAll(".drink-chip");
  const titleEl = document.getElementById("finderTitle");
  const brandEl = document.getElementById("finderBrand");
  const descEl = document.getElementById("finderDesc");
  const imgEl = document.getElementById("finderImg");
  const sizeEl = document.getElementById("finderSize");
  const meltEl = document.getElementById("finderMelt");
  const glassEl = document.getElementById("finderGlass");
  const fitEl = document.getElementById("finderFit");
  const linkEl = document.getElementById("finderLink");

  chips.forEach(function(chip) {
    chip.addEventListener("click", function() {
      chips.forEach(function(c) { c.classList.remove("active"); });
      chip.classList.add("active");
      const key = chip.getAttribute("data-product");
      const data = key ? finderData[key] : null;
      if (!data) return;

      if (titleEl) titleEl.textContent = data.title;
      if (brandEl) brandEl.textContent = data.brand;
      if (descEl) descEl.textContent = data.desc;
      if (imgEl) {
        imgEl.setAttribute("src", data.img);
        imgEl.setAttribute("alt", data.title);
      }
      if (sizeEl) sizeEl.textContent = data.size;
      if (meltEl) meltEl.textContent = data.melt;
      if (glassEl) glassEl.textContent = data.glass;
      if (fitEl) fitEl.textContent = data.fit;
      if (linkEl) linkEl.setAttribute("href", data.link);
    });
  });

  // Ice Calculator
  const calcButtons = document.querySelectorAll(".calc-type-btn");
  const slider = document.getElementById("drinksSlider");
  const drinksDisplay = document.getElementById("drinksValueDisplay");
  const kgResult = document.getElementById("calcKgResult");
  const recText = document.getElementById("calcRecommendation");

  let currentFactor = 0.18;
  let currentType = "cafe";

  const updateCalculator = function() {
    if (!slider) return;
    const drinks = parseInt(slider.value, 10) || 0;
    if (drinksDisplay) drinksDisplay.textContent = drinks + " แก้ว";
    const totalKg = Math.round(drinks * currentFactor);
    if (kgResult) kgResult.textContent = String(totalKg);

    if (recText) {
      if (currentType === "cafe") {
        const bags = Math.ceil(totalKg / 15);
        recText.innerHTML = "💡 แนะนำ: <strong>Super Ice หลอดเล็ก</strong> ประมาณ " + bags + " กระสอบ/วัน (กระสอบละ ~15 กก.)";
      } else if (currentType === "bar") {
        const cubes = Math.round(drinks * 0.8);
        recText.innerHTML = "💡 แนะนำ: <strong>ICEBERG Ice Ball / Cube</strong> ประมาณ " + cubes + " ก้อน + น้ำแข็งหลอดสำหรับเชก";
      } else if (currentType === "restaurant") {
        const rBags = Math.ceil(totalKg / 20);
        recText.innerHTML = "💡 แนะนำ: <strong>Super Ice หลอดเล็ก / หลอดใหญ่</strong> ประมาณ " + rBags + " กระสอบ/วัน";
      } else {
        recText.innerHTML = "💡 แนะนำ: <strong>Super Ice + ICEBERG</strong> รวม " + totalKg + " กก. จัดส่งพร้อมถังเก็บรักษาความเย็น";
      }
    }
  };

  calcButtons.forEach(function(btn) {
    btn.addEventListener("click", function() {
      calcButtons.forEach(function(b) { b.classList.remove("active"); });
      btn.classList.add("active");
      currentFactor = parseFloat(btn.getAttribute("data-factor") || "0.18");
      currentType = btn.getAttribute("data-type") || "cafe";
      updateCalculator();
    });
  });

  if (slider) {
    slider.addEventListener("input", updateCalculator);
  }
});
