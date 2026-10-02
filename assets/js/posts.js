/* global PER_PAGE AUTHORS POSTS */
let currentPage = 0;
const MAIN_NAME = 'Ethan Tregidga';

/**
 * Calculates the total number of pages based on the number of posts and posts per page.
 * @returns {number} Total number of pages.
 */
function totalPages() {
  return Math.max(1, Math.ceil(POSTS.length / PER_PAGE));
}

/**
 * Renders the page number buttons dynamically and updates their state.
 * Adds click handlers to each button to navigate to the corresponding page.
 */
function renderPageNumbers() {
  const $PAGINATION = $('#pagination');

  // Remove any previously injected page number <li>s
  $PAGINATION.find('.page-number').remove();
  const PAGES = totalPages();

  for (let i = 0; i < PAGES; i += 1) {
    const PAGE = i + 1;

    const $LI = $('<li class="page-item page-number">');
    const $BTN = $(
      `<button type="button" class="page-link" aria-label="page-${PAGE}">${PAGE}</button>`,
    );

    if (i === currentPage) {
      $LI.addClass('active');
    }

    $BTN.on('click', () => {
      currentPage = i;
      displayPosts();
      updateButtons();
      renderPageNumbers();
    });

    $LI.append($BTN);

    // Insert before the "next" button
    $('#next').before($LI);
  }
}

/**
 * Formats the author names for display, highlighting the main author's name and
 * handling cases with multiple authors.
 *
 * @param authors {Array} An array of author IDs.
 * @returns {*|jQuery|HTMLElement} A jQuery object containing the formatted
 *   author names.
 */
function formatAuthorNames(authors) {
  const MAX_AUTHORS = 3;
  const authorNames = authors.map(id => AUTHORS[id]?.name ?? id)
  const $authors = $('<p>');

  authorNames.slice(0, MAX_AUTHORS).forEach((name, i) => {
    if (i > 0) {
      $authors.append(', ');
    }

    if (name === MAIN_NAME) {
      $authors.append($('<strong>').text(name));
    } else {
      $authors.append(name);
    }
  });

  if (authorNames.length > MAX_AUTHORS) {
    $authors.append(', ');

    if (authorNames.slice(0, MAX_AUTHORS).includes(MAIN_NAME)) {
      $authors.append('et al.');
    } else {
      $authors.append($('<strong>').text('et al.'));
    }
  }
  return $authors
}

/**
 * Displays posts for the current page by slicing the POSTS array.
 * Dynamically generates HTML for each post and appends it to the container.
 */
function displayPosts() {
  const IDXS = [currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE];
  const $CONTAINER = $('#post-list');
  $CONTAINER.empty();
  POSTS.sort((a, b) => {
    if (a.pin === b.pin) {
      return new Date(b.date) - new Date(a.date);
    }
    return a.pin ? -1 : 1;
  });

  // Loop through all posts that should be displayed for the page number
  POSTS.slice(IDXS[0], IDXS[1]).forEach((post) => {
    const DATE = new Date(post.date);
    const $article = $('<article class="card-wrapper card">');
    const $link = $(
      `<a href="${post.url}" class="post-preview row g-0 flex-md-row-reverse">`,
    );
    let card_body_col = 12;

    // Add image if the post has an image
    if (post.image) {
      const $image = $('<div class="col-md-5"></div>');
      let src = post.image.path ? post.image.path : post.image;
      card_body_col -= 5;

      if (src.includes('//')) {
        src = `${post.img_path}/${src}`.replace('//', '/');
      }

      $image.append(
        $(
          `<img src="${src}" alt="${post.image.alt} lqip="${post.image.lqip}">`,
        ),
      );
      $link.append($image);
    }

    const $bodyColumn = $(`<div class="col-md-${card_body_col}">`);
    const $body = $('<div class="card-body d-flex flex-column">');
    const $authors = formatAuthorNames(post.authors);
    const $para = $('<p>');
    const $meta = $(
      '<div class="post-meta flex-grow-1 d-flex align-items-end">',
    );
    const $metaData = $('<div class="me-auto">');

    // Add short description and metadata
    $body.append($(`<h1 class="card-title my-2 mt-md-0">${post.title}</h1>`));
    $authors.addClass('text-muted small mb-2');
    $body.append($authors);
    $para.append(post.content.replace(/^#{1,6}\s+.+$/gm, '').trim());
    $body.append($('<div class="card-text content mt-0 mb-3">').append($para));
    $metaData.append($('<i class="far fa-calendar fa-fw me-1">'));
    $metaData.append(DATE.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }));

    // Display post categories
    if (post.categories.length > 0) {
      const $SPAN = $('<span class="categories">');

      post.categories.forEach((category, i) => {
        if (i === post.categories.length - 1) {
          $SPAN.append(category);
        } else {
          $SPAN.append(category + ',');
        }
      });

      $metaData.append($('<i class="far fa-folder-open fa-fw me-1">'));
      $metaData.append($SPAN);
    }

    $meta.append($metaData);

    // If post is pinned
    if (post.pin) {
      const $PIN = $('<div class="pin ms-1">');
      $PIN.append($('<i class="fas fa-thumbtack fa-fw">'));
      $meta.append($PIN);
    }

    $body.append($meta);
    $bodyColumn.append($body);
    $link.append($bodyColumn);
    $article.append($link);
    $CONTAINER.append($article);
  });

  if (window.MathJax?.startup?.promise) {
    MathJax.startup.promise
      .then(() => MathJax.typesetPromise([
        document.getElementById('post-list')
      ]))
      .catch((err) => {
        console.error('MathJax typeset error:', err);
      });
  }
}

/**
 * Disables buttons at the page limits.
 */
function updateButtons() {
  const $PREVIOUS = $('#previous');
  const $NEXT = $('#next');

  if (currentPage <= 0) {
    $PREVIOUS.addClass('disabled');
  } else {
    $PREVIOUS.removeClass('disabled');
  }

  if (currentPage + 1 >= totalPages()) {
    $NEXT.addClass('disabled');
  } else {
    $NEXT.removeClass('disabled');
  }
}

/**
 * Enables buttons to change pages
 */
function postsButtons() {
  const $PREVIOUS = $('#previous-btn');
  const $NEXT = $('#next-btn');

  $PREVIOUS.on('click', () => {
    if (currentPage > 0) {
      currentPage -= 1;
      displayPosts();
    }

    updateButtons();
    renderPageNumbers();
  });
  $NEXT.on('click', () => {
    if (currentPage + 1 < totalPages()) {
      currentPage += 1;
      displayPosts();
    }

    updateButtons();
    renderPageNumbers();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  postsButtons();
  displayPosts();
  updateButtons();
  renderPageNumbers();
});
