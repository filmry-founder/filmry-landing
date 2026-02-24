'use client'

import { useRef, useState, useCallback, useEffect } from 'react'

export interface DarkSelectOption {
  value: string
  label: string
}

interface DarkSelectProps {
  options: DarkSelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder: string
  disabled?: boolean
  id?: string
}

export default function DarkSelect({
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  id,
}: DarkSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const optionRefs = useRef<(HTMLLIElement | null)[]>([])

  const selectedOption = options.find((o) => o.value === value)
  const displayValue = selectedOption?.label ?? placeholder

  const close = useCallback(() => {
    setIsOpen(false)
    setHighlightedIndex(-1)
  }, [])

  const select = useCallback(
    (opt: DarkSelectOption) => {
      onChange(opt.value)
      close()
    },
    [onChange, close]
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
    setHighlightedIndex(value ? options.findIndex((o) => o.value === value) : -1)
  }, [isOpen, value, options])

  useEffect(() => {
    const el = optionRefs.current[highlightedIndex >= 0 ? highlightedIndex + 1 : 0]
    el?.scrollIntoView({ block: 'nearest' })
  }, [highlightedIndex])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (isOpen && highlightedIndex >= 0 && options[highlightedIndex]) {
          select(options[highlightedIndex])
        } else {
          setIsOpen(!isOpen)
        }
        break
      case 'Escape':
        e.preventDefault()
        close()
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else {
          setHighlightedIndex((i) => (i < options.length - 1 ? i + 1 : 0))
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (isOpen) {
          setHighlightedIndex((i) => (i > 0 ? i - 1 : options.length - 1))
        }
        break
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={id}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={id ? `${id}-label` : undefined}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        className={`w-full cursor-pointer break-words border-b border-gray-600 bg-transparent px-0 py-3 pr-6 text-left text-base text-white focus:border-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
          !value ? 'text-gray-500' : ''
        }`}
        aria-activedescendant={isOpen && options[highlightedIndex] ? `${id}-option-${highlightedIndex}` : undefined}
      >
        {displayValue}
        <span
          className={`pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden
        >
          ▾
        </span>
      </button>
      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-white/10 bg-zinc-900 py-1 shadow-xl shadow-black/30"
          aria-labelledby={id}
        >
          <li
            ref={(el) => { optionRefs.current[0] = el }}
            role="option"
            id={id ? `${id}-option-empty` : undefined}
            aria-selected={!value}
            onClick={() => {
              onChange('')
              close()
            }}
            onMouseEnter={() => setHighlightedIndex(-1)}
            className={`cursor-pointer px-4 py-2.5 text-sm text-gray-400 transition-colors ${
              highlightedIndex === -1 ? 'bg-white/10 text-white' : 'hover:bg-white/5'
            }`}
          >
            {placeholder}
          </li>
          {options.map((opt, i) => (
            <li
              key={opt.value}
              ref={(el) => { optionRefs.current[i + 1] = el }}
              role="option"
              id={id ? `${id}-option-${i}` : undefined}
              aria-selected={value === opt.value}
              onClick={() => select(opt)}
              onMouseEnter={() => setHighlightedIndex(i)}
              className={`cursor-pointer whitespace-normal break-words px-4 py-2.5 text-sm text-gray-300 transition-colors ${
                highlightedIndex === i ? 'bg-white/10 text-white' : 'hover:bg-white/5'
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
