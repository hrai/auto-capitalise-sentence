import { enableSentenceMode, disableSentenceMode } from '../src/sentence-mode'
import {
  shouldCapitaliseI,
  shouldCapitaliseNames,
  shouldCapitaliseAcronyms,
  shouldCapitaliseLocations,
  shouldConvertToSentenceCase,
} from '../src/plugin-constants'

import * as utils from '../src/utils.js'
import sinon from 'sinon'

describe('sentence-mode helpers', () => {
  test('enableSentenceMode saves and clears word flags', () => {
    const opts = {
      [shouldCapitaliseI]: true,
      [shouldCapitaliseNames]: true,
      [shouldCapitaliseAcronyms]: false,
      [shouldCapitaliseLocations]: true,
      [shouldConvertToSentenceCase]: false,
    }
    const saved = {
      [shouldCapitaliseI]: false,
      [shouldCapitaliseNames]: false,
      [shouldCapitaliseAcronyms]: false,
      [shouldCapitaliseLocations]: false,
    }

    enableSentenceMode(opts, saved)

    expect(opts[shouldConvertToSentenceCase]).toBe(true)
    expect(opts[shouldCapitaliseI]).toBe(false)
    expect(opts[shouldCapitaliseNames]).toBe(false)
    expect(opts[shouldCapitaliseAcronyms]).toBe(false)
    expect(opts[shouldCapitaliseLocations]).toBe(false)

    // saved should have original values
    expect(saved[shouldCapitaliseI]).toBe(true)
    expect(saved[shouldCapitaliseNames]).toBe(true)
    expect(saved[shouldCapitaliseAcronyms]).toBe(false)
    expect(saved[shouldCapitaliseLocations]).toBe(true)
  })

  test('disableSentenceMode restores saved flags', () => {
    const opts = {
      [shouldCapitaliseI]: false,
      [shouldCapitaliseNames]: false,
      [shouldCapitaliseAcronyms]: false,
      [shouldCapitaliseLocations]: false,
      [shouldConvertToSentenceCase]: true,
    }

    const saved = {
      [shouldCapitaliseI]: true,
      [shouldCapitaliseNames]: false,
      [shouldCapitaliseAcronyms]: true,
      [shouldCapitaliseLocations]: true,
    }

    disableSentenceMode(opts, saved)

    expect(opts[shouldConvertToSentenceCase]).toBe(false)
    expect(opts[shouldCapitaliseI]).toBe(true)
    expect(opts[shouldCapitaliseNames]).toBe(false)
    expect(opts[shouldCapitaliseAcronyms]).toBe(true)
    expect(opts[shouldCapitaliseLocations]).toBe(true)
  })
})

describe('integration: utils -> sentence-mode', () => {
  test('capitaliseText calls I-capitalise helper with content', () => {
    const element = {
      isContentEditable: true,
      tagName: 'div',
      innerHTML: "I'm the content of html tag.",
    }

    const shouldCapitaliseFake = sinon.fake()
    const shouldCapitaliseForIFake = sinon.fake()
    const setTextFake = sinon.fake()

    utils.capitaliseText(
      element,
      shouldCapitaliseFake,
      shouldCapitaliseForIFake,
      utils.getText,
      setTextFake
    )

    expect(shouldCapitaliseForIFake.getCall(0).args[0]).toBe("I'm the content of html tag.")
  })
})