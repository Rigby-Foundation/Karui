// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';

import { createDomTools } from '../../src/browser/dom.js';
import { LinkManager } from '../../src/browser/link.js';

describe('LinkManager', () => {
  it('resolves action and command from query', () => {
    const dom = createDomTools(document);
    const link = new LinkManager(dom);
    const action = vi.fn();
    const command = vi.fn();

    link.actions.home = action;
    link.commands.cmd = command;

    history.replaceState(null, '', '?home=1&cmd=on');
    link.get();

    expect(action).toHaveBeenCalledWith('1');
    expect(command).toHaveBeenCalledWith('on');
  });


});
