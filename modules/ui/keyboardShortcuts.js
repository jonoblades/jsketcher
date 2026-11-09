const modifierProperties = {
  alt: 'altKey',
  control: 'ctrlKey',
  ctrl: 'ctrlKey',
  meta: 'metaKey',
  shift: 'shiftKey'
};

function parseShortcut(shortcut) {
  const parts = shortcut.toLowerCase().split('+');
  const keyName = parts.pop();
  const modifiers = new Set(parts);
  for (const modifier of modifiers) {
    if (!modifierProperties[modifier]) {
      throw new Error(`Unsupported keyboard shortcut modifier: ${modifier}`);
    }
  }
  if (!keyName) {
    throw new Error(`Keyboard shortcut has no key: ${shortcut}`);
  }
  return {
    key: keyName === 'esc' ? 'escape' : keyName === 'space' ? ' ' : keyName,
    modifiers
  };
}

function matchesBinding(binding, event) {
  const keyMatches = binding.key.length === 1 && /^\d$/.test(binding.key)
    ? event.code === `Digit${binding.key}` || event.key.toLowerCase() === binding.key
    : event.key.toLowerCase() === binding.key;
  if (!keyMatches) {
    return false;
  }

  for (const [modifier, property] of Object.entries(modifierProperties)) {
    if (binding.modifiers.has(modifier) !== event[property]) {
      if (modifier === 'control' && binding.modifiers.has('ctrl')) {
        continue;
      }
      if (modifier === 'ctrl' && binding.modifiers.has('control')) {
        continue;
      }
      return false;
    }
  }
  return true;
}

export function matchesShortcut(shortcut, event) {
  return matchesBinding(parseShortcut(shortcut), event);
}

export function bindShortcut(shortcut, callback, target = document) {
  const binding = parseShortcut(shortcut);
  const listener = event => {
    const activeElement = event.target instanceof Element ? event.target : null;
    const isEditingText = activeElement && (
      activeElement.isContentEditable || activeElement.closest('input, textarea, select, [contenteditable="true"]')
    );
    if (isEditingText && binding.modifiers.size === 0) {
      return;
    }
    if (matchesBinding(binding, event)) {
      callback(event);
    }
  };

  target.addEventListener('keydown', listener);
  return () => target.removeEventListener('keydown', listener);
}
