'use client'

import { useRef, useState, useCallback, useEffect, useMemo } from 'react'

export interface DarkComboboxOption {
  value: string
  label: string
}

interface DarkComboboxProps {
  options: DarkComboboxOption[]
  value: string
  onChange: (value: string) => void
  placeholder: string
  disabled?: boolean
  id?: string
}

/** Normalize query for alias lookup: lowercase, trim, remove dots */
function normalizeAliasKey(s: string): string {
  return s.trim().toLowerCase().replace(/\./g, '')
}

/** Alias map: normalized key -> array of possible target labels (in preference order) */
const COUNTRY_ALIASES: Record<string, string[]> = {
  uk: ['United Kingdom'],
  'u.k.': ['United Kingdom'],
  gb: ['United Kingdom'],
  gbr: ['United Kingdom'],
  britain: ['United Kingdom'],
  'great britain': ['United Kingdom'],
  england: ['United Kingdom'],

  us: ['United States'],
  'u.s.': ['United States'],
  usa: ['United States'],
  america: ['United States'],
  'united states of america': ['United States'],

  uae: ['United Arab Emirates'],
  'u.a.e.': ['United Arab Emirates'],
  emirates: ['United Arab Emirates'],

  ksa: ['Saudi Arabia'],
  'k.s.a.': ['Saudi Arabia'],
  saudi: ['Saudi Arabia'],

  drc: ['Democratic Republic of the Congo', 'Congo (Democratic Republic of the)'],
  'd.r.c.': ['Democratic Republic of the Congo', 'Congo (Democratic Republic of the)'],
  'congo drc': ['Democratic Republic of the Congo', 'Congo (Democratic Republic of the)'],
  'dr congo': ['Democratic Republic of the Congo', 'Congo (Democratic Republic of the)'],

  czechia: ['Czech Republic', 'Czechia'],
  'czech republic': ['Czech Republic', 'Czechia'],
}

/** Resolve alias targets to the first matching option in the list */
function resolveAliasTargets(
  targetLabels: string[],
  options: DarkComboboxOption[]
): DarkComboboxOption[] {
  const result: DarkComboboxOption[] = []
  const labelToOption = new Map(options.map((o) => [o.label, o]))
  for (const target of targetLabels) {
    const opt = labelToOption.get(target)
    if (opt && !result.some((o) => o.value === opt.value)) {
      result.push(opt)
    }
  }
  return result
}

function filterOptions(options: DarkComboboxOption[], query: string): DarkComboboxOption[] {
  if (!query.trim()) return options
  const q = query.trim().toLowerCase()

  // a) Normal matches (case-insensitive includes / startsWith)
  const normalMatches = options.filter(
    (opt) =>
      opt.label.toLowerCase().startsWith(q) || opt.label.toLowerCase().includes(q)
  )

  // b) Alias matches: if query matches an alias key, add resolved targets
  const aliasKey = normalizeAliasKey(query)
  const targetLabels = COUNTRY_ALIASES[aliasKey]
  const aliasOptions = targetLabels ? resolveAliasTargets(targetLabels, options) : []

  // c) Deduplicate: alias options first, then normal matches (excluding already added)
  const seen = new Set<string>()
  const result: DarkComboboxOption[] = []
  for (const opt of aliasOptions) {
    if (!seen.has(opt.value)) {
      seen.add(opt.value)
      result.push(opt)
    }
  }
  for (const opt of normalMatches) {
    if (!seen.has(opt.value)) {
      seen.add(opt.value)
      result.push(opt)
    }
  }

  return result
}

export default function DarkCombobox({
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  id,
}: DarkComboboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [countryQuery, setCountryQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listboxRef = useRef<HTMLUListElement>(null)
  const optionRefs = useRef<(HTMLLIElement | null)[]>([])
  const scrollFromKeyboardRef = useRef(false)

  const selectedCountry = value
  const filteredOptions = useMemo(
    () => filterOptions(options, countryQuery),
    [options, countryQuery]
  )
  const hasEmptyOption = true
  const listOptions = hasEmptyOption
    ? [{ value: '', label: placeholder }, ...filteredOptions]
    : filteredOptions
  const showNoResults = countryQuery.trim() && filteredOptions.length === 0

  const listId = id ? `${id}-listbox` : undefined

  const close = useCallback(() => {
    setIsOpen(false)
    setCountryQuery('')
    setHighlightedIndex(0)
  }, [])

  const select = useCallback(
    (opt: DarkComboboxOption) => {
      onChange(opt.value)
      setCountryQuery('')
      setIsOpen(false)
      setHighlightedIndex(0)
      inputRef.current?.blur()
    },
    [onChange]
  )

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [close])

  useEffect(() => {
    if (!isOpen) return
    const idx = value
      ? listOptions.findIndex((o) => o.value === value)
      : 0
    setHighlightedIndex(idx >= 0 ? idx : 0)
  }, [isOpen, value, listOptions])

  useEffect(() => {
    if (!scrollFromKeyboardRef.current) return
    scrollFromKeyboardRef.current = false
    const el = optionRefs.current[highlightedIndex]
    el?.scrollIntoView({ block: 'nearest' })
  }, [highlightedIndex])

  const handleFocus = () => {
    if (disabled) return
    setIsOpen(true)
    setCountryQuery(selectedCountry || '')
  }

  const handleBlur = () => {
    // Delay close to allow click on option to fire
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        close()
      }
    }, 0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryQuery(e.target.value)
    setIsOpen(true)
    setHighlightedIndex(0)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        scrollFromKeyboardRef.current = true
        if (!isOpen) {
          setIsOpen(true)
          setHighlightedIndex(0)
        } else {
          setHighlightedIndex((i) =>
            i < listOptions.length - 1 ? i + 1 : 0
          )
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        scrollFromKeyboardRef.current = true
        if (isOpen) {
          setHighlightedIndex((i) =>
            i > 0 ? i - 1 : listOptions.length - 1
          )
        }
        break
      case 'Enter':
        e.preventDefault()
        if (isOpen) {
          if (showNoResults) {
            // Do nothing when no results
          } else if (listOptions[highlightedIndex]) {
            select(listOptions[highlightedIndex])
          }
        } else {
          setIsOpen(true)
        }
        break
      case 'Escape':
        e.preventDefault()
        close()
        inputRef.current?.blur()
        break
      case 'Tab':
        // Allow Tab to move focus normally - don't prevent
        if (isOpen) close()
        break
    }
  }

  const displayValue = isOpen ? countryQuery : (selectedCountry || '')
  const activeId =
    isOpen && listOptions[highlightedIndex]
      ? id
        ? `${id}-option-${highlightedIndex}`
        : undefined
      : undefined

  return (
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        id={id}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={activeId}
        aria-labelledby={id ? `${id}-label` : undefined}
        disabled={disabled}
        value={displayValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        className="w-full cursor-text border-b border-gray-600 bg-transparent px-0 py-3 pr-6 text-base text-white placeholder-gray-500 focus:border-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
      <span
        className={`pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        aria-hidden
      >
        ▾
      </span>
      {isOpen && (
        <ul
          ref={listboxRef}
          id={listId}
          role="listbox"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-white/10 bg-zinc-900 py-1 shadow-xl shadow-black/30"
          aria-labelledby={id}
          onMouseDown={(e) => e.preventDefault()}
        >
          {showNoResults ? (
            <li
              role="option"
              aria-disabled
              className="px-4 py-2.5 text-sm text-gray-500"
            >
              No results
            </li>
          ) : (
            listOptions.map((opt, i) => (
              <li
                key={opt.value || '__empty__'}
                ref={(el) => {
                  optionRefs.current[i] = el
                }}
                role="option"
                id={id ? `${id}-option-${i}` : undefined}
                aria-selected={value === opt.value}
                onClick={() => select(opt)}
                onMouseEnter={() => setHighlightedIndex(i)}
                className={`cursor-pointer whitespace-normal break-words px-4 py-2.5 text-sm transition-colors ${
                  highlightedIndex === i
                    ? 'bg-white/10 text-white'
                    : opt.value
                      ? 'text-gray-300 hover:bg-white/5'
                      : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                {opt.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
