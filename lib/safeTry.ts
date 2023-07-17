
export function safeTry<T>(
  action: () => T, 
  onErrorValue: T,
  verbose: boolean = false
) {
  try {
    return action();
  } catch (error) {
    if (verbose) { console.warn('"safeTry" caught an error', error); }    
    return onErrorValue;
  }
}