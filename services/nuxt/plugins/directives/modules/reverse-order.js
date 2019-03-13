const options = {
  bind(el) {
    el.style.zIndex = 0;
    Array.from(el.children).forEach(
      (c, i) => (c.style.zIndex = el.children.length - i)
    );
  }
};

export default ["reverse-order", options];
