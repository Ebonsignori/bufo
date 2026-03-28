/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `list-tadpoles` command */
  export type ListTadpoles = ExtensionPreferences & {}
  /** Preferences accessible in the `new-tadpole` command */
  export type NewTadpole = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `list-tadpoles` command */
  export type ListTadpoles = {}
  /** Arguments passed to the `new-tadpole` command */
  export type NewTadpole = {}
}

