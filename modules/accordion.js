export default function initAccordion() {
	const root = document.querySelector(".accordion_panels");
	if (!root) return;

	const items = root.querySelectorAll(".accordion_item");
	const triggers = root.querySelectorAll(".accordion_trigger");

	items.forEach((item) => {
		const trigger = item.querySelector(".accordion_trigger");
		trigger.addEventListener("click", () => {
			const isActive = item.classList.toggle("active");
			if (!isActive) {
				trigger.setAttribute("aria-expanded", "false");
			} else {
				trigger.setAttribute("aria-expanded", "true");
			}
		});
	});
}
