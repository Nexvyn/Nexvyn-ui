/**
 * Utility function to merge Tailwind CSS classes
 * 
 * Note: For better Tailwind class conflict resolution, install clsx and tailwind-merge:
 * npm install clsx tailwind-merge
 * 
 * @param inputs - Class names or conditional class objects
 * @returns Merged class string
 * 
 * @example
 * cn('px-2 py-1', 'bg-red-500', { 'text-white': isActive })
 */
export function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]): string {
  const classes: string[] = [];
  
  for (const input of inputs) {
    if (!input) continue;
    
    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'object') {
      for (const key in input) {
        if (input[key]) {
          classes.push(key);
        }
      }
    }
  }
  
  return classes.join(' ');
}

