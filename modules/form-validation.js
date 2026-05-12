export default function initFormValidation() {
	const root = document.querySelector(".contact_form");
	if (!root) return;

	const origin = root.querySelector('input[name="origin"]');
	const path = root.querySelector('input[name="pathname"]');

	origin.value = window.location.origin;
	path.value = window.location.pathname;

	const name = root.querySelector('input[name="name"]');
	const email = root.querySelector("input[name=email]");
	const nameError = root.querySelector("#name-required");
	const emailError = root.querySelector("#email-required");
	const reset = root.querySelector(".reset_button");

	root.addEventListener("submit", (e) => {
		if (name.value === null || name.value === "") {
			e.preventDefault();
			nameError.hidden = false;
			return;
		} else {
			nameError.hidden = true;
		}

		if (email.value === null || email.value === "") {
			e.preventDefault();
			emailError.hidden = false;
			return;
		} else {
			emailError.hidden = true;
		}
	});

	name.addEventListener("input", () => {
		nameError.hidden = true;
	});

	email.addEventListener("input", () => {
		emailError.hidden = true;
	});

	reset.addEventListener("click", () => {
		nameError.hidden = true;
		emailError.hidden = true;
	});
}
