const body = document.body;

// stateBtn = the button with 'aria-expanded'
// triggerBtns = the buttons that get the click listeners
// controlElement = the element that gets the class
// stateClass = the class that represents 'active'

// navigation
const menuOpen = document.querySelector(".menu_open");
const menuBtns = document.querySelectorAll(".menu_button");
// search
const searchOpen = document.querySelector(".search_open");
const searchBtns = document.querySelectorAll(".search_button");
// submenus
const subMenuBtns = document.querySelectorAll(".main_nav button[aria-controls]");

// only one submenu open at a time
function closeAllSubMenus(exceptBtn) {
	subMenuBtns.forEach((btn) => {
		if (btn === exceptBtn) return;
		const id = btn.getAttribute("aria-controls");
		const subMenu = document.getElementById(id);
		if (!subMenu) return;
		subMenu.classList.remove("active");
		btn.setAttribute("aria-expanded", "false");
	});
}

// helper function toggle
function toggleControlItem(stateBtn, triggerButton, controlElement, stateClass) {
	if (!triggerButton.length) return;
	triggerButton.forEach((btn) => {
		btn.addEventListener("click", () => {
			closeAllSubMenus(btn);
			const isOpen = controlElement.classList.toggle(stateClass);
			if (stateBtn) {
				stateBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
			}
		});
	});
}

// sub menu toggle
function subMenuToggle() {
	if (!subMenuBtns.length) return;
	subMenuBtns.forEach((btn) => {
		const id = btn.getAttribute("aria-controls");
		const subMenu = document.getElementById(id);
		if (!subMenu) return;
		toggleControlItem(btn, [btn], subMenu, "active");
	});
}

// main menu toggle
function menuToggle() {
	toggleControlItem(menuOpen, menuBtns, body, "menu_active");
}

// search drawer toggle
function searchToggle() {
	toggleControlItem(searchOpen, searchBtns, body, "search_active");
}

// layered esc key to close everything
function escapeToggle() {
	document.addEventListener("keydown", (e) => {
		if (e.key !== "Escape") return;

		// Close all submenus = layered appraoch
		// Use for...of so you can stop as soon as you find an active submenu
		for (const subBtn of subMenuBtns) {
			const id = subBtn.getAttribute("aria-controls");
			const subMenu = document.getElementById(id);
			if (!subMenu) continue;
			if (subMenu.classList.contains("active")) {
				subMenu.classList.remove("active");
				subBtn.setAttribute("aria-expanded", "false");
				return;
			}
		}

		// close the menu or search drawers last
		if (body.classList.contains("menu_active")) {
			body.classList.remove("menu_active");
			menuOpen.setAttribute("aria-expanded", "false");
		} else if (body.classList.contains("search_active")) {
			body.classList.remove("search_active");
			searchOpen.setAttribute("aria-expanded", "false");
		}
	});
}

function copyright() {
	const date = document.getElementById("date");
	const year = new Date().getFullYear();
	if (!date) return;
	date.textContent = year;
}

document.addEventListener("DOMContentLoaded", () => {
	menuToggle();
	searchToggle();
	subMenuToggle();
	escapeToggle();
	copyright();
});
