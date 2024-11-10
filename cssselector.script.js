(function () {
  let listener = null;

  function buildSelectorPath(elem) {
    const path = [];

    while (elem && elem.nodeType === Node.ELEMENT_NODE) {
      const id = elem.id ? `#${CSS.escape(elem.id)}` : "";
      const classes = elem.className
        ? `#${Array.from(elem.classList).map(CSS.escape).join(".")}`
        : "";
      const tagName = elem.tagName.toLowerCase();

      let selector = tagName;

      if (id) {
        selector += id;
      }
      if (classes) {
        selector += classes;
      }
      if (!id) {
        const siblings = Array.from(elem.parentNode.children).filter(
          (sibling) => sibling.tagName.toLowerCase() === tagName
        );
        if (siblings.length > 1) {
          const idx = siblings.indexOf(elem) + 1;
          selector += `:nth-child(${idx})`;
        }
      }

      path.unshift(selector);
      elem = elem.parentNode;
    }

    return path.join(" > ");
  }

  function generateCSSSelectors() {
    if (listener) {
      console.warn(`CSS selector generation is already active`);
      return;
    }

    listener = (event) => {
      event.preventDefault();
      event.stopPropagation();

      const elem = event.target;
      const selectorPath = buildSelectorPath(elem);

      console.log({ elem, selectorPath });
    };

    document.addEventListener("mouseover", listener, true);
    console.info("CSS Selector Genration started");
  }

  function stopCSSSelectorGeneration() {
    if (!listener) {
      console.warn(`CSS selector generation is already active`);
      return;
    }

    document.removeEventListener("mouseover", listener, true);
    listener = null;
    console.info("CSS Selector Generation stopped");
  }

  window.customCSSSelectorGeneration = window.customCSSSelectorGeneration || {
    generateCSSSelectors,
    stopCSSSelectorGeneration,
  };
})();
