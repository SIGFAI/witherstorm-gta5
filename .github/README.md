# Wither Storm x GTA V

Cracker's Wither Storm loose in GTA V story mode: it grows over Los Santos and pulls in and devours real GTA cars and people.

**Wither Storm x GTA V is made by [VortexisTV](https://github.com/VortexisTV).** All credit for the mod goes to them. It is derived from [rehan-remade/universal-modder](https://github.com/rehan-remade/universal-modder) (`examples/minecraft-gta5-passthrough`), by rehan-remade.

- Original project: https://github.com/VortexisTV/wither-storm-gta5-passthrough
- Report bugs and ask questions there: https://github.com/VortexisTV/wither-storm-gta5-passthrough/issues
- Upstream release packaged here: [mc-gta5](https://github.com/VortexisTV/wither-storm-gta5-passthrough/releases/tag/mc-gta5) (commit [`ea6b6ee`](https://github.com/VortexisTV/wither-storm-gta5-passthrough/tree/ea6b6ee3241e85f6e87e26bc4b6146df9313cab0))
- **Built by SIGF from commit [`ea6b6ee3241e85f6e87e26bc4b6146df9313cab0`](https://github.com/VortexisTV/wither-storm-gta5-passthrough/tree/ea6b6ee3241e85f6e87e26bc4b6146df9313cab0)**, on a disposable build machine (AWS EC2 i-0022be8314df37721 (c6i.4xlarge, Windows Server 2022, terminated after the build)). The app installs these SIGF builds, not binaries from the author.

> **Beta.** Nobody at SIGF has played this build yet. Back up your saves.
> Bugs in the mod itself go to the author's issue tracker above; problems with the one-click install go to this repository's issues.

## What you need

- **GTA V Legacy** ([Steam](https://store.steampowered.com/app/271590/)): GTA V Legacy (GTA5.exe), a build your ScriptHookV supports (up to 3889); Enhanced is not supported.
- **Minecraft**: Java Edition 1.20.1.
- scripthookv: ScriptHookV for your GTA V Legacy build: copy ScriptHookV.dll and dinput8.dll from its bin folder into the GTA V folder (https://www.dev-c.com/gtav/scripthookv/).
- Windows and the [SIGF app](https://sigf.ai). The app installs reshade 6.8.0 (add-on), forge 47.4.10, witherstorm 4.2.1 for you.

## Install

In the SIGF app, open **Wither Storm x GTA V** in the catalog, press **Install**, then **Play**. **Restore** puts your game folders back exactly as they were.
The app follows `mashup.json` in this repository: every download is pinned by sha256. The files come from the release [`v1.0.0`](../../releases/tag/v1.0.0).

### Good to know

- You need GTA V Legacy (Steam, GTA5.exe; not the Enhanced edition) and Minecraft: Java Edition. Windows only.
- Install ScriptHookV for your GTA build yourself first (it may not be redistributed): from dev-c.com, copy ScriptHookV.dll and dinput8.dll from its bin folder into the GTA V folder.
- The app adds MCPassthrough.asi, ReShade 6.8.0 (as ReShade64.asi, with ReShade.ini and the MCPassthrough effect) and args.txt (-nobattleye -noBE) to the GTA V folder; Restore removes them and puts back any file they replaced.
- Press Play: Minecraft starts first (the app's Prism instance "sigf-witherstorm-gta5", Minecraft 1.20.1, Forge 47.4.10, Java 17, Wither Storm 4.2.1 from Modrinth) and opens its creative "passthrough" world; leave its window open. Then GTA V starts with BattlEye off: pick Story Mode yourself.
- In story mode: F9 summons a storm (Shift+F9 a grown one), F10 advances its phase, F11 removes it (Shift+F11 starts its death), F7 toggles the passthrough, F8 re-levels the ground.
- Story mode only, never GTA Online. Back up your saves first.
- The link listens on 127.0.0.1:25599 with no authentication while Minecraft runs (upstream design).
- SIGF build of tag mc-gta5 (ea6b6ee); the upstream release zip is not used. Beta, labeled experimental upstream (issue #1: third-person lock, ghosting): report bugs to the author on the upstream issue tracker.

## What this repository holds

1. The upstream source tree at tag `mc-gta5`, commit [`ea6b6ee3241e85f6e87e26bc4b6146df9313cab0`](https://github.com/VortexisTV/wither-storm-gta5-passthrough/tree/ea6b6ee3241e85f6e87e26bc4b6146df9313cab0), every file unchanged (same git blobs). Upstream's own `README.md` is there, unchanged; GitHub shows this file (`.github/README.md`) first.
2. Added by SIGF in the same commit: this file, `THIRD-PARTY.md` (licenses and sources of the third-party files in the release), and `sigf/` (the scripts that built the release assets, for reference: they run inside the SIGF repository).
3. `mashup.json`, the SIGF app recipe (the next commit).
4. The release `v1.0.0` (its tag is the first commit):

| Asset | Size | sha256 | What it is |
|---|---|---|---|
| `reshade-6.8.0-addon.zip` | 2460727 B | `d4167356162b209be93b6a35cf7e1253cffb2ac00746cf007a7201d362b00d07` | ReShade 6.8.0 (add-on build, crosire): the official `ReShade64.dll` unchanged as `ReShade64.asi`, its BSD-3-Clause license and the CC0 shader headers (see THIRD-PARTY.md); into the GTA V folder. |
| `witherstorm-gta5-gta5.zip` | 201222 B | `afa23b241067de7466cdca8ed9c4f462a3b2d153384737470ea7950cf585bc26` | the SIGF build of `MCPassthrough.asi` and `MCPassthrough.fx` from the pinned commit, upstream's LICENSE and THIRD_PARTY_NOTICES, `ReShade.ini`, `ReShadePreset.ini` and `args.txt` (story mode, BattlEye off); into the GTA V folder. |
| `witherstorm-gta5.mrpack` | 105548 B | `2d39c71b4cfc634cf0826c5b0db26463dab409ade9f0a6b8f6e5b747ee874211` | the Minecraft side for Minecraft 1.20.1 with Forge 47.4.10: the SIGF build of `passthrough-forge-0.1.0.jar` from the pinned commit with upstream's LICENSE; Cracker's Wither Storm Mod 4.2.1 is a Modrinth download link, not stored here. |

The sha256 of every file inside the zips is in `mashup.json` (`contents`).

## Licenses

| Part | License | Where |
|---|---|---|
| wither-storm-gta5-passthrough (all of the upstream tree, and the SIGF builds) | MIT, Copyright VortexisTV; derived from universal-modder (MIT) | `LICENSE`, `THIRD_PARTY_NOTICES.md`, `third-party-licenses/` |
| Cracker's Wither Storm Mod 4.2.1 (nonamecrackers2, Nazaru; downloaded from Modrinth by the app, not stored here) | All Rights Reserved | https://modrinth.com/mod/crackers-wither-storm-mod |
| ReShade 6.8.0 (release asset) | BSD-3-Clause; shader headers CC0-1.0 | `THIRD-PARTY.md` |

## Why this repository exists

The SIGF app (https://sigf.ai) installs mods from recipes (`mashup.json`) whose downloads are pinned release files. This repository makes Wither Storm x GTA V installable in one click, credited to VortexisTV. If you are the author and want anything changed or taken down, open an issue here.
