/**
 * Copyright 2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of SCO - Space Climate Observatory.
 *
 * SCO is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SCO is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SCO. If not, see <http://www.gnu.org/licenses/>.
 **/
import { LOCALES_ENUM, LOCALES_ENUM_VALUES } from './LocaleEnum'

// 2 - Parse locale when it is formed like language-country or language_country
const localeSeparators = ['-', '_']

/**
 * Parses both simple ('en' / 'fr' / 'CZ') and complex ('en_US', 'fr-FR') locales into SCO valid language locales.
 * Note: it is exported only for unit tests
 * @param {*} l locale or complex locale to parse
 * @return found locale in parameter or default SCO locale
 */
export default function parseLanguageLocale(l = '') {
  let simpleLocale = l.toLowerCase() // 0 - By default considered as simple locale
  const localeSeparator = localeSeparators.find(separator => l.includes(separator))
  if (localeSeparator) {
    // 1.a - This is a composed locale, split on separator and keep the language part
    const foundParts = l.split(localeSeparator)
    simpleLocale = foundParts[0]
  }
  // 2 - verify that found locale can be used in SCO, return default locale otherwise
  return LOCALES_ENUM_VALUES.includes(simpleLocale) ? simpleLocale : LOCALES_ENUM.en
}
