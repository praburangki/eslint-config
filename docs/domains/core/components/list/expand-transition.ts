interface HTMLExpandElement extends HTMLElement {
  _initialStyle?: {
    height?: null | string;
    overflow: string;
    transition: string;
    width?: null | string;
  };
  _parent?: (Node & ParentNode & HTMLElement) | null;
}

export const expandTransitionFunctions = {
  onAfterEnter: resetStyles,

  onAfterLeave,

  onBeforeEnter(el: HTMLExpandElement) {
    el._parent = el.parentNode as (Node & ParentNode & HTMLElement) | null;
    el._initialStyle = {
      height: el.style.height,
      overflow: el.style.overflow,
      transition: el.style.transition,
    };
  },
  onEnter(el: HTMLExpandElement) {
    const initialStyle = el._initialStyle!;

    el.style.setProperty('transition', 'none', 'important');
    // Hide overflow to account for collapsed margins in the calculated height
    el.style.overflow = 'hidden';
    const offset = `${el.offsetHeight}px`;

    el.style.height = '0';

    // eslint-disable-next-line no-void
    void el.offsetHeight; // force reflow

    el.style.transition = initialStyle.transition;

    if (el._parent) {
      el._parent.classList.add('expand-transition');
    }

    requestAnimationFrame(() => {
      el.style.height = offset;
    });
  },

  onEnterCancelled: resetStyles,

  onLeave(el: HTMLExpandElement) {
    el._initialStyle = {
      height: el.style.height,
      overflow: el.style.overflow,
      transition: '',
    };

    el.style.overflow = 'hidden';
    el.style.height = `${el.offsetHeight}px`;
    // eslint-disable-next-line no-void
    void el.offsetHeight; // force reflow

    requestAnimationFrame(() => {
      el.style.height = '0';
    });
  },
  onLeaveCancelled: onAfterLeave,
};

function onAfterLeave(el: HTMLExpandElement) {
  if (el._parent) {
    el._parent.classList.remove('expand-transition');
  }
  resetStyles(el);
}

function resetStyles(el: HTMLExpandElement) {
  const size = el._initialStyle!.height;
  el.style.overflow = el._initialStyle!.overflow;
  if (size != null) {
    el.style.height = size;
  };
  delete el._initialStyle;
}
