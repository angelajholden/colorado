export default function initBlogContent() {
	const origin = window.location.origin;
	let url;
	if (origin === "https://angelajholden.github.io") {
		url = "https://angelajholden.github.io/colorado";
	} else {
		url = origin;
	}

	async function fetchData() {
		try {
			const response = await fetch(`${url}/data/blogs.json`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("There was a problem with the fetch: ", error);
		}
	}

	function initSidebar(data) {
		const categories = data.reduce((acc, item) => {
			if (!acc[item.category]) acc[item.category] = 0;
			acc[item.category]++;
			return acc;
		}, {});
		return categories;
	}

	function initArchive(data) {
		const archive = data.reduce((acc, item) => {
			const date = new Date(item.published);
			const month = date.toLocaleString("en-US", { month: "long", year: "numeric" });
			if (!acc[month]) acc[month] = 0;
			acc[month]++;
			return acc;
		}, {});
		return archive;
	}

	function initRenderList(data, listType) {
		const root = document.querySelector(listType);
		if (!root) return;

		const ul = document.createElement("ul");
		Object.entries(data).forEach((item) => {
			const li = document.createElement("li");
			const link = document.createElement("a");
			const span = document.createElement("span");

			link.href = `${url}/${item[0].toLowerCase().replaceAll(" ", "-")}`;
			link.textContent = item[0];
			span.textContent = ` (${item[1]})`;

			link.append(span);
			li.append(link);
			ul.append(li);
		});
		root.append(ul);
	}

	let page = 0;
	const itemsPerPage = 3;

	function initCountAndSlice(data, page) {
		let start = page * itemsPerPage;
		let end = start + itemsPerPage;
		let visible = data.slice(start, end);
		return visible;
	}

	function initBlogRender(data) {
		const root = document.querySelector(".blog_section");
		if (!root) return;

		const visible = initCountAndSlice(data, page);
		visible.forEach((item) => {
			const article = document.createElement("article");
			article.classList.add("article");

			const wrap = document.createElement("div");
			wrap.classList.add("wrap");

			const h2 = document.createElement("h2");
			h2.classList.add("secondary_heading");
			h2.textContent = item.title;

			const author = document.createElement("p");
			author.textContent = `By: ${item.author}`;

			const date = document.createElement("p");
			date.classList.add("date");

			let dateStyle = new Date(item.published);
			dateStyle = dateStyle.toLocaleString("en-US", { dateStyle: "long" });
			date.textContent = dateStyle;

			const time = document.createElement("time");
			const dateTimeFormat = item.published.slice(0, 10);
			time.dateTime = dateTimeFormat;

			const category = document.createElement("p");
			category.textContent = `Category: ${item.category}`;

			const comments = document.createElement("p");
			comments.textContent = `${item.comment_count} Comments`;

			const readMore = document.createElement("p");
			readMore.classList.add("read_more");

			const link = document.createElement("a");
			link.href = item.slug;
			link.textContent = "Read More →";

			date.append(time);
			readMore.append(link);
			wrap.append(h2, author, date, category, comments, readMore);

			const figure = document.createElement("figure");
			figure.classList.add("figure");

			const image = document.createElement("img");
			image.src = `${url}/${item.featured_image}`;
			image.alt = item.image_alt;

			figure.append(image);
			article.append(wrap, figure);
			root.append(article);
		});
	}

	function initLatestPosts(data) {
		const root = document.querySelector(".latest_posts-container");
		if (!root) return;

		const items = data.slice(3, 6);

		items.forEach((item) => {
			const article = document.createElement("article");
			article.classList.add("latest_post");

			const h4 = document.createElement("h4");

			const link = document.createElement("a");
			link.href = item.slug;
			link.textContent = item.title;

			const figure = document.createElement("figure");
			figure.classList.add("figure");

			const img = document.createElement("img");
			img.src = `${url}/${item.featured_image}`;
			img.alt = item.image_alt;

			figure.append(img);
			h4.append(link);
			article.append(figure, h4);
			root.append(article);
		});
	}

	async function init() {
		const data = await fetchData();
		if (!data) return;

		initLatestPosts(data);

		const categories = initSidebar(data);
		initRenderList(categories, ".list_nav.categories");

		const archive = initArchive(data);
		initRenderList(archive, ".list_nav.archive");

		const loadMore = document.querySelector(".load_more-button");
		const totalPages = Math.ceil(data.length / itemsPerPage);

		if (loadMore) {
			loadMore.hidden = false;
			loadMore.addEventListener("click", () => {
				if (page < totalPages - 1) {
					page++;
					initBlogRender(data);
				}
				if (page === totalPages - 1) {
					loadMore.hidden = true;
				}
			});
		}
		initBlogRender(data);
	}
	init();
}
