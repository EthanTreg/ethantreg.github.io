/* global PER_PAGE POSTS */
let currentPage = 0;

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
 * Displays posts for the current page by slicing the POSTS array.
 * Dynamically generates HTML for each post and appends it to the container.
 */
function displayPosts() {
  const IDXS = [currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE];
  const $CONTAINER = $('#post-list');
  $CONTAINER.empty();

  // Loop through all posts that should be displayed for the page number
  POSTS.slice(IDXS[0], IDXS[1]).forEach((post) => {
    const $ARTICLE = $('<article class="card-wrapper card">');
    const $LINK = $(
      `<a href="${post.url}" class="post-preview row g-0 flex-md-row-reverse">`,
    );
    let card_body_col = 12;

    // Add image if the post has an image
    if (post.image) {
      const $IMAGE = $('<div class="col-md-5"></div>');
      let src = post.image.path ? post.image.path : post.image;
      card_body_col -= 5;

      if (src.includes('//')) {
        src = `${post.img_path}/${src}`.replace('//', '/');
      }

      $IMAGE.append(
        $(
          `<img src="${src}" alt="${post.image.alt} lqip="${post.image.lqip}">`,
        ),
      );
      $LINK.append($IMAGE);
    }

    const $BODY_COLUMN = $(`<div class="col-md-${card_body_col}">`);
    const $BODY = $('<div class="card-body d-flex flex-column">');
    const $PARA = $('<p>');
    const $META = $(
      '<div class="post-meta flex-grow-1 d-flex align-items-end">',
    );
    const $META_DATA = $('<div class="me-auto">');

    // Add short description and metadata
    $BODY.append($(`<h1 class="card-title my-2 mt-md-0">${post.title}</h1>`));
    $PARA.append(post.content);
    $BODY.append($('<div class="card-text content mt-0 mb-3">').append($PARA));
    $META_DATA.append($('<i class="far fa-calendar fa-fw me-1">'));
    $META_DATA.append(post.date);

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

      $META_DATA.append($('<i class="far fa-folder-open fa-fw me-1">'));
      $META_DATA.append($SPAN);
    }

    $META.append($META_DATA);

    // If post is pinned
    if (post.pin) {
      const $PIN = $('<div class="pin ms-1">');
      $PIN.append($('<i class="fas fa-thumbtack fa-fw">'));
      $META.append($PIN);
    }

    $BODY.append($META);
    $BODY_COLUMN.append($BODY);
    $LINK.append($BODY_COLUMN);
    $ARTICLE.append($LINK);
    $CONTAINER.append($ARTICLE);
  });
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
