'use client'

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/motion-tokens'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

interface AiInputMenuCoordinatorValue {
  openId: string | null
  setOpenId: (id: string | null) => void
}

const AiInputMenuCoordinatorContext = createContext<AiInputMenuCoordinatorValue | null>(null)

function useCoordinatedOpen(): [boolean, (open: boolean) => void] {
  const id = useId()
  const coordinator = useContext(AiInputMenuCoordinatorContext)
  const [standaloneOpen, setStandaloneOpen] = useState(false)

  if (!coordinator) {
    return [standaloneOpen, setStandaloneOpen]
  }

  const open = coordinator.openId === id
  const setOpen = (next: boolean) => coordinator.setOpenId(next ? id : null)
  return [open, setOpen]
}

const ARROW_UP_PATH =
  'M222.14,103.09,131.28,20.35a12,12,0,0,0-16.56,0L23.86,103.09A12,12,0,0,0,32,124a11.86,11.86,0,0,0,8.14-3.23L116,51.44V228a12,12,0,0,0,24,0V51.44l75.86,69.33A12,12,0,1,0,232,102.77Z'

function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden="true"
      className={cn('size-4', className)}
    >
      <path d={ARROW_UP_PATH} />
    </svg>
  )
}

const STOP_PATH =
  'M180,20H76A56.06,56.06,0,0,0,20,76V180a56.06,56.06,0,0,0,56,56H180a56.06,56.06,0,0,0,56-56V76A56.06,56.06,0,0,0,180,20Z'

function StopIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden="true"
      className={cn('size-3.5', className)}
    >
      <path d={STOP_PATH} />
    </svg>
  )
}

const MICROPHONE_PATH =
  'M128,176a48.05,48.05,0,0,0,48-48V64a48,48,0,0,0-96,0v64A48.05,48.05,0,0,0,128,176ZM96,64a32,32,0,0,1,64,0v64a32,32,0,0,1-64,0Zm40,143.6V232a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64,64,0,0,0,128,0,8,8,0,0,1,16,0A80.11,80.11,0,0,1,136,207.6Z'

function MicIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden="true"
      className={cn('size-4', className)}
    >
      <path d={MICROPHONE_PATH} />
    </svg>
  )
}

const SEND_WAVE_GRADIENT =
  'linear-gradient(180deg, transparent, color-mix(in oklch, var(--color-accent), transparent 88%), color-mix(in oklch, var(--color-accent), transparent 82%), transparent)'

function SendWave({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-[150%] blur-xl"
        style={{ background: SEND_WAVE_GRADIENT }}
        initial={{ y: '55%' }}
        animate={reduceMotion ? { y: '-17%' } : { y: '-105%' }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  )
}

export type AiInputEffortLevel = 'low' | 'medium' | 'high'

const EFFORT_BAR_X = [1.5, 5.75, 10] as const
const EFFORT_BAR_WIDTH = 2.5
const EFFORT_BAR_BOTTOM = 12.5
const EFFORT_BAR_TALL = 10.5
const EFFORT_BAR_MID = 7.5
const EFFORT_BAR_SHORT = 4.5

const EFFORT_BAR_HEIGHTS: Record<AiInputEffortLevel, readonly [number, number, number]> = {
  low: [3.25, 4.75, 0],
  medium: [EFFORT_BAR_SHORT, EFFORT_BAR_MID, 0],
  high: [EFFORT_BAR_SHORT, EFFORT_BAR_MID, EFFORT_BAR_TALL],
}

const EFFORT_BAR_TRANSITION = { type: 'spring', stiffness: 380, damping: 34 } as const

export function AiInputEffortBarsIcon({
  level,
  className,
}: {
  level: AiInputEffortLevel
  className?: string
}) {
  const heights = EFFORT_BAR_HEIGHTS[level]
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {heights.map((height, index) => {
        const visible = height > 0
        return (
          <motion.rect
            key={EFFORT_BAR_X[index]}
            x={EFFORT_BAR_X[index]}
            width={EFFORT_BAR_WIDTH}
            rx={1}
            fill="currentColor"
            initial={false}
            animate={{
              height: visible ? height : 0,
              y: visible ? EFFORT_BAR_BOTTOM - height : EFFORT_BAR_BOTTOM,
              opacity: visible ? 1 : 0,
            }}
            transition={EFFORT_BAR_TRANSITION}
          />
        )
      })}
    </svg>
  )
}

const PLUS_PATH =
  'M216,128a8,8,0,0,1-8,8H136v72a8,8,0,0,1-16,0V136H48a8,8,0,0,1,0-16h72V48a8,8,0,0,1,16,0v72h72A8,8,0,0,1,216,128Z'

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden="true"
      className={cn('size-4', className)}
    >
      <path d={PLUS_PATH} />
    </svg>
  )
}

export type AiInputMenuItem =
  | {
      type: 'action'
      value: string
      label: string
      icon?: ReactNode
      shortcut?: string
      disabled?: boolean
      onSelect?: () => void
      items?: undefined
    }
  | {
      type: 'toggle'
      value: string
      label: string
      icon?: ReactNode
      checked: boolean
      onCheckedChange: (checked: boolean) => void
    }
  | { type: 'separator'; value: string }
  | {
      type: 'submenu'
      value: string
      label: string
      icon?: ReactNode
      items: AiInputMenuItem[]
    }

export interface AiInputPlusMenuProps {
  items: AiInputMenuItem[]
  label?: string
  icon?: ReactNode
  className?: string
}

const CARET_RIGHT_PATH =
  'M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z'

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden="true"
      className={cn('size-3.5', className)}
    >
      <path d={CARET_RIGHT_PATH} />
    </svg>
  )
}

const CARET_LEFT_PATH =
  'M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z'

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden="true"
      className={cn('size-3.5', className)}
    >
      <path d={CARET_LEFT_PATH} />
    </svg>
  )
}

const MENU_SLIDE_TRANSITION = { duration: 0.18, ease: [0.22, 1, 0.36, 1] } as const

const menuSlideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 12 }),
  visible: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -12 }),
}

function MenuBackRow({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      className={cn(
        'relative flex min-h-11 w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2.5 text-start text-sm font-medium text-(--color-fg) outline-none',
        'hover:bg-(--color-surface-2) focus-visible:bg-(--color-surface-2)',
        'transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
      )}
      onClick={onClick}
      onPointerDown={(e) => e.preventDefault()}
    >
      <ChevronLeftIcon className="shrink-0 text-(--color-muted)" />
      {label}
    </button>
  )
}

function PlusMenuRow({
  item,
  onNavigate,
}: {
  item: AiInputMenuItem
  onNavigate: (submenu: { label: string; items: AiInputMenuItem[] }) => void
}) {
  if (item.type === 'separator') {
    return <DropdownMenuSeparator />
  }

  if (item.type === 'toggle') {
    return (
      <div className="flex min-h-11 w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm text-(--color-fg)">
        <span className="flex min-w-0 flex-1 items-center gap-2 truncate">
          {item.icon && (
            <span aria-hidden="true" className="shrink-0 text-(--color-muted)">
              {item.icon}
            </span>
          )}
          {item.label}
        </span>
        <Switch checked={item.checked} onCheckedChange={item.onCheckedChange} />
      </div>
    )
  }

  if (item.type === 'submenu') {
    return (
      <button
        type="button"
        className={cn(
          'relative flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2.5 text-start text-sm text-(--color-fg) outline-none',
          'hover:bg-(--color-surface-2) focus-visible:bg-(--color-surface-2)',
          'transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
        )}
        onClick={() => onNavigate({ label: item.label, items: item.items })}
        onPointerDown={(e) => e.preventDefault()}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2 truncate">
          {item.icon && (
            <span aria-hidden="true" className="shrink-0 text-(--color-muted)">
              {item.icon}
            </span>
          )}
          {item.label}
        </span>
        <ChevronRightIcon className="shrink-0 text-(--color-muted)" />
      </button>
    )
  }

  return (
    <DropdownMenuItem disabled={item.disabled} onClick={item.onSelect} textValue={item.label}>
      {item.icon && (
        <span aria-hidden="true" className="shrink-0 text-(--color-muted)">
          {item.icon}
        </span>
      )}
      <span className="flex-1 truncate">{item.label}</span>
      {item.shortcut && (
        <span className="shrink-0 text-xs tabular-nums text-(--color-muted)">{item.shortcut}</span>
      )}
    </DropdownMenuItem>
  )
}

export function AiInputPlusMenu({
  items,
  label = 'More actions',
  icon,
  className,
}: AiInputPlusMenuProps) {
  const [submenu, setSubmenu] = useState<{ label: string; items: AiInputMenuItem[] } | null>(null)
  const [slideDir, setSlideDir] = useState(1)
  const [open, setOpen] = useCoordinatedOpen()

  const navigateTo = useCallback((next: { label: string; items: AiInputMenuItem[] }) => {
    setSlideDir(1)
    setSubmenu(next)
  }, [])

  const navigateBack = useCallback(() => {
    setSlideDir(-1)
    setSubmenu(null)
  }, [])

  const activeItems = submenu?.items ?? items

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) setSubmenu(null)
      }}
    >
      <DropdownMenuTrigger
        showChevron={false}
        aria-label={label}
        style={{}}
        className={cn(
          'inline-flex size-8 shrink-0 min-h-0 w-8 items-center justify-center rounded-full supports-[corner-shape:squircle]:corner-squircle border-0 bg-transparent p-0 text-(--color-muted) hover:bg-(--color-surface-2) hover:text-(--color-fg)',
          className,
        )}
      >
        <span className="flex w-full items-center justify-center">{icon ?? <PlusIcon />}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false} custom={slideDir}>
          <motion.div
            key={submenu?.label ?? 'root'}
            custom={slideDir}
            variants={menuSlideVariants}
            initial="enter"
            animate="visible"
            exit="exit"
            transition={MENU_SLIDE_TRANSITION}
          >
            {submenu && <MenuBackRow label={submenu.label} onClick={navigateBack} />}
            {activeItems.map((item) => (
              <PlusMenuRow key={item.value} item={item} onNavigate={navigateTo} />
            ))}
          </motion.div>
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export interface AiInputAgentOption {
  value: string
  label: string
}

export interface AiInputAgentMenuProps {
  options: AiInputAgentOption[]
  value: string
  onValueChange: (value: string) => void
  label?: string
  className?: string
}

export function AiInputAgentMenu({
  options,
  value,
  onValueChange,
  label = 'Select agent',
  className,
}: AiInputAgentMenuProps) {
  const selected = options.find((option) => option.value === value) ?? options[0]
  const [open, setOpen] = useCoordinatedOpen()

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        showChevron={false}
        aria-label={label}
        style={{ width: 'auto' }}
        className={cn(
          'inline-flex min-h-0 w-auto items-center gap-1.5 rounded-full border-0 bg-(--color-surface-2) px-3 py-1.5 text-sm font-medium text-(--color-fg) hover:bg-(--color-border)',
          className,
        )}
      >
        <span className="truncate">{selected?.label}</span>
        <ChevronRightIcon className="shrink-0 rotate-90 text-(--color-muted)" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          {options.map((option) => (
            <SettingOptionRow
              key={option.value}
              option={option}
              selected={option.value === selected?.value}
              onSelect={() => onValueChange(option.value)}
            />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export interface AiInputSettingOption {
  value: string
  label: string
  description?: string
}

export interface AiInputSettingGroup {
  id: string
  label: string
  display?: 'inline' | 'submenu' | 'featured'
  options: AiInputSettingOption[]
}

export interface AiInputSettingsDropdownProps {
  groups: AiInputSettingGroup[]
  values: Record<string, string>
  onValueChange: (groupId: string, value: string) => void
  effortLevel?: AiInputEffortLevel
  label?: string
  className?: string
}

const CHECK_PATH =
  'M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z'

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden="true"
      className={cn('size-4', className)}
    >
      <path d={CHECK_PATH} />
    </svg>
  )
}

function SettingOptionRow({
  option,
  selected,
  onSelect,
}: {
  option: AiInputSettingOption
  selected: boolean
  onSelect: () => void
}) {
  return (
    <DropdownMenuItem textValue={option.label} onClick={onSelect}>
      <span className="min-w-0 flex-1">
        <span className="block truncate">{option.label}</span>
        {option.description && (
          <span className="block truncate text-xs text-(--color-muted)">{option.description}</span>
        )}
      </span>
      {selected && <CheckIcon className="shrink-0 text-(--color-accent)" />}
    </DropdownMenuItem>
  )
}

function FeaturedSettingRow({ option }: { option: AiInputSettingOption }) {
  return (
    <div className="flex items-start justify-between gap-2.5 px-3 py-2.5">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-(--color-fg)">{option.label}</p>
        {option.description && (
          <p className="mt-0.5 truncate text-xs text-(--color-muted)">{option.description}</p>
        )}
      </div>
      <CheckIcon className="mt-0.5 shrink-0 text-(--color-accent)" />
    </div>
  )
}

export function AiInputSettingsDropdown({
  groups,
  values,
  onValueChange,
  effortLevel,
  label = 'Settings',
  className,
}: AiInputSettingsDropdownProps) {
  const [submenu, setSubmenu] = useState<AiInputSettingGroup | null>(null)
  const [open, setOpen] = useCoordinatedOpen()

  const selectedLabels = groups.map(
    (group) => group.options.find((o) => o.value === values[group.id])?.label,
  )
  const triggerLabel = selectedLabels.filter(Boolean).join(', ')

  const featuredGroups = groups.filter((group) => group.display === 'featured')
  const inlineGroups = groups.filter((group) => !group.display || group.display === 'inline')
  const submenuGroups = groups.filter((group) => group.display === 'submenu')

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) setSubmenu(null)
      }}
    >
      <DropdownMenuTrigger
        showChevron={false}
        aria-label={`${label}: ${triggerLabel}`}
        style={{ width: 'auto' }}
        className={cn(
          'inline-flex min-h-0 w-auto items-center gap-1.5 rounded-full border-0 bg-transparent px-2 py-1 text-sm text-(--color-muted) hover:bg-(--color-surface-2) hover:text-(--color-fg)',
          className,
        )}
      >
        {effortLevel && <AiInputEffortBarsIcon level={effortLevel} className="shrink-0" />}
        {groups.map((group, index) => {
          const optionLabel = selectedLabels[index]
          if (!optionLabel) return null
          return (
            <span
              key={group.id}
              className={cn('truncate', index === 0 ? 'font-medium text-(--color-fg)' : '')}
            >
              {optionLabel}
            </span>
          )
        })}
        <ChevronRightIcon className="shrink-0 rotate-90 text-(--color-muted)" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false} custom={submenu ? 1 : -1}>
          <motion.div
            key={submenu?.id ?? 'root'}
            custom={submenu ? 1 : -1}
            variants={menuSlideVariants}
            initial="enter"
            animate="visible"
            exit="exit"
            transition={MENU_SLIDE_TRANSITION}
          >
            {submenu ? (
              <>
                <MenuBackRow label={submenu.label} onClick={() => setSubmenu(null)} />
                {submenu.options.map((option) => (
                  <SettingOptionRow
                    key={option.value}
                    option={option}
                    selected={values[submenu.id] === option.value}
                    onSelect={() => onValueChange(submenu.id, option.value)}
                  />
                ))}
              </>
            ) : (
              <>
                {featuredGroups.map((group) => {
                  const selected = group.options.find((o) => o.value === values[group.id])
                  return selected ? <FeaturedSettingRow key={group.id} option={selected} /> : null
                })}
                {featuredGroups.length > 0 && inlineGroups.length > 0 && <DropdownMenuSeparator />}
                {inlineGroups.map((group, index) => (
                  <DropdownMenuGroup key={group.id} label={index === 0 ? undefined : group.label}>
                    {group.options.map((option) => (
                      <SettingOptionRow
                        key={option.value}
                        option={option}
                        selected={values[group.id] === option.value}
                        onSelect={() => onValueChange(group.id, option.value)}
                      />
                    ))}
                  </DropdownMenuGroup>
                ))}
                {submenuGroups.length > 0 &&
                  (featuredGroups.length > 0 || inlineGroups.length > 0) && (
                    <DropdownMenuSeparator />
                  )}
                {submenuGroups.map((group) => {
                  const selectedLabel = group.options.find(
                    (o) => o.value === values[group.id],
                  )?.label
                  return (
                    <button
                      key={group.id}
                      type="button"
                      className={cn(
                        'relative flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2.5 text-start text-sm text-(--color-fg) outline-none',
                        'hover:bg-(--color-surface-2) focus-visible:bg-(--color-surface-2)',
                        'transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
                      )}
                      onClick={() => setSubmenu(group)}
                      onPointerDown={(e) => e.preventDefault()}
                    >
                      <span className="truncate">{group.label}</span>
                      <span className="flex shrink-0 items-center gap-1 text-(--color-muted)">
                        {selectedLabel && <span className="truncate">{selectedLabel}</span>}
                        <ChevronRightIcon />
                      </span>
                    </button>
                  )
                })}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function useControlledState(
  controlledValue: string | undefined,
  defaultValue: string | undefined,
  onValueChange: ((value: string) => void) | undefined,
): [string, (next: string) => void] {
  const [internal, setInternal] = useState(defaultValue ?? '')
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internal

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) setInternal(next)
      onValueChange?.(next)
    },
    [isControlled, onValueChange],
  )

  return [value, setValue]
}

export interface AiInputMessage {
  id: number
  text: string
}

export interface AiInputProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onSubmit?: (value: string) => void
  streaming?: boolean
  onStop?: () => void
  placeholder?: string
  maxRows?: number
  disabled?: boolean
  name?: string
  startSlot?: ReactNode
  endSlot?: ReactNode
  showMessages?: boolean
  onMicClick?: () => void
  className?: string
}

export const AiInput = forwardRef<HTMLTextAreaElement, AiInputProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      onSubmit,
      streaming = false,
      onStop,
      placeholder = 'Type a message…',
      maxRows = 6,
      disabled = false,
      name,
      startSlot,
      endSlot,
      showMessages = false,
      onMicClick,
      className,
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion()
    const internalRef = useRef<HTMLTextAreaElement>(null)
    const messagesRef = useRef<HTMLDivElement>(null)
    const [launched, setLaunched] = useState(false)
    const launchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const [messages, setMessages] = useState<AiInputMessage[]>([])
    const nextMessageIdRef = useRef(0)

    const setRefs = useCallback(
      (el: HTMLTextAreaElement | null) => {
        ;(internalRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el
        if (typeof ref === 'function') ref(el)
        else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el
      },
      [ref],
    )

    const [value, setValue] = useControlledState(controlledValue, defaultValue, onValueChange)

    useIsoLayoutEffect(() => {
      const el = internalRef.current
      if (!el) return
      el.style.height = 'auto'
      const computed = getComputedStyle(el)
      const lineHeight = parseFloat(computed.lineHeight)
      if (Number.isNaN(lineHeight)) return
      const max = lineHeight * maxRows
      const next = Math.min(el.scrollHeight, max)
      el.style.height = `${next}px`
      el.style.overflowY = el.scrollHeight > max ? 'auto' : 'hidden'
    }, [value, maxRows])

    const trimmed = value.trim()
    const canSend = !disabled && !streaming && trimmed.length > 0

    const handleSubmit = useCallback(() => {
      if (!canSend) return

      if (showMessages) {
        nextMessageIdRef.current += 1
        setMessages((prev) => [...prev, { id: nextMessageIdRef.current, text: trimmed }])
        requestAnimationFrame(() => {
          messagesRef.current?.scrollTo({
            top: messagesRef.current.scrollHeight,
            behavior: reduceMotion ? 'auto' : 'smooth',
          })
        })
      }

      if (!reduceMotion) {
        setLaunched(true)
        launchTimerRef.current = setTimeout(() => {
          setLaunched(false)
        }, 400)
      }

      onSubmit?.(trimmed)
      setValue('')
    }, [canSend, onSubmit, trimmed, reduceMotion, showMessages, setValue])

    const handleStop = useCallback(() => {
      onStop?.()
    }, [onStop])

    const handleKeyDown = useCallback(
      (e: ReactKeyboardEvent<HTMLTextAreaElement>) => {
        if (e.nativeEvent.isComposing) return
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          if (streaming) {
            handleStop()
          } else {
            handleSubmit()
          }
        }
      },
      [streaming, handleSubmit, handleStop],
    )

    useEffect(() => {
      return () => {
        if (launchTimerRef.current !== null) {
          clearTimeout(launchTimerRef.current)
        }
      }
    }, [])

    const showStop = streaming
    const buttonDisabled = !streaming && !canSend

    const [openMenuId, setOpenMenuId] = useState<string | null>(null)
    const coordinatorValue = useMemo(
      () => ({ openId: openMenuId, setOpenId: setOpenMenuId }),
      [openMenuId],
    )

    return (
      <AiInputMenuCoordinatorContext.Provider value={coordinatorValue}>
        <div className={cn('w-full', className)}>
          {showMessages && messages.length > 0 && (
            <div
              ref={messagesRef}
              className="mb-3 flex max-h-72 flex-col gap-2 overflow-y-auto overscroll-contain px-1 py-1 scrollbar-gutter-stable"
            >
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    layout="position"
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 420, damping: 34 }
                    }
                    className="max-w-[85%] self-end rounded-3xl rounded-br-lg bg-(--color-surface-2) px-4 py-2.5 text-sm leading-relaxed wrap-break-word whitespace-pre-wrap text-foreground"
                  >
                    {message.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          <div
            className={cn(
              'relative rounded-lg supports-[corner-shape:squircle]:corner-squircle border border-(--color-border) bg-(--color-card)',
              'transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
              'focus-within:border-(--color-accent)',
              disabled && 'opacity-50 pointer-events-none',
            )}
          >
            <AnimatePresence>
              {launched && <SendWave reduceMotion={!!reduceMotion} />}
            </AnimatePresence>

            <textarea
              ref={setRefs}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              name={name}
              rows={1}
              aria-label={placeholder}
              className={cn(
                'block max-h-40 w-full min-h-6 resize-none bg-transparent px-3.5 pt-3 pb-1 text-sm text-foreground outline-none',
                'placeholder:text-muted-foreground',
              )}
              style={{ fieldSizing: 'content' } as React.CSSProperties}
            />

            <div className="flex items-center gap-1.5 px-2.5 pt-1 pb-2.5">
              {startSlot}

              {endSlot}

              <div className="ms-auto flex shrink-0 items-center gap-1">
                {onMicClick && (
                  <button
                    type="button"
                    onClick={onMicClick}
                    aria-label="Use voice input"
                    className={cn(
                      'inline-flex size-8 shrink-0 items-center justify-center rounded-full border-0 bg-transparent text-(--color-muted) outline-none',
                      'hover:bg-(--color-surface-2) hover:text-(--color-fg)',
                      'transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
                    )}
                  >
                    <MicIcon />
                  </button>
                )}

                <button
                  type="button"
                  onClick={showStop ? handleStop : handleSubmit}
                  onPointerDown={(e) => e.preventDefault()}
                  disabled={buttonDisabled}
                  aria-label={showStop ? 'Stop generation' : 'Send message'}
                  className={cn(
                    'relative flex shrink-0 items-center justify-center size-8 rounded-full squircle cursor-pointer outline-none',
                    'bg-foreground text-background',
                    'transition-[opacity,transform] duration-(--motion-dur-fast) motion-reduce:transition-none',
                    'active:scale-95 motion-reduce:active:scale-100',
                    'disabled:opacity-40 disabled:pointer-events-none',
                    'focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-1 focus-visible:ring-offset-background',
                  )}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {showStop ? (
                      <motion.span
                        key="stop"
                        className="flex items-center justify-center"
                        initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
                        transition={reduceMotion ? { duration: 0 } : { duration: 0.12 }}
                      >
                        <StopIcon />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="send"
                        className="flex items-center justify-center"
                        initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                        animate={
                          launched && !reduceMotion
                            ? { opacity: 0, y: -8, scale: 0.9 }
                            : { opacity: 1, y: 0, scale: 1 }
                        }
                        exit={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : launched
                              ? { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
                              : springs.fast
                        }
                      >
                        <SendIcon />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </div>
      </AiInputMenuCoordinatorContext.Provider>
    )
  },
)

AiInput.displayName = 'AiInput'

export function AiInputPreview() {
  const [value, setValue] = useState('')
  const [webSearch, setWebSearch] = useState(false)
  const [agent, setAgent] = useState('claude')
  const [settings, setSettings] = useState<Record<string, string>>({
    model: 'fast',
    effort: 'medium',
  })

  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        <AiInput
          value={value}
          onValueChange={setValue}
          onSubmit={() => setValue('')}
          placeholder="Ask anything..."
          showMessages
          onMicClick={() => {}}
          startSlot={
            <AiInputPlusMenu
              items={[
                { type: 'action', value: 'attach', label: 'Attach file' },
                { type: 'action', value: 'photo', label: 'Add photo' },
                { type: 'separator', value: 'sep-1' },
                {
                  type: 'toggle',
                  value: 'web-search',
                  label: 'Web search',
                  checked: webSearch,
                  onCheckedChange: setWebSearch,
                },
                { type: 'separator', value: 'sep-2' },
                {
                  type: 'submenu',
                  value: 'connect',
                  label: 'Connect apps',
                  items: [
                    { type: 'action', value: 'drive', label: 'Google Drive' },
                    { type: 'action', value: 'notion', label: 'Notion' },
                    { type: 'action', value: 'github', label: 'GitHub' },
                  ],
                },
              ]}
            />
          }
          endSlot={
            <>
              <AiInputAgentMenu
                options={[
                  { value: 'claude', label: 'Claude' },
                  { value: 'assistant', label: 'Assistant' },
                ]}
                value={agent}
                onValueChange={setAgent}
              />
              <AiInputSettingsDropdown
                className="ms-auto"
                groups={[
                  {
                    id: 'model',
                    label: 'Model',
                    display: 'featured',
                    options: [
                      { value: 'fast', label: 'Fast', description: 'Quick, everyday answers' },
                      {
                        value: 'thinking',
                        label: 'Thinking',
                        description: 'Slower, more thorough',
                      },
                    ],
                  },
                  {
                    id: 'effort',
                    label: 'Effort',
                    display: 'submenu',
                    options: [
                      { value: 'low', label: 'Low' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'high', label: 'High' },
                    ],
                  },
                ]}
                values={settings}
                onValueChange={(groupId, val) =>
                  setSettings((prev) => ({ ...prev, [groupId]: val }))
                }
                effortLevel={settings.effort as AiInputEffortLevel}
              />
            </>
          }
        />
      </div>
    </div>
  )
}
