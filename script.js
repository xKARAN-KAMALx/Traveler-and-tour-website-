const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];

const menuToggle = $("#menuToggle");
const mainNav = $("#mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});
$$(".main-nav a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

const quickPanel = $("#quickPanel");
$("#quickGuideBtn").addEventListener("click", () => quickPanel.hidden = !quickPanel.hidden);
$("#quickClose").addEventListener("click", () => quickPanel.hidden = true);
$$(".quick-panel a").forEach(a => a.addEventListener("click", () => quickPanel.hidden = true));

$("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  const light = document.body.classList.contains("light-theme");
  $("#themeToggle").textContent = light ? "◑ Dark" : "◐ Theme";
  showToast(light ? "Light theme enabled" : "Dark theme enabled");
});

const bookingModal = $("#bookingModal");
const infoModal = $("#infoModal");
function openModal(modal) {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal(modal) {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
$$("[data-open-booking]").forEach(button => button.addEventListener("click", () => openModal(bookingModal)));
$$("[data-close-modal]").forEach(button => button.addEventListener("click", () => {
  closeModal(button.closest(".modal-backdrop"));
}));
[bookingModal, infoModal].forEach(modal => modal.addEventListener("click", event => {
  if (event.target === modal) closeModal(modal);
}));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeModal(bookingModal);
    closeModal(infoModal);
    quickPanel.hidden = true;
  }
});

function openInfo(title, html) {
  $("#infoTitle").textContent = title;
  $("#infoContent").innerHTML = html;
  openModal(infoModal);
}
const privacyHTML = `<p><strong>Privacy information</strong></p>
<p>This demo website does not send form data to a server or store it in a database. Form entries stay in the page until you close or refresh it. When you choose to call, your device opens its phone app.</p>
<ul><li>Only enter information needed for your trip enquiry.</li><li>External links such as WhatsApp, Instagram, Facebook, Google Maps and stock image providers follow their own privacy policies.</li><li>Before launching publicly, add the business's final privacy contact and any data practices for services that are connected later.</li></ul>`;
const aboutHTML = `<p><strong>Karan Travel & Tour Service</strong></p>
<p>Service base: Bharthana, Etawah, Uttar Pradesh. Enquiries for local, outstation, family and pilgrimage trips.</p>
<p>This is a front-end prototype. It has interactive navigation, theme switching and a glossy trip enquiry form. It does not provide live vehicle availability, online payments, database storage or automatic form delivery.</p>
<p>Vehicle photos are representative stock imagery; the map points to the general Bharthana area.</p>`;
$("#privacyOpen").addEventListener("click", () => openInfo("Privacy policy", privacyHTML));
$("#privacyOpen2").addEventListener("click", () => openInfo("Privacy policy", privacyHTML));
$("#aboutOpen").addEventListener("click", () => openInfo("Site information", aboutHTML));
$("#aboutOpen2").addEventListener("click", () => openInfo("Site information", aboutHTML));

$$("[data-vehicle]").forEach(button => button.addEventListener("click", () => {
  const name = button.dataset.vehicle;
  $("#vehicleSelect").value = name === "Eeco" ? "Eeco (Non-AC)" : `${name} (AC)`;
  openModal(bookingModal);
}));
$$("[data-destination]").forEach(button => button.addEventListener("click", () => {
  $("#destinationInput").value = button.dataset.destination;
  openModal(bookingModal);
}));

const form = $("#bookingForm");
form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  $("#formResult").hidden = false;
  $("#formResult").scrollIntoView({behavior:"smooth", block:"nearest"});
  showToast("Enquiry details prepared. Choose a call option.");
});
$("#year").textContent = new Date().getFullYear();

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}
