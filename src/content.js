/*
** citadelle-du-web.com
** arnaud.lubert@epitech.eu
** 02/19/2021
*/
let timeout;
let tries = 0;

// swap main video with related contents layout
function reverseYoutube() {
  const sec = document.getElementById('secondary');

  if (window.location.search !== '') {
    if (sec) {
      const related = document.getElementById('related');

      if (!related || related.childElementCount < 1 ||  related.children[1].childElementCount < 1) {
        if (tries < 3) {
          tries++;
          timeout = window.setTimeout(reverseYoutube, tries * 500);
        }
      } else {
        document.getElementById('related').children[1].children[1].addEventListener('DOMNodeInserted', relatedLoaded);
        sec.parentNode.insertBefore(sec, sec.parentNode.firstElementChild);
        sec.style.paddingRight = 0;
        sec.style.paddingLeft = 'var(--ytd-margin-6x)';
      }
    } else if (tries < 3) {
      tries++;
      timeout = window.setTimeout(reverseYoutube, tries * 500);
    }
  }
}

// wait for loading to end
function relatedLoaded() {
  if (timeout)
    clearTimeout(timeout);
  timeout = window.setTimeout(reverseRelated, 200);
}

// swap related pictures with titles
function reverseRelated() {
  const related = document.getElementById('related').children[1].children[1];

  if (related.childElementCount < 2 ||  related.children[0].childElementCount < 1 || related.children[2].childElementCount < 2)
    return;
  const mostRelated = related.children[0].children[1].children[0].children[0];
  const allRelated = related.children[2].children[2].children;

  if (mostRelated.firstElementChild.nodeName === 'YTD-THUMBNAIL')
    mostRelated.insertBefore(mostRelated.children[1], mostRelated.firstElementChild);

  for (let elem of allRelated)
    if (elem && elem.childElementCount !== 0 && elem.children[0].childElementCount > 0
    && elem.children[0].firstElementChild.nodeName === 'YTD-THUMBNAIL') {
      elem.children[0].firstElementChild.style.margingRight = 0;
      elem.children[0].insertBefore(elem.children[0].children[1], elem.children[0].firstElementChild);
    }
}

// execute the extension if enabled
chrome.storage.local.get('Reverse Youtube enabled', function (result) {
  if (result['Reverse Youtube enabled'] !== false)
    reverseYoutube();
});
