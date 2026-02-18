/* global PER_PAGE POSTS PIN_ICON */
let currentPage = 0;

/**
 * Adds posts depending on the page number and the amount of posts per page
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

    // Add short description and meta data
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
      $PIN.append($(`<span>${PIN_ICON}</span>`));
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
 * Disables buttons at page limits
 */
function updateButtons() {
  $previous = $('#previous');
  $next = $('#next');

  if (currentPage <= 0) {
    $previous.addClass('disabled');
  } else {
    $previous.removeClass('disabled');
  }

  if ((currentPage + 1) * PER_PAGE >= POSTS.length) {
    $next.addClass('disabled');
  } else {
    $next.removeClass('disabled');
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
  });
  $NEXT.on('click', () => {
    if ((currentPage + 1) * PER_PAGE < POSTS.length) {
      currentPage += 1;
      displayPosts();
    }

    updateButtons();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  postsButtons();
  displayPosts();
});
