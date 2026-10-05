// Wither Storm x GTA V Passthrough (VortexisTV, MIT; a Forge 1.20.1 port of universal-modder's GTA V passthrough):
// Cracker's Wither Storm, running in real Minecraft 1.20.1, composited into GTA V Legacy story mode; the storm grabs
// and eats GTA peds and vehicles. The upstream release zip is never used (it bundles the All Rights Reserved Wither
// Storm jar and ScriptHookV): SIGF built MCPassthrough.asi and passthrough-forge-0.1.0.jar from tag commit ea6b6ee on a
// disposable AWS builder (library/QC.md section 4; source.json "built"). The pack pulls Forge 47.4.10 (Prism) and
// Wither Storm 4.2.1 (Modrinth download, pinned by hash). ReShade 6.8.0 (BSD-3-Clause) is shipped unchanged,
// ScriptHookV is linked.
//   SIGF_LIBRARY_BUILDS=<dir> node library/witherstorm-gta5/build.mjs      (outputs: library/lib.mjs)
import { instanceName } from '../../orchestrator/scripts/package-fusion.mjs';
import { asset, card, dl, emit } from '../lib.mjs';
import { builtArtifacts, builtField, forgePack, gtaAsset, gtaRequires, reshadeAsset, reshadeBundled, sourceOf } from '../um-gta5-passthrough/sigf-build.mjs';

const ID = 'witherstorm-gta5', VERSION = '1.0.0', NAME = 'Wither Storm x GTA V';
const SRC = sourceOf(ID);
const UP = { repo: SRC.repo, tag: 'mc-gta5', commit: SRC.commit, authors: ['VortexisTV', 'rehan-remade'] };
const MC = { mc: '1.20.1', forge: '47.4.10', java: '17' }; // mc-forge/gradle.properties at the commit
const JAR = 'passthrough-forge-0.1.0.jar';
// Cracker's Wither Storm Mod 4.2.1 (nonamecrackers2, Nazaru; All Rights Reserved): a Modrinth download in the pack.
const WITHERSTORM = {
  project: 'crackers-wither-storm-mod', version: '4.2.1', versionId: 'nY68hRY1', file: 'witherstormmod-1.20.1-4.2.1-all.jar',
  url: 'https://cdn.modrinth.com/data/kWjNGDUH/versions/nY68hRY1/witherstormmod-1.20.1-4.2.1-all.jar', size: 47342265,
  sha1: 'bd32ea3f44812b6b1744739633ea25d32197f4b8',
  sha512: 'bbd0704962588c51337891cff0770b4ec3b008d504458b7323f4550c0ef3ac0515408d5ac8db2616b3f7f873ff3d58b8a7ebe7405ed237ae660eebfc020d1b5e',
};
const TAGLINE = "Cracker's Wither Storm loose in GTA V story mode: it grows over Los Santos and pulls in and devours real GTA cars and people.";

const files = builtArtifacts(ID);
const reshade = reshadeAsset(files);
// args.txt as upstream's gta/install.sh writes it: story mode with BattlEye off (GTA Online stays out).
const gta = gtaAsset(ID, files, { args: '-nobattleye -noBE', extra: [
  { name: 'LICENSE-witherstorm-gta5.txt', data: files.get('LICENSE') },
  { name: 'THIRD_PARTY_NOTICES-witherstorm-gta5.md', data: files.get('THIRD_PARTY_NOTICES.md') },
] });
const pack = asset(`${ID}.mrpack`, forgePack({
  name: NAME, summary: TAGLINE, versionId: VERSION, mc: MC.mc, forge: MC.forge,
  downloads: [{ path: `mods/${WITHERSTORM.file}`, hashes: { sha1: WITHERSTORM.sha1, sha512: WITHERSTORM.sha512 },
    env: { client: 'required', server: 'required' }, downloads: [WITHERSTORM.url], fileSize: WITHERSTORM.size }],
  overrides: [
    { name: `overrides/mods/${JAR}`, data: files.get(JAR) },
    { name: 'overrides/licenses/witherstorm-gta5-LICENSE.txt', data: files.get('LICENSE') },
  ],
}));
const assets = [reshade, gta, pack];

const make = (urls, set) => ({
  id: `sigf/${ID}`,
  version: VERSION,
  name: NAME,
  tagline: TAGLINE,
  kind: 'passthrough',
  games: [
    { game: 'gta5', role: 'host', label: 'GTA V Legacy', engine: 'GTA V Legacy (RAGE, story mode) + ScriptHookV ASI MCPassthrough (C++) + ReShade add-on', apps: { steam: '271590' }, runtime: 'GTA V Legacy (GTA5.exe), a build your ScriptHookV supports (up to 3889); Enhanced is not supported' },
    { game: 'minecraft', role: 'guest', label: 'Minecraft', engine: "Minecraft Java 1.20.1 + Forge 47.4.10 mod passthrough-forge + Cracker's Wither Storm Mod 4.2.1", mc: MC.mc, loader: `forge@${MC.forge}`, java: MC.java },
  ],
  requires: [
    ...gtaRequires(reshade, urls, { shvNote: 'ScriptHookV for your GTA V Legacy build: copy ScriptHookV.dll and dinput8.dll from its bin folder into the GTA V folder' }),
    { id: 'forge', version: MC.forge },
    { id: 'witherstorm', version: WITHERSTORM.version, license: 'All Rights Reserved (nonamecrackers2, Nazaru): downloaded from Modrinth, never rehosted', page: `https://modrinth.com/mod/${WITHERSTORM.project}`, note: 'in the Minecraft pack (downloaded from Modrinth)' },
  ],
  install: [
    { game: 'gta5', strategy: 'game-dir-snapshot', loader: 'scripthookv', files: [
      { src: reshade.name, dst: '{game}', unpack: true, contents: reshade.contents, ...dl(reshade, urls) },
      { src: gta.name, dst: '{game}', unpack: true, contents: gta.contents, ...dl(gta, urls) },
    ] },
    { game: 'minecraft', strategy: 'mrpack', pack: { src: pack.name, ...dl(pack, urls) } },
  ],
  // Minecraft first (the Forge mod serves the link on 127.0.0.1:25599), then GTA V; the player picks Story Mode.
  launch: [{ game: 'minecraft', wait: 'port:25599' }, { game: 'gta5', args: [] }],
  files: set.map(a => ({ name: a.name, ...dl(a, urls) })),
  source: {
    repo: UP.repo, license: 'MIT AND BSD-3-Clause', upstream_license: SRC.license, tag: UP.tag, commit: UP.commit,
    hosted: `https://github.com/SIGFAI/${ID}`,
    derived_from: { repo: 'https://github.com/rehan-remade/universal-modder', path: 'examples/minecraft-gta5-passthrough', license: 'MIT' },
    built: builtField(ID),
    bundled: [reshadeBundled()],
    linked: [{ name: "Cracker's Wither Storm Mod", version: WITHERSTORM.version, page: `https://modrinth.com/mod/${WITHERSTORM.project}`, license: 'All Rights Reserved', how: 'Modrinth download in the pack; compile-only on the builder' }],
  },
  media: {},
  built_by: { author: UP.authors[0], authors: UP.authors, packaged_by: 'SIGF' },
  idea_by: UP.authors[0],
  built_at: '2026-10-05T00:00:00.000Z',
  ...card(UP.repo),
  notes: [
    'You need GTA V Legacy (Steam, GTA5.exe; not the Enhanced edition) and Minecraft: Java Edition. Windows only.',
    'Install ScriptHookV for your GTA build yourself first (it may not be redistributed): from dev-c.com, copy ScriptHookV.dll and dinput8.dll from its bin folder into the GTA V folder.',
    'The app adds MCPassthrough.asi, ReShade 6.8.0 (as ReShade64.asi, with ReShade.ini and the MCPassthrough effect) and args.txt (-nobattleye -noBE) to the GTA V folder; Restore removes them and puts back any file they replaced.',
    `Press Play: Minecraft starts first (the app's Prism instance "${instanceName(`sigf/${ID}`)}", Minecraft ${MC.mc}, Forge ${MC.forge}, Java ${MC.java}, Wither Storm ${WITHERSTORM.version} from Modrinth) and opens its creative "passthrough" world; leave its window open. Then GTA V starts with BattlEye off: pick Story Mode yourself.`,
    'In story mode: F9 summons a storm (Shift+F9 a grown one), F10 advances its phase, F11 removes it (Shift+F11 starts its death), F7 toggles the passthrough, F8 re-levels the ground.',
    'Story mode only, never GTA Online. Back up your saves first.',
    'The link listens on 127.0.0.1:25599 with no authentication while Minecraft runs (upstream design).',
    `SIGF build of tag ${UP.tag} (${UP.commit.slice(0, 7)}); the upstream release zip is not used. Beta, labeled experimental upstream (issue #1: third-person lock, ghosting): report bugs to the author on the upstream issue tracker.`,
  ],
});

emit({ slug: ID, version: VERSION, assets, make });
