/*
** citadelle-du-web.com
** arnaud.lubert@epitech.eu
** 02/19/2021
*/

function reverseYoutube() {
  const sec = document.getElementById('secondary');

  if (sec) {
    sec.parentNode.insertBefore(sec, sec.parentNode.firstElementChild);
    sec.style.paddingRight = 0;
    sec.style.paddingLeft = 'var(--ytd-margin-6x)';
    window.setTimeout(reverseSimilar, 1000);
  }
}

function reverseSimilar() {
  const related = document.getElementById('related').children[1].children[1];
  const mostRelated = related.children[0].children[1].children[0].children[0];
  const allRelated = related.children[2].children[2].children;

  mostRelated.insertBefore(mostRelated.children[1], mostRelated.firstElementChild);

  for (let elem of allRelated)
    if (elem && elem.children[0] && elem.children[0].children[1]) {
      elem.children[0].firstElementChild.style.margingRight = 0;
      elem.children[0].insertBefore(elem.children[0].children[1], elem.children[0].firstElementChild);
    }
}

chrome.storage.local.get('Reverse Youtube enabled', function (result) {
  if (result['Reverse Youtube enabled'] !== false)
    window.setTimeout(reverseYoutube, 2000);
});
