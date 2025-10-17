/**
 * @jest-environment jsdom
 */

import {
  parseHTML,
  getHTML,
  setHTML,
  querySelector,
  querySelectorAll,
  findElements,
  findAndAddBack,
  on,
  off,
  val,
  prop,
  delegate,
  inArray,
  removeFromHTML,
} from '../src/lib/dom-utils.js';

describe('dom-utils', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('parseHTML', () => {
    it('should parse HTML string into DOM nodes', () => {
      const html = '<div>Test</div><span>Content</span>';
      const nodes = parseHTML(html);

      expect(nodes).toHaveLength(2);
      expect(nodes[0].tagName).toBe('DIV');
      expect(nodes[0].textContent).toBe('Test');
      expect(nodes[1].tagName).toBe('SPAN');
      expect(nodes[1].textContent).toBe('Content');
    });

    it('should handle empty string', () => {
      const nodes = parseHTML('');
      expect(nodes).toHaveLength(0);
    });

    it('should trim whitespace', () => {
      const nodes = parseHTML('  <p>Test</p>  ');
      expect(nodes).toHaveLength(1);
      expect(nodes[0].tagName).toBe('P');
    });
  });

  describe('getHTML', () => {
    it('should get innerHTML of element', () => {
      const div = document.createElement('div');
      div.innerHTML = '<span>Test</span>';

      expect(getHTML(div)).toBe('<span>Test</span>');
    });

    it('should return empty string for null', () => {
      expect(getHTML(null)).toBe('');
    });

    it('should return empty string for undefined', () => {
      expect(getHTML(undefined)).toBe('');
    });
  });

  describe('setHTML', () => {
    it('should set innerHTML of element', () => {
      const div = document.createElement('div');
      setHTML(div, '<span>New Content</span>');

      expect(div.innerHTML).toBe('<span>New Content</span>');
    });

    it('should handle null element gracefully', () => {
      expect(() => setHTML(null, 'test')).not.toThrow();
    });
  });

  describe('querySelector', () => {
    it('should find element by selector', () => {
      document.body.innerHTML = '<div id="test">Content</div>';
      const el = querySelector('#test');

      expect(el).not.toBeNull();
      expect(el.textContent).toBe('Content');
    });

    it('should return null if not found', () => {
      const el = querySelector('#nonexistent');
      expect(el).toBeNull();
    });

    it('should search within context', () => {
      document.body.innerHTML =
        '<div id="container"><span class="item">Test</span></div>';
      const container = querySelector('#container');
      const item = querySelector('.item', container);

      expect(item.textContent).toBe('Test');
    });
  });

  describe('querySelectorAll', () => {
    it('should find all matching elements', () => {
      document.body.innerHTML =
        '<div class="item">1</div><div class="item">2</div>';
      const items = querySelectorAll('.item');

      expect(items).toHaveLength(2);
      expect(items[0].textContent).toBe('1');
      expect(items[1].textContent).toBe('2');
    });

    it('should return empty array if none found', () => {
      const items = querySelectorAll('.nonexistent');
      expect(items).toHaveLength(0);
    });

    it('should return array not NodeList', () => {
      document.body.innerHTML = '<div class="item">Test</div>';
      const items = querySelectorAll('.item');

      expect(Array.isArray(items)).toBe(true);
    });
  });

  describe('findElements', () => {
    it('should find descendant elements', () => {
      const div = document.createElement('div');
      div.innerHTML = '<span class="test">1</span><span class="test">2</span>';

      const found = findElements(div, '.test');
      expect(found).toHaveLength(2);
    });

    it('should return empty array for null element', () => {
      const found = findElements(null, '.test');
      expect(found).toHaveLength(0);
    });
  });

  describe('findAndAddBack', () => {
    it('should find elements and include matching nodes', () => {
      const div1 = document.createElement('div');
      div1.className = 'target';
      const div2 = document.createElement('div');
      div2.innerHTML = '<span class="target">Child</span>';

      const nodeList = [div1, div2];
      const found = findAndAddBack(nodeList, '.target');

      expect(found).toHaveLength(2); // div1 itself + span child
    });

    it('should handle NodeList input', () => {
      document.body.innerHTML =
        '<div class="parent"><span class="child"></span></div>';
      const parents = document.querySelectorAll('.parent');
      const found = findAndAddBack(parents, '.child');

      expect(found).toHaveLength(1);
    });
  });

  describe('on', () => {
    it('should add event listener to single element', () => {
      const button = document.createElement('button');
      const handler = jest.fn();

      on(button, 'click', handler);
      button.click();

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should add event listener to multiple elements', () => {
      const btn1 = document.createElement('button');
      const btn2 = document.createElement('button');
      const handler = jest.fn();

      on([btn1, btn2], 'click', handler);
      btn1.click();
      btn2.click();

      expect(handler).toHaveBeenCalledTimes(2);
    });

    it('should handle NodeList', () => {
      document.body.innerHTML =
        '<button class="btn">1</button><button class="btn">2</button>';
      const buttons = document.querySelectorAll('.btn');
      const handler = jest.fn();

      on(buttons, 'click', handler);
      buttons[0].click();

      expect(handler).toHaveBeenCalled();
    });
  });

  describe('off', () => {
    it('should remove event listener', () => {
      const button = document.createElement('button');
      const handler = jest.fn();

      on(button, 'click', handler);
      button.click();
      expect(handler).toHaveBeenCalledTimes(1);

      off(button, 'click', handler);
      button.click();
      expect(handler).toHaveBeenCalledTimes(1); // Not called again
    });
  });

  describe('val', () => {
    it('should get input value', () => {
      const input = document.createElement('input');
      input.value = 'test value';

      expect(val(input)).toBe('test value');
    });

    it('should set input value', () => {
      const input = document.createElement('input');
      val(input, 'new value');

      expect(input.value).toBe('new value');
    });

    it('should return empty string for null element when getting', () => {
      expect(val(null)).toBe('');
    });

    it('should return element when setting', () => {
      const input = document.createElement('input');
      const result = val(input, 'test');

      expect(result).toBe(input);
    });
  });

  describe('prop', () => {
    it('should get property value', () => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = true;

      expect(prop(checkbox, 'checked')).toBe(true);
    });

    it('should set property value', () => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';

      prop(checkbox, 'checked', true);
      expect(checkbox.checked).toBe(true);
    });

    it('should return element when setting', () => {
      const el = document.createElement('div');
      const result = prop(el, 'className', 'test');

      expect(result).toBe(el);
    });
  });

  describe('delegate', () => {
    it('should delegate event to matching selector', () => {
      document.body.innerHTML =
        '<div id="container"><button id="btn">Click</button></div>';
      const handler = jest.fn();

      delegate(document, 'click', '#btn', handler);

      const button = document.getElementById('btn');
      button.click();

      expect(handler).toHaveBeenCalled();
    });

    it('should not trigger for non-matching elements', () => {
      document.body.innerHTML = '<div><button id="other">Other</button></div>';
      const handler = jest.fn();

      delegate(document, 'click', '#target', handler);

      document.getElementById('other').click();
      expect(handler).not.toHaveBeenCalled();
    });

    it('should bind this to target element', () => {
      document.body.innerHTML = '<button id="test">Test</button>';
      let capturedThis;

      delegate(document, 'click', '#test', function () {
        capturedThis = this;
      });

      document.getElementById('test').click();
      expect(capturedThis).toBe(document.getElementById('test'));
    });
  });

  describe('inArray', () => {
    it('should return index of item in array', () => {
      const arr = ['a', 'b', 'c'];
      expect(inArray('b', arr)).toBe(1);
    });

    it('should return -1 if not found', () => {
      const arr = ['a', 'b', 'c'];
      expect(inArray('d', arr)).toBe(-1);
    });

    it('should work with objects', () => {
      const obj = { id: 1 };
      const arr = [obj];
      expect(inArray(obj, arr)).toBe(0);
    });
  });

  describe('removeFromHTML', () => {
    it('should remove matching elements from HTML nodes', () => {
      const div = document.createElement('div');
      div.innerHTML =
        '<span class="remove">Remove</span><span class="keep">Keep</span>';
      const nodes = [div];

      removeFromHTML(nodes, '.remove');

      expect(div.querySelector('.remove')).toBeNull();
      expect(div.querySelector('.keep')).not.toBeNull();
    });

    it('should handle multiple nodes', () => {
      const div1 = document.createElement('div');
      div1.innerHTML = '<span class="remove">1</span>';
      const div2 = document.createElement('div');
      div2.innerHTML = '<span class="remove">2</span>';

      removeFromHTML([div1, div2], '.remove');

      expect(div1.querySelector('.remove')).toBeNull();
      expect(div2.querySelector('.remove')).toBeNull();
    });
  });
});
