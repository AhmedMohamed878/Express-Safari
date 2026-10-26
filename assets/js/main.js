// Express Safari — vanilla JS behaviours (no build step, no framework)
document.addEventListener("DOMContentLoaded", function () {
  function bookingMessage(tripName) {
    return "Hello Express Safari, I would like to book " + tripName +
      ". My preferred date is [date], for [number] participants. " +
      "Could you please confirm availability and the total price?";
  }

  function setBookingMessage(link, message) {
    var url = new URL(link.href);
    url.searchParams.set("text", message);
    link.href = url.toString();
  }

  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(function (link) {
    var url = new URL(link.href);
    var message = url.searchParams.get("text");
    var booking = message && message.match(/^Hello Express Safari, I would like to book (.+?)(?:\.)?$/);
    if (booking) setBookingMessage(link, bookingMessage(booking[1]));
  });

  if (document.querySelector(".mobile-book-bar")) {
    document.body.classList.add("has-mobile-book-bar");
  }

  document.querySelectorAll("main h1").forEach(function (title) {
    var stars = document.createElement("span");
    stars.className = "page-title-stars";
    stars.setAttribute("aria-hidden", "true");

    for (var i = 0; i < 5; i++) {
      var star = document.createElement("i");
      star.className = "bi bi-star-fill";
      stars.appendChild(star);
    }

    title.appendChild(stars);
  });

  var sunsetBanner = document.createElement("section");
  sunsetBanner.className = "sunset-availability";
  sunsetBanner.setAttribute("aria-labelledby", "sunset-availability-title");
  sunsetBanner.innerHTML =
    '<div class="container-xl py-4">' +
      '<div class="rounded-4xl bg-navy text-sand p-4 p-lg-5 d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">' +
        '<div>' +
          '<p class="eyebrow text-sun mb-1">A golden-hour add-on</p>' +
          '<h2 class="display-font text-uppercase fs-3 mb-2" id="sunset-availability-title">Add a sunset stop to any trip</h2>' +
          '<p class="mb-0 text-sand">Ask us when booking and we will help arrange a sunset experience for your trip.</p>' +
        '</div>' +
        '<a class="btn btn-whatsapp btn-uppercase rounded-pill px-4 py-3 d-inline-flex align-items-center justify-content-center gap-2 flex-shrink-0" href="https://wa.me/201556477716?text=Hello%20Express%20Safari%2C%20I%20would%20like%20to%20add%20a%20sunset%20stop%20to%20my%20trip." target="_blank" rel="noopener noreferrer">' +
          '<i class="bi bi-whatsapp" aria-hidden="true"></i> Ask on WhatsApp' +
        '</a>' +
      '</div>' +
    '</div>';

  var footer = document.querySelector(".site-footer");
  if (footer) {
    footer.parentNode.insertBefore(sunsetBanner, footer);
  }

  var cairoCards = document.querySelectorAll("[data-cairo-card]");

  cairoCards.forEach(function (card) {
    var optionSelect = card.querySelector("[data-cairo-option]");
    var priceLabel = card.querySelector("[data-cairo-price]");
    var bookLink = card.querySelector("[data-cairo-book]");
    if (!optionSelect || !priceLabel || !bookLink) return;

    function updateCairoOption() {
      var option = optionSelect.options[optionSelect.selectedIndex];
      var name = option.value;
      var price = option.getAttribute("data-price");
      priceLabel.textContent = price + " €";
      setBookingMessage(bookLink, bookingMessage("Cairo " + name));
    }

    optionSelect.addEventListener("change", updateCairoOption);
    updateCairoOption();
  });

  var luxorCards = document.querySelectorAll("[data-luxor-card]");

  luxorCards.forEach(function (card) {
    var optionSelect = card.querySelector("[data-luxor-option]");
    var priceLabel = card.querySelector("[data-luxor-price]");
    var bookLink = card.querySelector("[data-luxor-book]");
    var tripTitle = card.querySelector("h3");
    if (!optionSelect || !priceLabel || !bookLink || !tripTitle) return;

    function updateLuxorOption() {
      var option = optionSelect.options[optionSelect.selectedIndex];
      var name = option.value;
      var price = option.getAttribute("data-price");
      priceLabel.textContent = price + " €";
      setBookingMessage(bookLink, bookingMessage(tripTitle.textContent.trim() + " " + name));
    }

    optionSelect.addEventListener("change", updateLuxorOption);
    updateLuxorOption();
  });

  var grid = document.querySelector("[data-tour-grid]");
  if (!grid) return;

  var priceButtons = document.querySelectorAll("[data-price-filter]");
  var fullDayButton = document.querySelector("[data-fullday-filter]");
  var cards = grid.querySelectorAll("[data-tour-card]");
  var emptyState = document.querySelector("[data-empty-state]");
  var countLabel = document.querySelector("[data-tour-count]");
  var activePrice = "all";
  var fullDayOnly = false;

  function matchesPrice(card) {
    if (activePrice === "all") return true;
    var price = card.getAttribute("data-price");
    if (!price) return false;
    price = parseFloat(price);
    if (activePrice === "u30") return price < 30;
    if (activePrice === "30-60") return price >= 30 && price <= 60;
    if (activePrice === "60p") return price > 60;
    return true;
  }

  function matchesDuration(card) {
    if (!fullDayOnly) return true;
    return card.getAttribute("data-duration") === "Full day";
  }

  function applyFilters() {
    var visible = 0;
    cards.forEach(function (card) {
      var show = matchesPrice(card) && matchesDuration(card);
      card.classList.toggle("d-none", !show);
      if (show) visible++;
    });
    if (countLabel) {
      countLabel.textContent = visible + (visible === 1 ? " trip" : " trips");
    }
    if (emptyState) {
      emptyState.classList.toggle("d-none", visible !== 0);
    }
  }

  priceButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activePrice = btn.getAttribute("data-price-filter");
      priceButtons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      applyFilters();
    });
  });

  if (fullDayButton) {
    fullDayButton.addEventListener("click", function () {
      fullDayOnly = !fullDayOnly;
      fullDayButton.classList.toggle("active", fullDayOnly);
      applyFilters();
    });
  }

  applyFilters();
});
