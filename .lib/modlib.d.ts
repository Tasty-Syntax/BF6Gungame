/**
 
Declares the 'modlib' global variable for TypeScript IntelliSense.
This file does NOT generate any JavaScript code. It's purely for the type system.*/

// Use a type-only import to get the shape of your library's exports.
// The path must be relative to this .d.ts file.
import * as LibModule from '../.lib/index';

declare global {
  // Declare the global constant 'modlib'.
  // 'typeof LibModule' dynamically creates a type that matches the module's exports.
  const modlib: typeof LibModule;
}

// This empty export is crucial! It signals to TypeScript that this file is a module,
// which is required for the 'declare global' augmentation to work correctly.
export { };
