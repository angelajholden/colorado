export default function initBlogContent() {
	async function fetchData() {
		try {
			const response = await fetch("../data/blogs.json");
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("There was a problem with the fetch: ", error);
		}
	}

	async function initBlogRender() {
		const data = await fetchData();
		if (!data) return;

		const root = document.querySelector(".blog_section");
		if (!root) return;

		/**
		 * <article class="article">
			<div class="content_wrap">
				<h2 class="secondary_heading">This is the title</h2>
				<p class="author">Admin</p>
				<p class="date"><time datetime="2026-05-12">May 12, 2026</time></p>
				<p class="categories">Places</p>
				<p class="comment_count">10 Comments</p>
				<p class="read_more"><a href="">Read more</a></p>
			</div>
			<figure class="figure">
				<img src="../images/optimized/boys-in-bristol-photography-uOeXhx5JV04-unsplash.jpg" alt="placeholder text">
			</figure>
		</article>
		 */

		data.forEach((item) => {
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
			date.textContent = item.published;
			const time = document.createElement("time");
			time.dateTime = item.published;
			date.append(time);

			const category = document.createElement("p");
			category.textContent = `Category: ${item.category}`;

			const comments = document.createElement("p");
			comments.textContent = `${item.comment_count} Comments`;

			const readMore = document.createElement("p");
			readMore.classList.add("read_more");
			const link = document.createElement("a");
			link.href = item.slug;
			link.textContent = "Read More →";
			readMore.append(link);

			wrap.append(h2, author, date, category, comments, readMore);

			const figure = document.createElement("figure");
			figure.classList.add("figure");
			const image = document.createElement("img");
			image.src = `${window.location.origin}/${item.featured_image}`;
			image.alt = item.image_alt;
			figure.append(image);

			article.append(wrap, figure);
			root.append(article);
		});
	}
	initBlogRender();
}
