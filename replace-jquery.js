#!/usr/bin/env node
// Script to replace remaining jQuery calls in settings.js with vanilla JS

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/settings.js');
let content = fs.readFileSync(filePath, 'utf8');

// Replacements - order matters!
const replacements = [
  // $(sel).prop('checked', false).prop('disabled', true) -> chained
  [
    /\$\((\w+)\)\.prop\('checked',\s*false\)\.prop\('disabled',\s*true\)/g,
    "(prop(querySelector($1), 'checked', false), prop(querySelector($1), 'disabled', true))",
  ],
  [
    /\$\(sel\)\.prop\('checked',\s*false\)\.prop\('disabled',\s*true\)/g,
    "(prop(querySelector(sel), 'checked', false), prop(querySelector(sel), 'disabled', true))",
  ],

  // $(sel).prop('disabled', false)
  [
    /\$\(sel\)\.prop\('disabled',\s*false\)/g,
    "prop(querySelector(sel), 'disabled', false)",
  ],

  // $('#' + var).prop -> prop(querySelector('#' + var), ...)
  [
    /\$\('#'\s*\+\s*(\w+)\)\.prop\('checked',\s*(\w+)\)/g,
    "prop(querySelector('#' + $1), 'checked', $2)",
  ],
  [
    /\$\('#'\s*\+\s*(\w+)\)\.prop\('checked'\)/g,
    "prop(querySelector('#' + $1), 'checked')",
  ],

  // $('#id').prop('checked', value) -> prop(querySelector('#id'), 'checked', value)
  [
    /\$\('#([^']+)'\)\.prop\('checked',\s*(\w+)\)/g,
    "prop(querySelector('#$1'), 'checked', $2)",
  ],
  [
    /\$\(`#\$\{([^}]+)\}`\)\.prop\('checked',\s*(\w+)\)/g,
    "prop(querySelector(`#${$1}`), 'checked', $2)",
  ],

  // $('#id').prop('checked') -> prop(querySelector('#id'), 'checked')
  [
    /\$\('#([^']+)'\)\.prop\('checked'\)/g,
    "prop(querySelector('#$1'), 'checked')",
  ],
  [
    /\$\(`#\$\{([^}]+)\}`\)\.prop\('checked'\)/g,
    "prop(querySelector(`#${$1}`), 'checked')",
  ],

  // $('#id').prop('disabled', value) -> prop(querySelector('#id'), 'disabled', value)
  [
    /\$\('#([^']+)'\)\.prop\('disabled',\s*(\w+)\)/g,
    "prop(querySelector('#$1'), 'disabled', $2)",
  ],

  // $('#id').val() -> val(querySelector('#id'))
  [/\$\('#([^']+)'\)\.val\(\)/g, "val(querySelector('#$1'))"],

  // $('#id').addClass -> querySelector('#id').classList.add
  [
    /\$\('#([^']+)'\)\.addClass\('([^']+)'\)/g,
    "querySelector('#$1').classList.add('$2')",
  ],

  // $('#id').removeClass -> querySelector('#id').classList.remove
  [
    /\$\('#([^']+)'\)\.removeClass\('([^']+)'\)/g,
    "querySelector('#$1').classList.remove('$2')",
  ],

  // $('#id').on -> on(querySelector('#id')
  [/\$\('#([^']+)'\)\.on\(/g, "on(querySelector('#$1'), "],

  // const $var = $('#id') -> const var = querySelector('#id')
  [
    /const\s+\$(\w+)\s*=\s*\$\('#([^']+)'\)/g,
    "const $1 = querySelector('#$2')",
  ],
  [
    /const\s+\$(\w+)\s*=\s*\$\(`#\$\{([^}]+)\}`\)/g,
    'const $1 = querySelector(`#${$2}`)',
  ],

  // $(var) selector assignments
  [/const\s+(\w+)\s*=\s*\$\('#([^']+)'\)/g, "const $1 = querySelector('#$2')"],

  // $(id).prop where id is a variable
  [
    /\$\(id\)\.prop\('checked',\s*(\w+)\)/g,
    "prop(querySelector(id), 'checked', $1)",
  ],

  // $btn.attr -> btn.getAttribute
  [/\$btn\.attr\('([^']+)'\)/g, "btn.getAttribute('$1')"],
  [/\$btn\.attr\('([^']+)',\s*'([^']+)'\)/g, "btn.setAttribute('$1', '$2')"],

  // $btn.text -> btn.textContent
  [/\$btn\.text\('([^']+)'\)/g, "btn.textContent = '$1'"],

  // $el.prop -> prop(el, ...)
  [/\$el\.prop\('checked',\s*(\w+)\)/g, "prop(el, 'checked', $1)"],
  [/\$el\.prop\('checked'\)/g, "prop(el, 'checked')"],

  // $sentence.prop -> prop(sentence, ...)
  [/\$sentence\.prop\('checked',\s*(\w+)\)/g, "prop(sentence, 'checked', $1)"],
  [/\$sentence\.prop\('checked'\)/g, "prop(sentence, 'checked')"],

  // $master.prop -> prop(master, ...)
  [/\$master\.prop\('checked',\s*(\w+)\)/g, "prop(master, 'checked', $1)"],
  [/\$master\.prop\('checked'\)/g, "prop(master, 'checked')"],
  [/\$master\.prop\('disabled',\s*(\w+)\)/g, "prop(master, 'disabled', $1)"],

  // $wrapper / $sentence / $word jQuery vars (just assignment)
  [
    /const\s+wrapper\s*=\s*\$\('#modeSectionsWrapper'\)/g,
    "const wrapper = querySelector('#modeSectionsWrapper')",
  ],
  [
    /const\s+sentence\s*=\s*\$\('#sentenceModeSection'\)/g,
    "const sentence = querySelector('#sentenceModeSection')",
  ],
  [
    /const\s+word\s*=\s*\$\('#wordModeSection'\)/g,
    "const word = querySelector('#wordModeSection')",
  ],

  // $(document).on delegate patterns (one more pass for any missed)
  [
    /\$\(document\)\.on\('([^']+)',\s*`#\$\{([^}]+)\}`,\s*function/g,
    "delegate(document, '$1', `#${$2}`, function",
  ],
];

replacements.forEach(([pattern, replacement]) => {
  const before = content.length;
  content = content.replace(pattern, replacement);
  const after = content.length;
  if (before !== after) {
    console.log(`Applied: ${pattern}`);
  }
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('\njQuery replacements completed!');
