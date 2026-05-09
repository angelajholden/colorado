export default function initTheSlider() {
	document.querySelectorAll(".slider").forEach((slider) => {
		const sliderItems = slider.querySelectorAll(".slide");
		const next = slider.querySelector(".next_button");
		const prev = slider.querySelector(".prev_button");

		if (!sliderItems.length) return;
		let currentIndex = 0;
		const totalSlides = sliderItems.length;

		const updateSlider = (index) => {
			sliderItems.forEach((slide, i) => {
				slide.classList.toggle("active", i === index);
				slide.setAttribute("aria-label", `Slide ${i + 1} of ${totalSlides}`);
				slide.setAttribute("aria-hidden", i !== index);
			});
		};

		const showNext = () => {
			currentIndex = (currentIndex + 1) % totalSlides;
			updateSlider(currentIndex);
		};

		const showPrev = () => {
			currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
			updateSlider(currentIndex);
		};

		next?.addEventListener("click", showNext);
		prev?.addEventListener("click", showPrev);

		slider.addEventListener("keydown", (e) => {
			if (e.key === "ArrowRight") showNext();
			if (e.key === "ArrowLeft") showPrev();
		});

		updateSlider(currentIndex);
	});
}
initTheSlider();
